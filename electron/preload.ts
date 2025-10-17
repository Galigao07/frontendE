/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer ,IpcRendererEvent} from 'electron'

// --------- Expose some API to the Renderer process ---------
// contextBridge.exposeInMainWorld('ipcRenderer', withPrototype(ipcRenderer))

contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel: string, data: any) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel:any, listener:any) => {
    ipcRenderer.on(channel, (event, ...args) => listener(...args));
  },
  // Add any other methods or properties you want to expose from ipcRenderer
});

// declare global {
//   interface Window {
//     electronAPI: {
//       silentPrint(iframeWindow: Window): unknown;

//       closeApp: () => void;

//       SilentPrint:() => void;
//       // Add other methods/properties if needed
   
//     };
//     // electronPDFPrint: {
//     //   printPDF: (pdfPath: string) => Promise<any>;
//     // };
    
//   }
// }
// contextBridge.exposeInMainWorld('electronPDFPrint', {
//    printPDF: (pdfBuffer: ArrayBuffer) => ipcRenderer.invoke('print-pdf-buffer', pdfBuffer)
// });
contextBridge.exposeInMainWorld('electronPDFPrint', {
  printPDF: (pdfBuffer: ArrayBuffer) => ipcRenderer.invoke('print-pdf', pdfBuffer)
});

contextBridge.exposeInMainWorld("configAPI", {
  get: (): Promise<Config> => {
    return ipcRenderer.invoke("config:get");
  },
  set: (newConfig: Config): Promise<Config> => {
    return ipcRenderer.invoke("config:set", newConfig);
  },
});




// contextBridge.exposeInMainWorld("ExtendedAPI", {
//   sendGlobalItems: (payload: GlobalItems) => {
//     ipcRenderer.send("update-global-items", payload);
//   },

//   onSyncGlobalItems: (callback: (data: GlobalItems) => void) => {
//     const listener = (_event: IpcRendererEvent, data: GlobalItems) => callback(data);
//     ipcRenderer.on("sync-global-items", listener);

//     // return cleanup function
//     return () => ipcRenderer.removeListener("sync-global-items", listener);
//   },
// });
contextBridge.exposeInMainWorld("ExtendedAPI", {
  sendGlobalItems: (payload: any[]) => ipcRenderer.send("update-global-items", payload),

  onSyncGlobalItems: (callback: (data: any[]) => void) => {
    const listener = (_event: any, data: any[]) => {
      callback(data);
    };

    ipcRenderer.on("sync-global-items", listener);

    return () => {
      console.log("🧹 Preload: removing sync-global-items listener");
      ipcRenderer.removeListener("sync-global-items", listener);
    };
  },

  requestCurrentGlobalItems: () => {
    console.log("📦 Preload: requesting current global items...");
    return ipcRenderer.invoke("get-current-global-items");
  }
});


contextBridge.exposeInMainWorld("ExtendedAMTAPI", {
  sendTendered: (payload: any[]) => ipcRenderer.send("update-global-tendered", payload),

  onSyncGlobalTendered: (callback: (data: any[]) => void) => {
    const listener = (_event: any, data: any[]) => {
      callback(data);
    };

    ipcRenderer.on("sync-global-tendered", listener);

    return () => {
      ipcRenderer.removeListener("sync-global-tendered", listener);
    };
  },

  requestCurrentGlobalTendered: () => {
    return ipcRenderer.invoke("get-current-global-tendered");
  }
});


// contextBridge.exposeInMainWorld("configAPI", {
//   get: async () => {
//     const data = await ipcRenderer.invoke("config:get");

//     return data;
//   },
//   set: (newConfig: any) => {
//     return ipcRenderer.invoke("config:set", newConfig);
//   },
// });

// contextBridge.exposeInMainWorld("configAPI", {
//   get: () => ipcRenderer.invoke("config:get"),
//   set: (newConfig:any) => ipcRenderer.invoke("config:set", newConfig),
// });




contextBridge.exposeInMainWorld('electronAPI', {

  SilentPrint: () => {
    ipcRenderer.send('SilentPrint');
  },
  closeApp: () => {
    ipcRenderer.send('closeApp');
  },
   onBeforeQuit: (callback:any) => {
    ipcRenderer.on('before-quit', callback);
  }
});

contextBridge.exposeInMainWorld('electron', {
  openBlobURL: (url:any) => ipcRenderer.send('open-blob-url', url)
});

ipcRenderer.on('print-iframe', (event, data) => {
  const { iframeWindow } = data; // Access the iframeWindow reference
  if (iframeWindow) {
    iframeWindow.print();
  }
});



// `exposeInMainWorld` can't detect attributes and methods of `prototype`, manually patching it.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function withPrototype(obj: Record<string, any>) {
  const protos = Object.getPrototypeOf(obj)

  for (const [key, value] of Object.entries(protos)) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) continue

    if (typeof value === 'function') {
      // Some native APIs, like `NodeJS.EventEmitter['on']`, don't work in the Renderer process. Wrapping them into a function.
      obj[key] = function (...args: any) {
        return value.call(obj, ...args)
      }
    } else {
      obj[key] = value
    }
  }
  return obj
}

// --------- Preload scripts loading ---------
function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
  return new Promise(resolve => {
    if (condition.includes(document.readyState)) {
      resolve(true)
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true)
        }
      })
    }
  })
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find(e => e === child)) {
      parent.appendChild(child)
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find(e => e === child)) {
      parent.removeChild(child)
    }
  },
}

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
// function useLoading() {
//   const className = `loaders-css__square-spin`
//   const styleContent = `
// @keyframes square-spin {
//   25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
//   50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
//   75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
//   100% { transform: perspective(100px) rotateX(0) rotateY(0); }
// }
//   .${className} {
//   display: grid;
//   grid-template-columns: repeat(2, 50px); /* 2 columns */
//   grid-template-rows: repeat(2, 50px);    /* 2 rows */
//   gap: 10px; /* space between squares */
// }
// .${className} > div {
//   animation-fill-mode: both;
//   width: 50px;
//   height: 50px;
//   background: #3245edff;
//   animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
// }
// .app-loading-wrap {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: #f9fafbff;
//   z-index: 9;
// }
//     `

//       // background: #282c34;
//   const oStyle = document.createElement('style')
//   const oDiv = document.createElement('div')

//   oStyle.id = 'app-loading-style'
//   oStyle.innerHTML = styleContent
//   oDiv.className = 'app-loading-wrap'
//   oDiv.innerHTML = `
//   <div class="${className}">
//     <div></div>
//     <div></div>
//     <div></div>
//     <div></div>
//   </div>
// `

//   return {
//     appendLoading() {
//       safeDOM.append(document.head, oStyle)
//       safeDOM.append(document.body, oDiv)
//     },
//     removeLoading() {
//       safeDOM.remove(document.head, oStyle)
//       safeDOM.remove(document.body, oDiv)
//     },
//   }
// }

// // ----------------------------------------------------------------------

// const { appendLoading, removeLoading } = useLoading()
// domReady().then(appendLoading)

// window.onmessage = ev => {
//   ev.data.payload === 'removeLoading' && removeLoading()
// }

// setTimeout(removeLoading, 4999)


// preload.ts


// preload.ts

const useLoading = () => {
  const styleContent = `
/* Fullscreen overlay */
.app-loading-wrap {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.3);
  z-index: 9999;
  font-family: sans-serif;
  color: white;
}
.app-loading-container {
  border-radius: 10px;
  background:  rgba(254, 254, 254, 1);
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.45);
}
/* Percentage text above */
.app-loading-percent {
  margin-bottom: 10px;
  color:black;
  font-size: 20px;
  font-weight: bold;
}

/* Progress bar container */
  .app-loading-bar-container {
  width: 90%;
  height: 15px;
  background: rgba(0, 0, 0, 0.36);
  border-radius: 7px;
  overflow: hidden;
  margin-bottom: 10px;
}

/* Progress bar fill */
.app-loading-bar {
  width: 0%;
  height: 100%;
  background: #1915ecff;
  border-radius: 7px;
  transition: width 0.1s linear;
}

/* Please wait text below */
.app-loading-text {
  color: black;
  font-size: 16px;
  opacity: 0.9;
  font-style: italic
}
  `

  const oStyle = document.createElement('style')
  oStyle.id = 'app-loading-style'
  oStyle.innerHTML = styleContent

  const oDiv = document.createElement('div')
  oDiv.className = 'app-loading-wrap'
  oDiv.innerHTML = `
    <div class="app-loading-container">
    <div class="app-loading-percent">0%</div>
    <div class="app-loading-bar-container">
      <div class="app-loading-bar"></div>
    </div>
    <div class="app-loading-text">Please wait...</div></div>
  `

  // Elements references
  const percentEl = oDiv.querySelector<HTMLDivElement>('.app-loading-percent')!
  const barEl = oDiv.querySelector<HTMLDivElement>('.app-loading-bar')!

  let progress = 0
  let interval: number

  const startProgress = () => {
    interval = window.setInterval(() => {
      if (progress >= 100) {
        clearInterval(interval)
        return
      }
      progress += 1
      percentEl.textContent = progress + '%'
      barEl.style.width = progress + '%'
    }, 30) // adjust speed here (30ms per 1%)
  }

  return {
    appendLoading() {
      document.head.appendChild(oStyle)
      document.body.appendChild(oDiv)
      startProgress()
    },
    removeLoading() {
      clearInterval(interval)
      oStyle.remove()
      oDiv.remove()
    },
  }
}

const { appendLoading, removeLoading } = useLoading()

// Show loader when DOM is ready
window.addEventListener('DOMContentLoaded', appendLoading)

// Optional: auto-remove after 5 seconds
setTimeout(removeLoading, 5000)

// Expose loader API to renderer safely
contextBridge.exposeInMainWorld('loaderAPI', {
  show: appendLoading,
  remove: removeLoading
})


/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from 'electron'

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

declare global {
  interface Window {
    electronAPI: {
      silentPrint(iframeWindow: Window): unknown;

      closeApp: () => void;

      SilentPrint:() => void;
      // Add other methods/properties if needed
    };
  }
}


contextBridge.exposeInMainWorld('electronAPI', {

  // printIframeContent: (content: any) => {
  //   const printWindow = window.open('', '_blank');
  //   printWindow!.document.write(content);
  //   printWindow!.document.close();

  //   printWindow!.onload = () => {
  //     printWindow!.print();
  //     printWindow!.onafterprint = () => {
  //       printWindow!.close();
  //       // You can trigger an IPC event or perform other actions after printing is completed
  //     };
  //   };
  // },
  SilentPrint: () => {
    ipcRenderer.send('SilentPrint');
  },
  closeApp: () => {
    ipcRenderer.send('closeApp');
  },
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
function useLoading() {
  const className = `loaders-css__square-spin`
  const styleContent = `
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `
  const oStyle = document.createElement('style')
  const oDiv = document.createElement('div')

  oStyle.id = 'app-loading-style'
  oStyle.innerHTML = styleContent
  oDiv.className = 'app-loading-wrap'
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle)
      safeDOM.append(document.body, oDiv)
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle)
      safeDOM.remove(document.body, oDiv)
    },
  }
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading()
domReady().then(appendLoading)

window.onmessage = ev => {
  ev.data.payload === 'removeLoading' && removeLoading()
}

setTimeout(removeLoading, 4999)

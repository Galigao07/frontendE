/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-inner-declarations */

import { app, BrowserWindow,dialog,ipcMain,screen,session,protocol,shell} from 'electron'
import { truncate } from 'original-fs';
import { loadConfig } from "./configManager"
import * as fs from 'fs/promises'; // Use for async file operations
import * as path from 'path';
import * as url from 'url';
import { exec } from 'child_process';
import PDFWindow from 'electron-pdf-window';
import { Buffer } from 'buffer';
// // import path from 'node:path'
// import path from 'path';
// // import fs from "fs";
// import { promises as fs } from "fs";
// import * as url from 'url';
// import { config } from 'process';
// import PDFWindow from "electron-pdf-window";
// import { Buffer } from 'buffer';
// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
let splashScreen : BrowserWindow | null
let LOGIN : string | null
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')
const srcDirectory = path.resolve(__dirname);

let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']


let globalItems: any = [];
let tenderedAmt: any = [];
app.on("certificate-error", (event, webContents, url, error, certificate, callback) => {
  // Ignore certificate errors for self-signed cert
  event.preventDefault();
  callback(true);
});

async function createWindow() {
   
await ensureConfig();
const config = await loadConfig(); // ⬅️ load system config first

  win = new BrowserWindow({
    // icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    icon: path.join(process.env.VITE_PUBLIC, 'logo.png'),
    // icon: path.join(process.env.VITE_PUBLIC, 'logo.svg'),
    show: false,
    webPreferences : {
    webSecurity: false,
    preload: path.join(__dirname, 'preload.js'),
    nodeIntegration: false,
    contextIsolation: true, // ✅ Recommended
    partition: 'persist:main', // ✅ persistent session
    
    },
    fullscreen: false, 
    frame:true,
    
  })
  // win.webContents.openDevTools();

  win.on('close', async () => {
    const isLogin = await win?.webContents.executeJavaScript('window.localStorage.getItem("isLogin")');
    if (isLogin === true) {
      const choice = dialog.showMessageBoxSync(win!, {
        type: 'question',
        buttons: ['Yes', 'No'],
        title: 'Confirm',
        message: 'There is unsaved data. Are you sure you want to quit?'
      });
  
      if (choice === 1) {
 
        // event.preventDefault(); // Prevents the window from closing
      }
    }
  });


  function executeAndRepeat() {
    setInterval(() => {
      win!.webContents
        .executeJavaScript('localStorage.getItem("isLogin")', true)
        .then(result => {
 
          LOGIN = result
          // Handle the result here as needed
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle any potential errors here
        });
    }, 5000); // Repeat every 5 seconds (5000 milliseconds)
  }
  


  app.on('before-quit', async (event) => {

    BrowserWindow.getAllWindows().forEach(win => {
    win.webContents.send('before-quit');
  });

    if (win) {

      if (LOGIN == 'true') {
        const choice = dialog.showMessageBoxSync(win, {
          type: 'question',
          buttons: ['Yes', 'No'],
          title: 'Confirm',
          message: 'Are you sure you want to close the application with out Log out?'
        });
    
        if (choice === 1) {
          event.preventDefault(); // Prevents the application from quitting
        }
      }

    }
  });
  
  

  
  // win.on('closed', () => {
  //   win = null;
  // });


  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })



  if (VITE_DEV_SERVER_URL) {

    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    const srcDirectory = app.getAppPath()
    // win.loadURL(`file://${path.join(srcDirectory, '/dist/index.html')}`);

    win.loadURL(url.format({
      pathname: path.join(srcDirectory, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
  }));

  }



  win.once('ready-to-show', () => {
    win?.show();
    win?.webContents.session.cookies.get({})
  });
// win.on("closed", () => (win = null));

  win.on('closed', () => {
    // Close any other window
    for (const win of BrowserWindow.getAllWindows()) {
      if (!win.isDestroyed()) win.close();
    }
    app.quit();
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
  
    app.quit()
    
    win = null
  }
})

// ipcMain.on('closeApp', () => {
//   app.quit();
// });

ipcMain.on('closeApp', () => {
  // Close all BrowserWindows manually
  for (const win of BrowserWindow.getAllWindows()) {
    win.removeAllListeners('close'); // remove custom preventDefault
    win.close();
  }

  // Quit the app completely
  app.quit();
});


app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {

    createWindow()
  }
})
let extendedWindow: BrowserWindow | null = null;
const CreateExtendedMonitor = () => {
  const displays = screen.getAllDisplays();
  // console.log('displays',displays)
  // Loop through all displays

  if (displays.length === 1){

  CreateExtendedMonitorNew();  
}  displays.forEach((display, index) => {

      if (index === 0) return;
      const isDev = !!process.env.VITE_DEV_SERVER_URL;
       extendedWindow = new BrowserWindow({
        icon: path.join(process.env.VITE_PUBLIC, 'logo.png'),
          x: display.bounds.x,
          y: display.bounds.y,
          width: display.bounds.width,
          height: display.bounds.height,
          webPreferences: {
          preload: path.join(__dirname, "preload.js"), // ✅ ADD THIS LINE
          contextIsolation: true,
          nodeIntegration: false,
          webSecurity: false // This allows loading local files in Electron
          },
          fullscreen : true,
          frame:false,
      });
        // extendedWindow.webContents.openDevTools();
        
          if (isDev) {
            extendedWindow.loadURL(`${process.env.VITE_DEV_SERVER_URL}/extended.html`);
          } else {
                const htmlPath = path.join(app.getAppPath(), 'dist', 'extended.html');
                extendedWindow.loadURL(
                  url.format({
                    pathname: htmlPath,
                    protocol: 'file:',
                    slashes: true,
                  })
                );

          }
           const sendCurrentState = (extendedWindow: BrowserWindow) => {
              extendedWindow.webContents.send("sync-global-items", globalItems);
              extendedWindow.webContents.send("sync-global-tendered", tenderedAmt);
            };

            BrowserWindow.getAllWindows().forEach((extendedWindow) => {
              // Send immediately in case window is already loaded
              sendCurrentState(extendedWindow);

              // Also send on future loads (reloads)
              extendedWindow.webContents.on("did-finish-load", () => sendCurrentState(extendedWindow));
            });

  extendedWindow.on("closed", () => (extendedWindow = null));
 
    //   extendedWindow.loadURL(url.format({
    //     pathname: path.join(__dirname, 'extended.html'),
    //     protocol: 'file:',
    //     slashes: true
    // }));
  });
}
const CreateExtendedMonitorNew = () => {
    const isDev = !!process.env.VITE_DEV_SERVER_URL;
  // Create a new BrowserWindow
    extendedWindow = new BrowserWindow({
        icon: path.join(process.env.VITE_PUBLIC, 'logo.png'),
          webPreferences: {
          preload: path.join(__dirname, "preload.js"), // ✅ ADD THIS LINE
          nodeIntegration: true,
          contextIsolation: false,
          webSecurity: false // This allows loading local files in Electron
          },
          fullscreen : true,
          frame:false,
      });

  if (isDev) {

    extendedWindow.loadURL(`${process.env.VITE_DEV_SERVER_URL}/extended.html`);
  } else {

    extendedWindow.loadFile(path.join(__dirname, "../dist/extended.html"));
     
  }

      const sendCurrentState = (extendedWindow: BrowserWindow) => {
        extendedWindow.webContents.send("sync-global-items", globalItems);
        extendedWindow.webContents.send("sync-global-tendered", tenderedAmt);
      };

      BrowserWindow.getAllWindows().forEach((extendedWindow) => {
        // Send immediately in case window is already loaded
        sendCurrentState(extendedWindow);

        // Also send on future loads (reloads)
        extendedWindow.webContents.on("did-finish-load", () => sendCurrentState(extendedWindow));
      });


  extendedWindow.on("closed", () => (extendedWindow = null));

//   extendedWindow.loadURL(url.format({
//     pathname: path.join(__dirname, 'extended.html'),
//     protocol: 'file:',
//     slashes: true
// }));
// extendedWindow.loadFile('extended.html')

};
const gotLock = app.requestSingleInstanceLock();
app.whenReady().then(() => {

  ensureConfig();
  // if (!gotLock) {
  //   app.quit();
  //   return;
  // } else {
  //   app.on('second-instance', () => {
  //     // Someone tried to run a second instance, we should focus our window.
  //     if (win) {
  //       if (win.isMinimized()) win.restore();
  //       win.focus();
  //     }
  //   });
  // }
  createWindow();
  CreateExtendedMonitor();


  
  ipcMain.on("update-global-items", (_event, items: any[]) => {
    globalItems = items;

    // Broadcast to all windows
    BrowserWindow.getAllWindows().forEach((extendedWindow) => {
      extendedWindow.webContents.send("sync-global-items", globalItems);
      
    });
  });

  ipcMain.handle("get-current-global-items", () => {
    return globalItems;
  });


  ipcMain.on("update-global-tendered", (_event, tendered: any[]) => {
    tenderedAmt = tendered;


    // Broadcast to all windows
    BrowserWindow.getAllWindows().forEach((extendedWindow) => {
      extendedWindow.webContents.send("sync-global-tendered", tenderedAmt);
    });
  });

  ipcMain.handle("get-current-global-tendered", () => {
    return tenderedAmt;
  });
});




ipcMain.on('open-blob-url', (event, url) => {
    shell.openExternal(url);
});


function log(msg: string) {
  try {
    const logPath = path.join(path.dirname(process.execPath), "debug.log");
    // still sync here (logging is lightweight)
    require("fs").appendFileSync(logPath, `${new Date().toISOString()} - ${msg}\n`);
  } catch (err) {
    console.error("Failed to write log:", err);
  }
}

function getConfigPath() {
  const configPath = app.isPackaged
    ? path.join(path.dirname(process.execPath), "config.json")
    : path.join(__dirname, "../public/config.json");

  return configPath;
}

async function ensureConfig(): Promise<string> {
  const configPath = getConfigPath();

  try {
    await fs.access(configPath); // check if file exists
  
  } catch {
    // file doesn't exist → create it

    const defaultConfig = {
        ulCode: "1",
              ptuNo: "PTU NO: FP092022-115-0345623-00005",
              terminalNo: "1",
              machineNo: "22091316054628404",
              siteNo: "6",
              serialNo: "9S715HK12277ZS5000149",
              modelNo: "ST1000DM010",
              description: "TERMINAL 21",
              dateIssue: "2024-09-01",
              dateValid: "2030-12-31",
              host: "https://192.168.68.115:5173",
              ipaddress: "https://192.168.68.115",
              ws:"ws://192.168.68.115",
              port: "8000",
              socketport: "8001",
              printer:"Brother DCP-T420W Printer",
              pdf:"C:\\Users\\User\\AppData\\Local\\SumatraPDF\\SumatraPDF.exe",
              pdfWorker: "resources\\pdf.worker.min.js"
      // ulCode: "1",
      // ptuNo: "PTU",
      // terminalNo: "1",
      // machineNo: "SDNFJ2340",
      // siteNo: "1",
      // serialNo: "3421JOPWR",
      // modelNo: "KNGTF9324",
      // description: "TERMINAL 1",
      // dateIssue: new Date().toISOString().split("T")[0],
      // dateValid: new Date().toISOString().split("T")[0],
      // host:'localhost:5173',
      // ipaddress:"localhost",
      // port:"8000",
      // socketport:"8001"
    };


    await fs.writeFile(configPath, JSON.stringify(defaultConfig, null, 2));
  }

  return configPath;
}



//  UPDATE AND GET DATA IN CONFIG.JSON FILE
ipcMain.handle("config:get", async () => {
  const configPath = await ensureConfig();
  const raw = await fs.readFile(configPath, "utf-8");
  const parsed = JSON.parse(raw);
  return parsed;
});


ipcMain.handle("config:set", async (_event, newConfig) => {
  const configPath = await ensureConfig();
  // Prevent nesting: strip off accidental `config` field
  if ("config" in newConfig) {
    delete (newConfig as any).config;
  }

  await fs.writeFile(configPath,JSON.stringify(newConfig, null, 2));

  return newConfig;
});



// <-- Replace with your SumatraPDF.exe path
//  const SUMATRA_PATH = "C:\\Users\\User\\AppData\\Local\\SumatraPDF\\SumatraPDF.exe";
ipcMain.handle('print-pdf', async (event, pdfBuffer: ArrayBuffer) => {
  const configPath = await ensureConfig();
  const raw = await fs.readFile(configPath, "utf-8");
  const parsed = JSON.parse(raw);
  const SUMATRA_PATH = parsed.pdf;
  const printerName = parsed.printer; // Replace with your printer name

  const tempPath = path.join(app.getPath('temp'), `receipt_${Date.now()}.pdf`);

  try {
    // Save PDF to temporary file
    await fs.writeFile(tempPath, new Uint8Array(pdfBuffer));

    // Use SumatraPDF to print silently
    // /print-to "<PrinterName>" /silent
    
    await new Promise<void>((resolve, reject) => {
      exec(
        `"${SUMATRA_PATH}" -print-to "${printerName}" -silent "${tempPath}"`,
        (error, stdout, stderr) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });

    return { success: true };
  } catch (err) {
    console.error('Print error:', err);
    return { success: false, error: String(err) };
  } finally {
    // Cleanup temp file after a short delay
    setTimeout(async () => {
      try {
        await fs.unlink(tempPath);
      } catch {}
    }, 5000);
  }
});


/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-inner-declarations */
import { app, BrowserWindow,dialog,ipcMain,screen,session,protocol} from 'electron'
import { truncate } from 'original-fs';
// import path from 'node:path'
import path from 'path';
import * as url from 'url';

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

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    // icon: path.join(process.env.VITE_PUBLIC, 'logo.svg'),
    show: false,
    webPreferences : {
      partition: 'disable_cache',
      devTools: true,
      nodeIntegration: true,
      contextIsolation: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      preload: path.join(__dirname, 'preload.js'),
      // sandbox: true, // Enable sandbox mode for additional security

      // enableBlinkFeatures: 'HTML5HistoryAPI',
      // session: session.fromPartition('persist:name'), 
    },
    fullscreen: true, 
    frame:false,
    
  })

  win.on('close', async () => {
    const isLogin = await win?.webContents.executeJavaScript('window.localStorage.getItem("isLogin")');
    console.log('2222')
    if (isLogin === true) {
      const choice = dialog.showMessageBoxSync(win!, {
        type: 'question',
        buttons: ['Yes', 'No'],
        title: 'Confirm',
        message: 'There is unsaved data. Are you sure you want to quit?'
      });
  
      if (choice === 1) {
        console.log('111111')
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
    win.loadURL(`file://${path.join(srcDirectory, '/dist/index.html')}`);

  }



  win.once('ready-to-show', () => {
    win?.show();
    if (splashScreen) {
      executeAndRepeat();
      splashScreen.close(); // Close the splash screen ifW it exists
    }
  });

}



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    console.log('Close...');
    app.quit()
    win = null
  }
})

ipcMain.on('closeApp', () => {
  app.quit();
});


app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

const CreateExtendedMonitor = () => {
  const displays = screen.getAllDisplays();
  console.log('displays',displays)
  // Loop through all displays

  if (displays.length === 1)
{
  CreateExtendedMonitorNew();  
}  displays.forEach((display, index) => {
      // Ignore primary display
      if (index === 0) return;

      // Create a new BrowserWindow for each external display
      const extendedWindow = new BrowserWindow({
          x: display.bounds.x,
          y: display.bounds.y,
          width: display.bounds.width,
          height: display.bounds.height,
          webPreferences: {
              nodeIntegration: true, // Enable Node.js integration in the renderer process
              contextIsolation: false, // or true, depending on your setup
              webSecurity: false // This allows loading local files in Electron
          },
          fullscreen : true,
          frame:false,
      });
      // const srcDirectory = app.getAppPath(); // Assuming dataFile.txt is in the app directory
      // // console.log('aaaa',srcDirectory)
      // const htmlFilePath = path.join(srcDirectory, 'src', 'extended.html');
      // // const htmlFilePath = path.resolve(srcDirectory, '..', 'extended.html');
      // // console.log(htmlFilePath)
      // extendedWindow.loadFile(htmlFilePath);
      // extendedWindow.loadFile('extended.html')

      extendedWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'extended.html'),
        protocol: 'file:',
        slashes: true
    }));
  });
}
const CreateExtendedMonitorNew = () => {
  // Create a new BrowserWindow
  const extendedWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true, // or false, depending on your setup
        contextIsolation: false, // or true, depending on your setup
        webSecurity: false // This allows loading local files in Electron
      },
      fullscreen: false,
    frame:true,
  });
  // console.log('aaaa',srcDirectory)
  // Load the HTML file into the new window
  // const srcDirectory = app.getAppPath(); // Assuming dataFile.txt is in the app directory
  // const tmpPath = 'file//' + __dirname + './src/extended.html'
  // console.log('aaaa',VITE_DEV_SERVER_URL)
  // const htmlFilePath = path.join(tmpPath)
  // const htmlFilePath = path.join(tmpPath, 'src', 'extended.html');
  // extendedWindow.loadFile(htmlFilePath);

  extendedWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'extended.html'),
    protocol: 'file:',
    slashes: true
}));
// extendedWindow.loadFile('extended.html')

};



app.whenReady().then(() => {
  createWindow();
  CreateExtendedMonitor();


  
});

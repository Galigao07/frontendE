/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-inner-declarations */
import { app, BrowserWindow,dialog,ipcMain,screen} from 'electron'
import path from 'node:path'


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
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      sandbox: true, // Enable sandbox mode for additional security

    },
    // fullscreen: true, 
    // frame:false,
    
  })

//   ipcMain.on('print-dialog', (event: any, args: any) => {
//     console.log('Print dialog shown.');

//     // auto click print button after 1 second
//     setTimeout(() => {
//         console.log('Auto clicking print button.');
//         win!.webContents.send('auto-print');
//     }, 1000);
// });



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
    win.loadFile('dist/index.html')
    // win.loadFile(path.join(process.env.DIST, 'index.html'))
  }



  win.once('ready-to-show', () => {
    win?.show();
    if (splashScreen) {
      executeAndRepeat();
      splashScreen.close(); // Close the splash screen ifW it exists
    }
  });



//   win.webContents.on('before-input-event', (event, input) => {
//     if (input.type === 'keyDown' && input.control && input.key.toLowerCase() === 'p') {
//         console.log('Print preview is opened');
//         // Here you can perform actions or set flags indicating that print preview is open
//     }
//   });



// win.webContents.on('console-message', (_, level, message, lineNumber, sourceId) => {
//   console.log('Print preview is opened', message, '', level);
//   if (level === 1 && message === '999') {
//       console.log('Print preview is opened');
//       // Execute JavaScript to print the contents of the iframe
//       win?.webContents.print({ silent: true, printBackground: true });
//       console.log('Success');
//   }
// });


//   // Listen for when print preview is closed
//   win.webContents.on('destroyed', () => {
//     console.log('Print preview is closed');
//     // Here you can perform actions or reset flags indicating that print preview is closed
//   });
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
              nodeIntegration: true // Enable Node.js integration in the renderer process
          },
          fullscreen : false
      });
      const htmlFilePath = path.resolve(srcDirectory, '..', 'extended.html');
      console.log(htmlFilePath)
      extendedWindow.loadFile(htmlFilePath);
  });
}
const CreateExtendedMonitorNew = () => {
  // Create a new BrowserWindow
  const extendedWindow = new BrowserWindow({
      webPreferences: {
          nodeIntegration: true // Enable Node.js integration in the renderer process
      },
      fullscreen: true,
    frame:true,
  });

  // Load the HTML file into the new window
  const htmlFilePath = path.resolve(srcDirectory, '..', 'extended.html');
  extendedWindow.loadFile(htmlFilePath);
};


app.whenReady().then(() => {
  createWindow();
  CreateExtendedMonitor();
});

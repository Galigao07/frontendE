/* eslint-disable no-inner-declarations */
import { app, BrowserWindow,dialog} from 'electron'
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


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    fullscreen: true, 
    
  })






  win.webContents.print({ silent: true }, (success, errorType) => {
    if (!success) {
      console.error(`Failed to print: ${errorType}`);
      // Handle printing failure if needed
    } else {
      win!.webContents.print({ silent: true });
      console.log('Print successful');
      // Handle successful printing
    }
  });

  // console.log('wwwwwwwwwwwwwwwwwwwwwvvvvvvvvvvvvvvvvvvvw')

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
  
  // Call the function to start executing and repeating after a delay (e.g., when the window is opened)
  // win.once('ready-to-show', () => {
  //   createSplashScreen();
  //   executeAndRepeat();
  // });


  



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



  // Test active push message to Renderer-process.
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
      splashScreen.close(); // Close the splash screen if it exists
    }
  });
}



function createSplashScreen() {
  splashScreen = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    // Other window properties for the splash screen...
  });

  splashScreen.loadFile('splash.html');

  splashScreen.once('ready-to-show', () => {
    splashScreen?.show();
    createWindow();
  });

  splashScreen.on('closed', () => {
    splashScreen = null;
  });
}

app.on('ready', createSplashScreen);
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    console.log('Close...');
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)

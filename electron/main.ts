/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-inner-declarations */
import { app, BrowserWindow,dialog,ipcMain} from 'electron'
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



  win.webContents.on('before-input-event', (event, input) => {
    if (input.type === 'keyDown' && input.control && input.key.toLowerCase() === 'p') {
        console.log('Print preview is opened');
        // Here you can perform actions or set flags indicating that print preview is open
    }
  });

//   win.webContents.on('console-message', (_, level, message, lineNumber, sourceId) => {
//     console.log('Print preview is opened', message, '', level);
//     if (level === 1 && message === '999') {
//         console.log('Print preview is opened');
//         if (win && win.webContents) {
//             console.log('Printing...');
//             win.webContents.print({ silent: false, printBackground: true }, (success, errorType) => {
//                 if (!success) {
//                     console.error(`Failed to print: ${errorType}`);
//                 } else {
//                     console.log('Print Success');
//                 }
//             });
//         } else {
//             console.error('Invalid BrowserWindow instance');
//         }
//         // Here you can perform actions or set flags indicating that print preview is open
//     }
// });

win.webContents.on('console-message', (_, level, message, lineNumber, sourceId) => {
  console.log('Print preview is opened', message, '', level);
  if (level === 1 && message === '999') {
      console.log('Print preview is opened');
      // Execute JavaScript to print the contents of the iframe
      win?.webContents.print({ silent: true, printBackground: true });
      console.log('Success');
  }
});


  // Listen for when print preview is closed
  win.webContents.on('destroyed', () => {
    console.log('Print preview is closed');
    // Here you can perform actions or reset flags indicating that print preview is closed
  });
}





// function createSplashScreen() {
//   splashScreen = new BrowserWindow({
//     width: 400,
//     height: 300,
//     frame: false,
//     transparent: true,
//     alwaysOnTop: true,
//     // Other window properties for the splash screen...
//   });

//   splashScreen.loadFile('splash.html');

//   splashScreen.once('ready-to-show', () => {
//     splashScreen?.show();
//     createWindow();
//   });

//   splashScreen.on('closed', () => {
//     splashScreen = null;
//   });
// }

// app.on('ready', createSplashScreen);
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

ipcMain.on('closeApp', () => {
  app.quit();
});

// ipcMain.on('silentPrint', () => {
//   const win = new BrowserWindow({ show: false }); // Create a hidden window for printing

//   win.webContents.on('did-finish-load', () => {
//     win.webContents.print({ silent: true }, (success, errorType) => {
//       if (!success) {
//         dialog.showErrorBox('Print Error', `Failed to print: ${errorType}`);
//       }
//       win.close(); // Close the window after printing (optional)
//     });
//   });
// });


app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


// ipcMain.on('printIframeContent', (event, content) => {
//   const printWindow = new BrowserWindow({ show: false });

//   printWindow.loadURL(`data:text/html,${encodeURIComponent(content)}`);

//   printWindow.webContents.on('did-finish-load', () => {
//     printWindow.webContents.print({ silent: true }, (success, failureReason) => {
//       if (!success) {
//         console.error('Failed to print:', failureReason);
//       }
//       printWindow.close();

//       // Optionally, you can send an event back to the renderer process
//       // event.sender.send('printingCompleted', success);
//     });
//   });
// });

// ipcMain.on('print-receipt', (event, receiptData) => {
//   // Trigger printing operation using receiptData
//   console.log('Received receipt data in main process:', receiptData);

//   // Use default printer directly for printing
//   Printer.getPrinters((printers: any[]) => {
//     const defaultPrinter = printers.find((printer) => printer.isDefault);

//     if (!defaultPrinter) {
//       // Handle the case where no default printer is found
//       console.error('No default printer found.');
//       return;
//     }

//     const printOptions = {
//       silent: true, // Perform a silent print without displaying the print dialog
//       deviceName: defaultPrinter.name,
//       pageSize: '200', // Adjust page size if needed
//     };

//     // Perform silent printing using the default printer
//     Printer.print(printOptions, (success, errorType) => {
//       if (!success) {
//         // Handle printing failure
//         console.error(`Failed to print: ${errorType}`);
//       }
//     });
//   });
// });
app.whenReady().then(createWindow)

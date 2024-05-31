// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'
// import { BrowserRouter } from 'react-router-dom';
// import React from 'react';
// ReactDOM.createRoot(document.getElementById('root')!).render(
//   // <React.StrictMode>
//   //   <App />
//   // </React.StrictMode>,
//   <BrowserRouter>
//   <App/>
// </BrowserRouter>
// )

// Remove Preload scripts loading
// postMessage({ payload: 'removeLoading' }, '*')

// Use contextBridge
// window.ipcRenderer.on('main-process-message', (_event, message) => {
//   console.log(message)
// })


import React from 'react';
// import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App.tsx'
import ReactDOM from 'react-dom/client'
import { UserContextProvider } from './GlobalState/GlobalContextProvider.tsx'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider> 
    <HashRouter>
      <App />
    </HashRouter>
    </UserContextProvider> 
  </React.StrictMode>
);
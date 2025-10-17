import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store, { persistor } from "./store"; // path to your Redux store
import { PersistGate } from "redux-persist/integration/react";
import { HashRouter } from "react-router-dom";
import App from "./App";

import { UserContextProvider } from './GlobalState/GlobalContextProvider.tsx'
import { setupUrls } from "./config.tsx"; // your setup function
import React from "react";

(async () => {
  await setupUrls();

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <UserContextProvider>
            <HashRouter>
              <App />
            </HashRouter>
          </UserContextProvider>

        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
})();



// // import ReactDOM from 'react-dom/client'
// // import App from './App.tsx'
// // import './index.css'
// // import { BrowserRouter } from 'react-router-dom';
// // import React from 'react';
// // ReactDOM.createRoot(document.getElementById('root')!).render(
// //   // <React.StrictMode>
// //   //   <App />
// //   // </React.StrictMode>,
// //   <BrowserRouter>
// //   <App/>
// // </BrowserRouter>
// // )

// // Remove Preload scripts loading
// // postMessage({ payload: 'removeLoading' }, '*')

// // Use contextBridge
// // window.ipcRenderer.on('main-process-message', (_event, message) => {
// //   console.log(message)
// // })


// import React from 'react';
// // import ReactDOM from 'react-dom';
// import { HashRouter } from 'react-router-dom';
// import App from './App.tsx'
// import ReactDOM from 'react-dom/client'
// import { UserContextProvider } from './GlobalState/GlobalContextProvider.tsx'
// import { setupUrls,BASE_URL } from './config.tsx';
// (async () => {
//   await setupUrls()

//    console.log("Backend URL is:", BASE_URL);
// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <UserContextProvider> 
//     <HashRouter>
//       <App />
//     </HashRouter>
//     </UserContextProvider> 
//   </React.StrictMode>
// );})();
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store,{ persistor  } from './store'
import { PersistGate } from "redux-persist/integration/react";
import { Extended } from "./extended.tsx";
import { fromUnixTime } from "date-fns";

const container = document.getElementById("extended-root")!;
ReactDOM.createRoot(container).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Extended />
    </PersistGate>
  </Provider>
);

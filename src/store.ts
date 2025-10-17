import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import globalReducer from "./globalSlice";

// Combine your reducers
const rootReducer = combineReducers({
  global: globalReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["items"], // only persist specific slices
};

// Wrap with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// ✅ Use rootReducer type for RootState
export type RootState = ReturnType<typeof rootReducer>; // important
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;


// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // LocalStorage for persistence
// import rootReducer from "./reducers"; // Ensure your reducers are properly combined

// const isDevelopment = import.meta.env.MODE === 'development'

// // Persist config
// const persistConfig = {
//   key: "root",
//   storage, // Saves to localStorage
//   whitelist: ["items"], // optional: only persist specific slices
// };

// // Wrap rootReducer with persistReducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Configure store
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // required for redux-persist
//     }),
//   devTools: isDevelopment, 
// });

// // Create persistor to persist the store
// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;

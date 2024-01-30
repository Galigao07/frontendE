import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Assuming you have a rootReducer combining all your reducers

const store = configureStore({
  reducer: rootReducer,
});

export default store;
import { combineReducers } from "redux";
import globalReducer from "../globalSlice"; 

export default combineReducers({
  global: globalReducer, 
});

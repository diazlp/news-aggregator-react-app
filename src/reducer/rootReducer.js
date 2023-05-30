import { combineReducers } from "redux";
import userReducer from "./userReducer";
import newsReducer from "./newsSearchReducer";

export default combineReducers({
  user: userReducer,
  news: newsReducer,
});
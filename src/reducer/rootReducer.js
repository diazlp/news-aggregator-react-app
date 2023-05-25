import { combineReducers } from "redux";
import newsReducer from "./newsSearch";

export default combineReducers({
  news: newsReducer
});
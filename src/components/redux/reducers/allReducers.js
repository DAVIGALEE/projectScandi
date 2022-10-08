import { combineReducers } from "redux";
import mainReducer from "./mainReducer";

const allReducers = combineReducers({
  centralState: mainReducer,
});

export default allReducers;

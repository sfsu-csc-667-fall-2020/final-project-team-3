import { combineReducers } from "redux";
import listingReducer from "./listingReducer";
import inquiryReducer from "./inquiryReducer";
import loginReducer from "./loginReducer"

export default combineReducers({
  listingReducer,
  inquiryReducer,
  loginReducer,
});

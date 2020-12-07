import { combineReducers } from "redux";
import listingReducer from "./listingReducer";
import inquiryReducer from "./inquiryReducer";

export default combineReducers({
  listingReducer,
  inquiryReducer,
});

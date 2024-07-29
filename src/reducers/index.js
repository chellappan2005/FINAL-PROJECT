import CartReducer from "./cart";
import ScreenReducer from "./screen";
import AuthReducer from "./auth";
import FilterReducer from "./filter";
import { combineReducers } from "redux";
import SabjiReducer from "./sabjis";

export default combineReducers({
	cart: CartReducer,
	screen: ScreenReducer,
	auth: AuthReducer,
	filter: FilterReducer,
	sabjis: SabjiReducer    // for storing sabjis received from backend
});

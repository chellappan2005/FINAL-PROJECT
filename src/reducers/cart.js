/**
 * @note - In case of the cart, REDUCERS MANAGE the LOCALSTORAGE
 * 			and the action creators are for other tasks like shaping data, or calling services
 * 
 * @note2 -> Please use action creator when available, directly dispatching an action is NOT RECOMMENDED
 */

import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY } from "../constants/ActionTypes";

var data = JSON.parse(localStorage.getItem("cart"));
const initialState = data ? data : [];

// the state in our case is just an ARRAY
function cartReducer(state = initialState, action) {
	/**
	 * @question -> Does each reducer receives the COMPLETE REDUX STATE ?
	 * 				Or only the slice which is related to this reducer
	 * 
	 * @answer -> Only the slice, for eg. here we will get `store.getState().cart`
	 */

	const {type, payload} = action;

	let newState = [...state];

	switch (type) {
	case CLEAR_CART:
		localStorage.removeItem("cart");
		return [];

	case ADD_TO_CART:
		payload.qntty = Math.max( payload.qntty, 1 );	// if already something. then leave it be
		newState.push( {...payload} );
		break;

	case REMOVE_FROM_CART:
		newState.splice( payload, 1 );	// remove 1 element at payload position
		break;

	case INCREASE_QUANTITY:
		newState[ payload ].qntty += 1;
		break;

	case DECREASE_QUANTITY:
		newState[payload].qntty = Math.max( 0, newState[ payload ].qntty - 1 );
		break;

	default:
		return state;
	}

	localStorage.setItem("cart", JSON.stringify(newState));
	return newState;
}

export default cartReducer;

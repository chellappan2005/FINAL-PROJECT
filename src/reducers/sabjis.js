import { SAVE_SABJIS } from "../constants/ActionTypes";

const initialState = []; // simply just a list

// ie. a ProductReducer
export default function SabjiReducer (state = initialState, action ) {
	switch (action.type) {
	case SAVE_SABJIS:
		return [
			...action.payload   // expecting an array
		];
	default:
		return state;
	}
}

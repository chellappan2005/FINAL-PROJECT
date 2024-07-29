import { SET_SEARCH } from "../constants/ActionTypes";

const initialState = {
	search: "",
	// price: { // not being used currently
	//     min: 0,
	//     max: Infinity
	// }
};

export default function filterReducer(state = initialState, action) {
	switch (action.type) {
	case SET_SEARCH:
		console.debug("Updating query to ", action.payload, {...state, search: action.payload});
		return {
			...state,
			search: action.payload
		};

	default:
		return state;
	}
}

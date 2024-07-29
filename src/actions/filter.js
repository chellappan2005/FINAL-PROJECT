import { SET_SEARCH } from "../constants/ActionTypes";

export function UpdateSearchAction(query) {
	return (dispatch) => {
		dispatch({
			type: SET_SEARCH,
			payload: query
		});
	};
}

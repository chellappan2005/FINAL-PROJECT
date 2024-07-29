import { REFRESH_SCREEN } from "../constants/ActionTypes";

export const RefreshIsMobile = () => {
	console.debug("Refreshing the screen");

	return (dispatch) => dispatch({type: REFRESH_SCREEN});
};

import { REFRESH_SCREEN } from "../constants/ActionTypes";

const initialState = {
	isMobile: window ? (window.innerWidth <= 768) : false    // by default desktop
};

export default function Screen(state = initialState, action) {
	switch (action.type) {
	case REFRESH_SCREEN:    // refresh if screen is of mobile or not
		return {
			isMobile: window ? (window.innerWidth <= 768) : false
		};

	default:
		return state;
	}
}

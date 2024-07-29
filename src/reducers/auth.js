import { CLEAR_USER, STORE_AUTH } from "../constants/ActionTypes";

const token = localStorage.getItem("token") || sessionStorage.getItem("token");    // if token not avaialable, then getItem returns `null`, and JSON.parse(null) returns null
const user = JSON.parse( localStorage.getItem("user") ) || JSON.parse( sessionStorage.getItem("user") );

const initialState = {
	user,
	token,
	isLoggedIn: user ? true: false
};

export default function AuthReducer( state = initialState, action){
	switch (action.type) {
	case STORE_AUTH: {
		const {user, token} = action.payload;
		localStorage.setItem("user", JSON.stringify({
			uname: user.uname,
			pass: user.pass,
			contact: user.contact
		}));

		return {
			user,
			token,
			isLoggedIn: true
		};
	}

	case CLEAR_USER:
		localStorage.removeItem("token");
		localStorage.removeItem("user");

		return { isLoggedIn: false };

	default:
		return state;
	}
}

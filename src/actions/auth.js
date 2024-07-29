import { LoginCustomer, SignupCustomer } from "../services/user_service";
import { CLEAR_USER, STORE_AUTH } from "../constants/ActionTypes";

/**
 * @note -> Saving to storages is the task of these action creators themselves, not the reducers, reducers only for modifying state, and services only for contacting the api
 */

function clearStorage() {
	localStorage.removeItem("user");
	sessionStorage.removeItem("user");
	localStorage.removeItem("token");
	sessionStorage.removeItem("token");    
}

function choseStorage(rememberMe) {
	return rememberMe ? localStorage : sessionStorage;    
}

// will work same for both admins and customers
export const UniversalLogOutCreator = () => {
	clearStorage();

	return (dispatch) => dispatch({type: CLEAR_USER});
};

export function CustLoginCreator( uname, pass, rememberMe ) {
	const storage = choseStorage(rememberMe);
	clearStorage();

	return (dispatch) => {
		return LoginCustomer(uname, pass)
			.then(data => {
				console.debug("Success login service", data);
				storage.setItem("user", JSON.stringify({
					uname: data.user.uname,
					contact: data.user.contact
				}));
				storage.setItem("token", data.token);    // should be a string by itself

				dispatch({
					type: STORE_AUTH,
					payload: data   // token NOT required to be in store
				});

				return Promise.resolve();
			})
			.catch(err => { 
				console.debug("Error login service", err);

				throw err;
			});
	};
}

export function CustSignupCreator( uname, pass, contact, rememberMe ) {
	const storage = choseStorage(rememberMe);
	clearStorage();

	return (dispatch) => {
		return SignupCustomer(uname, pass, contact)
			.then((data) => {
				console.debug("Success signup service", data);
				storage.setItem("user", JSON.stringify({
					uname: data.user.uname,
					contact: data.user.contact
				}));
				storage.setItem("token", data.token);    // should be a string by itself

				dispatch({
					type: STORE_AUTH,
					payload: data   // token NOT required to be in store
				});

				return Promise.resolve();
			})
			.catch(err => {
				console.debug("Error signup service", err);

				throw err;
			});
	};
}

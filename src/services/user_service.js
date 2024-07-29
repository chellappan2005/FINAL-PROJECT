import { CUST_LOGIN_URL, CUST_SIGNUP_URL } from "../constants/BaseURL";
import { isEmail, isPhone } from "../util/validators";

// think -> If the idea seems better, we can have this function return a Promise containing a BOOLEAN
export function LoginCustomer(uname, pass) {
	return fetch(
		CUST_LOGIN_URL,
		{
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				uname,
				pass
			})
		}
	).then(async response => {
		if( response.ok ){
			return response.json();
		} else if(response.status === 500) {
			throw {err: response.statusText};
		} else {
			throw await response.json();
		}
	});
}

export function SignupCustomer(uname, pass, contact) {
	const regObj = {
		pass
	};

	if( !contact ) {    // either contact empty or undefined
		if( isEmail(uname) || isPhone(uname) ){
			regObj.contact = uname;
		}
	} else{
		regObj.contact = contact;
	}

	if( uname !== regObj.contact ){ // iff uname is different, only then will uname be set
		regObj.uname = uname;
	}   // else if both contact and username were same, server will consider uname and contact are same

	console.debug("Calling fetch for signup, with: ", regObj);
	return fetch(
		CUST_SIGNUP_URL,
		{
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify( regObj )
		}
	).then(async response => {
		if( response.ok ){
			return response.json();
		} else if(response.status === 500) {
			throw {err: response.statusText};
		} else {
			throw await response.json();
		}
	});
}

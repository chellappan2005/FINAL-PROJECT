export default function authHeader() {
	const token = localStorage.getItem("token") || sessionStorage.getItem("token");

	// apart from token user must also be there, for surity that everything is right
	if( (!token) && (localStorage.getItem("user") || sessionStorage("user")) ){
		alert("Please Sign In Again");
		return {};
	}

	return {
		Authorization: "Bearer: " + token
		// 'x-access-token': token          // for express.js backends
	};
}

import { FETCH_ALL_PRICES_URL } from "../constants/BaseURL";

// returns a promise containing a list of objects
export function FetchPrices() {
	return fetch(
		FETCH_ALL_PRICES_URL,
		{
			headers: {
				"Accept": "application/json"
			}
		}
	).then( response => {
		if( response.ok ){
			return response.json();
		} else {
			return {data: []};  // ignoring any SERVER SIDE errors, and just considering data as empty array then
		}
	})
		.then( data => data.data );
}

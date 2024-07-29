import { FETCH_OFFERS_URL } from "../constants/BaseURL";

// returns a promise containing a list of objects
export function FetchOffers() {
	return fetch(
		FETCH_OFFERS_URL,
		{
			headers: {
				"Accept": "application/json"
			}
		}
	).then(response => response.json())
		.then(data => data.data);
}

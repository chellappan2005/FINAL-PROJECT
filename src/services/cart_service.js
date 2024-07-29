import { CART_TOTAL_URL, SUBMIT_CART_URL } from "../constants/BaseURL";

// cart is an array of ids
export function SubmitCart(cart) {
	return fetch(
		SUBMIT_CART_URL,
		{
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"sabji_ids": cart.map( sabji => sabji.id )
			})
		}
	).then(response => response.json());
	// .then(({list,total}) => ({list, total}))
}

// cart is an array of objects
export function GetCartTotal(cart) {
	return fetch(
		CART_TOTAL_URL,
		{
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"sabji_ids": cart.map( sabji => sabji.id )
			})
		}
	).then(response => response.json())
		.then(({total}) => total);
}

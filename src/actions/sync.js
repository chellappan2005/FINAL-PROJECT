import { SAVE_SABJIS } from "../constants/ActionTypes";

export function SyncAction() {
	console.log("Syncing sabjis");
	return (dispatch, getState) => {
		const { cart, sabjis } = getState();

		let has_anything_changed = false;
		for (let i = 0; i < sabjis.length; i++) {
			cart.forEach(cart_sabji => {
				if( sabjis[i].id === cart_sabji.id ) {
					has_anything_changed = true;
					sabjis[i].qntty = cart_sabji.qntty;
				}
			});
		}

		if(has_anything_changed){
			dispatch({
				type: SAVE_SABJIS,
				payload: [...sabjis]	// return a copy of the array
			});
		}
	};
}

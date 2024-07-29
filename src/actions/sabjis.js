import { FetchPrices } from "../services/sabji_service";
import { SAVE_SABJIS } from "../constants/ActionTypes";

export function FetchSabjiAction() {
	return (dispatch) => {
		return FetchPrices()
			.then(array => {
				console.debug("Received sabjis: ", array);
				dispatch({
					type: SAVE_SABJIS,
					payload: array.map((sabji) => ({
						id: sabji._id,
						name: sabji.name,
						price: sabji.price,
						unit: sabji.unit,
						qntty: 0
					}))
				});

				return Promise.resolve( array );
			})
			.catch(err => {
				console.error(err);

				return Promise.resolve([]);
			});
	};
}

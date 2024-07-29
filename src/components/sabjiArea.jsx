import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SabjiBox from "./sabjibox";
import LoadingBoxArea from "./loadingBoxArea";
import {
	Container,
	Grid,
	makeStyles
} from "@material-ui/core";
import { FetchSabjiAction } from "../actions/sabjis";
import { SyncAction } from "../actions/sync";

const useStyles = makeStyles({
	container: {
		paddingTop: 30,
		paddingBottom: 30
	}
});

export default function SabjiArea() {

	const numLoadingBoxes = 2;   // number of boxes that will be shown as loading, till data isn't finally received from the server
	const [loading, setLoading] = useState(true);

	// const [priceFilter, setPriceFilter] = useState([0,Infinity]);
	// const [sortingOrder, setSortingOrder] = useState(null)
	const isMobile = useSelector(state => state.screen.isMobile);
	const nameFilter = useSelector(state => state.filter.search);
	let nameRegex = RegExp(nameFilter, "i");	// case insensitive

	const classes = useStyles();
	const dispatch = useDispatch();

	const list = useSelector(state => state.sabjis);

	useEffect(() => {
		nameRegex = RegExp(nameFilter, "i");
	}, [nameFilter]);

	useEffect(() => {
		// set the boxes as loading
		if(loading){
			dispatch(FetchSabjiAction())
				.finally(() => {
					dispatch( SyncAction() );	// this maybe an async action though
					setLoading(false);
				});
		}
	}, [loading]);

	return (
		<>
			{loading ?
				<LoadingBoxArea num={numLoadingBoxes} />
				: (<Container>
					<Grid container spacing={ isMobile ? 2 : 4} className={classes.container} justify="center">
						{
							list.filter(
								(sabji) => nameRegex.test(sabji.name)
							).map(
								(sabji, index) => (
									<Grid item xs={6} sm={4} md={3} style={{textAlign: "center"}} key={index}>
										<SabjiBox index={index} data={sabji} key={sabji.id} />
									</Grid>
								)
							)
						}
					</Grid>
				</Container>)
			}
		</>
	);
}

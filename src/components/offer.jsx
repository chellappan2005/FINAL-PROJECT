import React from "react";
import {
	Card,
	CardActionArea,
	makeStyles
} from "@material-ui/core";

const useStyles = makeStyles({
	slide_card: {
		height: "100%",
		textAlign: "center"
	}
});

export default function OfferCard(props) {
	const classes = useStyles();

	return (
		<Card className={classes.slide_card}>
			<CardActionArea style={{height: "100%"}}>
				<h2>{props.title}</h2>
				{props.brief_desc && <p>{props.brief_desc}</p>}
				{props.order_msg && <p>{props.order_msg}</p>}
				{props.add_notes && <p>{props.add_notes}</p>}
			</CardActionArea>
		</Card>
	);
}
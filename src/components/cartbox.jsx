import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
	Card,
	Fab,
	CardContent,
	CardMedia,
	IconButton,
	Typography
} from "@material-ui/core";
import {
	Remove,
	Delete,
} from "@material-ui/icons";
import { DecrementQuantity, RemoveFromCartAction } from "../actions/cart";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		marginTop: 30,
		marginBottom: 30
	},
	details: {
		textAlign: "start",
		display: "flex",
		width: "100%"	// since it's flexbox, now the action buttons will be stacked on left
	},
	content: {
		flex: "1 0 auto"
	},
	cover: {
		width: 151
	},
	controls: {
		display: "flex",
		alignItems: "center",
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1)
	},
	playIcon: {
	},
	qnttyBtn: {
		textTransform: "none"	// to revert uppercase transform applied by Fab
	}
}));

function MediaControlCard(props) {
	const { name, price, unit } = props.org_data;
	const [qntty, setQntty] = useState(props.org_data.qntty);

	const classes = useStyles();

	function decreaseQntty() {
		props.decrement_qntty();

		setQntty( Math.max(0, qntty - 1) );
	}

	function removeFromCart() {
		props.remove_from_cart();

		setQntty(0);
	}

	return (
		<Card className={classes.root}>
			<CardMedia 
				component="img"
				className={classes.cover}
				alt={"sabji"}	// @todo - Replace with sabji name later
				height="100"
				image="/sabjis/temp.jpg"
			/>
			<div className={classes.details}>
				<CardContent className={classes.content}>
					<Typography component="h5" variant="h5">
						{name}
					</Typography>
					<Typography >
						{`₹${price} / ${unit}`}
					</Typography>
				</CardContent>
				<div className={classes.controls}>
					{qntty >= 1 && (
						<Fab
							size="small"
							className={classes.qnttyBtn}
						>
							x{qntty}
						</Fab>
					)}

					<IconButton
						color="secondary"
						onClick={decreaseQntty}
						aria-label="minus"
						title="Minus 1"
					>
						<Remove />
					</IconButton>
					<IconButton
						color="secondary"
						onClick={removeFromCart}
						aria-label="delete"
						title="Remove from cart"
					>
						<Delete className={classes.playIcon} />
					</IconButton>
				</div>
			</div>
		</Card>
	);
}

function mapDispatchToProps(dispatch, orgProps) {
	return {
		remove_from_cart: () => dispatch( RemoveFromCartAction(orgProps.org_data.id) ),
		decrement_qntty: () => dispatch( DecrementQuantity(orgProps.org_data.id) ),
	};
}

export default connect(null, mapDispatchToProps)(MediaControlCard);

import React, { useState } from "react";
import { connect } from "react-redux";
import { 
	Card, 
	CardActionArea, 
	CardActions, 
	CardContent, 
	CardMedia, 
	Divider,
	Typography, 
	Button, 
	ButtonGroup, 
	IconButton,
	Fab,
	Paper,
	makeStyles
} from "@material-ui/core";
import {
	Add,
	Remove,
	// AddShoppingCart	// Good but can be confusing
} from "@material-ui/icons";
import { AddToCartAction, DecrementQuantity, IncrementQuantity } from "../actions/cart";

const useStyles = makeStyles(theme => ({
	root: {

	},
	priceBtn: {
		backgroundColor: theme.shape.borderRadius
	},
	qnttyBtn: {
		position: "relative",
		marginLeft: theme.spacing(1)
	},
	btnArea: {
		width: "100%"
	}
}));

/**
         * @notes @advices about state ->
         * 
         * 1. only place where you should directly assign to state is the constructor
         * 
         * 2. Treat state like if it's immutable
         * 
         * 3. If the new state depends upon the previous state, PASS A FUNCTION TO setState() instead of directly accessing state, since multiple setState() calls maybe batched asychronously, in which case we may be accessing a newer state value, to prevent this, use the funciton, seince it receives the prevuious state
         * 
         * 4. State updates are merged (ie. the objects passed to setState() are merged will previous state)
         * 
         */
function SabjiBox(props) {
	// const index = props.index;	// not using this for now @future @me -> This may give better performace since with each increment or decrement call, we wo't need o findIndexById()
	const { name, price, unit } = props.data;
	const [qntty, setQntty] = useState(props.data.qntty);

	const classes = useStyles();

	function decreaseQntty() {
		props.decrement_qntty();

		setQntty( Math.max(0, qntty - 1) );
	}

	function increaseQntty() {
		props.increment_qntty();

		setQntty( qntty + 1 );
	}

	function addToCart() {
		props.add_to_cart();

		setQntty(qntty !== 0 ? qntty : 1);
	}

	return (
		<>
			<Card className={classes.root} >
				<CardActionArea >
					<CardMedia 
						component="img"
						alt={`${name}`}
						height="100"
						image="/sabjis/temp.jpg"
						title={name}
					/>
					<Paper className={classes.priceBtn}
						style={{color: "black", backgroundColor: "rgba(255, 255, 255, 0.8)", fontSize: "1.2em",position: "absolute", left: "2%", top: "3%"}}
						elevation={1}
					>
						<div>{`₹ ${price}`}</div>
						<Divider 
							// variant=""
						/>
						<div style={{fontSize: "smaller"}}>{unit}</div>
					</Paper>
					{/* <Fab 
						style={{position: "absolute", right: "2%", top: "3%"}}
						disabled
					>
						{`₹${price}/`}
						<Divider />
						{unit}
					</Fab> */}

					<CardContent>
						<Typography variant="h6" component="h2">    {/**why though ? */}
							{name}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions className={classes.btnArea}>
					<ButtonGroup>
						<IconButton
							color="secondary"
							onClick={decreaseQntty}
						>
							<Remove />
						</IconButton>
						{/* (<Button
								onClick={addToCart}
							>
                            Add
							</Button>)
						} */}
						<IconButton 
							onClick={increaseQntty}
							color="secondary">
							<Add />
						</IconButton>
					</ButtonGroup>
					{qntty >= 1 && (
						<Fab
							size="small"
							className={classes.qnttyBtn}
						>
							{qntty}
						</Fab>
					)}
				</CardActions>
			</Card>
		</>
	);
}

function mapDispatchToProps(dispatch, orgProps) {
	return {
		add_to_cart: () => dispatch( AddToCartAction(orgProps.data.id) ),
		decrement_qntty: () => dispatch( DecrementQuantity(orgProps.data.id) ),
		increment_qntty: () => dispatch( IncrementQuantity(orgProps.data.id) ),
	};
}

export default connect(null, mapDispatchToProps)(SabjiBox);

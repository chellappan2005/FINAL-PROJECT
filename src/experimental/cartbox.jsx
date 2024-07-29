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
import { PlusOne } from "@material-ui/icons";
import { AddToCartAction, DecrementQuantity, IncrementQuantity } from "../actions/cart";

const useStyles = makeStyles(theme => ({
	root: {

	},
	priceBtn: {
		backgroundColor: theme.shape.borderRadius
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
function CartBox(props) {
	// const index = props.index;	// not using this for now @future @me -> This may give better performace since with each increment or decrement call, we wo't need o findIndexById()
	const { name, price, unit } = props.org_data;
	const [qntty, setQntty] = useState(props.org_data.qntty);

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
			<Card className={classes.root}>
				<CardActionArea >
					<CardMedia 
						component="img"
						alt={`${name}`}
						height="100"
						image="/sabjis/temp.jpg"
						title={name}
					/>
					<Paper className={classes.priceBtn}
						style={{color: "rgba(0, 0, 0, 0.60)", fontSize: "1.2em",position: "absolute", left: "2%", top: "3%", backgroundColor: "rgba(0, 0, 0, 0.12)"}}
						// disabled
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
				<CardActions>
					<ButtonGroup>
						<Button
							color="secondary"
							onClick={decreaseQntty}
							variant="text"
						>
							<strong>-1</strong>
						</Button>
						{qntty >= 1 ? (
							<Button 
								variant="text"
								disabled
							>
								{qntty}
							</Button>): 
							(<Button
								onClick={addToCart}
							>
                            Add
							</Button>)
						}
						<IconButton 
							onClick={increaseQntty}
							color="secondary">
							<PlusOne />
						</IconButton>
					</ButtonGroup>
				</CardActions>
			</Card>
		</>
	);
}

function mapDispatchToProps(dispatch, orgProps) {
	return {
		add_to_cart: () => dispatch( AddToCartAction(orgProps.org_data.id) ),
		decrement_qntty: () => dispatch( DecrementQuantity(orgProps.org_data.id) ),
		increment_qntty: () => dispatch( IncrementQuantity(orgProps.org_data.id) ),
	};
}

export default connect(null, mapDispatchToProps)(CartBox);

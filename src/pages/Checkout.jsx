import React, { useState, useEffect } from "react";
import CartBox from "../components/cartbox";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Container, Button, makeStyles } from "@material-ui/core";
import { ClearCartAction } from "../actions/cart";

const useStyles = makeStyles({
	cartArea: {
		textAlign: "center"
	},
	orderBtn: {
		marginBottom: "5vh"
	}
});

export default function CartPage() {
	const cart = useSelector(state => state.cart) || [];

	const cartTotal = cart.reduce((acc, curr) => acc + (curr.price * curr.qntty), 0);
	const classes = useStyles();
	const dispatch = useDispatch();

	const [open, toggleOpen] = useState(false);

	function handleClose() {
		toggleOpen( !open );
	}

	function handleClear(e) {
		dispatch(ClearCartAction());

		handleClose(e);
	}

	const UserToken = useSelector(state => state.auth.token);

	useEffect(() => {
		console.log("CartTotal refreshed, ", cartTotal);
	}, [cartTotal]);

	function SubmitCart(e) {
		e.preventDefault();

		const msg = `
	ORDER DETAILS
	-----------------
	UserId - ${UserToken}

${cart.map((sabji => (`${sabji.name}\t${sabji.price}/${sabji.unit}\tx${sabji.qntty}`))).join("\n")}
	
	`;

		if ( ! window.open( encodeURI("https://wa.me/918700905832?text=" + msg ), "_blank") ){
			alert(`
			Couldn't Open whatsapp, click on this link, it will directly lead to whatsapp website :D
			${encodeURI("https://wa.me/918700905832?text=" + msg )}`);
		}

		// @future @someone - Can add verification by first sending the order details to backend, then it responds with a order id, and we only send the order id and list of sabjis to whatsapp

		toggleOpen(true);
	}

	return (
		<>
			<Container className={classes.cartArea}>
				<div>
					{
						cart.map(
							(sabji, index) => <CartBox org_data={sabji} key={index} />
							// (sabji, index) => (<CartBox org_data={ findSabjiById( cart, sabji.id) } key={sabji.id} />)
						)
					}
				</div>
				{ (cart.length !== 0) && (<Button
					color="secondary"
					variant="contained"
					onClick={SubmitCart}
					className={classes.orderBtn}
				>
					Order on whatsapp🍅🎍
				</Button>)}
				<div></div>
				<Dialog
					open={open}
					onClose={handleClose}
				>
					<DialogTitle id="alert-dialog-title">{"Do you want to clear the cart now ? 🤔"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							After sending the order on whatsapp (order is also stored on server),
							You can simply clear the cart now :D
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClear} color="primary" autoFocus>
							OK
						</Button>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
			</Container>
		</>
	);
}


function findSabjiById( sabjis, id ) {
	if( Array.isArray(sabjis) ) {
		return sabjis.find((sabji) => sabji.id === id);
	}
}

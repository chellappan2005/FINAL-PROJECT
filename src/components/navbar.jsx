import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
	AppBar, 
	InputAdornment, 
	Container, 
	ButtonGroup,
	Grow,
	makeStyles, 
	TextField, 
	Toolbar, 
	Typography, 
	Button,
	IconButton,
	Link
} from "@material-ui/core";
import { AccountTree, ShoppingCartRounded, Search, AccountCircleRounded } from "@material-ui/icons";
import "fontsource-righteous/400.css";
import { UpdateSearchAction } from "../actions/filter";
import { UniversalLogOutCreator } from "../actions/auth";

const styling = makeStyles( theme => ({
	appbar: {
		backgroundColor: theme.palette.common.white
	},
	toolbar: {
		backgroundColor: theme.palette.common.white
	},
	mobile_toolbar: {
		backgroundColor: theme.palette.common.white,
		paddingLeft: 2,
		paddingRight: 2,
		marginLeft: 2,
		marginRight: 2
	},
	SearchBar: {
		width: "30vw"
	},
	MobileSearchBar: {
		width: "100%"
	},
	logoLink: {
		textDecoration: "none"
	}
}));

function NavBar(props) {
	const history = useHistory();
	// todo -> Instead of setCartTotal, fetch it from store, and change there itself

	const [cartTotal, setCartTotal] = useState( props.cart.length !== 0 ? props.cart.reduce((acc, curr) => acc +( curr.price * curr.qntty ), 0) : 0 );
	const classes = styling();

	const [openMobileBar, toggleMobileBar] = useState(false);
	// const [searchOnFocus, toggleSearchOnFocus] = useState(false);	// will use when experimental serach bar used IN FUTURE (LIKELY NOT though :( )

	useEffect(() => {
		setCartTotal( props.cart.length !== 0 ? props.cart.reduce((acc, curr) => acc +( curr.price * curr.qntty ), 0) : 0);
	}, [props.cart]);
 
	function handleToggleBar() {
		toggleMobileBar(prev => !prev);
	}

	const handleAccClick = () => {
		if( ! props.isLoggedIn ){
			history.push("/login");
			// window.location.reload();
		} else {
			console.log("You are already logged in");
		}
	};

	const handleCartClick = () => {
		if( ! props.isLoggedIn ){
			history.push("/login");
			return;
			// window.location.reload();
		}

		history.push("/checkout");
		// alert("Please first Login... And your cart will still be stored, you don't have to think of that");
	};

	function searchSubmit(e) {
		e.preventDefault();

		history.push("/search");
	}

	return (
		<header>
			<AppBar position="static" className={classes.appbar}>
				<Toolbar className={ props.isMobile ? classes.mobile_toolbar : classes.toolbar}>
					<Container>
						{/* <img src="/logo.png" alt="EasyLife" height="75%"/> */}
						<Typography variant="h4" style={{fontFamily: "Righteous"}}>
							<Link href="/" className={classes.logoLink}>
								<span style={{color: "orange"}}>Market </span>
								<span style={{color: "green"}}>Hub</span>
							</Link>
						</Typography>
					</Container>
					{
						props.isMobile ? 
							(
								<IconButton onClick={handleToggleBar}>
									<Search />
								</IconButton>
							):
							(
								<form
									onSubmit={searchSubmit}
								>
									<TextField 
										// style={styling.search}
										label="Search..."
										variant="outlined" 
										size="small" 
										type="text"
										value={props.search}
										onChange={props.updateSearch}
										className={ classes.SearchBar }
										InputProps={
											{
												startAdornment: (
													<InputAdornment position="start">
														<Search />
													</InputAdornment>
												)
											}
										}
									/>
								</form>
							)}
					<ButtonGroup style={{marginLeft: props.isMobile ? 0 :20}}>
						<Button variant="outlined" onClick={handleCartClick}>
							{
								props.isMobile && (
									<ShoppingCartRounded style={{marginRight: 6}} />)
							}
						₹{cartTotal}
						</Button>
						{props.isLoggedIn ? 
							(
								props.isMobile ? 
									(
										<Button>
											<AccountCircleRounded />
										</Button>
									):
									(<Button
										onClick={props.logoutUser}
										startIcon={<AccountCircleRounded/>}
									>
										{/* Profile */}
										Logout
									</Button>)
							) :
							(
								props.isMobile ? 
									(
										<Button
										// @future - this can be a DROPDOWN too
											onClick={handleAccClick}
										>
											<AccountTree />
										</Button>
									):
									(<Button
										onClick={handleAccClick}
										startIcon={<AccountTree/>}
									>
										{ !props.isMobile &&"Login"}
									</Button>)
							)
						}
					</ButtonGroup>
				</Toolbar>
				{openMobileBar && (<Grow
					in={openMobileBar}
					style={{ transformOrigin: "0 0 0" }}
					{...(openMobileBar ? { timeout: 1000 } : {})}
				>
					<Toolbar className={ props.isMobile ? classes.mobile_toolbar : classes.toolbar}>
						<form
							onSubmit={searchSubmit}
							style={{width: "100%"}}
						>
							<TextField 
								// style={styling.search}
								label="Search..."
								variant="outlined" 
								size="small" 
								type="text"
								value={props.search}
								onChange={props.updateSearch}
								className={ classes.MobileSearchBar }
								fullWidth
							/>
						</form>
					</Toolbar>
				</Grow>)
				}
			</AppBar>
		</header>
	);
}

function mapStateToProps(state) {
	const { screen, cart, auth, filter } = state;

	return {
		isMobile: screen.isMobile,
		cart: cart,
		user: auth.user,
		isLoggedIn: auth.isLoggedIn,
		search: filter.search
	};
}

function mapDispatchToProps(dispatch) {
	return {
		logoutUser: () => {
			dispatch( UniversalLogOutCreator() );

			alert("You have been successfully Logged Out");
		},
		updateSearch: (e) => {
			// @note - Come here;be sure to sanitize the string here
			// After this do minor change to cart boxes, and verify all works well
			dispatch(UpdateSearchAction( 
				e.target.value.slice(
					0,
					e.target.value.length - ( e.target.value.endsWith("/") ? 1: 0 )
				)
			));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import FooBar from "./components/footer";
import "fontsource-roboto";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Checkout from "./pages/Checkout";
import { RefreshIsMobile } from "./actions/screen";

export default function App() {
	// ONLY here will RefreshIsMobile be called
	const isMobile = useSelector(store => store.screen.isMobile);

	useEffect(() => {
		document.addEventListener("resize", RefreshIsMobile, false);
		console.log( "Detected Mobile: ", isMobile );

		// return () => document.removeEventListener("resize", setIsMobile);    // this returned function runs when unmounted
		// not being triggered more than once
	}, [isMobile]);

	useEffect(() => {
		// eslint-disable-next-line no-undef
		process.env.NODE_ENV === "production" && console.clear();
	}, []);

	return (
		<BrowserRouter>
			<NavBar isMobile={isMobile} />
			<Route exact path="/" component={()=> <Home />}/>
			<Route exact path="/search" component={()=> <Home />}/>
			<Route exact path="/login" component={() => <Login />} />
			<Route exact path="/signup" component={() => <SignUp />} />
			<Route exact path="/checkout" component={() => <Checkout />} />
			{/* <SabjiArea isMobile={isMobile} /> */}
			<FooBar />
		</BrowserRouter>
	);
}

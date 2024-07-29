import React from "react";
import ReactDOM from "react-dom";
// import App from "./page/App";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
// import Experimental from "./experimental/Experimental";
import "./styles/global.css";

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,

	document.getElementById("root")
);

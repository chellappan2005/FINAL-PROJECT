import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	Button,
	Checkbox,
	Container,
	Divider,
	Typography,
	TextField,
	makeStyles,
	Paper
} from "@material-ui/core";
import { CustLoginCreator } from "../actions/auth";

const useStyles = makeStyles({
	boxContainer: {
		padding: "2%"
	},
	LoginBox: {
		textAlign: "center",
		padding: "2%",
		backgroundColor: "rgb(240, 239, 239)"
	}
});

export default function SignUpPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, toggleRememberMe] = useState(true);

	const [loading, toggleLoading] = useState(false);

	const classes = useStyles();

	const isMobile = useSelector((state) => state.screen.isMobile);
	const dispatch = useDispatch();
	const history = useHistory();

	function submitHandler(event) {
		event.preventDefault();

		toggleLoading(true);
		dispatch(CustLoginCreator( username, password, rememberMe ))
			.then(() => {
				console.debug("Successful");

				history.push("/"); // @future -> When profile page is okay, redirect to '/me' route instead
				// window.location.reload();
			})
			.catch((err) => {
				console.error(err);
				alert( err.msg || err.err || "Couldn't Login... '-'");
			})
			.finally(() => {
				toggleLoading(false);
			});
	}

	return (
		<>
			<Container className={classes.boxContainer}>
				<Paper className={classes.LoginBox}>
					<Typography style={{marginBottom: "2%"}} variant="h4">
                        Login
					</Typography>
					<Divider 
						variant="middle"
					/>
					<form
						style={{
							marginLeft: isMobile ? "10%": "35%",
							marginRight: isMobile ? "10%": "35%",
						}}
						onSubmit={submitHandler}
					>
						<TextField
							autoFocus={true}
							color="secondary"
							type="email"
							label="Email/Mobile"
							placeholder="Username"
							helperText="You can also enter username..."
							margin="normal"
							fullWidth
							required
							onChange={(e) => setUsername(e.target.value)}
						/>
						<br />
						<TextField 
							color="secondary"
							label="Password"
							placeholder="Enter your password..."
							helperText="Shh... Password"
							margin="normal"
							type="password"
							fullWidth
							required
							onChange={(e) => setPassword(e.target.value)}
							// onChange={() => setPassword(passwordField.current.value)}                        
						/>
						<br />
						<Checkbox 
							color="secondary"
							defaultChecked={true}
							helperText="Remember Me"
							checked={rememberMe}
							onChange={(e) => toggleRememberMe(e.target.checked)}
						/>
						<span style={{color: "#404040", fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif"}}>Remember Me</span>
						<br />
						<Button
							variant="contained"
							type="submit"
							disabled={loading}
						>
                            Login
						</Button>
					</form>
					<Typography
						style={{fontSize: "1em", margin: "1%"}}
					>
                    New User ? <Link to="/signup">Sign up Here</Link>
					</Typography>
				</Paper>
			</Container>
		</>
	);
}

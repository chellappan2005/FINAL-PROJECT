import React, { useRef, useState, useEffect } from "react";
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
	Paper,
	InputAdornment
} from "@material-ui/core";
import { CustSignupCreator } from "../actions/auth";
import {} from "../actions/auth";

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
	// const usernameField = useRef(null);
	// const passwordField = useRef(null);
	const cnfrmpasswordField = useRef(null);
	const mobileField = useRef(null);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [cnfrmpassword, setCnfrmpassword] = useState("");
	const [mobile, setMobile] = useState(null);
	const [rememberMe, toggleRememberMe] = useState(true);

	const [loading, setLoading] = useState(false);

	let errorFlag = false;  // this flag ONLY set in validation

	useEffect(() => {
		errorFlag = false;  // after each render, reset this flag
	});

	const history = useHistory();
	const dispatch = useDispatch();
	const isMobile = useSelector((state) => state.screen.isMobile);

	const [errorCnfrmPass, setErrorCnfrmPass] = useState(false);
	const [helperMsgPass, setPassHelperMsg] = useState("");

	const [errorMobile, setErrorCnfrmMobile] = useState(false);
	const [helperMsgMobile, setMobileHelperMsg] = useState("Optional...");

	const classes = useStyles();

	function submitHandler(event) {
		event.preventDefault();

		if( password !== cnfrmpassword ) {
			setErrorCnfrmPass(true);
			setPassHelperMsg("Passwords not matching");

			errorFlag = true;
		} else {
			setErrorCnfrmPass(false);
			setPassHelperMsg("");
		}

		if( mobile && mobile.toString().length !== 10 ) {
			setErrorCnfrmMobile(true);
			setMobileHelperMsg("Not 10 digit valid number");

			errorFlag = true;
		} else {
			setErrorCnfrmMobile(false);
			setMobileHelperMsg("Optional...");
		}

		if( errorFlag ){
			console.error("Input data isn't valid");
			return setLoading(false);
		}

		console.debug( "Going to call signup CREATOR: " );

		/* 
                THis dispatch is actually a wrapper, applied by redux-thunk, over the actual dispatch by redux
                when we pass a function to dispatch(ie. dispatch(action); $where action is a function$),
                THEN what dispatch does is -> 

                    function (action) {
                        if (typeof action === 'function') {
                        return action(dispatch, getState, extraArgument);
                        }

                        return next(action);
                    }

                    // note - This isn't the original behaviour, it's due to the middleware applied
            */
		dispatch(CustSignupCreator( username, password, mobile, rememberMe ))
			.then(() => {
				console.debug("Successful");
				history.push("/"); // @future -> When profile page is okay, redirect to '/me' route instead
				// window.location.reload();
			})
			.catch((err) => {
				console.error(err);
				alert( err.msg || err.err || "Couldn't Sign Up");

				if( err.code == "11000" ){   // let it be a ==
					history.push("/login");
				}
			})
			.finally(() => {
				setLoading(false);
			});
	}

	return (
		<>
			<Container className={classes.boxContainer}>
				<Paper className={classes.LoginBox}>
					<Typography style={{marginBottom: "2%"}} variant="h4">
                        Sign Up
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
							onChange={(e) => setUsername(e.target.value)}
							autoFocus={true}
							label="Email/Mobile"
							type="email"
							placeholder="Username"
							helperText="You can also enter username..."
							margin="normal"
							fullWidth
							required
							// onChange={() => setUserName(usernameField.current.value)}
						/>
						<br />
						<TextField
							onChange={(e) => setPassword(e.target.value)}
							label="Password"
							placeholder="Enter your password..."
							helperText="Shh... Password"
							type="password"
							margin="normal"
							fullWidth
							required
							// onChange={() => setPassword(passwordField.current.value)}
						/>
						<br />
						<TextField
							ref={cnfrmpasswordField}
							onChange={(e) => { 
								if(e.target.value !== password){
									setErrorCnfrmPass(true);
									setPassHelperMsg("Passwords not matching");
								} else {
									setErrorCnfrmPass(false);
									setPassHelperMsg("");
								}

								setCnfrmpassword(e.target.value); 
							}}
							label="Confirm Password"
							placeholder="Repeat the password..."
							type="password"
							margin="normal"
							helperText={helperMsgPass}
							error={errorCnfrmPass}
							fullWidth
							required
							// onChange={() => setPassword(passwordField.current.value)}
						/>
						<br />
						<TextField
							ref={mobileField}
							onChange={(e) => {
								setErrorCnfrmMobile(false);
								setMobileHelperMsg("Optional...");                        

								setMobile(e.target.value);
							}}
							label="Mobile Number"
							error={errorMobile}
							helperText={helperMsgMobile}
							errorCnfrmMobile=""
							margin="normal"
							type="number"
							InputProps={{
								startAdornment: <InputAdornment position="start">+91</InputAdornment>
							}}
							// onChange={() => setPassword(passwordField.current.value)}
							fullWidth
						/>
						<br />
						<Checkbox
							onChange={(e) => toggleRememberMe(e.target.checked)}
							defaultChecked={true}
							helperText="Remember Me"
						/>
						<span style={{color: "#404040", fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif"}}>Remember Me</span>
						<br />
						<Button
							disabled={loading ? true: false}
							variant="contained"
							type="submit"
						>
                            SignUp
						</Button>
					</form>
					<Typography
						style={{fontSize: "1em", margin: "1%"}}
					>
                    Existing Customer ? <Link to="/login">Login Here</Link>
					</Typography>
				</Paper>
			</Container>
		</>
	);
}

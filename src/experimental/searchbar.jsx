import React from "react";
import {
	AppBar,
	Container,
	InputBase,
	InputLabel,
	Toolbar,
	Typography,
	TextField
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import "fontsource-righteous/400.css";

const useStyles = makeStyles((theme) => ({
	toolbar: {
		backgroundColor: theme.palette.common.white,
	},
	mobile_toolbar: {
		backgroundColor: theme.palette.common.white,
		paddingLeft: 2
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	search: {
		position: "relative",
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",	// go to right
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		color: "black",
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputInput: {
		// padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "20vw",
			"&:focus": {
				width: "35vw",
			},
		},
	},
}));

export default function SearchAppBar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar className={ classes.toolbar}>
					{/* <IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="open drawer"
						>
							<MenuIcon />
						</IconButton> */}
					<Container>
						{/* <img src="/logo.png" alt="EasyLife" height="75%"/> */}
						<Typography variant="h4" style={{fontFamily: "Righteous"}}>
							<span style={{color: "orange"}}>Easy</span>
							<span style={{color: "green"}}>Life</span>
						</Typography>
					</Container>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							label="Search..."
							placeholder="Search..."
							style={{
								color: "black",
								borderWidth: "1px",
								borderRadius: "14px",
								borderColor: "black",
								borderStyle: "solid",
								paddingTop: "1.5vh",
								paddingBottom: "1.5vh"
							}}
							// placeholder="Search…"
							classes={{
								input: classes.inputInput,
							}}
						/>
						{/* <TextField 
								// style={styling.search}
								variant="outlined" 
								size="small" 
								type="text"
								value={props.search}
								onChange={props.updateSearch}
								className={ searchOnFocus ? classes.SearchBar: classes.SearchBarMin}
								InputProps={
									{
										startAdornment: (
											<InputAdornment position="start">
												<Search />
											</InputAdornment>
										)
									}
								}
							/> */}
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}
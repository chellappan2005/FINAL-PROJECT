import React, { useState } from "react";
import { Card, CardActionArea, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	slider: {
		position: "relative",   // not required in my case actually, the yt tutorial did so
		border: "1px solid red",
		width: 100 + "%",
		height: "100%",
		boxSizing: "border-box",
		margin: 0,
		padding: 0,
		display: "flex",
		alignItems: "center",    /// middle vertically
		overflow: "hidden",
	},

	slide: {
		border: "1px solid blue",
		minWidth: "96%",
		height: "96%",
		margin: "2%",   // 2% vertically horizontally all sides
		overflow: "hidden",
		transition: "0.5s"
	},
	slide_card: {
		height: "100%",
		textAlign: "center"
	},
	baseNavBtn: {

        
	},
	leftBtn: {
		position: "absolute",
		left: 0,
		height: "80%",
		width: "5%",
		background: "none",
		border: 0,
		outline: 0
	},
	rightBtn: {
		position: "absolute",
		right: 0,
		height: "80%",
		width: "5%",
		background: "none",
		border: 0,
		outline: 0

	}

});

const sliderArr = [
	{title: "hi1", desc: "bye10"},
	{title: "hi2", desc: "bye20"},
	{title: "hi3", desc: "bye40"},
	{title: "hi4", desc: "bye60"},
	{title: "hi5", desc: "bye80"}
];

export default function CustomCarousal() {
	const classes = useStyles();

	const [slideIndex, setSlideIndex] = useState(0);

	function goLeft() {
		if( slideIndex === 0 ){
			setSlideIndex( sliderArr.length - 1 );
		}else{
			setSlideIndex( slideIndex - 1 );
		}
	}

	function goRight() {
		if( slideIndex === sliderArr.length - 1 ){
			setSlideIndex( 0 );
		}else{
			setSlideIndex( slideIndex + 1 );
		}
	}

	return (
		<div className={classes.slider}>
			{
				sliderArr.map((item, index) => (
					<div className={classes.slide} key={index} style={{transform: `translateX(${ -(slideIndex*104)}%)`}}>
						<Card className={classes.slide_card}>
							<CardActionArea style={{height: "100%"}}>
								{item.title}
							</CardActionArea>
						</Card>
					</div>
				))
			}
			<button className={classes.leftBtn} onClick={goLeft} >{"<"}</button>
			<button className={classes.rightBtn} onClick={goRight} >{">"}</button>
		</div>
	);
}
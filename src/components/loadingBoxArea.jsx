import React from "react";
import LoadingBox from "./loadingBox";
import { Grid } from "@material-ui/core";

export default function LoadingBoxArea(props){
	const tmpList = [];
	for (let i = 0; i < props.num || 0; i++) {
		tmpList.push(i);
	}

	return (
		<Grid container>
			{tmpList.map((i) => (
				<Grid item key={i}>
					<LoadingBox key={i}/>
				</Grid>)
			)}
		</Grid>
	);
}

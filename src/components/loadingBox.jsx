import React from "react";
import {
	Grid,
	Card,
	Typography,
	CardActionArea
} from "@material-ui/core";

export default function LoadingBox(){
	return (
		<Grid item>
			<Card style={{
				padding: "5%",
				margin: "5%"
			}}>
				<CardActionArea style={{
					padding: "5%",
					margin: "5%"
				}}>
					<Typography variant="h6"  style={{
						padding: "5%",
						margin: "5%"
					}}>
                        Loading...
					</Typography>
				</CardActionArea>
			</Card>
		</Grid>
	);
}

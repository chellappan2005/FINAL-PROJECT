import React from "react";
import { connect } from "react-redux";

/**
 * @caution -> Don't actually show this page currently, there just isn't enough data to show
 */
function MePage(props) {
	return (
		<div>
            Username - {props.user.uname}
            Contact - {props.user.uname}
		</div>
	);
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

// eslint-disable-next-line no-unused-vars
function mapDispatchToProps(dispatch) {
	return {
	};
}

export default connect( mapStateToProps, mapDispatchToProps )(MePage);

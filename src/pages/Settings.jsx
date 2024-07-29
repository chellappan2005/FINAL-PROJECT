import React from "react";
import { connect } from "react-redux";

/**
 * @caution -> Don't actually show this page currently, there just isn't enough data to show
 * 
 * @note - These almost empty files are intentionally left so, since these aren't a MUST now, and likely won't be needed for some time
 */
function SettingsPage() {
	return (
		<div>
            Settings Page, Most likely show user settings here
		</div>
	);
}

// eslint-disable-next-line no-unused-vars
function mapStateToProps(state) {
	return {};
}

// eslint-disable-next-line no-unused-vars
function mapDispatchToProps(dispatch) {
	return {};
}

export default connect( mapStateToProps, mapDispatchToProps )(SettingsPage);

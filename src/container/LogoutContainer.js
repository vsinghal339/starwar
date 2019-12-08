import { connect } from "react-redux"
import * as userActions from "../actions/users"

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps,
	userActions
)(Navigation)
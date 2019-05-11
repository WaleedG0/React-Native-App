import { connect } from "react-redux";
import AppComponent from "./AppComponent";
import * as AppActions from "./AppRedux";

const mapStateToProps = ({ app }) => ({
  initialized: app.initialized
});

const mapDispatchToProps = dispatch => ({
  appStarted: () => dispatch(AppActions.appStarted())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);

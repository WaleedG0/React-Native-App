import { connect } from "react-redux";
import * as FiltersActions from "./FiltersRedux";
import FiltersComponent from "./FiltersComponent";

const mapStateToProps = ({ filters }) => ({
  filters: filters.params
});

const mapDispatchToProps = dispatch => ({
  onDeleteFilter: param => dispatch(FiltersActions.deleteFilterParam(param))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FiltersComponent);

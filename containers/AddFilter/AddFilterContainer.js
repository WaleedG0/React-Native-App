import { connect } from "react-redux";
import AddFilterComponent from "./AddFilterComponent";
import { addFilterParam } from "../Filters/FiltersRedux";

const mapStateToProps = ({ filters }) => ({
  technologiesDB: filters.technologiesDB
});

const mapDispatchToProps = dispatch => ({
  addFilter: param => dispatch(addFilterParam(param))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFilterComponent);

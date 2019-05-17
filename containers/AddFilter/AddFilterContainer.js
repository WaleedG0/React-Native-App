import { connect } from "react-redux";
import AddFilterComponent from "./AddFilterComponent";
import * as AddFilterActions from "../Filters/FiltersRedux";

const mapStateToProps = ({ filters }) => ({
  technologiesDB: filters.technologiesDB
});

const mapDispatchToProps = dispatch => ({
  addFilter: param => dispatch(AddFilterActions.addFilterParam(param)),
  onLoadTechnologies: () => dispatch(AddFilterActions.loadTechnologies())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFilterComponent);

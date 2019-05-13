import { combineReducers } from 'redux';
import AppReducer from '../containers/App/AppRedux';
import CandidatesReducer from '../containers/Candidates/CandidatesRedux';
import filtersReducer from '../containers/Filters/FiltersRedux';


export default combineReducers({
  app: AppReducer,
  candidates: CandidatesReducer,
  filters: filtersReducer
});

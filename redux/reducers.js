import { combineReducers } from 'redux';
import AppReducer from '../containers/App/AppRedux';
import CandidatesReducer from '../containers/Candidates/CandidatesRedux';

export default combineReducers({
  app: AppReducer,
  candidates: CandidatesReducer
});

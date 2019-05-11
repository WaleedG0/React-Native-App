import { combineReducers } from 'redux';
import AppReducer from '../containers/App/AppRedux';

export default combineReducers({
  app: AppReducer,
});

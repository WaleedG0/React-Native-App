import Immutable from "seamless-immutable";
import { loadFromStorage, saveToStorage } from "../../util/asyncStorage";

import {
  updateMatchingCandidates,
  filterCandidatesRequest
} from "../Candidates/CandidatesRedux";

/* ------------- Actions ------------- */
const ADD_FILTER_REQUEST = "mossad/Filters/ADD_FILTER_REQUEST";
const ADD_FILTER_SUCCESS = "mossad/Filters/ADD_FILTER_SUCCESS";
const ADD_FILTER_ERROR = "mossad/Filters/ADD_FILTER_ERROR";

const DELETE_FILTER_REQUEST = "mossad/Filters/DELETE_FILTER_REQUEST";
const DELETE_FILTER_SUCCESS = "mossad/Filters/DELETE_FILTER_SUCCESS";
const DELETE_FILTER_ERROR = "mossad/Filters/DELETE_FILTER_ERROR";

const SET_FILTERS_INITAL_VALUE = "mossad/Filters/SET_FILTERS_INITAL_VALUE";

/* ------------- initial state ------------- */
const initialState = Immutable({
  params: [],
  technologiesDB: [],
  loading: false,
  error: false
});

/* ------------- Reducer ------------- */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_FILTER_REQUEST:
      return state.merge({
        loading: true,
        params: [...state.params, action.payload.filter]
      });

    case ADD_FILTER_SUCCESS:
      return state.merge({
        loading: false,
        params: [...state.params, action.payload.param]
      });

    case ADD_FILTER_ERROR:
      return state.merge({
        loading: false,
        error: action.payload.error
      });

    case DELETE_FILTER_REQUEST:
      return state.merge({
        loading: true
      });

    case DELETE_FILTER_SUCCESS:
      return state.merge({
        loading: false,
        params: state.params.filter(
          param =>
            param.name === action.payload.param && action.payload.param.name
        )
      });

    case DELETE_FILTER_ERROR:
      return state.merge({
        loading: false,
        error: action.payload.error
      });

    case SET_FILTERS_INITAL_VALUE:
      return state.merge({
        params: action.payload.params,
        technologiesDB: action.payload.technologies
      });

    default:
      return state;
  }
}

/* ------------- Action Creators ------------- */
export function addFilterRequest() {
  return { type: ADD_FILTER_REQUEST };
}

export function addFilterSuccess(param) {
  return { type: ADD_FILTER_SUCCESS, payload: { param } };
}

export function addFilterError(error) {
  return { type: ADD_FILTER_ERROR, payload: { error } };
}

export function deleteFilterRequest() {
  return { type: DELETE_FILTER_REQUEST };
}

export function deleteFilterSuccess(data) {
  return { type: DELETE_FILTER_SUCCESS, payload: { data } };
}

export function deleteFilterError(error) {
  return { type: DELETE_FILTER_ERROR, payload: { error } };
}

export function setFiltersInitialValue(params) {
  return { type: SET_FILTERS_INITAL_VALUE, payload: params };
}

/* ------------- Thunks ------------- */
export function addFilterParam(filterParam) {
  return async (dispatch, getState) => {
    try {
      dispatch(addFilterRequest());

      const filters = await loadFromStorage("filters");
      //check if param already exists
      if (filters.findIndex(param => param.name === filterParam.name) === -1) {
        filters.push(filterParam);
      }
      await saveToStorage("filters", filters);

      dispatch(addFilterSuccess(filterParam));

      //load new matches after filters change
      dispatch(filterCandidatesRequest());
      dispatch(updateMatchingCandidates(null, filters));
    } catch (error) {
      dispatch(addFilterError(error));
    }
  };
}

export function deleteFilterParam(filterParam) {
  return async dispatch => {
    try {
      dispatch(deleteFilterRequest());

      const filters = await loadFromStorage("filters");

      await saveToStorage(
        "filters",
        filters.filter(param => param.name !== filterParam.name)
      );

      dispatch(deleteFilterSuccess(filterParam));
      //load new matches after filters change
      dispatch(filterCandidatesRequest());
      dispatch(updateMatchingCandidates(null, filters));
    } catch (error) {
      dispatch(deleteFilterError(error));
    }
  };
}

import Immutable from "seamless-immutable";

import {
  updateMatchingCandidates
} from "../Candidates/CandidatesRedux";

/* ------------- Actions ------------- */
const ADD_FILTER_REQUEST = "mossad/Filters/ADD_FILTER_REQUEST";
const ADD_FILTER_SUCCESS = "mossad/Filters/ADD_FILTER_SUCCESS";
const ADD_FILTER_ERROR = "mossad/Filters/ADD_FILTER_ERROR";

const DELETE_FILTER_REQUEST = "mossad/Filters/DELETE_FILTER_REQUEST";
const DELETE_FILTER_SUCCESS = "mossad/Filters/DELETE_FILTER_SUCCESS";
const DELETE_FILTER_ERROR = "mossad/Filters/DELETE_FILTER_ERROR";

const LOAD_TECHNOLOGIES_REQUEST = "mossad/Filters/LOAD_TECHNOLOGIES_REQUEST";
const LOAD_TECHNOLOGIES_SUCCESS = "mossad/Filters/LOAD_TECHNOLOGIES_SUCCESS";
const LOAD_TECHNOLOGIES_ERROR = "mossad/Filters/LOAD_TECHNOLOGIES_ERROR";

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
    case LOAD_TECHNOLOGIES_SUCCESS:
      return state.merge({
        technologiesDB: action.payload.technologies
      });

    case ADD_FILTER_REQUEST:
      return state.merge({
        loading: true
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
          param => param.name !== action.payload.param.name
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

export function deleteFilterSuccess(param) {
  return { type: DELETE_FILTER_SUCCESS, payload: { param } };
}

export function deleteFilterError(error) {
  return { type: DELETE_FILTER_ERROR, payload: { error } };
}

export function setFiltersInitialValue(params) {
  return { type: SET_FILTERS_INITAL_VALUE, payload: params };
}

export function loadTechnologiesRequest() {
  return { type: LOAD_TECHNOLOGIES_REQUEST };
}

export function loadTechnologiesSuccess(technologies) {
  return { type: LOAD_TECHNOLOGIES_SUCCESS, payload: { technologies } };
}

export function loadTechnologiesError(params) {
  return { type: LOAD_TECHNOLOGIES_ERROR, payload: { params } };
}

/* ------------- Thunks ------------- */

export function loadTechnologies(filterParam) {
  return async (dispatch, getState, api) => {
    try {
      dispatch(loadTechnologiesRequest());
      const technologies = await api.TechnologiesModel.loadTechcologies();
      dispatch(loadTechnologiesSuccess(technologies));
    } catch (error) {
      dispatch(loadTechnologiesError(error));
    }
  };
}

export function addFilterParam(filterParam) {
  return async (dispatch, getState) => {
    try {
      dispatch(addFilterRequest());

      dispatch(addFilterSuccess(filterParam));

      //load new matches after filters change
      dispatch(updateMatchingCandidates({ filters: getState().filters.params }));
    } catch (error) {
      dispatch(addFilterError(error));
    }
  };
}

export function deleteFilterParam(filterParam) {
  return async (dispatch, getState) => {
    try {
      dispatch(deleteFilterRequest());

      dispatch(deleteFilterSuccess(filterParam));
      //load new matches after filters change
      dispatch(updateMatchingCandidates({ filters: getState().filters.params }));
    } catch (error) {
      dispatch(deleteFilterError(error));
    }
  };
}

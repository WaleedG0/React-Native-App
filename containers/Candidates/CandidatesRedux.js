import Immutable from "seamless-immutable";
import filterMatches from "../../util/filterMatches";

/* ------------- Actions ------------- */

const FILTER_CANDIDATES__REQUEST =
  "mossad/Candidates/FILTER_CANDIDATES__REQUEST";

const REJECT_CANDIDATES__REQUEST =
  "mossad/Candidates/REJECT_CANDIDATES__REQUEST";
const REJECT_CANDIDATES_SUCCESS = "mossad/Candidates/REJECT_CANDIDATES_SUCCESS";
const REJECT_CANDIDATES_ERROR = "mossad/Candidates/REJECT_CANDIDATES_ERROR";

const ACCEPT_CANDIDATES__REQUEST =
  "mossad/Candidates/ACCEPT_CANDIDATES__REQUEST";
const ACCEPT_CANDIDATES_SUCCESS =
  "mossad/Candidates/ACCEPT__CANDIDATES_SUCCESS";
const ACCEPT_CANDIDATES_ERROR = "mossad/Candidates/ACCEPT_CANDIDATES_ERROR";

const UPDATE_MATCHING_CANDIDATES =
  "mossad/Candidates/UPDATE_MATCHING_CANDIDATES";

const LOAD_CANDIDATES_ERROR = "mossad/Candidates/LOAD_CANDIDATES_ERROR";
const LOAD_CANDIDATES_SUCCESS = "mossad/Candidates/LOAD_CANDIDATES_SUCCESS";

const LOAD_CANDIDATES_REQUEST = "mossad/Candidates/LOAD_CANDIDATES_REQUEST";

/* ------------- initial state ------------- */
const initialState = Immutable({
  matches: [],
  candidatesDB: [],
  accepted: [],
  rejected: [],
  loading: false,
  error: false
});

/* ------------- Reducer ------------- */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_CANDIDATES_REQUEST:
      return state.merge({
        loading: true,
        error: false
      });

    case LOAD_CANDIDATES_SUCCESS:
      return state.merge({
        loading: false,
        error: false,
        candidatesDB: action.payload.slice(0, 100),
        matches: action.payload.slice(0, 10)
      });

    case LOAD_CANDIDATES_ERROR:
      return state.merge({
        loading: false,
        error: true
      });

    case FILTER_CANDIDATES__REQUEST:
      return state.merge({
        loading: true
      });

    case REJECT_CANDIDATES_SUCCESS:
      return state.merge({
        matches: state.matches.filter(
          match => match._id !== action.payload.candidateId
        ),
        loading: false
      });

    case ACCEPT_CANDIDATES_SUCCESS:
      return state.merge({
        accepted: [...state.accepted, action.payload.candidateId],
        matches: state.matches.filter(
          match => match._id !== action.payload.candidateId
        ),
        loading: false
      });

    case UPDATE_MATCHING_CANDIDATES:
      return state.merge({
        matches: filterMatches(
          state.candidatesDB,
          action.payload.filters || [],
          state.rejected,
          state.accepted
        ),
        loading: false
      });

    default:
      return state;
  }
}

/* ------------- Action Creators ------------- */
export function filterCandidatesRequest() {
  return { type: FILTER_CANDIDATES__REQUEST };
}

export function rejectCandidatesRequest() {
  return { type: REJECT_CANDIDATES__REQUEST };
}

export function rejectCandidatesSuccess(candidateId) {
  return { type: REJECT_CANDIDATES_SUCCESS, payload: { candidateId } };
}

export function rejectCandidatesError(error) {
  return { type: REJECT_CANDIDATES_ERROR, payload: { error } };
}

export function acceptCandidatesRequest() {
  return { type: ACCEPT_CANDIDATES__REQUEST };
}

export function acceptCandidatesSuccess(candidateId) {
  return { type: ACCEPT_CANDIDATES_SUCCESS, payload: { candidateId } };
}

export function acceptCandidatesError(error) {
  return { type: ACCEPT_CANDIDATES_ERROR, payload: { error } };
}

export function updateMatchingCandidates(data) {
  return { type: UPDATE_MATCHING_CANDIDATES, payload: data };
}

export function loadCandidatesRequest(data) {
  return { type: LOAD_CANDIDATES_REQUEST, payload: data };
}

export function loadCandidatesError(data) {
  return { type: LOAD_CANDIDATES_ERROR, payload: data };
}

export function loadCandidatesSuccess(data) {
  return { type: LOAD_CANDIDATES_SUCCESS, payload: data };
}

/* ------------- Thunks ------------- */

export function loadCandidates() {
  return async (dispatch, getState, api) => {
    try {
      dispatch(loadCandidatesRequest());

      const candidates = await api.CandidatesModel.loadCandidates();

      dispatch(loadCandidatesSuccess(candidates));
    } catch (error) {
      dispatch(loadCandidatesError(error));
    }
  };
}

export function rejectCandidate(candidateId) {
  return async dispatch => {
    try {
      dispatch(rejectCandidatesRequest());

      dispatch(rejectCandidatesSuccess(candidateId));
    } catch (error) {
      dispatch(rejectCandidatesError(error));
    }
  };
}

export function acceptCandidate(candidateId) {
  return async dispatch => {
    try {
      dispatch(acceptCandidatesRequest());

      dispatch(acceptCandidatesSuccess(candidateId));
    } catch (error) {
      dispatch(acceptCandidatesError(error));
    }
  };
}

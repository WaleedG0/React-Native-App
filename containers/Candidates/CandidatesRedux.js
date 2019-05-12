import Immutable from "seamless-immutable";
import { loadFromStorage, saveToStorage } from "../../util/asyncStorage";
import filterMatches from "../../util/filterMatches";

/* ------------- Actions ------------- */
const REJECT_CANDIDATES__REQUEST =
  "mossad/Candidates/REJECT_CANDIDATES__REQUEST";
const REJECT_CANDIDATES_SUCCESS = "mossad/Candidates/REJECT_CANDIDATES_SUCCESS";
const REJECT_CANDIDATES_ERROR = "mossad/Candidates/REJECT_CANDIDATES_ERROR";

const ACCEPT_CANDIDATES__REQUEST =
  "mossad/Candidates/ACCEPT_CANDIDATES__REQUEST";
const ACCEPT_CANDIDATES_SUCCESS =
  "mossad/Candidates/ACCEPT__CANDIDATES_SUCCESS";
const ACCEPT__CANDIDATES_ERROR = "mossad/Candidates/ACCEPT_CANDIDATES_ERROR";

const UPDATE_MATCHING_CANDIDATES =
  "mossad/Candidates/UPDATE_MATCHING_CANDIDATES";

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
    //@todo: update matches when accepted / rejected is changed
    case REJECT_CANDIDATES_SUCCESS:
      return state.merge({
        rejected: [...state.rejected, action.payload.candidateId]
      });

    case ACCEPT_CANDIDATES_SUCCESS:
      return state.merge({
        accepted: [...state.accepted, action.payload.candidateId]
      });

    case UPDATE_MATCHING_CANDIDATES:
      let accepted = action.payload.accepted || state.accepted;
      let rejected = action.payload.rejected || state.rejected;
      let candidatesDB = action.payload.candidatesDB || state.candidatesDB;

      return state.merge({
        accepted,
        rejected,
        candidatesDB,
        matches: filterMatches(
          candidatesDB,
          action.payload.filters || [],
          rejected,
          accepted
        )
      });

    default:
      return state;
  }
}

/* ------------- Action Creators ------------- */
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

/* ------------- Thunks ------------- */
export function rejectCandidate(candidateId) {
  return async dispatch => {
    try {
      dispatch(rejectCandidatesRequest());

      const rejected = await loadFromStorage("rejected");
      if (rejected.indexOf(candidateId) === -1) {
        rejected.push(candidateId);
      }
      await saveToStorage("rejected", rejected);

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

      const accepted = await loadFromStorage("accepted");
      if (accepted.indexOf(candidateId) === -1) {
        accepted.push(candidateId);
      }
      await saveToStorage("accepted", accepted);

      dispatch(rejectCandidatesSuccess(candidateId));
    } catch (error) {
      dispatch(rejectCandidatesError(error));
    }
  };
}

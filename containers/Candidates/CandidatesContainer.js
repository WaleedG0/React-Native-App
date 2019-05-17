import { connect } from "react-redux";
import * as CandidatesActions from "./CandidatesRedux";
import CandidatesComponent from "./CandidatesComponent";

const mapStateToProps = ({ candidates }) => ({
  matches: candidates.matches,
  candidatesDB: candidates.candidatesDB,
  loading: candidates.loading
});

const mapDispatchToProps = dispatch => ({
  onLoadCandidates: () =>
    dispatch(CandidatesActions.loadCandidates()),
  onRejectCandidate: candidateId =>
    dispatch(CandidatesActions.rejectCandidate(candidateId)),
  onAcceptCandidate: candidateId =>
    dispatch(CandidatesActions.acceptCandidate(candidateId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidatesComponent);

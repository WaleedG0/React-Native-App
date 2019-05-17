import { createTransform } from "redux-persist";
import Immutable from "seamless-immutable";

const SetTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    // convert state to JS.
    return Immutable.isImmutable(inboundState)
      ? Immutable.asMutable(inboundState)
      : inboundState;
  },
  // transform state being rehydrated
  (outboundState, key) => {
    // convert Js to immutable data structure.
    return Immutable(outboundState);
  },
  //define which reducers this transform gets called for.
  { whitelist: ["candidates", "filters"] }
);

export default SetTransform;

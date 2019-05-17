import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import TransformImutable from "./ImmutablePersistenceTransform";

const persistConfig = {
  key: "root",
  whitelist: ["candidates", "filters"],
  storage,
  transforms: [TransformImutable]
};

export default (reducer) => persistReducer(persistConfig, reducer);

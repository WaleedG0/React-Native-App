import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import Reactotron from "../config/Reactotron";
import RootReducer from "../redux/reducers";
import reducerPersistor from "../config/reducerPersistor";
import api from "../api";

// const createLogger = __DEV__ ? require(`redux-logger`).createLogger : null;

export default () => {
  const middlewares = [];

  // init thunk middleware
  const thunkMiddleware = thunk.withExtraArgument(api);
  middlewares.push(thunkMiddleware);

  // // only use logger middleware in DEV mode
  // if (__DEV__) {
  //   const logger = createLogger({
  //     collapsed: true,
  //     duration: true,
  //   });
  //   middlewares.push(logger);
  // }

  let store;
  if (__DEV__) {
    // only use Reactotron debugger in DEV mode
    store = createStore(
      reducerPersistor(RootReducer),
      compose(
        applyMiddleware(...middlewares),
        Reactotron.createEnhancer()
      )
    );
  } else {
    store = createStore(
      reducerPersistor(RootReducer),
      applyMiddleware(...middlewares)
    );
  }

  return store;
};

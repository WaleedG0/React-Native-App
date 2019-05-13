import React from "react";
import { Provider } from "react-redux";
import App from "./containers/App/AppContainer";
import createStore from "./redux";

// Clear Reactotron on every app refresh
if (__DEV__) console.tron && console.tron.clear(); //eslint-disable-line

// Create our redux store
const store = createStore();

const RootContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default RootContainer;

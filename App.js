import React from "react";
import { Provider } from "react-redux";
import App from "./containers/App/AppContainer";
import createStore from "./redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

// Clear Reactotron on every app refresh
if (__DEV__) console.tron && console.tron.clear(); //eslint-disable-line

// Create our redux store
const store = createStore();
const persistor = persistStore(store);

const RootContainer = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

export default RootContainer;

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider as ReactReduxProvider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { PersistGate } from "redux-persist/es/integration/react";

import store, { persistor, history } from "./redux/store";
import App from "./screens/app";

class Flow extends Component {
  static KEY_DOWN_EVENT = "keydown";
  static ASCII_R = 82;

  registerPersistorPurge(e) {
    if (e.keyCode == Howl.ASCII_R && e.ctrlKey) {
      persistor.purge();
      location.reload();
    }
  }
  componentDidMount() {
    document.addEventListener(
      Flow.KEY_DOWN_EVENT,
      this.registerPersistorPurge.bind(this)
    );
  }
  componentWillUnmount() {
    document.removeEventListener(
      Flow.KEY_DOWN_EVENT,
      this.registerPersistorPurge.bind(this)
    );
  }
  render() {
    return (
      <ReactReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </PersistGate>
      </ReactReduxProvider>
    );
  }
}

ReactDOM.render(<Flow />, document.getElementById("flow-root"));

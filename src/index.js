import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import { Router, browserHistory } from "react-router"
import { syncHistoryWithStore } from "react-router-redux"
import createRoutes from "./routes"

const rootEl = document.getElementById("root");

const store= configureStore();
export const history = syncHistoryWithStore(browserHistory, store)

const routes = createRoutes(store, history)

ReactDOM.render(
  <Provider store={store}>
   {routes}
  </Provider>,
  rootEl
);

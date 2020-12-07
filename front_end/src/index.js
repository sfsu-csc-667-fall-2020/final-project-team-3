import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./redux/reducers/rootReducer";
import thunk from "redux-thunk";
import Admin from "./pages/Admin";
import User from "./pages/User";
import "./App.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";

const store = createStore(rootReducer, applyMiddleware(thunk));
// main page
/* TODO
 * add routeprotector middleware to check if user is logged in / admin to load correct things
 * 
 * 
 */
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Route path='/admin'>
          <Admin />
          <User />
        </Route>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

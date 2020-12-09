import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./redux/reducers/rootReducer";
import thunk from "redux-thunk";
import Admin from "./pages/Admin";
import AdminPanel from "./components/AdminPanel";
import DisplayListings from "./components/DisplayListings";
import User from "./pages/User";
import "./App.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";

const store = createStore(rootReducer, applyMiddleware(thunk));

const webSocket = new WebSocket('ws://' + window.location.host.split(':')[0] + (window.location.port && `:${window.location.port}`) + '/websocket');


webSocket.onmessage = (message) => {
  console.log(message)
  store.dispatch(insertMessage(message.data));
};


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
      <AdminPanel isAdmin = {true}/>
      <DisplayListings />
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

/**
 * App's root (including the Redux store provider).
 * 
 * The choice of using Redux comes from the fact that, when called, SWAPI doesn't provide
 * all the necessary information to display, and much of the fetched data is organized in lists
 * pointing to other entities via urls. Since the lists are hardly changing over time, and that
 * there is some light navigation involved, a good strategy is to cache all the lists on the client
 * and combine the data together whenever necessary.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';

import App from "./App";
import './index.css';
import { store } from './store';


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

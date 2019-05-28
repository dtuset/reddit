import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import persistState from 'redux-localstorage'
import mainReducer from "./reducers/";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  persistState()
);

const store = createStore(mainReducer,enhancer); //console.log(store.getState());

export default store;
import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import signIn from "./login";
import postRD from "./post"

const reducers = combineReducers({ signIn,postRD });

const store = () => {
  return createStore(reducers, composeWithDevTools());
};

export default store();
import { combineReducers } from "@reduxjs/toolkit";
import fuse from "./fuse";
import user from "./userSlice";
import stock from "./stockSlice";
import background from "./backgroundSlice";

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    fuse,
    user,
    stock,
    background,
    ...asyncReducers,
  });

  /*
	Reset the redux store when user logged out
	 */
  if (action.type === "user/userLoggedOut") {
    // state = undefined;
  }

  return combinedReducer(state, action);
};

export default createReducer;

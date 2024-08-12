import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { usersReducer } from "./usersReducers";

export const reducers = combineReducers({
  auth: authReducer,
  users: usersReducer,
})
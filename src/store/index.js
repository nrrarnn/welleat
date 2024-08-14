import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { usersReducer } from "./usersReducers";
import { idUsersReducer } from "./idUsersReducers";

export const reducers = combineReducers({
  auth: authReducer,
  users: usersReducer,
  idUsers: idUsersReducer
})
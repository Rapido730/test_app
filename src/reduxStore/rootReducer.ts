import { UserStateType } from "./user/reducer.user";

import { combineReducers } from "redux";

import { UserReducer } from "./user/reducer.user";

export interface StateType {
  User: UserStateType;
}
export const Root_Reducer = combineReducers({
  User: UserReducer,
});

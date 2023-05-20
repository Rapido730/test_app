import { compose, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";

import { logger } from "redux-logger";
import { Root_Reducer } from "./rootReducer";

export const Store = createStore(Root_Reducer, undefined);

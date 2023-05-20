import { compose, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";

import { logger } from "redux-logger";
import { Root_Reducer } from "./rootReducer";

const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(
  Boolean
);

// const composeEnhancers = process.env.NODE_ENV !== "production" || compose;

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const Store = createStore(Root_Reducer, undefined, composedEnhancers);

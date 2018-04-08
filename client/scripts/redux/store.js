import { createStore, applyMiddleware } from "redux";
import { createHashHistory } from "history";
import { routerReducer, routerMiddleware } from "react-router-redux";
import sequenceAction from "redux-sequence-action";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage";
import thunk from "redux-thunk";
import reducers from "./ducks";

// import createWebworkerMiddleware from './middlewares/webworker-thunk';
// export const worker = new Worker('./webworker-bundle.js');

const persistConfig = {
  key: "root",
  storage
};

const combineReducer = {
  ...reducers,
  router: routerReducer
};

const persistCombineReducer = persistCombineReducers(
  persistConfig,
  combineReducer
);

export const history = createHashHistory();

const middlewares = [
  routerMiddleware(history),
  sequenceAction,
  // createWebworkerMiddleware(worker, 'worker://'),
  thunk
];

const store = createStore(
  persistCombineReducer,
  applyMiddleware(...middlewares)
);

export const persistor = persistStore(store);

export default store;

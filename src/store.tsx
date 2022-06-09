import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
  createStore,
  getDefaultMiddleware,
  PayloadAction,
} from "@reduxjs/toolkit";
import usersSlice, { getUserDetailsSuccess } from "./features/users/usersSlice";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { userSaga } from "./features/users/sagas";
import { LoginUserResponse } from "./types/User";

const localStoreMiddleware = createListenerMiddleware();

localStoreMiddleware.startListening({
  actionCreator: getUserDetailsSuccess,
  effect: (action) => {
    localStorage.setItem("TOKEN", action.payload.token);
    localStorage.setItem("USER", JSON.stringify(action.payload.userDetails));
  },
});

const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({ users: usersSlice });

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      sagaMiddleware,
      localStoreMiddleware.middleware,
    ]),
});

function* saga() {
  yield all([...userSaga]);
}

sagaMiddleware.run(saga);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

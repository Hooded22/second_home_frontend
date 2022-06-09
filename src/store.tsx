import {
  combineReducers,
  configureStore,
  createStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import usersSlice from "./features/users/usersSlice";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { userSaga } from "./features/users/sagas";

const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({ users: usersSlice });

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

store.subscribe(() => {
  localStorage.setItem("TOKEN", store.getState().users.token || "");
});

function* saga() {
  yield all([...userSaga]);
}

sagaMiddleware.run(saga);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

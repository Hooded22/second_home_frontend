import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
  createStore,
  getDefaultMiddleware,
  PayloadAction,
} from "@reduxjs/toolkit";
import usersSlice, {
  getUserDetailsSuccess,
  logoutUser,
} from "./features/users/usersSlice";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { userSaga } from "./features/users/sagas";
import { LoginUserResponse } from "./types/User";
import { reservationsSaga } from "./features/reservations/sagas";
import reservationsSlice from "./features/reservations/reservationsSlice";
import customersSlice from "./features/customers/customersSlice";
import { customersSaga } from "./features/customers/saga";
import { roomsSaga } from "./features/rooms/saga";
import roomsSlice from "./features/rooms/roomsSlice";

const localStoreMiddleware = createListenerMiddleware();
const logoutUserMiddleware = createListenerMiddleware();

localStoreMiddleware.startListening({
  actionCreator: getUserDetailsSuccess,
  effect: (action) => {
    localStorage.setItem("TOKEN", action.payload.token);
    localStorage.setItem("USER", JSON.stringify(action.payload.userDetails));
  },
});

logoutUserMiddleware.startListening({
  actionCreator: logoutUser,
  effect: () => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USER");
  },
});

const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({
  users: usersSlice,
  reservations: reservationsSlice,
  customers: customersSlice,
  rooms: roomsSlice,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      sagaMiddleware,
      localStoreMiddleware.middleware,
    ]),
});

function* saga() {
  yield all([...userSaga, ...reservationsSaga, ...customersSaga, ...roomsSaga]);
}

sagaMiddleware.run(saga);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

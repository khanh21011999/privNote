import { combineReducers, configureStore } from "@reduxjs/toolkit";
import noteReducer from "./noteList-reducer";
import toggleReducer from "./toggle-reducer";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authentication from "./authentication";

const reducer = combineReducers({
  note: noteReducer,
  firebase: authentication,
});
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: { persistedReducer, toggle: toggleReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistStorageNote = persistStore(store);

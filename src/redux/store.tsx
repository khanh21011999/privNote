import { combineReducers, configureStore } from "@reduxjs/toolkit";
import noteReducer from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const reducerNote = combineReducers({
  note: noteReducer,
});
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducerNote);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistStorageNote = persistStore(store);

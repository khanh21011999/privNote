import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./reducer";
const store = configureStore({
  reducer: {
    note: noteReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

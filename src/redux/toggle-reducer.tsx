import { createSlice } from "@reduxjs/toolkit";

const NoteToggle = {
  enableSelectedButton: false,
  reloadNote: false,
};

const toggleReducer = createSlice({
  name: "toggleReducer",
  initialState: NoteToggle,
  reducers: {
    switchSelectedOn: (state) => {
      return { ...state, enableSelectedButton: true };
    },
    switchReloadOn: (state) => {
      return { ...state, reloadNote: true };
    },
    switchReloadOff: (state) => {
      return { ...state, reloadNote: false };
    },

    switchSelectedOff: (state) => {
      return { ...state, enableSelectedButton: false };
    },
  },
});
export default toggleReducer.reducer;
export const {
  switchSelectedOn,
  switchSelectedOff,
  switchReloadOff,
  switchReloadOn,
} = toggleReducer.actions;

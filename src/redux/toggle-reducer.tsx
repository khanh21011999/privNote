import { createSlice } from "@reduxjs/toolkit";

const NoteToggle = {
  enableSelectedButton: false,
};

const toggleReducer = createSlice({
  name: "toggleReducer",
  initialState: NoteToggle,
  reducers: {
    switchToggle: (state) => {
      return { ...state, enableSelectedButton: !state.enableSelectedButton };
    },
    defaultToggle: (state) => {
      return { ...state, enableSelectedButton: false };
    },
  },
});
export default toggleReducer.reducer;
export const { switchToggle, defaultToggle } = toggleReducer.actions;

import { createSlice } from "@reduxjs/toolkit";

const NoteToggle = {
  enableSelectedButton: false,
};

const toggleReducer = createSlice({
  name: "toggleReducer",
  initialState: NoteToggle,
  reducers: {
    On: (state) => {
      return { ...state, enableSelectedButton: true };
    },
    Off: (state) => {
      const newToggle = { ...state, enableSelectedButton: false };
      return newToggle;
    },
  },
});
export default toggleReducer.reducer;
export const { On, Off } = toggleReducer.actions;

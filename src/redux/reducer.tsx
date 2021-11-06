import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NoteI {
  id?: number | string;
  header?: string;
  note?: string;
}
let NoteList: NoteI[] = [
  {
    id: 1,
    header: "sample header",
    note: "sampple note",
  },
  {
    id: 2,
    header: "sample header",
    note: "sampple note",
  },
  {
    id: 3,
    header: "sample header",
    note: "sampple notasdsdsa das dsdsdsdsd  e",
  },
];

const noteReducer = createSlice({
  name: "note",
  initialState: NoteList,
  reducers: {
    addNote: (state, action: PayloadAction<NoteI>) => {
      const newNote: NoteI = {
        id: new Date().toDateString(),
        header: action.payload.header,
        note: action.payload.note,
      };
      state.push(newNote);
    },
    removeNote: (state, action: PayloadAction<NoteI>) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export default noteReducer.reducer;
export const { addNote, removeNote } = noteReducer.actions;

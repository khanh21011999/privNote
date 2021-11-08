import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NoteI {
  id?: number | Date;
  header?: string;
  note?: string;
  date?: Date;
}
let NoteList: NoteI[] = [
  {
    id: new Date(),
    header: "sample header",
    note: "sampple note",
    date: new Date(),
  },
  {
    id: new Date(),
    header: "sample header",
    note: "sampple note",
    date: new Date(),
  },
  {
    id: new Date(),
    header: "sample header",
    note: "sampple notasdsdsa das dsdsdsdsd  e",
    date: new Date(),
  },
];

const noteReducer = createSlice({
  name: "note",
  initialState: NoteList,
  reducers: {
    addNote: (state, action: PayloadAction<NoteI>) => {
      const newNote: NoteI = {
        id: new Date(),
        header: action.payload.header,
        note: action.payload.note,
        date: new Date(),
      };
      state.push(newNote);
    },
    removeNote: (state, action: PayloadAction<NoteI>) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
    editNote: (state, action: PayloadAction<NoteI>) => {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            note: action.payload.note,
            header: action.payload.header,
            date: action.payload.date,
          };
        }
        return item;
      });
    },
  },
});

export default noteReducer.reducer;
export const { addNote, removeNote, editNote } = noteReducer.actions;

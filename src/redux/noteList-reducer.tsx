import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NoteI } from "./noteList-reducer";

export interface NoteI {
  id?: number | Date;
  header?: string;
  note?: string;
  date?: Date;
  deleteStatus?: boolean;
}
let NoteList: NoteI[] = [];

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
        deleteStatus: false,
      };
      state.push(newNote);
    },
    removeNote: (state, action: PayloadAction<NoteI>) => {
      return state.filter((item) => item.deleteStatus !== true);
    },
    toggleDelete: (state, action: PayloadAction<NoteI>) => {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, deleteStatus: !item.deleteStatus };
        }
        return item;
      });
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
export const { addNote, removeNote, editNote, toggleDelete } =
  noteReducer.actions;

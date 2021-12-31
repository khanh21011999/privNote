import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionType } from "src/constants/type";
import { NoteI } from "./noteList-reducer";
import firestore from "@react-native-firebase/firestore";

export interface NoteI {
  id?: number | Date;
  header?: string;
  note?: string;
  date?: Date;
  selectStatus?: boolean;
}
let NoteList: NoteI[] = [];

export const fetchNote = createAsyncThunk(
  ActionType.fetchData,
  async (userEmail: any, thunkAPI) => {
    const userNote: any = await firestore()
      .collection("Users")
      .doc(userEmail)
      .get()
      .then((res: any) => res.data())
      .then((data) => data.note);

    console.log("userNote", userNote);
    return userNote;
  }
);
// export const getPosts = createAsyncThunk(
//   //action type string
//   "posts/getPosts",
//   // callback function
//   async (thunkAPI) => {
//     const res = await fetch("https://jsonplaceholder.typicode.com/posts").then(
//       (data) => data.json()
//     );
//     return res;
//   }
// );

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
        selectStatus: false,
      };
      state.push(newNote);
    },
    removeNote: (state, action: PayloadAction<NoteI>) => {
      return state.filter((item) => item.selectStatus !== true);
    },
    toggleSelect: (state, action: PayloadAction<NoteI>) => {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, selectStatus: !item.selectStatus };
        }
        return item;
      });
    },
    loadDefault: (state) => {
      return state.map((item) => {
        return { ...item, selectStatus: false };
      });
    },
    resetNote: (state) => {
      return (state = []);
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
  extraReducers: (builder) => {
    // builder.addCase(fetchNote.fulfilled, (state, action) => {
    //   state.push(action.payload);
    // });
    builder.addCase(fetchNote.fulfilled, (state, action) => {
      state = [];
      return state.concat(action.payload);
      // return state.concat(action.payload);
    });
  },
});

export default noteReducer.reducer;
export const {
  addNote,
  removeNote,
  editNote,
  toggleSelect,
  loadDefault,
  resetNote,
} = noteReducer.actions;

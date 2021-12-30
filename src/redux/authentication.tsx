import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthI {
  token: string | null;
}
const Auth: AuthI = {
  token: "",
};

const Authentication = createSlice({
  name: "toggleReducer",
  initialState: Auth,
  reducers: {
    signedIn: (state, action: PayloadAction<AuthI>) => {
      return { ...state, token: action.payload.token };
    },
    logOut: (state) => {
      return { ...state, token: "" };
    },
  },
});
export default Authentication.reducer;
export const { signedIn, logOut } = Authentication.actions;

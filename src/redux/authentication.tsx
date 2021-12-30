import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthI {
  token: string | undefined;
  userInfomation: Object;
}
const Auth: AuthI = {
  token: "",
  userInfomation: [],
};

const Authentication = createSlice({
  name: "toggleReducer",
  initialState: Auth,
  reducers: {
    signedIn: (state, action: PayloadAction<AuthI>) => {
      return {
        ...state,
        token: action.payload.token,
        userInfomation: action.payload.userInfomation,
      };
    },
    logOut: (state) => {
      return { ...state, token: "" };
    },
  },
});
export default Authentication.reducer;
export const { signedIn, logOut } = Authentication.actions;

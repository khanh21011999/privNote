import { persistStore } from "redux-persist";
import store from "src/redux/store";

export interface user {
  email: string;
  id: string;
  givenName: string;
  familyName: string;
  photo: string; // url
  name: string; // full name
}
export enum ActionType {
  fetchData = "FETCH_DATA",
}

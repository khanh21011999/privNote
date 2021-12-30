import React from "react";
import store, { persistStorageNote } from "./src/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaView, Text } from "react-native";
import { NoteNavigation } from "./src/navigation/note-navigator";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoteListScreen from "./src/screen/note-screen";
import AddNote from "./src/screen/add-note/add-note";
import { initializeApp } from "firebase/app";

const Stack = createNativeStackNavigator();
const firebaseConfig = {
  apiKey: "AIzaSyAtGfOJoaISmrMoYDzp_FrIjkZ87aHbIeA",
  authDomain: "privnote-cfcd6.firebaseapp.com",
  databaseURL: "https://privnote-cfcd6-default-rtdb.firebaseio.com",
  projectId: "privnote-cfcd6",
  storageBucket: "privnote-cfcd6.appspot.com",
  messagingSenderId: "556280479080",
  appId: "1:556280479080:web:a183e322bbef7577a16add",
  measurementId: "G-W6PDXPC924",
};
const app = initializeApp(firebaseConfig);
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistStorageNote} loading={<Text>abcd</Text>}>
        <NoteNavigation />
        {/* <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={NoteListScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Add Note"
              component={AddNote}
            />
          </Stack.Navigator>
        </NavigationContainer> */}
      </PersistGate>
    </Provider>
  );
}

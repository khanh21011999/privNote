import React from "react";
import { Text } from "react-native-ui-lib";
import store, { persistStorageNote } from "./src/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaView } from "react-native";
import { NoteNavigation } from "./src/navigation/note-navigator";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoteListScreen from "./src/screen/note-screen";
import AddNote from "./src/screen/add-note/add-note";

const Stack = createNativeStackNavigator();
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

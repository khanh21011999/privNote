import NoteListScreen from "./src/screen/main-screen";
import React from "react";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddNote from "./src/screen/add-note/add-note";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
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
      </NavigationContainer>
    </Provider>
  );
}

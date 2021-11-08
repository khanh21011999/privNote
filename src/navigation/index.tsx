import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AddNote from "../screen/add-note/add-note";
import EditNote from "../screen/edit-note/edit-note";
import NoteListScreen from "../screen/main-screen";

const Stack = createNativeStackNavigator();

export const NoteNavigation = () => {
  return (
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
        <Stack.Screen
          options={{ headerShown: false }}
          name="Edit note"
          component={EditNote}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

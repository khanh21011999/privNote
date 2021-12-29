import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AddNote from "../screen/add-note/add-note";
import EditNote from "../screen/edit-note/edit-note";
import NoteListScreen from "../screen/note-screen";

import { RouteName } from "src/navigation/route-name";
import TabNavigation from "./tab/botton-navigation";
import Login from "src/screen/login/login";

type RootStateParamList = {
  [RouteName.LOGIN]: undefined;
  [RouteName.HOME_NAV]: undefined;
  [RouteName.ADD_NOTE]: undefined;
  [RouteName.HOME]: undefined;
  [RouteName.EDIT_NOTE]: {
    date: Date | undefined;
    note: string | undefined;
    header: string | undefined;
    id: Date | undefined;
  };
};

const Stack = createNativeStackNavigator<RootStateParamList>();
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStateParamList {}
  }
}
export function NoteNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={RouteName.LOGIN}>
        <Stack.Screen
          options={{ headerShown: false }}
          name={RouteName.LOGIN}
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={RouteName.HOME}
          component={TabNavigation}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={RouteName.ADD_NOTE}
          component={AddNote}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={RouteName.EDIT_NOTE}
          component={EditNote}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NoteListScreen from "src/screen/note-screen";
import { NoteStory } from "src/screen/story-screen";
import { RouteName } from "../route-name";
import React from "react";
const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const x = "none";
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={RouteName.HOME}
        options={{ headerShown: false, tabBarStyle: { display: x } }}
        component={NoteListScreen}
      />
      <Tab.Screen name={RouteName.STORY} component={NoteStory} />
    </Tab.Navigator>
  );
}

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NoteListScreen from "src/screen/note-screen";
import { NoteStory } from "src/screen/story-screen";
import { RouteName } from "../route-name";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";
import { CustomBottomTab } from "./custom-bottom-tab";
import { Platform, TextStyle, ViewStyle } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Font } from "src/theme/font-name";
import { onePercentHeight, onePercentWidth } from "src/theme/size";
import NoteIcon from "assets/icons/notes_outline.svg";
import NoteIconFocus from "assets/icons/notes.svg";
import ImportantIcon from "assets/icons/important_outline.svg";
import ImportantIconFocus from "assets/icons/important.svg";
import { AppText } from "src/components/Text/text";
import { color } from "src/theme/color";
import { spacingHeight, spacingWidth } from "src/theme/spacing";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
const Tab = createBottomTabNavigator();
const TAB_LABEL: TextStyle = {
  fontSize: RFPercentage(2),
  fontFamily: Font.regular,
  marginBottom: spacingHeight[2],
};
const TAB_STYLE: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  paddingBottom: spacingHeight[2],
  height: Platform.OS === "ios" ? onePercentHeight * 10 : onePercentHeight * 8,
};
const TEXT_LABEL_FOCUS: TextStyle = {
  fontSize: RFPercentage(2),
  bottom: spacingHeight[1],
};
export default function TabNavigation() {
  const selectToggle = useSelector(
    (state: RootState) => state.toggle.enableSelectedButton
  );
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: [
          TAB_STYLE,
          selectToggle === true ? { display: "none" } : null,
        ],
      }}
    >
      <Tab.Screen
        name={RouteName.HOME_NAV}
        options={{
          headerShown: false,
          title: "Notes",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <>
                {focused ? (
                  <NoteIconFocus
                    height={onePercentHeight * 6}
                    width={onePercentWidth * 6}
                  />
                ) : (
                  <NoteIcon
                    height={onePercentHeight * 6}
                    width={onePercentWidth * 6}
                  />
                )}
              </>
            );
          },
          tabBarLabel: ({ focused, color }) => {
            return (
              <AppText style={TEXT_LABEL_FOCUS} bold={focused ? true : false}>
                Notes
              </AppText>
            );
          },
        }}
        component={NoteListScreen}
      />
      <Tab.Screen
        name={RouteName.STORY}
        component={NoteStory}
        options={{
          headerShown: false,
          title: "Notes",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <>
                {focused ? (
                  <ImportantIconFocus
                    height={onePercentHeight * 6}
                    width={onePercentWidth * 6}
                  />
                ) : (
                  <ImportantIcon
                    height={onePercentHeight * 6}
                    width={onePercentWidth * 6}
                  />
                )}
              </>
            );
          },
          tabBarLabel: ({ focused, color }) => {
            return (
              <AppText style={TEXT_LABEL_FOCUS} bold={focused ? true : false}>
                Important
              </AppText>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

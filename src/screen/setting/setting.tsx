import React from "react";
import { ViewProps, TextProps, ScrollViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
interface SettingScreenI extends ScrollViewProps {}
export function SettingScreen(props: SettingScreenI) {
  const {} = props;

  return <SafeAreaView {...props}></SafeAreaView>;
}

import React from "react";
import {
  ViewProps,
  TextProps,
  ViewStyle,
  Platform,
  StatusBar,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View } from "react-native-ui-lib";
import { color } from "src/theme/color";
interface AppViewI extends ViewProps {
  children: React.ReactNode;
  style: ViewStyle;
  containerStyle: ViewStyle;
}
const ANDROID_SAFEAREA_VIEW: ViewStyle = {
  backgroundColor: color.backgroundGrey,
  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
};

export function AppView(props: AppViewI) {
  const {} = props;
}

function AppViewWithoutScroll(props: AppViewI) {
  const { children, style, containerStyle } = props;
  return (
    <KeyboardAwareScrollView
      style={[ANDROID_SAFEAREA_VIEW, containerStyle]}
      scrollEnabled={false}
    >
      <View style={style}>{children}</View>
    </KeyboardAwareScrollView>
  );
}
function AppViewWithScroll(props: AppViewI) {
  const { children, style, containerStyle } = props;
  return (
    <KeyboardAwareScrollView
      style={[ANDROID_SAFEAREA_VIEW, containerStyle]}
      scrollEnabled
    >
      <View style={style}>{children}</View>
    </KeyboardAwareScrollView>
  );
}

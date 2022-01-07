import { useNavigation } from "@react-navigation/core";
import React from "react";
import { TouchableOpacity, View } from "react-native-ui-lib";
import { color } from "src/theme/color";
import {
  heightScreen,
  onePercentWidth,
  size,
  widthScreen,
} from "src/theme/size";
import { spacingWidth, spacingHeight } from "src/theme/spacing";
import AddNoteIcon from "react-native-vector-icons/Ionicons";
import { ViewStyle } from "react-native";
import { RouteName } from "src/navigation/route-name";
const ADD_NOTE_BUTTON: ViewStyle = {
  ...size.addNoteButton,
  marginRight: spacingWidth[4],
  backgroundColor: color.turquoiseBlue,
  alignItems: "center",
  borderRadius: size.addNoteButton.height / 2,
  justifyContent: "center",
};
export default function FooterNote() {
  const nav = useNavigation();
  return (
    <View
      style={{
        //
        position: "absolute",
        bottom: 0,
        left: 0,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          nav.navigate(RouteName.ADD_NOTE);
        }}
        style={ADD_NOTE_BUTTON}
      >
        <AddNoteIcon name="add" color="white" size={onePercentWidth * 8} />
      </TouchableOpacity>
    </View>
  );
}
const SelectedItemFooter = () => {};

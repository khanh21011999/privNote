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
  position: "absolute",
  right: 0,
  bottom: spacingHeight[5],
  borderRadius: size.addNoteButton.height / 2,
  justifyContent: "center",
};
console.log("footer");
export default function FooterNote() {
  const nav = useNavigation();
  return (
    <View
      style={{
        width: widthScreen,
        height: heightScreen * 0.1,
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

import { useNavigation } from "@react-navigation/core";
import React from "react";
import { TouchableOpacity, View } from "react-native-ui-lib";
import { color } from "../../theme/color";
import {
  heightScreen,
  onePercentWidth,
  size,
  widthScreen,
} from "src/theme/size";
import { spacing } from "../../theme/spacing";
import AddNoteIcon from "react-native-vector-icons/Ionicons";
import { ViewStyle } from "react-native";
const ADD_NOTE_BUTTON: ViewStyle = {
  ...size.addNoteButton,
  marginRight: spacing[4],
  backgroundColor: color.turquoiseBlue,
  alignItems: "center",
  position: "absolute",
  right: 0,
  // bottom: spacing[8],
  borderRadius: size.addNoteButton.height / 2,
  justifyContent: "center",
};
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
          nav.navigate("Add Note");
        }}
        style={ADD_NOTE_BUTTON}
      >
        <AddNoteIcon name="add" color="white" size={onePercentWidth * 8} />
      </TouchableOpacity>
    </View>
  );
}

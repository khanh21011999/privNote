import React from "react";
import { TextInput, TextStyle, ViewStyle } from "react-native";
import { Text, View } from "react-native-ui-lib";
import { fontSize } from "../../theme/fontsize";
import { onePercentWidth, widthScreen } from "../../theme/size";
import { spacing } from "../../theme/spacing";
import { color } from "../../theme/color";

const HEADER_TEXT: TextStyle = {
  fontSize: fontSize.headerFontSize,
  fontWeight: "bold",
  marginLeft: spacing[2],
};
const INPUT_STYLE: ViewStyle = {
  height: 50,
  borderRadius: spacing[4],
  padding: spacing[3],
  backgroundColor: color.lightGrey,
  width: onePercentWidth * 90,
};
const CONTAINER: ViewStyle = {
  marginBottom: spacing[4],
};
export default function HeaderNote() {
  return (
    <View flex style={CONTAINER}>
      <Text style={HEADER_TEXT}>Notes</Text>
      <View centerH>
        <TextInput placeholder={"Search here"} style={INPUT_STYLE} />
      </View>
    </View>
  );
}

import React from "react";
import { TextInput, TextStyle, ViewStyle } from "react-native";
import { Text, View } from "react-native-ui-lib";
import { fontSize } from "../../theme/fontsize";
import { onePercentWidth, widthScreen } from "../../theme/size";

const HEADER_TEXT: TextStyle = {
  fontSize: fontSize.headerFontSize,
};
const INPUT_STYLE: ViewStyle = {
  height: 50,
  borderWidth: 1,
  width: onePercentWidth * 90,
};
export default function HeaderNote() {
  return (
    <View flex>
      <Text style={HEADER_TEXT}>Notes</Text>
      <View centerH>
        <TextInput placeholder={"Search here"} style={INPUT_STYLE} />
      </View>
    </View>
  );
}

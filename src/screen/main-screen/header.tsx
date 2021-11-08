import React from "react";
import { TextInput, TextStyle, ViewStyle } from "react-native";
import { Text, View } from "react-native-ui-lib";
import { fontSize } from "../../theme/font-size";
import { onePercentWidth, size, widthScreen } from "../../theme/size";
import { spacing } from "../../theme/spacing";
import { color } from "../../theme/color";
import ThreeDot from "react-native-vector-icons/Entypo";
const HEADER_TEXT: TextStyle = {
  fontSize: fontSize.headerFontSize,
  fontWeight: "bold",
  marginLeft: spacing[2],
  marginBottom: spacing[2],
};
const INPUT_STYLE: ViewStyle = {
  height: size.headerSearch,
  borderRadius: spacing[4],
  padding: spacing[2],
  width: onePercentWidth * 95,
  backgroundColor: color.lightGrey,
};
const CONTAINER: ViewStyle = {
  marginBottom: spacing[2],
};
export default function HeaderNote() {
  return (
    <View flex style={CONTAINER}>
      <View
        row
        centerV
        style={{
          justifyContent: "space-between",
          paddingHorizontal: spacing[2],
        }}
      >
        <Text style={HEADER_TEXT}>Notes</Text>
        <ThreeDot name="dots-three-vertical" size={onePercentWidth * 5} />
      </View>
      <View centerH>
        <TextInput placeholder={"Search here"} style={INPUT_STYLE} />
      </View>
    </View>
  );
}
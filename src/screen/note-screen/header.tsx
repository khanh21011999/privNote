import React from "react";
import { SafeAreaView, TextInput, TextStyle, ViewStyle } from "react-native";
import { Text, View } from "react-native-ui-lib";
import { fontSize } from "src/theme/font-size";
import { onePercentWidth, size, widthScreen } from "src/theme/size";
import { spacingHeight, spacingWidth } from "src/theme/spacing";
import { color } from "src/theme/color";
import ThreeDot from "react-native-vector-icons/Entypo";
import { Font } from "src/theme/font-name";
const HEADER_TEXT: TextStyle = {
  fontSize: fontSize.headerFontSize,
  color: "black",
  marginLeft: spacingWidth[2],
  marginBottom: spacingHeight[2],
  fontFamily: Font.bold,
};
const INPUT_STYLE: ViewStyle = {
  height: size.headerSearch,
  borderRadius: spacingWidth[4],
  paddingHorizontal: spacingWidth[3],
  width: onePercentWidth * 95,
  backgroundColor: color.lightGrey,
};
const CONTAINER: ViewStyle = {
  marginBottom: spacingHeight[2],
  display: "flex",
};
export default function HeaderNote() {
  return (
    <View style={CONTAINER}>
      <View
        row
        centerV
        style={{
          justifyContent: "space-between",
          paddingHorizontal: spacingWidth[2],
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

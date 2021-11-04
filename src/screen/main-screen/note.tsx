import { View, Text } from "react-native-ui-lib";
import React from "react";
import { TextStyle, ViewStyle } from "react-native";
import { fontSize } from "../../theme/fontsize";
import { spacing } from "../../theme/spacing";

const HEADER_TEXT: TextStyle = {
  fontSize: fontSize.headerNote,
  fontWeight: "600",
};
const NOTE_CONTAINER: ViewStyle = {
  marginTop: spacing[1],
};
const CONTAINER: ViewStyle = {
  margin: spacing[1],
  justifyContent: "space-between",
  display: "flex",
  flex: 1,
};
export default function Note() {
  return (
    <View style={CONTAINER}>
      <View>
        <Text style={HEADER_TEXT}>Header</Text>
        <View style={NOTE_CONTAINER}>
          <Text>What inside here is the note</Text>
        </View>
      </View>
      <View style={{ alignSelf: "flex-end" }}>
        <Text>this is footer</Text>
      </View>
    </View>
  );
}

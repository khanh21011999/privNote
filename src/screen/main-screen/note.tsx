import { View, Text } from "react-native-ui-lib";
import React from "react";
import { TextStyle, ViewStyle } from "react-native";
import { fontSize } from "../../theme/fontsize";
import { spacing } from "../../theme/spacing";
import { TouchableOpacity } from "react-native-gesture-handler";

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
export interface NoteItemI {
  note: string;
  header: string;
}
export default function Note(props: NoteItemI) {
  const { note, header } = props;
  console.log("header", header);
  return (
    <View style={CONTAINER}>
      <View>
        <Text style={HEADER_TEXT}>{header}</Text>
        <View style={NOTE_CONTAINER}>
          <Text numberOfLines={7}>{note}</Text>
        </View>
      </View>
      <View style={{ alignSelf: "flex-end" }}>
        <Text>this is footer</Text>
      </View>
    </View>
  );
}

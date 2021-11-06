import { Text, View } from "react-native-ui-lib";

import React from "react";
import { ViewStyle } from "react-native";
import { size } from "../../theme/size";
import { spacing } from "../../theme/spacing";
import Note from "./note";
import { TouchableOpacity } from "react-native-ui-lib";
import { color } from "../../theme/color";
export interface noteListI {
  title?: string;
  note?: string;
  id?: number;
}
const CONTAINER: ViewStyle = {
  ...size.noteSize,
  backgroundColor: color.capeHoney,
  flex: 1 / 2,
  padding: spacing[3],
  borderRadius: spacing[3],
  margin: spacing[2],
};
export default function NoteList(props: noteListI) {
  const { title, note, id } = props;

  return (
    <View>
      <TouchableOpacity flex style={CONTAINER}>
        <Note note={note} header={title} />
      </TouchableOpacity>
    </View>
  );
}

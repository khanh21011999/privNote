import { Text, View } from "react-native-ui-lib";

import React from "react";
import { ViewStyle } from "react-native";
import { size } from "../../theme/size";
import { spacing } from "../../theme/spacing";
import Note from "./note";
export interface noteListI {
  title?: string;
  note?: string;
  id?: number;
}
const CONTAINER: ViewStyle = {
  ...size.noteSize,
  borderWidth: 1,
  flex: 1 / 2,
  margin: spacing[2],
};
export default function NoteList(props: noteListI) {
  const { title, note, id } = props;

  return (
    <View>
      <View flex style={CONTAINER}>
        <Note />
      </View>
    </View>
  );
}

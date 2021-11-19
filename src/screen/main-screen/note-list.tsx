import { Text, View } from "react-native-ui-lib";

import React from "react";
import { ViewStyle } from "react-native";
import { size } from "../../theme/size";
import { spacing } from "../../theme/spacing";
import Note from "./note";
import { TouchableOpacity } from "react-native-ui-lib";
import { color } from "../../theme/color";
import { useNavigation } from "@react-navigation/core";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { On } from "../../redux/toggle-reducer";
export interface noteListI {
  title?: string;
  note?: string;
  id?: Date;
  date?: Date;
}
const CONTAINER: ViewStyle = {
  ...size.noteSize,
  backgroundColor: color.capeHoney,
  flex: 1 / 2,

  padding: spacing[3],
  borderRadius: spacing[3],
  // margin: spacing[2],
};
export default function NoteList(props: noteListI) {
  const { title, note, id, date } = props;
  const nav = useNavigation();
  console.log("DaTe", new Date(date).getFullYear());
  const onNavDetail = () => {
    nav.navigate("Edit note", {
      date: date,
      note: note,
      header: title,
      id: id,
    });
  };
  const dispatch: AppDispatch = useDispatch();
  const toggleDeleteButton = () => {
    dispatch(On());
  };
  return (
    <View>
      <TouchableOpacity
        onLongPress={() => {
          toggleDeleteButton();
          console.log("is clicked");
        }}
        flex
        style={CONTAINER}
        onPress={onNavDetail}
      >
        <Note note={note} header={title} date={date} id={id} />
      </TouchableOpacity>
    </View>
  );
}

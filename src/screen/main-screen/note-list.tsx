import { Text, View } from "react-native-ui-lib";

import React, { useState } from "react";
import { ViewStyle } from "react-native";
import { size } from "../../theme/size";
import { spacing } from "../../theme/spacing";
import Note from "./note";
import { TouchableOpacity } from "react-native-ui-lib";
import { color } from "../../theme/color";
import { useNavigation } from "@react-navigation/core";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "../../redux/toggle-reducer";
import { toggleDelete } from "../../redux/noteList-reducer";
export interface noteListI {
  title?: string;
  note?: string;
  id?: Date;
  date?: Date;
  deleteStatus?: boolean;
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
  const { title, note, id, date } = props;
  const [deleteStatus, setDeleteStatus] = useState(false);
  const nav = useNavigation();
  const toggleDeleteStatus = useSelector(
    (state: RootState) => state.toggle.enableSelectedButton
  );

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
    dispatch(Switch());
  };
  const toggleDeleteValue = () => {
    console.log("turn on");
    dispatch(toggleDelete({ id: id }));
  };
  return (
    <View>
      <TouchableOpacity
        onLongPress={() => {
          toggleDeleteButton();
          setDeleteStatus(false);
        }}
        // flex
        style={CONTAINER}
        onPress={() =>
          !toggleDeleteStatus ? onNavDetail() : setDeleteStatus(!deleteStatus)
        }
      >
        <Note
          note={note}
          header={title}
          date={date}
          id={id}
          deleteStatus={deleteStatus}
        />
      </TouchableOpacity>
    </View>
  );
}

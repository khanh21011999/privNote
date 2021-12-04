import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import React, { useEffect, useState } from "react";
import { Alert, TextStyle, ViewStyle } from "react-native";
import { fontSize } from "../../theme/font-size";
import { spacing } from "../../theme/spacing";
import Trash from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { defaultToggle, Off, On } from "../../redux/toggle-reducer";
import {
  removeNote,
  toggleDelete,
  unSelectDelete,
} from "../../redux/noteList-reducer";
import CheckIcon from "react-native-vector-icons/AntDesign";
import { size } from "../../theme/size";
const HEADER_TEXT: TextStyle = {
  fontSize: fontSize.headerNote,
  fontWeight: "600",
};
const NOTE_CONTAINER: ViewStyle = {
  marginTop: spacing[1],
};
const HEADER_CONTAINER: ViewStyle = {
  justifyContent: "space-between",
};
const CONTAINER: ViewStyle = {
  margin: spacing[1],
  justifyContent: "space-between",
  display: "flex",
  flex: 1,
};
export interface NoteItemI {
  note?: string;
  header?: string;
  date?: Date;
  id?: Date;
  deleteStatus?: boolean;
}
export default function Note(props: NoteItemI) {
  const { note, header, date, id, deleteStatus } = props;
  const [isDeleteChecked, setDeleteChecked] = useState(false);
  const dispatch = useDispatch();
  const toggleDeleteStatus = useSelector(
    (state: RootState) => state.toggle.enableSelectedButton
  );

  // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => {
  //   dispatch(defaultToggle());
  // });

  const deleteNote = () => {
    dispatch(removeNote({ id: id }));
  };
  console.log("deleteStatus", deleteStatus);

  const dateFormat = new Date(date);
  const showDate = dateFormat.toLocaleString("default", {
    month: "short",
    day: "2-digit",
  });

  return (
    <View style={CONTAINER}>
      <View>
        <View row centerV style={HEADER_CONTAINER}>
          <Text style={HEADER_TEXT}>{header}</Text>

          {toggleDeleteStatus && (
            <TouchableOpacity
              onPress={() => {
                // setDeleteChecked(!isDeleteChecked);
              }}
            >
              {deleteStatus ? (
                <CheckIcon name="checkcircle" size={size.iconSize} />
              ) : (
                <CheckIcon name="checkcircleo" size={size.iconSize} />
              )}
            </TouchableOpacity>
          )}
        </View>

        <View style={NOTE_CONTAINER}>
          <Text numberOfLines={7}>{note}</Text>
        </View>
      </View>
      <View
        style={{
          alignSelf: "flex-end",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text>{moment().format("h:mma MMM Do YY")}</Text>
      </View>
    </View>
  );
}

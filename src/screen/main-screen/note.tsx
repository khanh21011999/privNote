import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import React, { useState } from "react";
import { Alert, TextStyle, ViewStyle } from "react-native";
import { fontSize } from "../../theme/font-size";
import { spacing } from "../../theme/spacing";
import Trash from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Off, On } from "../../redux/toggle-reducer";
import { removeNote } from "../../redux/noteList-reducer";
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
  note: string;
  header: string;
  date?: Date;
  id?: Date;
}
export default function Note(props: NoteItemI) {
  const { note, header, date, id } = props;
  const [isDeleteChecked, setDeleteChecked] = useState(false);

  const toggleDeleteStatus = useSelector(
    (state: RootState) => state.toggle.enableSelectedButton
  );
  const dispatch = useDispatch();
  const deleteNote = () => {
    dispatch(removeNote({ id: id }));
  };
  const turnOffDeleteToggle = () => {
    dispatch(Off());
  };
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
                setDeleteChecked(!isDeleteChecked);
              }}
            >
              {isDeleteChecked ? (
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
        {toggleDeleteStatus && (
          <TouchableOpacity
            onLongPress={() => {
              Alert.alert("delete", "item deleted", [
                {
                  text: "ok",
                  style: "cancel",
                },
              ]);
            }}
          >
            <Trash name="trash-o" size={20} />
          </TouchableOpacity>
        )}
        <Text>{`${showDate}, ${dateFormat.getFullYear()} ${dateFormat?.getHours()}:${dateFormat?.getMinutes()} `}</Text>
      </View>
    </View>
  );
}

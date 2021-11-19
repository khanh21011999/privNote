import { SafeAreaView } from "react-native";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { TextInput, TextStyle, ViewStyle } from "react-native";
import { fontSize } from "../../theme/font-size";
import { spacing } from "../../theme/spacing";
import { onePercentHeight, onePercentWidth } from "../../theme/size";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addNote, editNote } from "../../redux/noteList-reducer";
import { color } from "../../theme/color";
import BackArrow from "react-native-vector-icons/AntDesign";
const ADD_NOTE_HEADER: TextStyle = {
  fontSize: fontSize.headerFontSize,
};
const HEADER_INPUT: TextStyle = {
  height: 4 * onePercentHeight,
  fontSize: fontSize.headerInputNote,
};
const SAVE_NOTE_BT: TextStyle = {
  fontWeight: "bold",
};
const NOTE_INPUT: TextStyle = {
  height: 80 * onePercentHeight,
};
const HEADER: ViewStyle = {
  justifyContent: "space-between",
  marginBottom: spacing[3],
};
export interface EditNoteI {
  note?: string;
  date?: Date;
  header: string;
}
export default function EditNote() {
  const nav = useNavigation();
  const route = useRoute();

  const { date, note, header, id } = route.params;
  const [noteEdit, setNoteEdit] = useState(note);
  const [noteHeader, setNoteHeader] = useState(header);
  const dispatch: AppDispatch = useDispatch();
  const editNoteFunc = () => {
    dispatch(
      editNote({
        date: new Date(),
        header: noteHeader,
        note: noteEdit,
        id: id,
      })
    );
  };
  const saveAndNavBack = () => {
    editNoteFunc();
    nav.goBack();
  };
  return (
    <SafeAreaView style={{ margin: spacing[3] }}>
      <View row centerV style={HEADER}>
        <TouchableOpacity onPress={() => nav.goBack()}>
          <BackArrow name="arrowleft" size={onePercentWidth * 6} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            saveAndNavBack();
          }}
        >
          <Text style={SAVE_NOTE_BT}>Save</Text>
        </TouchableOpacity>
      </View>
      <View flex style={{ height: 400 }}>
        <TextInput
          onChangeText={(text) => setNoteHeader(text)}
          value={noteHeader}
          placeholder="Meaningful header"
          style={HEADER_INPUT}
        />
        <TextInput
          onChangeText={(text) => setNoteEdit(text)}
          placeholder="Type your secret here..."
          value={noteEdit}
          multiline
          style={NOTE_INPUT}
        />
      </View>
    </SafeAreaView>
  );
}

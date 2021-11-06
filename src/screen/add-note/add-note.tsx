import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { TextInput, TextStyle, ViewStyle } from "react-native";
import { fontSize } from "../../theme/fontsize";
import { spacing } from "../../theme/spacing";
import { onePercentHeight } from "../../theme/size";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addNote } from "../../redux/reducer";

const ADD_NOTE_HEADER: TextStyle = {
  fontSize: fontSize.headerFontSize,
};
const HEADER_INPUT: ViewStyle = {
  borderWidth: 1,

  height: 4 * onePercentHeight,
};
const NOTE_INPUT: ViewStyle = {
  borderWidth: 1,
  height: 80 * onePercentHeight,
};
export default function AddNote() {
  const nav = useNavigation();
  const [noteAdd, setAddNote] = useState("");
  const [noteHeader, setNoteHeader] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const addNoteFunc = () => {
    dispatch(addNote({ note: noteAdd, header: noteHeader }));
  };
  const saveAndNavBack = () => {
    addNoteFunc();
    nav.goBack();
  };
  return (
    <SafeAreaView style={{ margin: spacing[3] }}>
      <View row centerV style={{ justifyContent: "space-between" }}>
        <Text style={ADD_NOTE_HEADER}>Add notes</Text>
        <TouchableOpacity
          onPress={() => {
            saveAndNavBack();
          }}
        >
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
      <View flex style={{ height: 400 }}>
        <TextInput
          onChangeText={(text) => setNoteHeader(text)}
          value={noteHeader}
          placeholder="note header"
          style={HEADER_INPUT}
        />
        <TextInput
          onChangeText={(text) => setAddNote(text)}
          placeholder="type your secret here..."
          value={noteAdd}
          multiline
          style={NOTE_INPUT}
        />
      </View>
    </SafeAreaView>
  );
}

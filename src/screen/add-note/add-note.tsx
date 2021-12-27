import { Platform, SafeAreaView } from "react-native";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { TextInput, TextStyle, ViewStyle } from "react-native";
import { fontSize } from "src/theme/font-size";
import { spacingHeight, spacingWidth } from "src/theme/spacing";
import { onePercentHeight, onePercentWidth } from "src/theme/size";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/redux/store";
import { addNote } from "src/redux/noteList-reducer";
import { color } from "src/theme/color";
import BackArrow from "react-native-vector-icons/AntDesign";
const ADD_NOTE_HEADER: TextStyle = {
  fontSize: fontSize.headerFontSize,
};
const HEADER_INPUT: TextStyle = {
  height: 6 * onePercentHeight,
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
  marginBottom: spacingHeight[3],
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
    <SafeAreaView style={{ margin: spacingWidth[3] }}>
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
      <View>
        <View>
          <TextInput
            onChangeText={(text) => setNoteHeader(text)}
            value={noteHeader}
            placeholder="Meaningful header"
            style={HEADER_INPUT}
          />
        </View>
        <View>
          <TextInput
            textAlignVertical={Platform.OS === "android" ? "top" : ""}
            onChangeText={(text) => setAddNote(text)}
            placeholder="Type your secret here..."
            value={noteAdd}
            multiline
            style={NOTE_INPUT}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

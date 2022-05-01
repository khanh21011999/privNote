import { Platform, SafeAreaView } from "react-native";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { TextInput, TextStyle, ViewStyle } from "react-native";
import { fontSize } from "src/theme/font-size";
import { spacingHeight, spacingWidth } from "src/theme/spacing";
import { onePercentHeight, onePercentWidth } from "src/theme/size";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import {
  addNote,
  addNoteToFirestore,
  fetchNote,
} from "src/redux/noteList-reducer";
import { color } from "src/theme/color";
import BackArrow from "react-native-vector-icons/AntDesign";
import { user } from "src/constants/type";
import { firebase } from "@react-native-firebase/firestore";
import { Font } from "src/theme/font-name";
import { switchReloadOff, switchReloadOn } from "src/redux/toggle-reducer";
const ADD_NOTE_HEADER: TextStyle = {
  fontSize: fontSize.headerFontSize,
};
const HEADER_INPUT: TextStyle = {
  fontSize: fontSize.headerInputNote,
  fontFamily: Font.bold,
  color: color.darkGrey,
};
const SAVE_NOTE_BT: TextStyle = {
  fontWeight: "bold",
};
const NOTE_INPUT: TextStyle = {
  fontSize: fontSize.noteInput,
  fontFamily: Font.regular,
};
const HEADER: ViewStyle = {
  justifyContent: "space-between",
  marginBottom: spacingHeight[3],
};
export default function AddNote() {
  const nav = useNavigation();
  const [headerValue, setHeaderValue] = useState("");
  const [notes, setNotes] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const userInfo: user = useSelector(
    (state: RootState) => state.persistedReducer.firebase.userInfomation
  );
  const saveAndNavBack = () => {
    addNoteToFirestore();
    dispatch(fetchNote(userInfo.email));
    nav.goBack();
  };
  const addNoteToFirestore = () => {
    firebase
      .firestore()
      .collection("Users")
      .doc(userInfo.email)
      .update({
        note: firebase.firestore.FieldValue.arrayUnion({
          id:
            new Date().getTime().toString() +
            Math.floor(
              Math.random() * Math.floor(new Date().getTime())
            ).toString(),
          header: headerValue,
          note: notes,
          date: new Date(),
          selectStatus: false,
          checkList: [],
        }),
      });
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
            dispatch(switchReloadOn());
            dispatch(fetchNote(userInfo.email)).then(() =>
              dispatch(switchReloadOff())
            );
          }}
        >
          <Text style={SAVE_NOTE_BT}>Save</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View>
          <TextInput
            onChangeText={(text) => setHeaderValue(text)}
            value={headerValue}
            placeholder="Meaningful header"
            style={HEADER_INPUT}
          />
        </View>
        <View>
          <TextInput
            textAlignVertical={Platform.OS === "android" ? "top" : ""}
            onChangeText={(text) => setNotes(text)}
            placeholder="Type your secret here..."
            value={notes}
            multiline
            style={NOTE_INPUT}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

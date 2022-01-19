import { SafeAreaView, ScrollView } from "react-native";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { TextInput, TextStyle, ViewStyle } from "react-native";
import { fontSize } from "src/theme/font-size";
import { spacingWidth, spacingHeight } from "src/theme/spacing";
import { onePercentHeight, onePercentWidth } from "src/theme/size";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { addNote, editNote, fetchNote } from "src/redux/noteList-reducer";
import { color } from "src/theme/color";
import BackArrow from "react-native-vector-icons/AntDesign";
import { RouteName } from "src/navigation/route-name";
import InputScrollView from "react-native-input-scroll-view";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "@react-native-firebase/firestore";
import { ConstantString, user } from "src/constants/type";
import { switchReloadOff, switchReloadOn } from "src/redux/toggle-reducer";
const ADD_NOTE_HEADER: TextStyle = {
  fontSize: fontSize.headerFontSize,
};
const PLACEhHOLDER: ViewStyle = {};
const HEADER_INPUT: TextStyle = {
  fontSize: fontSize.headerInputNote,
};
const SAVE_NOTE_BT: TextStyle = {
  fontWeight: "bold",
};
const NOTE_INPUT: TextStyle = {
  fontSize: 30,
};
const HEADER: ViewStyle = {
  justifyContent: "space-between",
  marginBottom: spacingHeight[3],
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
  const data = useSelector((state: RootState) => state.persistedReducer.note);
  const userInfo: user = useSelector(
    (state: RootState) => state.persistedReducer.firebase.userInfomation
  );
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

  const editAndSaveFirebase = () => {
    firebase
      .firestore()
      .collection(ConstantString.user)
      .doc(userInfo.email)
      .update({
        note: data.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              note: noteEdit,
              header: noteHeader,
              date: date,
            };
          }
          return item;
        }),
      });
  };
  // const saveAndNavBack = () => {
  //   editNoteFunc();
  //   nav.goBack();
  // };
  return (
    <SafeAreaView style={{ margin: spacingWidth[3] }}>
      <View row centerV style={HEADER}>
        <TouchableOpacity onPress={() => nav.goBack()}>
          <BackArrow name="arrowleft" size={onePercentWidth * 6} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            editAndSaveFirebase();
            nav.goBack();
            dispatch(switchReloadOn());
            dispatch(fetchNote(userInfo.email)).then(() =>
              dispatch(switchReloadOff())
            );
            // saveAndNavBack();
          }}
        >
          <Text style={SAVE_NOTE_BT}>Save</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        onChangeText={(text) => setNoteHeader(text)}
        value={noteHeader}
        placeholder="Meaningful header"
        style={HEADER_INPUT}
      />
      <InputScrollView>
        <TextInput
          textAlignVertical={Platform.OS === "android" ? "top" : ""}
          onChangeText={(text) => setNoteEdit(text)}
          placeholder="Type your secret here..."
          value={noteEdit}
          multiline
          style={NOTE_INPUT}
        />
      </InputScrollView>
    </SafeAreaView>
  );
}

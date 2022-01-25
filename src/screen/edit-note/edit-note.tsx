import {
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { TextInput, TextStyle, ViewStyle } from "react-native";
import { fontSize } from "src/theme/font-size";
import { spacingHeight } from "src/theme/spacing";
import { onePercentWidth } from "src/theme/size";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { editNote, fetchNote } from "src/redux/noteList-reducer";
import { color } from "src/theme/color";
import BackArrow from "react-native-vector-icons/AntDesign";
import InputScrollView from "react-native-input-scroll-view";
import { firebase } from "@react-native-firebase/firestore";
import { ConstantString, user } from "src/constants/type";
import { switchReloadOff, switchReloadOn } from "src/redux/toggle-reducer";
import { Font } from "src/theme/font-name";
import LottieView from "lottie-react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { spacingWidth } from "../../theme/spacing";
import AnimatedLottieView from "lottie-react-native";
const HEADER_INPUT: TextStyle = {
  fontSize: fontSize.headerInputNote,
  fontFamily: Font.bold,
  color: color.darkGrey,
};
const SAVE_NOTE_BT: TextStyle = {
  fontWeight: "bold",
};
const HEADER: ViewStyle = {
  justifyContent: "space-between",
  marginBottom: spacingHeight[3],
};
const CHECKBOX_CONTAINER: ViewStyle = {
  padding: spacingWidth[5],
};
export interface EditNoteI {
  note?: string;
  date?: Date;
  header: string;
}
export default function EditNote() {
  const nav = useNavigation();
  const route = useRoute();
  const [check, setCheck] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [changeSelect, setChangeSelect] = useState(false);
  const [countFocus, setCountFocus] = useState(0);
  const { date, note, header, id } = route.params;
  const animation = useRef<LottieView>(null);
  const [hideCaret, setHideCaret] = useState(true);
  const [textCheck, setTextCheck] = useState(false);
  const [hideKeyboard, setHideKeyboard] = useState(false);
  const [noteEdit, setNoteEdit] = useState(note);
  const [arrayOfItem, setArrayofItem] = useState<string[]>(["sample"]);
  const [startPos, setStart] = useState(0);
  const [endPos, setEnd] = useState(0);
  const data = useSelector((state: RootState) => state.persistedReducer.note);
  const userInfo: user = useSelector(
    (state: RootState) => state.persistedReducer.firebase.userInfomation
  );
  const [noteHeader, setNoteHeader] = useState(header);
  const dispatch: AppDispatch = useDispatch();

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
  // }

  const changeAnimation = () => {
    if (check === false) {
      animation.current?.play(20, 60);
    } else if (check === true) {
      animation.current?.play(100, 160);
    }
  };
  const arrayOfItem1 = ["adasdsa"];
  const animationJson = require("assets/animation/checkbox.json");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View row centerV style={HEADER}>
        <TouchableOpacity onPress={() => nav.goBack()}>
          <BackArrow name="arrowleft" size={onePercentWidth * 6} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            editAndSaveFirebase();
            setChangeSelect(false);
            setHideCaret(true);
            setStart(0);
            setEnd(0);
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
      {Platform.OS === "ios" ? (
        <InputScrollView>
          {/* <TextInput
            autoFocus
            scrollEnabled={false}
            textAlignVertical={Platform.OS === "android" ? "top" : ""}
            onChangeText={(text) => setNoteEdit(text)}
            placeholder="Type your secret here..."
            value={noteEdit}
            multiline
            style={NOTE_INPUT}
          /> */}

          {arrayOfItem.map((item, index) => {
            return (
              <View row centerV style={CHECKBOX_CONTAINER}>
                <TouchableOpacity
                  onPress={() => {
                    setCheck(!check);
                    changeAnimation();
                  }}
                >
                  <LottieView
                    ref={animation}
                    onAnimationFinish={() => setTextCheck(!textCheck)}
                    style={{ width: 30, height: 30 }}
                    source={animationJson}
                    // autoPlay
                    // loop
                    autoPlay={false}
                    loop={false}
                  />
                </TouchableOpacity>
                <TextInput
                  value={item}
                  style={{
                    textDecorationLine: textCheck ? "line-through" : "none",
                    paddingLeft: spacingWidth[3],
                    fontSize: 15,
                    fontFamily: Font.regular,
                  }}
                />
              </View>
            );
          })}

          <TouchableOpacity
            onPress={() => {
              const a: string = "sample Text";
              setArrayofItem([...arrayOfItem, a]);
            }}
          >
            <Text>Add more</Text>
          </TouchableOpacity>

          {/* <LottieView source={animation} autoPlay loop /> */}
        </InputScrollView>
      ) : (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView>
            {/* <TextInput
              selection={isFocused ? undefined : { start: 0 }}
              onFocus={() => {
                setIsFocused(true);
              }}
              onBlur={() => {
                setIsFocused(false);
              }}
              onSelectionChange={() => {
                setCountFocus(countFocus + 1);
                setIsFocused(true);
              }}
              caretHidden={countFocus === 1 ? true : false}
              showSoftInputOnFocus={isFocused}
              scrollEnabled={false}
              autoFocus
              textAlignVertical={Platform.OS === "android" ? "top" : ""}
              onChangeText={(text) => setNoteEdit(text)}
              placeholder="Type your secret here..."
              multiline
              value={noteEdit}
              style={NOTE_INPUT}
            /> */}
            {/* <LottieView
              style={{ width: 100, height: 100 }}
              source={require("./checkbox.json")}
              autoPlay
              loop
            /> */}
          </ScrollView>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
}

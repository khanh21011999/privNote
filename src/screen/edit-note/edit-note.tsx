import { Platform, SafeAreaView, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { TextInput, TextStyle, ViewStyle } from 'react-native';
import { fontSize } from 'src/theme/font-size';
import { spacingHeight } from 'src/theme/spacing';
import { onePercentWidth } from 'src/theme/size';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';
import { checkListI, fetchNote } from 'src/redux/noteList-reducer';
import { color } from 'src/theme/color';
import BackArrow from 'react-native-vector-icons/AntDesign';
import InputScrollView from 'react-native-input-scroll-view';
import { firebase } from '@react-native-firebase/firestore';
import { ConstantString, user } from 'src/constants/type';
import { switchReloadOff, switchReloadOn } from 'src/redux/toggle-reducer';
import { Font } from 'src/theme/font-name';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStateParamList } from 'src/navigation/note-navigator';
import { RouteName } from 'src/navigation/route-name';
import { CheckBoxList } from './checkbox-list';
const HEADER_INPUT: TextStyle = {
    fontSize: fontSize.headerInputNote,
    fontFamily: Font.bold,
    color: color.darkGrey,
};
const SAVE_NOTE_BT: TextStyle = {
    fontWeight: 'bold',
    color: color.darkGrey
};
const HEADER: ViewStyle = {
    justifyContent: 'space-between',
    marginBottom: spacingHeight[3],
};

const NOTE: TextStyle = {
    fontSize: fontSize.noteInput,
    fontFamily: Font.regular,
    color: color.darkGrey,
};
export interface EditNoteI {
  note?: string;
  date?: Date;
  checklist?: checkListI[];
  header: string;
}
const NOTE_INPUT: TextStyle = {
    fontSize: fontSize.noteInput,
    fontFamily: Font.regular,
    color: color.darkGrey,
};
export type PropsType = NativeStackScreenProps<
  RootStateParamList,
  RouteName.EDIT_NOTE
>;

export default function EditNote() {
    const nav = useNavigation();
    const route = useRoute<RouteProp<RootStateParamList, RouteName.EDIT_NOTE>>();

    const [isFocused, setIsFocused] = useState(false);
    const [changeSelect, setChangeSelect] = useState(false);
    const [countFocus, setCountFocus] = useState(0);
    const { date, note, header, id, checklist } = route.params;
    const [hideCaret, setHideCaret] = useState(true);
    const [textCheck, setTextCheck] = useState(false);
    const [hideKeyboard, setHideKeyboard] = useState(false);
    const [noteEdit, setNoteEdit] = useState(note);

    const [arrayOfChecklist, setArrayofChecklist] = useState<
    checkListI[] | undefined
  >(checklist);
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
                            checkList: arrayOfChecklist,
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.backgroundGrey }}>
            <View row centerV style={HEADER}>
                <TouchableOpacity onPress={() => nav.goBack()}>
                    <BackArrow name="arrowleft" size={onePercentWidth * 6 } color={color.black} />
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
            {Platform.OS === 'ios' ? (
                <InputScrollView>
                    <TextInput
                        autoFocus
                        scrollEnabled={false}
                        textAlignVertical={Platform.OS === 'android' ? 'top' : ''}
                        onChangeText={(text) => setNoteEdit(text)}
                        placeholder="Type your secret here..."
                        value={noteEdit}
                        multiline
                        style={NOTE_INPUT}
                    />
                    {/* {arrayOfChecklist?.map((item, index) => {
            return (
              <View key={index} row centerV style={CHECKBOX_CONTAINER}>
                <TouchableOpacity
                  onPress={() => {
                    const editedCheckList = arrayOfChecklist?.map(
                      (itemArr, indexArr) => {
                        if (indexArr === index) {
                          // setCheck(!check);

                          return {
                            ...itemArr,
                            isCheck: !item.isCheck,
                          };
                        }
                        return itemArr;
                      }
                    );
                    setArrayofChecklist(editedCheckList);
                  }}
                >
                  <Icon
                    name={
                      item.isCheck === true
                        ? "check-box"
                        : "check-box-outline-blank"
                    }
                    size={size.noteCheckSize}
                  />
                </TouchableOpacity>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                  <TextInput
                    placeholder="new check list"
                    defaultValue={item.item}
                    onChangeText={(text) => {
                      const editedCheckList = arrayOfChecklist?.map(
                        (itemArr, indexArr) => {
                          if (indexArr === index) {
                            return {
                              ...itemArr,
                              item: text,
                            };
                          }
                          return itemArr;
                        }
                      );
                      setArrayofChecklist(editedCheckList);
                    }}
                    style={{
                      textDecorationLine: check ? "line-through" : "none",
                      paddingLeft: spacingWidth[3],
                      fontSize: 15,
                      fontFamily: Font.regular,
                    }}
                  />
                </TouchableWithoutFeedback>
              </View>
            );
          })} */}

                    {/* <TouchableOpacity
                        onPress={() => {
                            const newChecklist: checkListI = {
                                item: '',
                                isCheck: false,
                            };
                            setArrayofChecklist([...arrayOfChecklist, newChecklist]);
                        }}
                    >
                        <Text>Add more</Text>
                    </TouchableOpacity> */}

                    {/* <LottieView source={animation} autoPlay loop /> */}
                </InputScrollView>
            ) : (
                <ScrollView>
                    <TextInput
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
                        textAlignVertical={Platform.OS === 'android' ? 'top' : ''}
                        onChangeText={(text) => setNoteEdit(text)}
                        placeholder="Type your secret here..."
                        multiline
                        value={noteEdit}
                        style={NOTE}
                    />
                    {/* <LottieView
              style={{ width: 100, height: 100 }}
              source={require("./checkbox.json")}
              autoPlay
              loop
            /> */}
                    <CheckBoxList
                        listCheckBox={checklist}
                        setArrayOfCheckList={setArrayofChecklist}
                    />
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

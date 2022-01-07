import { Text, View } from "react-native-ui-lib";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ViewStyle, TouchableOpacity, TextStyle } from "react-native";
import { size } from "src/theme/size";
import { spacingWidth, spacingHeight } from "src/theme/spacing";
import Note from "./note";

import { color } from "src/theme/color";
import { useNavigation } from "@react-navigation/core";
import { AppDispatch, RootState } from "src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { switchToggle } from "src/redux/toggle-reducer";
import {
  fetchNote,
  NoteI,
  removeNote,
  toggleSelect,
} from "src/redux/noteList-reducer";
import { RouteName } from "src/navigation/route-name";
import firestore, { firebase } from "@react-native-firebase/firestore";
import { ConstantString, user } from "src/constants/type";
import { fontSize } from "src/theme/font-size";
import moment from "moment";
import CheckIcon from "react-native-vector-icons/AntDesign";
export interface noteListI {
  title?: string;
  note?: string;
  id?: Date;
  date?: Date;
  deleteStatus?: boolean;
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.lightYellow,
  padding: spacingWidth[3],
  borderRadius: spacingWidth[3],
  margin: spacingWidth[4],
  marginVertical: spacingHeight[1],
};
const HEADER_TEXT: TextStyle = {
  fontSize: fontSize.headerNote,
  fontWeight: "600",
};
const NOTE_CONTAINER: ViewStyle = {
  marginTop: spacingHeight[1],
};
const HEADER_CONTAINER: ViewStyle = {
  justifyContent: "space-between",
};
const NOTE_ITEM_CONTAINER: ViewStyle = {
  margin: spacingWidth[1],
  justifyContent: "space-between",
  display: "flex",
  flex: 1,
};
export default function NoteList(props: noteListI) {
  const { title, note, id, date } = props;

  let updatedUser: NoteI[] = [];
  const currentNote = useRef<NoteI[]>();
  const mounted = useRef(false);
  const [selectedButtonStatus, setSelectedButtonStatus] = useState(false);
  const nav = useNavigation();
  const [isDeleteChecked, setDeleteChecked] = useState(false);
  const dispatch = useDispatch();
  const userInfo: user = useSelector(
    (state: RootState) => state.persistedReducer.firebase.userInfomation
  );
  const data = useSelector((state: RootState) => state.persistedReducer.note);
  const toggleSelectedButton = useSelector(
    (state: RootState) => state.toggle.enableSelectedButton
  );
  useEffect(() => {
    currentNote.current = data;
  }, [data]);
  const onNavDetail = () => {
    nav.navigate(RouteName.EDIT_NOTE, {
      date: date,
      note: note,
      header: title,
      id: id,
    });
  };
  const toggleDeleteStatus = useSelector(
    (state: RootState) => state.toggle.enableSelectedButton
  );
  const updateDeletedNoteFirebase = () => {
    firestore()
      .collection(ConstantString.user)
      .doc(userInfo.email)
      .update({
        note: data.filter(
          (item) => JSON.stringify(item.id) !== JSON.stringify(id)
        ),
      })
      .then(() => {
        console.log("delete success");
      });
  };
  // const removeSelectedNote = () => {
  //   dispatch(removeNote({ id: id }));
  // };
  const toggleDeleteButton = () => {
    dispatch(switchToggle());
  };
  const toggleSelectStatus = () => {
    dispatch(toggleSelect({ id: id }));
  };
  const setEnableToggle = () => {
    setSelectedButtonStatus(!selectedButtonStatus);
    toggleSelectStatus();
  };

  // const newData = useCallback(() => {
  //   setCurrentNote(data);
  // }, [note]);
  return (
    <View>
      <TouchableOpacity
        onLongPress={() => {
          toggleDeleteButton();
          setSelectedButtonStatus(true);
          toggleSelectStatus();
          // removeSelectedNote();
          // console.log("Data", currentNote);
          // getNote();
          // updateDeletedNoteFirebase();
          // dispatch(fetchNote(userInfo.email));
        }}
        // flex
        style={CONTAINER}
        onPress={() =>
          !toggleSelectedButton
            ? onNavDetail()
            : setDeleteChecked(!isDeleteChecked)
        }
      >
        <View style={NOTE_ITEM_CONTAINER}>
          <View>
            <View row centerV style={HEADER_CONTAINER}>
              <Text style={HEADER_TEXT}>{title}</Text>

              {toggleDeleteStatus && (
                <TouchableOpacity onPress={() => {}}>
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
            <Text>{moment(date).format("h:mmA MMM Do YY")}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

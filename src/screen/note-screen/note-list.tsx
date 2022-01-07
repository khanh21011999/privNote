import { Text, View } from "react-native-ui-lib";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ViewStyle, TouchableOpacity } from "react-native";
import { size } from "src/theme/size";
import { spacingWidth, spacingHeight } from "src/theme/spacing";
import Note from "./note";

import { color } from "src/theme/color";
import { useNavigation } from "@react-navigation/core";
import { AppDispatch, RootState } from "src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { switchToggle } from "src/redux/toggle-reducer";
import { NoteI, removeNote, toggleSelect } from "src/redux/noteList-reducer";
import { RouteName } from "src/navigation/route-name";
import firestore, { firebase } from "@react-native-firebase/firestore";
import { user } from "src/constants/type";

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
export default function NoteList(props: noteListI) {
  const { title, note, id, date } = props;
  const [currentNote, setCurrentNote] = useState<NoteI[]>();
  const currentDate = useRef<NoteI[]>();
  const [selectedButtonStatus, setSelectedButtonStatus] = useState(false);
  const nav = useNavigation();
  const dispatch = useDispatch();
  const userInfo: user = useSelector(
    (state: RootState) => state.persistedReducer.firebase.userInfomation
  );
  const data = useSelector((state: RootState) => state.persistedReducer.note);
  const toggleSelectedButton = useSelector(
    (state: RootState) => state.toggle.enableSelectedButton
  );

  useEffect(() => {
    currentDate.current = data;
  }, [data]);
  const onNavDetail = () => {
    nav.navigate(RouteName.EDIT_NOTE, {
      date: date,
      note: note,
      header: title,
      id: id,
    });
  };
  const updateDeletedNoteFirebase = async () => {
    console.log(currentDate.current);
    await firestore()
      .collection("Users")
      .doc(userInfo.email)
      .update({
        note: currentDate.current,
      })
      .then(() => {
        console.log("delete success");
      });
  };
  const removeSelectedNote = () => {
    dispatch(removeNote({ id: id }));
    console.log(id);
  };
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
          // toggleDeleteButton();
          // setSelectedButtonStatus(true);
          // toggleSelectStatus();
          removeSelectedNote();
          // getNote();
          updateDeletedNoteFirebase();
        }}
        // flex
        style={CONTAINER}
        onPress={() =>
          !toggleSelectedButton ? onNavDetail() : setEnableToggle()
        }
      >
        <Note
          note={note}
          header={title}
          date={date}
          id={id}
          selectedStatus={selectedButtonStatus}
        />
      </TouchableOpacity>
    </View>
  );
}

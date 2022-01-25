import { Text, View } from "react-native-ui-lib";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
} from "react";
import { ViewStyle, TouchableOpacity, TextStyle } from "react-native";
import { size } from "src/theme/size";
import { spacingWidth, spacingHeight } from "src/theme/spacing";
import Note from "./notes";

import { color } from "src/theme/color";
import { useNavigation } from "@react-navigation/core";
import { AppDispatch, RootState } from "src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { switchSelectedOn } from "src/redux/toggle-reducer";
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
import { AppText } from "src/components/Text/text";
import ImportantOutline from "assets/icons/important_outline.svg";
import Important from "assets/icons/important.svg";
export interface noteListI {
  title?: string;
  note?: string;
  id?: string | undefined;
  date?: Date;
  deleteStatus?: boolean;
  selectStatus: boolean | undefined;
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
  color: color.darkGrey,
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
const NOTES: TextStyle = {
  color: color.darkGrey,
};
function NoteList(props: noteListI) {
  const { title, note, id, date, selectStatus } = props;
  const mounted = useRef(false);
  const [selectedButtonStatus, setSelectedButtonStatus] = useState(false);
  const nav = useNavigation();
  const [isDeleteChecked, setDeleteChecked] = useState(false);
  const dispatch = useDispatch();
  const toggleSelectedButton = useSelector(
    (state: RootState) => state.toggle.enableSelectedButton
  );
  const onNavDetail = () => {
    nav.navigate(RouteName.EDIT_NOTE, {
      date: date,
      note: note,
      header: title,
      id: id,
    });
  };

  // const removeSelectedNote = () => {
  //   dispatch(removeNote({ id: id }));
  // };
  // useEffect(() => {
  //   console.log("isDeleteChecked", isDeleteChecked);
  //   if (isDeleteChecked) {
  //     dispatch(toggleSelect({ id: id }));
  //   }
  // }, [isDeleteChecked]);

  const toggleSelectButton = () => {
    dispatch(switchSelectedOn());
  };
  const toggleSelectStatus = () => {};
  const setDeleteItem = () => {
    // setDeleteChecked(!isDeleteChecked);
    // setDeleteChecked((isDeleteChecked) => !isDeleteChecked);
    dispatch(toggleSelect({ id: id }));
  };
  const switchItem = () => {};
  ///it work
  //the redux do not work

  // now it not work
  // but reducer work
  // const newData = useCallback(() => {
  //   setCurrentNote(data);
  // }, [note]);
  return (
    <TouchableOpacity
      onLongPress={() => {
        toggleSelectButton();
      }}
      // flex
      style={CONTAINER}
      onPress={() => (!toggleSelectedButton ? onNavDetail() : setDeleteItem())}
    >
      <View style={NOTE_ITEM_CONTAINER}>
        <View>
          <View row centerV style={HEADER_CONTAINER}>
            <View>
              <AppText bold style={HEADER_TEXT}>
                {title}
              </AppText>
            </View>

            {toggleSelectedButton && (
              <View>
                {selectStatus ? (
                  <CheckIcon name="checkcircle" size={size.iconSize} />
                ) : (
                  <CheckIcon name="checkcircleo" size={size.iconSize} />
                )}
              </View>
            )}
          </View>
          <View style={NOTE_CONTAINER}>
            <AppText style={NOTES} numberOfLines={7}>
              {note}
            </AppText>
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
          <AppText style={NOTES}>
            {moment(date).format("h:mmA MMM Do YY")}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default memo(NoteList);

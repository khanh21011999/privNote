import { Text, View } from "react-native-ui-lib";

import React, { useState } from "react";
import { ViewStyle } from "react-native";
import { size } from "src/theme/size";
import { spacingWidth, spacingHeight } from "src/theme/spacing";
import Note from "./note";
import { TouchableOpacity } from "react-native-ui-lib";
import { color } from "src/theme/color";
import { useNavigation } from "@react-navigation/core";
import { AppDispatch, RootState } from "src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { switchToggle } from "src/redux/toggle-reducer";
import { toggleSelect } from "src/redux/noteList-reducer";
import { RouteName } from "src/navigation/route-name";
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
  const [selectedButtonStatus, setSelectedButtonStatus] = useState(false);
  const nav = useNavigation();
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
  return (
    <View>
      <TouchableOpacity
        onLongPress={() => {
          toggleDeleteButton();
          setSelectedButtonStatus(true);
          toggleSelectStatus();
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

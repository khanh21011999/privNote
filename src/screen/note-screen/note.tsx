import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import React, { useState } from "react";
import { TextStyle, ViewStyle } from "react-native";
import { fontSize } from "src/theme/font-size";
import { spacingWidth, spacingHeight } from "src/theme/spacing";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

import moment from "moment";
import { size } from "src/theme/size";

export interface NoteItemI {
  note?: string;
  header?: string;
  date?: Date;
  id?: Date;
  selectedStatus?: boolean;
}
export default function Note(props: NoteItemI) {
  const { note, header, date, id, selectedStatus } = props;

  // const deleteNote = () => {
  //   dispatch(removeNote({ id: id }));
  // };

  return (
    <View style={CONTAINER}>
      <View>
        <View row centerV style={HEADER_CONTAINER}>
          <Text style={HEADER_TEXT}>{header}</Text>

          {toggleDeleteStatus && (
            <TouchableOpacity
              onPress={() => {
                // setDeleteChecked(!isDeleteChecked);
              }}
            >
              {selectedStatus ? (
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
  );
}

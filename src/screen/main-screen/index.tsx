import { FlatList, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NoteList from "./note-list";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";

import HeaderNote from "./header";
import { Dimensions, TextStyle, ViewStyle } from "react-native";
import { spacing } from "../../theme/spacing";
import {
  heightScreen,
  onePercentWidth,
  size,
  widthScreen,
} from "../../theme/size";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { color } from "../../theme/color";
import AddNoteIcon from "react-native-vector-icons/Ionicons";
const CONTAINER: ViewStyle = {
  width: widthScreen,
  height: heightScreen,
};
const ADD_NOTE_BUTTON: ViewStyle = {
  ...size.addNoteButton,
  marginRight: spacing[4],
  backgroundColor: color.turquoiseBlue,
  alignItems: "center",
  borderRadius: size.addNoteButton.height / 2,
  justifyContent: "center",
  alignSelf: "flex-end",
};
const ADD_NOTE_TEXT: TextStyle = {
  fontWeight: "bold",
};
export default function NoteListScreen() {
  const nav = useNavigation();

  const data = useSelector((state: RootState) => state.note);

  return (
    <SafeAreaView style={CONTAINER}>
      <FlatList
        data={data}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginTop: spacing[2],
          marginHorizontal: spacing[2],
          padding: spacing[1],
        }}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => <HeaderNote />}
        renderItem={({ item, index }) => {
          console.log("item", item);

          return (
            <NoteList
              note={item.note}
              title={item.header}
              date={item.date}
              id={item.id}
            />
          );
        }}
      ></FlatList>
      <TouchableOpacity
        onPress={() => {
          nav.navigate("Add Note");
        }}
        style={ADD_NOTE_BUTTON}
      >
        <AddNoteIcon name="add" color="white" size={onePercentWidth * 8} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

import { FlatList, ScrollView } from "react-native-gesture-handler";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NoteList from "./note-list";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";

import HeaderNote from "./header";
import { Dimensions, TextStyle, ViewStyle } from "react-native";
import { spacing } from "../../theme/spacing";
import { heightScreen, size, widthScreen } from "../../theme/size";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { NoteI } from "../../redux/reducer";
import { iteratorSymbol } from "immer/dist/internal";
import { color } from "../../theme/color";
import AddIcon from "react-native-vector-icons/Ionicons";
const CONTAINER: ViewStyle = {
  width: widthScreen,
  height: heightScreen,
  padding: spacing[3],
};
const ADD_NOTE_BUTTON: ViewStyle = {
  ...size.addNoteButton,
  backgroundColor: color.turquoiseBlue,
  alignItems: "center",
  borderRadius: spacing[3],
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
        horizontal={false}
        data={data}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => <HeaderNote />}
        renderItem={({ item, index }) => {
          console.log(item);
          return <NoteList note={item.note} title={item.header} />;
        }}
      ></FlatList>
      <TouchableOpacity
        onPress={() => {
          nav.navigate("Add Note");
        }}
        style={ADD_NOTE_BUTTON}
      >
        <AddIcon name="add" />

        {/* <Text style={ADD_NOTE_TEXT}>Add note</Text> */}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

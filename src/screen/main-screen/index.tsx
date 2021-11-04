import { FlatList, ScrollView } from "react-native-gesture-handler";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NoteList from "./note-list";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";

import HeaderNote from "./header";
import { Dimensions, ViewStyle } from "react-native";
import { spacing } from "../../theme/spacing";
import { heightScreen, size, widthScreen } from "../../theme/size";
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const CONTAINER: ViewStyle = {
  width: widthScreen,
  height: heightScreen,
  padding: spacing[3],
};
const ADD_NOTE_BUTTON: ViewStyle = {
  ...size.addNoteButton,
  borderWidth: 1,
  alignSelf: "flex-end",
};
export default function NoteListScreen() {
  return (
    <SafeAreaView style={CONTAINER}>
      <FlatList
        horizontal={false}
        data={DATA}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => <HeaderNote />}
        renderItem={() => <NoteList />}
      ></FlatList>
      <TouchableOpacity style={ADD_NOTE_BUTTON}>
        <Text>Add note</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

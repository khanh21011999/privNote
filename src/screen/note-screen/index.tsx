import { FlatList, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NoteList from "./note-list";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";

import HeaderNote from "./header";
import { Dimensions, TextStyle, ViewStyle } from "react-native";
import { spacingWidth, spacingHeight } from "src/theme/spacing";
import {
  heightScreen,
  onePercentWidth,
  size,
  widthScreen,
} from "src/theme/size";
import AddIcon from "react-native-vector-icons/";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { color } from "src/theme/color";
import FooterNote from "./footer";
import LeftIcon from "react-native-vector-icons/AntDesign";
import { loadDefault } from "src/redux/noteList-reducer";
import auth from "@react-native-firebase/auth";
import { Button } from "react-native-ui-lib";
const CONTAINER: ViewStyle = {
  width: widthScreen,
  minHeight: heightScreen,

  // display: "flex",
  backgroundColor: color.backgroundGrey,
};

const ADD_NOTE_TEXT: TextStyle = {
  fontWeight: "bold",
};
const EMPTY_NOTE: TextStyle = {
  marginHorizontal: spacingWidth[3],
};
export default function NoteListScreen() {
  const nav = useNavigation();
  useEffect(() => {
    dispatch(loadDefault());
  }, []);
  const dispatch: AppDispatch = useDispatch();
  console.log("a");
  const data = useSelector((state: RootState) => state.persistedReducer.note);

  return (
    <SafeAreaView style={CONTAINER}>
      {data.length === 0 ? (
        <>
          <ScrollView>
            <HeaderNote />
            <Text style={EMPTY_NOTE}>Hmm, so don't have any secret yet </Text>
          </ScrollView>
          <FooterNote />
        </>
      ) : (
        <View style={CONTAINER}>
          <FlatList
            data={data}
            ListHeaderComponent={() => <HeaderNote />}
            renderItem={({ item, index }) => {
              return (
                <NoteList
                  note={item.note}
                  title={item.header}
                  date={item.date}
                  id={item.id}
                />
              );
            }}
          />
          {/* <TouchableOpacity style={{ borderWidth: 1, bottom: 150 }}>
            <Text style={{ color: "black" }}>Click me</Text>
          </TouchableOpacity> */}
          <FooterNote />
        </View>
      )}
    </SafeAreaView>
  );
}

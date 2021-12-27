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
const CONTAINER: ViewStyle = {
  width: widthScreen,
  height: heightScreen,
  display: "flex",
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

  const data = useSelector((state: RootState) => state.persistedReducer.note);
  console.log("anc");
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
        <SafeAreaView style={CONTAINER}>
          <FlatList
            data={data}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginTop: spacingHeight[2],
              padding: spacingWidth[1],
            }}
            keyExtractor={(item) => item.id.toString()}
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
          <FooterNote />
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}

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
import AddIcon from "react-native-vector-icons/";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { color } from "../../theme/color";
import FooterNote from "./footer";
import LeftIcon from "react-native-vector-icons/AntDesign";
const CONTAINER: ViewStyle = {
  width: widthScreen,
  height: heightScreen,
};

const ADD_NOTE_TEXT: TextStyle = {
  fontWeight: "bold",
};
export default function NoteListScreen() {
  const nav = useNavigation();

  const data = useSelector((state: RootState) => state.persistedReducer.note);

  return (
    <SafeAreaView style={CONTAINER}>
      {data.length === 0 ? (
        <ScrollView>
          <HeaderNote />
          <Text>Hmm, so don't have any secret yet</Text>
          <FooterNote />
        </ScrollView>
      ) : (
        <View flex>
          <View flex-9>
            <FlatList
              data={data}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: "space-between",
                marginTop: spacing[2],
                padding: spacing[1],
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
          </View>

          <View flex-1>
            <FooterNote />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

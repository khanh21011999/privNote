import React from "react";
import { SafeAreaView, TextInput, TextStyle, ViewStyle } from "react-native";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";
import { fontSize } from "src/theme/font-size";
import { onePercentWidth, size, widthScreen } from "src/theme/size";
import { spacingHeight, spacingWidth } from "src/theme/spacing";
import { color } from "src/theme/color";
import Icon from "react-native-vector-icons/Ionicons";
import { Font } from "src/theme/font-name";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "src/redux/authentication";
import firestore from "@react-native-firebase/firestore";
import { AppDispatch, RootState } from "src/redux/store";
import { ConstantString, user } from "src/constants/type";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { resetNote } from "src/redux/noteList-reducer";

const HEADER_TEXT: TextStyle = {
  fontSize: RFPercentage(3.5),
  color: "black",
  marginLeft: spacingWidth[2],
  marginBottom: spacingHeight[2],
  fontFamily: Font.bold,
};

const INPUT_STYLE: TextStyle = {
  height: size.headerSearch,
  borderRadius: spacingWidth[4],
  paddingHorizontal: spacingWidth[3],
  width: onePercentWidth * 95,
  fontFamily: Font.regular,
  backgroundColor: color.lightGrey,
};
const CONTAINER: ViewStyle = {
  marginBottom: spacingHeight[2],
  display: "flex",
};
const ICON: TextStyle = {
  right: onePercentWidth * 3,
};
export default function HeaderNote() {
  const dispatch: AppDispatch = useDispatch();
  const userInfo: user = useSelector(
    (user: RootState) => user.persistedReducer.firebase.userInfomation
  );
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      dispatch(logOut());
      dispatch(resetNote());
      // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  // console.log("user information", userInfo);
  return (
    <View style={CONTAINER}>
      <View
        row
        centerV
        flex
        style={{
          justifyContent: "space-between",
          paddingHorizontal: spacingWidth[2],
        }}
      >
        <View style={{ flex: 15 }}>
          <Text style={HEADER_TEXT}>
            Your secret, keep it private, {userInfo.name}
          </Text>
        </View>

        <TouchableOpacity style={{ flex: 1 }} onPress={() => signOut()}>
          <Icon
            name="settings-outline"
            color={color.black}
            size={onePercentWidth * 6}
            style={ICON}
          />
        </TouchableOpacity>
      </View>
      <View centerH>
        <TextInput
          placeholder={ConstantString.searchHere}
          style={INPUT_STYLE}
        />
      </View>
    </View>
  );
}

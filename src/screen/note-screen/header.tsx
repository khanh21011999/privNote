import React from 'react';
import {
    Image,
    SafeAreaView,
    TextInput,
    TextStyle,
    ViewStyle,
} from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { fontSize } from 'src/theme/font-size';
import {
    onePercentWidth,
    size,
    widthScreen,
    onePercentHeight,
} from 'src/theme/size';
import { spacingHeight, spacingWidth } from 'src/theme/spacing';
import { color } from 'src/theme/color';
import Icon from 'react-native-vector-icons/Ionicons';
import { Font } from 'src/theme/font-name';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from 'src/redux/authentication';
import firestore from '@react-native-firebase/firestore';
import { AppDispatch, RootState } from 'src/redux/store';
import { ConstantString, user } from 'src/constants/type';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { resetNote } from 'src/redux/noteList-reducer';
import ThreeBar from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/core';
import {DrawerActions} from '@react-navigation/core';
import { widthPercentageToDP } from 'react-native-responsive-screen';
const HEADER_TEXT: TextStyle = {
    fontSize:widthPercentageToDP(6),
    color: 'black',
    
    fontFamily: Font.indieFlower,
};

const INPUT_STYLE: TextStyle = {
    height: size.headerSearch,
    borderRadius: spacingWidth[4],
    paddingHorizontal: spacingWidth[5],
    width: onePercentWidth * 95,
    fontFamily: Font.regular,
    color: color.black,
    backgroundColor: color.lightGrey,
};
const CONTAINER: ViewStyle = {
    marginBottom: spacingHeight[2],
    display: 'flex',
};
const ICON: TextStyle = {};
const ROW_CONTAINER: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacingHeight[3],
    paddingHorizontal:spacingWidth[4],
};
export default function HeaderNote() {
    const dispatch: AppDispatch = useDispatch();
    const nav= useNavigation();
    const userInfo: user = useSelector(
        (user: RootState) => user.persistedReducer.firebase.userInfomation,
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
            <View style={ROW_CONTAINER}>
                <View style={{ flex: 1,}}>
                    <Image
                        style={{
                            height: onePercentHeight * 6,
                            width: onePercentHeight * 6,
                            borderRadius: onePercentHeight * 3,
                        }}
                        source={{ uri: userInfo.photo }}
                    />
                </View>

                <View flex-4>
                    <Text style={HEADER_TEXT}>This app for you babi :)</Text>
                </View>
                <TouchableOpacity onPress={() => nav.dispatch(DrawerActions.openDrawer())}>
                    <ThreeBar
                        name="three-bars"
                        color={color.black}
                        size={onePercentWidth * 6}
                        style={ICON}
                    />
                </TouchableOpacity>
            </View>

            {/* <View flex-4 centerH>
                <TextInput
                    placeholderTextColor={color.black}
                    placeholder={ConstantString.searchHere}
                    style={INPUT_STYLE}
                />
            </View> */}
        </View>
    );
}

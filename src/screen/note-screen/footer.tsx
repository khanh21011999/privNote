import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { color } from 'src/theme/color';
import {
    bottomNavHeight,
    heightScreen,
    onePercentWidth,
    size,
    widthScreen,
} from 'src/theme/size';
import { spacingWidth, spacingHeight } from 'src/theme/spacing';
import AddNoteIcon from 'react-native-vector-icons/Ionicons';
import {
    Alert,
    Platform,
    SafeAreaView,
    ViewProps,
    ViewStyle,
} from 'react-native';
import { RouteName } from 'src/navigation/route-name';
import TrashIcon from 'assets/icons/trash.svg';
import { onePercentHeight } from '../../theme/size';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { AppText } from 'src/components/Text/text';
import ImportantIcon from 'assets/icons/important.svg';
import ImportantOutline from 'assets/icons/important_outline.svg';
import CloseIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase } from '@react-native-firebase/firestore';
import { ConstantString, user } from 'src/constants/type';
import { fetchNote, loadDefault } from 'src/redux/noteList-reducer';
import { switchReloadOn, switchSelectedOff } from 'src/redux/toggle-reducer';
import { heightPercentageToDP } from 'react-native-responsive-screen';

type FooterI = ViewProps
const ADD_NOTE_BUTTON: ViewStyle = {
    ...size.addNoteButton,
    marginRight: spacingWidth[4],
    backgroundColor: color.DarkBurgundy,
    alignItems: 'center',
    borderRadius: size.addNoteButton.height / 2,
    justifyContent: 'center',
};
const SELECTED_ROW_CONTAINER: ViewStyle = {
    // position: "absolute",

    width: widthScreen,
    height:heightPercentageToDP(10),
    position: 'absolute',
    // bottom: bottomNavHeight,
    bottom: Platform.OS === 'android' ? bottomNavHeight() : 0,
    paddingHorizontal: spacingWidth[6],
    paddingBottom: 0,
    // alignItems: "center",
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color.white,
};

const UTILITY_ICON: ViewStyle = {
    paddingLeft: spacingWidth[8],
};
const DefaultFooter = () => {
    const nav = useNavigation();
    return (
        <View
            style={{
                position: 'absolute',
                bottom: onePercentHeight * 8,
                right: onePercentWidth*4,
            }}
        >
            <TouchableOpacity
                onPress={() => {
                    nav.navigate(RouteName.ADD_NOTE);
                }}
                style={ADD_NOTE_BUTTON}
            >
                <AddNoteIcon name="add" color="white" size={onePercentWidth * 8} />
            </TouchableOpacity>
        </View>
    );
};

export default function FooterNote(props: FooterI) {
    const selectStatus = useSelector(
        (state: RootState) => state.toggle.enableSelectedButton
    );
    return (
        <>
            {selectStatus === true ? (
                <SelectedItemFooter {...props} />
            ) : (
                <DefaultFooter />
            )}
        </>
    );
}

const SelectedItemFooter = (props: FooterI) => {
    const userInfo: user = useSelector(
        (user: RootState) => user.persistedReducer.firebase.userInfomation
    );
    

    const dispatch = useDispatch();
    const [updatedData, setUpdatedData] = useState();
    const data = useSelector((state: RootState) => state.persistedReducer.note);
    const updateDeletedNoteFirebase = () => {
        firebase
            .firestore()
            .collection(ConstantString.user)
            .doc(userInfo.email)
            .update({
                note: data.filter((item) => item.selectStatus !== true),
            })
            .then(() => {
                console.log('delete success');
            });
    };
    console.log('bottom',bottomNavHeight() );
    return (
        <View row {...props} style={SELECTED_ROW_CONTAINER}>
            <View row>
                <TouchableOpacity
                    centerH
                    onPress={() => {
                        updateDeletedNoteFirebase();
                        Alert.alert('Note deleted');
                        dispatch(switchSelectedOff());
                        dispatch(loadDefault());

                        dispatch(fetchNote(userInfo.email));
                    }}
                >
                    <TrashIcon height={size.iconAssetSize} width={size.iconAssetSize} />
                    <AppText>Delete</AppText>
                </TouchableOpacity>
                <TouchableOpacity style={UTILITY_ICON} centerH>
                    <ImportantOutline
                        height={size.iconAssetSize}
                        width={size.iconAssetSize}
                    />
                    <AppText>Mark Important</AppText>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    centerH
                    onPress={() => {
                        dispatch(switchSelectedOff());
                        dispatch(loadDefault());
                    }}
                >
                    <CloseIcon name="close" size={size.iconAssetSize} color={color.black} />
                    <AppText>Cancel</AppText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

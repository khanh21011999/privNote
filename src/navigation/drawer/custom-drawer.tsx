import React from 'react';
import {
    ViewProps,
    TextProps,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { Image } from 'react-native-ui-lib';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';
import { user } from 'src/constants/type';
import { onePercentHeight } from 'src/theme/size';
import { spacingHeight } from 'src/theme/spacing';
import { spacingWidth } from '../../theme/spacing';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { color } from 'src/theme/color';
import { AppText } from 'src/components/Text/text';
import { logOut } from 'src/redux/authentication';
import { resetNote } from 'src/redux/noteList-reducer';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
export default function CustomDrawer(props: any) {
    const userInfo: user = useSelector(
        (state: RootState) => state.persistedReducer.firebase.userInfomation,
    ); 
    const dispatch: AppDispatch = useDispatch();
    const signOutApp = async () => {
        try {
            await GoogleSignin.signOut();
            dispatch(logOut());
            dispatch(resetNote());
            // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.littleGrey }}>
            <View
                style={{
                    paddingVertical: spacingHeight[4],
                    paddingHorizontal: spacingWidth[4],
                    flexDirection: 'row',
                }}
            >
                <View style={{ flex: 3 }}>
                    <Image
                        style={{
                            height: 8 * onePercentHeight,
                            width: 8 * onePercentHeight,
                            borderRadius: 4 * onePercentHeight,
                        }}
                        source={{ uri: userInfo.photo }}
                    />
                </View>

                <AppText
                    numberOfLines={2}
                    style={{
                        fontSize: RFPercentage(3),
                        flex: 7,
                        color: color.black,
                    }}
                >
					Hello there {userInfo.familyName} {userInfo.givenName}
                </AppText>
            </View>

            <DrawerContentScrollView contentContainerStyle={{}} {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <TouchableOpacity
                onPress={()=>{
                    signOutApp();
                }}
                style={{
                    paddingVertical: spacingHeight[3],
                    borderTopWidth: 2,
                    paddingHorizontal:spacingWidth[6],
                    borderColor: color.lightGrey,
                }}
            >
                <AppText semiBold >Log out</AppText>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

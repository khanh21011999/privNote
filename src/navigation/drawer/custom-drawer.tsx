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
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { user } from 'src/constants/type';
import { onePercentHeight } from 'src/theme/size';
import { spacingHeight } from 'src/theme/spacing';
import { spacingWidth } from '../../theme/spacing';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { color } from 'src/theme/color';
import { AppText } from 'src/components/Text/text';
export default function CustomDrawer(props: any) {
    const userInfo: user = useSelector(
        (state: RootState) => state.persistedReducer.firebase.userInfomation,
    );
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

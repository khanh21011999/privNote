import React from 'react';
import { TextStyle, ViewStyle, TouchableOpacity, Text } from 'react-native';
import { View } from 'react-native-ui-lib';
import { heightScreen, onePercentWidth } from 'src/theme/size';
import { spacingHeight, spacingWidth } from 'src/theme/spacing';
import { color } from 'src/theme/color';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store';
import ThreeBar from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/core';
import { DrawerActions } from '@react-navigation/core';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { AppText } from 'src/components/text/text';
const HEADER_TEXT: TextStyle = {
    fontSize: widthPercentageToDP(7),
    // color: 'black',
};

const CONTAINER: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
};
const WRAP_CONTAINER: ViewStyle = {
    paddingVertical: spacingHeight[3],
    paddingHorizontal: spacingWidth[4],
};
const ICON: TextStyle = {};
export default function HeaderNote() {
    const dispatch: AppDispatch = useDispatch();
    const nav = useNavigation();

    // console.log("user information", userInfo);
    return (
        <View style={WRAP_CONTAINER}>
            <View style={CONTAINER}>
                <AppText extraBold style={HEADER_TEXT}>
          Notes of Spring
                </AppText>
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        bottom: widthPercentageToDP(-0.6),
                    }}
                    onPress={() => nav.dispatch(DrawerActions.openDrawer())}
                >
                    <ThreeBar
                        name="three-bars"
                        // color={color.black}
                        size={widthPercentageToDP(7)}
                        style={ICON}
                    />
                </TouchableOpacity>

                {/* <View flex-4 centerH>
                <TextInput
                    placeholderTextColor={color.black}
                    placeholder={ConstantString.searchHere}
                    style={INPUT_STYLE}
                />
            </View> */}
            </View>
            {/* <View
                style={{
                    height: heightScreen * 0.1,
                    width: '100%',
                    backgroundColor: color.littleGrey,
                    marginTop: spacingHeight[3],
                    
                }}
            >
                <AppText>{'"Today must be good day"'}</AppText>
            </View> */}
        </View>
    );
}

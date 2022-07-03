import React from 'react';
import { ViewProps, TextProps, ViewStyle } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { onePercentHeight } from 'src/theme/size';
import { RouteName } from '../route-name';
type CustomBottomTab = ViewProps
const TAB_CONTAINER: ViewStyle = {
    flexDirection: 'row',
    height: onePercentHeight * 8,
    display: 'flex',
    backgroundColor: 'grey',
};
export function CustomBottomTab({ navigation }: { navigation?: any }) {
    return (
        <View style={TAB_CONTAINER}>
            <TouchableOpacity flex-1>
                <Text>abcd</Text>
            </TouchableOpacity>
            <TouchableOpacity
                flex-1
                onPress={() => navigation.navigate(RouteName.STORY)}
            >
                <Text>abcd</Text>
            </TouchableOpacity>
        </View>
    );
}

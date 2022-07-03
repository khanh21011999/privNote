import React from 'react';
import {
    ViewProps,
    TextProps,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import NoteListScreen from 'src/screen/note-screen';
import CustomDrawer from './custom-drawer';
import { RouteName } from 'src/navigation/route-name';
import  Login  from 'src/screen/login/login';
import { Font } from 'src/theme/font-name';
import { color } from 'src/theme/color';
const Drawer = createDrawerNavigator();
export default function DrawerRoute() {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerLabelStyle:{
                    fontFamily:Font.semiBold
                },
                drawerActiveBackgroundColor:color.oldLace,
                drawerActiveTintColor:color.darkGrey,
               
               
            
            }}
            drawerContent={(props: any) => <CustomDrawer {...props} />}
        >
            <Drawer.Screen
                options={{ 
                    headerShown: false }}
                name="Note List"
                component={NoteListScreen}
            />
            <Drawer.Screen
                options={{headerShown:false}}
                name = {RouteName.SETTING}
                component={NoteListScreen}
            />
        </Drawer.Navigator>
    );
}

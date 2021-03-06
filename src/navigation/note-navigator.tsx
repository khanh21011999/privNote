import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator , CardStyleInterpolators,} from '@react-navigation/native-stack';
import React from 'react';
import AddNote from '../screen/add-note/add-note';
import EditNote from '../screen/edit-note/edit-note';
import NoteListScreen from '../screen/note-screen';

import { RouteName } from 'src/navigation/route-name';
import TabNavigation from './tab/botton-navigation';
import Login from 'src/screen/login/login';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { user } from 'src/constants/type';
import { checkListI } from 'src/redux/noteList-reducer';
import DrawerRoute from './drawer/draw';

export type RootStateParamList = {
  [RouteName.LOGIN]: undefined;
  [RouteName.HOME_NAV]: undefined;
  [RouteName.ADD_NOTE]: undefined;
  [RouteName.HOME]: undefined;
  [RouteName.EDIT_NOTE]: {
    date: Date | undefined;
    note: string | undefined;
    header: string | undefined;
    id: string | undefined;
    checklist: checkListI[] | undefined;
    isEdit:boolean
  };
  [RouteName.SETTING]: {
    userInfo: user;
  };
};

const Stack = createNativeStackNavigator<RootStateParamList>();
declare global {
  namespace ReactNavigation {
    type RootParamList = RootStateParamList
  }
}
export function NoteNavigation() {
    const token: string | null = useSelector(
        (item: RootState) => item.persistedReducer.firebase.token
    );

    return (
        <NavigationContainer>
            <Stack.Navigator
            
                screenOptions={{}}
                initialRouteName={RouteName.LOGIN}>
                {token!.length > 0 ? (
                    <>
                        <Stack.Screen
                            options={{ headerShown: false,  }}
                            name={RouteName.HOME}
                            component={DrawerRoute}
                        />
                        {/* <Stack.Screen
                            options={{ headerShown: false }}
                            name={RouteName.ADD_NOTE}
                            component={AddNote}
                        /> */}
                        <Stack.Screen
                            options={{ headerShown: false }}
                            name={RouteName.EDIT_NOTE}
                            component={EditNote}
                        />
                    </>
                ) : (
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name={RouteName.LOGIN}
                        component={Login}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

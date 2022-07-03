/* eslint-disable react/no-unescaped-entities */
import { FlatList, Platform, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NoteList from './notes';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';

import HeaderNote from './header';
import { Dimensions, TextStyle, ViewStyle } from 'react-native';
import { spacingWidth, spacingHeight } from 'src/theme/spacing';
import {
    heightScreen,
    onePercentHeight,
    onePercentWidth,
    size,
    widthScreen,
} from 'src/theme/size';
import AddIcon from 'react-native-vector-icons/';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';
import { color } from 'src/theme/color';
import FooterNote from './footer';
import LeftIcon from 'react-native-vector-icons/AntDesign';
import {
    fetchNote,
    getPosts,
    loadDefault,
    updateDeletedNote,
} from 'src/redux/noteList-reducer';
import auth from '@react-native-firebase/auth';

import { Button } from 'react-native-ui-lib';

import { async } from '@firebase/util';
import { user } from 'src/constants/type';
import { AppText } from 'src/components/Text/text';
import { signedIn } from 'src/redux/authentication';
import { switchReloadOff, switchReloadOn } from 'src/redux/toggle-reducer';

const CONTAINER: ViewStyle = {
    width: widthScreen,

    // display: "flex",
    backgroundColor: color.backgroundGrey,
};

const ADD_NOTE_TEXT: TextStyle = {
    fontWeight: 'bold',
};
const EMPTY_NOTE: TextStyle = {
    marginHorizontal: spacingWidth[3],
};
export default function NoteListScreen() {
    const [user, setUser] = useState<any>();
    const nav = useNavigation();
    // useEffect(() => {
    //   dispatch(loadDefault());
    // }, []);
    // const [refresh, setRefresh] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const refresh = useSelector((state: RootState) => state.toggle.reloadNote);
    const data = useSelector((state: RootState) => state.persistedReducer.note);
    const userInfo: user = useSelector(
        (state: RootState) => state.persistedReducer.firebase.userInfomation
    );
    // console.log('refresh', refresh);
    // useEffect(() => {
    //   const getUser = async () => {
    //     await firestore()
    //       .collection("Users")
    //       .doc(userInfo.email)
    //       .get()
    //       .then((res) => setUser(res.data().note ?? ""));
    //   };
    //   getUser();
    // }, []);
    // console.log("user", user);
    useEffect(() => {
        // dispatch(fetchNote(userInfo.email));
        // fetchData();
    }, []);
    useEffect(()=>{
        const isFocused = nav.addListener('focus',()=>{
            fetchData();
        });
        return isFocused;
    },[refresh]);
    const fetchData = () => {
        dispatch(switchReloadOn());
        dispatch(fetchNote(userInfo.email)).then(() =>{
            dispatch(switchReloadOff());
        }
          
        );
    };
    const onPullRefresh = ()=>{
        setTimeout(()=>{
            dispatch(fetchNote(userInfo.email)).then(() =>
                dispatch(switchReloadOff())
            );

        },500);
    };
    const renderItem = useCallback(({item})=>(
        <NoteList
            checkList={item.checkList}
            note={item.note}
            title={item.header}
            date={item.date}
            id={item.id}
            selectStatus={item.selectStatus}
        />
    ),[]);
    return (
        <View style={CONTAINER}>
            {data.length === 0 ? (
                <>
                    <SafeAreaView>
                        <ScrollView style={{ minHeight: heightScreen * 0.9 }}>
                            <HeaderNote />
                            <AppText style={EMPTY_NOTE}>
                Hmm, so don't have any secret yet
                            </AppText>
                        </ScrollView>
                        <FooterNote />
                    </SafeAreaView>
                </>
            ) : (
                <SafeAreaView style={{minHeight:heightScreen}} >
                    <HeaderNote/>
                  
                    <FlatList
                            
                        refreshing={refresh}
                        onRefresh={() => {
                            dispatch(switchReloadOn());
                            onPullRefresh();
                        }}
                        removeClippedSubviews
                        contentContainerStyle={{
                            flexGrow:1
                        }}
                            
                        data={data}
                        style={{
                            flex:1,
                              
                            marginBottom:
                  Platform.OS === 'ios'
                      ? onePercentHeight * 6
                      : onePercentHeight * 6,
                        }}
                        keyExtractor={(item:any) => item.id}
                         
                        renderItem={renderItem}
                    />
                    <FooterNote />
                </SafeAreaView>
            )}
        </View>
    );
}

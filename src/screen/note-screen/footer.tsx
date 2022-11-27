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
import AddNoteIcon from 'react-native-vector-icons/Octicons';
import {
    Alert,
    Platform,
    SafeAreaView,
    StyleSheet,
    TouchableWithoutFeedback,
    ViewProps,
    ViewStyle,
} from 'react-native';
import { RouteName } from 'src/navigation/route-name';
import TrashIcon from 'assets/icons/trash.svg';
import { onePercentHeight } from '../../theme/size';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { AppText } from 'src/components/text/text';
import ImportantIcon from 'assets/icons/important.svg';
import ImportantOutline from 'assets/icons/important_outline.svg';
import CloseIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase } from '@react-native-firebase/firestore';
import { ConstantString, user } from 'src/constants/type';
import { fetchNote, loadDefault } from 'src/redux/noteList-reducer';
import { switchReloadOn, switchSelectedOff } from 'src/redux/toggle-reducer';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { ExtendedTheme } from '@react-navigation/native';
// import styles from './footer.styles';
type FooterI = ViewProps

const DefaultFooter = () => {
    const nav = useNavigation();
    const notes = useSelector((state:RootState)=>state.persistedReducer.note);
    return (
        <View         
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                flex:0.8,
  
              
               
          
                alignItems: 'center',
           
                marginBottom: bottomNavHeight(),
            }}
        >
        
            <AppText semiBold>
                {notes.length} Note{notes.length>1? 's':''}
            </AppText>
            <View style={{position:'absolute', right:16,alignSelf:'center'}}>
                <View
                    style={{
                        width: '100%',
                
              
                        // position: 'absolute',
                        // bottom: onePercentHeight * 8,
                        // right: onePercentWidth*4,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            nav.navigate(RouteName.EDIT_NOTE,{
                                date: '',
                                note: '',
                                header: '',
                                id: '',
                                checklist: '',
                                isEdit:false  
                            });
                        }}
                        // style={styles}
                    >
                        <AddNoteIcon name="plus"  size={onePercentWidth * 8} />
                    </TouchableOpacity>
                </View>
            </View>
       
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
                // console.log('delete success');
            });
    };

    return (
        <Animated.View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:bottomNavHeight(),padding:spacingWidth[4]}}  {...props}>
            <View row>
                <TouchableOpacity
                    centerH
                    paddingR-16
                    onPress={() => {
                        updateDeletedNoteFirebase();
                        Alert.alert('Note deleted');
                        dispatch(switchSelectedOff());
                        // selectedLayoutValue.value = 0;
                        dispatch(loadDefault());

                        dispatch(fetchNote(userInfo.email));
                    }}
                >
                    <TrashIcon height={size.iconAssetSize} width={size.iconAssetSize} />
                    <AppText>Delete</AppText>
                </TouchableOpacity>
                <TouchableOpacity  centerH>
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
                    <CloseIcon name="close" size={size.iconAssetSize}  />
                    <AppText>Cancel</AppText>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

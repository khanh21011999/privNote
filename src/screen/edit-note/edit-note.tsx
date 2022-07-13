import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { TextInput, TextStyle, ViewStyle } from 'react-native';
import { fontSize } from 'src/theme/font-size';
import { spacingHeight, spacingWidth } from 'src/theme/spacing';
import { onePercentWidth, onePercentHeight, widthScreen, heightScreen } from 'src/theme/size';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';
import { checkListI, fetchNote } from 'src/redux/noteList-reducer';
import { color } from 'src/theme/color';
import BackArrow from 'react-native-vector-icons/Octicons';
import InputScrollView from 'react-native-input-scroll-view';
import { firebase } from '@react-native-firebase/firestore';
import { ConstantString, user } from 'src/constants/type';
import { switchReloadOff, switchReloadOn } from 'src/redux/toggle-reducer';
import { Font } from 'src/theme/font-name';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStateParamList } from 'src/navigation/note-navigator';
import { RouteName } from 'src/navigation/route-name';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SaveIcon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// import { CheckBoxList } from './checkbox-list';
const HEADER_INPUT: TextStyle = {
    fontSize: fontSize.headerInputNote,
    fontFamily: Font.bold,
    color: color.darkGrey,
    paddingHorizontal:spacingWidth[4],
    marginVertical:spacingHeight[1],
    
   
};
const SAVE_NOTE_BT: TextStyle = {
    fontWeight: 'bold',
    color: color.darkGrey,
    fontSize:RFPercentage(2.8)
};
const HEADER: ViewStyle = {
    justifyContent: 'space-between',
    marginTop: onePercentHeight*2,
    marginHorizontal:spacingWidth[3],
   
};

const NOTE: TextStyle = {
    fontSize: fontSize.noteInput,
    fontFamily: Font.medium,
    paddingHorizontal:spacingWidth[4],
    color: color.darkGrey,
};
export interface EditNoteI {
  note?: string;
  date?: Date;
  checklist?: checkListI[];
  header: string;
}
const NOTE_INPUT: TextStyle = {
    fontSize: fontSize.noteInput,
    fontFamily: Font.regular,
    color: color.darkGrey,
};
const HEADER_WRAPPER_ITEM:ViewStyle = { 

    backgroundColor:color.lightGrey,
    paddingHorizontal:hp(4),
    paddingVertical:hp(1),
    borderRadius:spacingWidth[3],

};
export type PropsType = NativeStackScreenProps<
  RootStateParamList,
  RouteName.EDIT_NOTE
>;

export default function EditNote() {
    const nav = useNavigation();
    const route = useRoute<RouteProp<RootStateParamList, RouteName.EDIT_NOTE>>();

    const [isFocused, setIsFocused] = useState(false);
    const [changeSelect, setChangeSelect] = useState(false);
    const [countFocus, setCountFocus] = useState(0);
    const { date, note, header, id, checklist, isEdit} = route.params;
    const [hideCaret, setHideCaret] = useState(true);
    const [textCheck, setTextCheck] = useState(false);
    const [hideKeyboard, setHideKeyboard] = useState(false);
    const [noteEdit, setNoteEdit] = useState(note);

    const [arrayOfChecklist, setArrayofChecklist] = useState<
    checkListI[] | undefined
  >(checklist);
    const [startPos, setStart] = useState(0);
    const [endPos, setEnd] = useState(0);
    const data = useSelector((state: RootState) => state.persistedReducer.note);
    const userInfo: user = useSelector(
        (state: RootState) => state.persistedReducer.firebase.userInfomation
    );
    const [noteHeader, setNoteHeader] = useState(header);
    const dispatch: AppDispatch = useDispatch();

    const editAndSaveFirebase = () => {
        firebase
            .firestore()
            .collection(ConstantString.user)
            .doc(userInfo.email)
            .update({
                note: data.map((item) => {
                    if (item.id === id) {
                        return {
                            ...item,
                            note: noteEdit,
                            header: noteHeader,
                            date: date,
                            checkList: arrayOfChecklist,
                        };
                    }
                    return item;
                }),
            });
    };
    // const saveAndNavBack = () => {
    //   editNoteFunc();
    //   nav.goBack();
    // }
    const addNoteToFirestore = () => {
        firebase
            .firestore()
            .collection('Users')
            .doc(userInfo.email)
            .update({
                note: firebase.firestore.FieldValue.arrayUnion({
                    id:
          new Date().getTime().toString() +
          Math.floor(
              Math.random() * Math.floor(new Date().getTime())
          ).toString(),
                    header: noteHeader,
                    note: noteEdit,
                    date: new Date(),
                    selectStatus: false,
                    checkList: [],
                }),
            });
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.backgroundGrey, margin: spacingWidth[3] }}>
          
            {/* <ScrollView>
                <TextInput 
                
                    placeholder='enter'
                    multiline
                    style={{fontSize:50}}
                />
                <TextInput  
                    placeholder='enter2'
                    multiline
                    style={{fontSize:50}}
                />
            </ScrollView> */}
            <View row centerV style={HEADER}>
                <TouchableOpacity style={HEADER_WRAPPER_ITEM} onPress={() => nav.goBack()}>
                    <BackArrow name="chevron-left" size={hp(4) } color={color.black} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={HEADER_WRAPPER_ITEM}
                    onPress={() => {
                        if(isEdit){
                            editAndSaveFirebase();
                        }else{
                            addNoteToFirestore();
                        }
                           
                        setChangeSelect(false);
                        setHideCaret(true);
                        setStart(0);
                        setEnd(0);
                        nav.goBack();
                        dispatch(switchReloadOn());
                        dispatch(fetchNote(userInfo.email)).then(() =>
                            dispatch(switchReloadOff())
                        );
                        // saveAndNavBack();
                    }}
                >
                    <SaveIcon name='save-outline' size={hp(4)} color={color.black}/>
                </TouchableOpacity>
            </View>
            
        

      
            <ScrollView
            >
                <TextInput
                    onChangeText={(text) => setNoteHeader(text)}
                    value={noteHeader}
                    placeholderTextColor={color.lightGrey}
                    placeholder="Meaningful header"    
                    style={HEADER_INPUT}
                />
                {Platform.OS === 'ios' ? (
                    <InputScrollView>
                        <TextInput
                            autoFocus
                            placeholderTextColor={color.lightGrey}
                            scrollEnabled={false}
                            textAlignVertical={Platform.OS === 'android' ? 'top' : ''}
                            onChangeText={(text) => setNoteEdit(text)}
                            placeholder="Type your secret here..."
                            value={noteEdit}
                            multiline
                            style={NOTE_INPUT}
                        />
                        
                    </InputScrollView>
                ) : (
                
                    <TextInput
                        placeholderTextColor={color.lightGrey}
                        // ---fix auto focus last text
                        selection={isFocused ? undefined : { start: 0 }}
                        onFocus={() => {
                            setIsFocused(true);
                        }}
                        onBlur={() => {
                            setIsFocused(false);
                        }}
                        onSelectionChange={() => {
                            setCountFocus(countFocus + 1);
                            setIsFocused(true);
                        }}
                        caretHidden={countFocus === 1 ? true : false}
                        showSoftInputOnFocus={isFocused}
                        scrollEnabled={false}
                        autoFocus
                        // -----
                        textAlignVertical={Platform.OS === 'android' ? 'top' : ''}
                        onChangeText={(text) => setNoteEdit(text)}
                        placeholder="Type your secret here..."
                        multiline
                        value={noteEdit}
                        style={NOTE}
                    />
                   

                 
                  
         
                   
                )}
            
            </ScrollView>
            
        
          

           
           
            


          
          
            
         

          
            
        </SafeAreaView>
    );
}

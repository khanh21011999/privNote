import { View } from 'react-native-ui-lib';
import React, { useRef, useState, memo } from 'react';
import { ViewStyle, TextStyle, TouchableWithoutFeedback } from 'react-native';
import { size } from 'src/theme/size';
import { spacingWidth, spacingHeight } from 'src/theme/spacing';
import { color } from 'src/theme/color';
import { useNavigation } from '@react-navigation/core';
import { RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { switchSelectedOn } from 'src/redux/toggle-reducer';
import { checkListI, toggleSelect } from 'src/redux/noteList-reducer';
import { RouteName } from 'src/navigation/route-name';
import { fontSize } from 'src/theme/font-size';
import moment from 'moment';
import CheckIcon from 'react-native-vector-icons/AntDesign';
import { AppText } from 'src/components/text/text';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import RNBounceable from '@freakycoder/react-native-bounceable';
export interface noteListI {
  title?: string;
  note?: string;
  id?: string | undefined;
  date?: Date | any;
  checkList: checkListI[] | undefined;
  deleteStatus?: boolean;
  selectStatus: boolean | undefined;
}
const CONTAINER: ViewStyle = {
    backgroundColor: color.white,
    borderColor: color.lightGrey,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderLeftWidth: 0,
    overflow: 'hidden',
    // borderWidth:1,
    borderRadius: spacingWidth[3],
    flexDirection: 'row',
    margin: spacingWidth[4],
    marginVertical: spacingHeight[1],
};
const HEADER_TEXT: TextStyle = {
    fontSize: fontSize.headerNote,
    fontWeight: '600',
    // color: color.black,
};
const NOTE_CONTAINER: ViewStyle = {
    marginTop: spacingHeight[1],
};
const HEADER_CONTAINER: ViewStyle = {
    justifyContent: 'space-between',
};
const NOTE_ITEM_CONTAINER: ViewStyle = {
    margin: spacingWidth[1],
    padding: spacingWidth[2],
    justifyContent: 'space-between',
    display: 'flex',
    flex: 56,
};
const NOTES: TextStyle = {
    // color: color.darkGrey,
    fontSize: RFPercentage(2),
};
const DATE: TextStyle = {
    // color: color.darkGrey,
    fontSize: RFPercentage(1.5),
};
const BOTTOM_ROW: ViewStyle = {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    padding: spacingWidth[3],
    alignItems: 'center',
    justifyContent: 'space-between',
};
function NoteList(props: noteListI) {
    const { title, note, id, date, selectStatus, checkList } = props;
    const [selectedButtonStatus, setSelectedButtonStatus] = useState(false);
    const nav = useNavigation();
    const [isDeleteChecked, setDeleteChecked] = useState(false);
    const dispatch = useDispatch();
    const selectNoteAnimatedColor = useSharedValue(color.white);
    const toggleSelectedButton = useSelector(
        (state: RootState) => state.toggle.enableSelectedButton
    );
    const onNavDetail = () => {
        nav.navigate(RouteName.EDIT_NOTE, {
            date: date,
            note: note,
            header: title,
            id: id,
            checklist: checkList,
            isEdit: true,
        });
    };
    // const selectedNoteAnimation = useAnimatedStyle(() => {
    //     return {
    //         backgroundColor: selectNoteAnimatedColor.value,
    //     };
    // });
    
    // const removeSelectedNote = () => {
    //   dispatch(removeNote({ id: id }));
    // };
    // useEffect(() => {
    //   console.log("isDeleteChecked", isDeleteChecked);
    //   if (isDeleteChecked) {
    //     dispatch(toggleSelect({ id: id }));
    //   }
    // }, [isDeleteChecked]);

    const toggleSelectButton = () => {
        dispatch(switchSelectedOn());
    };
    const setDeleteItem = () => {
    // setDeleteChecked(!isDeleteChecked);
    // setDeleteChecked((isDeleteChecked) => !isDeleteChecked);
        dispatch(toggleSelect({ id: id }));
       
        
     
    };
    ///it work
    //the redux do not work

    // now it not work
    // but reducer work
    // const newData = useCallback(() => {
    //   setCurrentNote(data);
    // }, [note]);
    const jsDate = new Date(date?.seconds * 1000 + date?.nanoseconds / 1000000);

    return (
        
        <RNBounceable
            onLongPress={() => {
                toggleSelectButton();
              
            }}
            onPress={() => {

                !toggleSelectedButton ? onNavDetail() : setDeleteItem();
            }}
        >
            <View
                // flex
                style={[CONTAINER]}
            >
                <View style={{ flex: 1, backgroundColor: 'green' }}></View>
                <View style={NOTE_ITEM_CONTAINER}>
                    <View>
                        <View row centerV style={HEADER_CONTAINER}>
                            <View >
                                <AppText bold style={[HEADER_TEXT, title?.length===0?{color:color.lightGrey}:null]}>
                                    {title?.length===0? 'No title':title }
                                </AppText>
                            </View>

                            {toggleSelectedButton && (
                                <View>
                                    {selectStatus ? (
                                        <CheckIcon
                                            name="checkcircle"
                                            // color={color.darkGrey}
                                            size={size.iconSize}
                                        />
                                    ) : (
                                        <CheckIcon
                                            name="checkcircleo"
                                            // color={color.darkGrey}
                                            size={size.iconSize}
                                        />
                                    )}
                                </View>
                            )}
                        </View>
                        <View style={NOTE_CONTAINER}>
                            <AppText style={NOTES} numberOfLines={7}>
                                {note}
                            </AppText>
                        </View>
                    </View>
                    <View style={BOTTOM_ROW}>
                        <AppText style={DATE}>
                            {moment(jsDate).format('h:mmA, MMM Do YYYY')}
                        </AppText>
                    </View>
                </View>
            </View>
        </RNBounceable>

    );
}
export default memo(NoteList);

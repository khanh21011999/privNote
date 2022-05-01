import React, { useState } from "react";
import {
  ViewProps,
  TextProps,
  ViewStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Text,
} from "react-native";
import { View } from "react-native-ui-lib";
import { checkListI } from "src/redux/noteList-reducer";
import { spacingWidth } from "src/theme/spacing";
import { AppText } from "src/components/Text/text";
import { Font } from "src/theme/font-name";
import Icon from "react-native-vector-icons/MaterialIcons";
interface CheckboxListI extends ViewStyle {
  listCheckBox: checkListI[] | undefined;
  setArrayOfCheckList: any;
}
const CHECKBOX_CONTAINER: ViewStyle = {
  padding: spacingWidth[5],
};
export function CheckBoxList(props: CheckboxListI) {
  const { listCheckBox, setArrayOfCheckList } = props;

  const [check, setCheck] = useState(false);
  console.log("list check box", listCheckBox);

  return (
    <View>
      {listCheckBox?.map((item, index) => {
        return (
          <View key={index} row centerV style={CHECKBOX_CONTAINER}>
            <TouchableOpacity
              onPress={() => {
                const editedCheckList = listCheckBox.map(
                  (itemArr, indexArr) => {
                    if (indexArr === index) {
                      // setCheck(!check);

                      return {
                        ...itemArr,
                        isCheck: !item.isCheck,
                      };
                    }
                    return itemArr;
                  }
                );
                setArrayOfCheckList(editedCheckList);
              }}
            >
              <Icon
                name={check ? "check-box" : "check-box-outline-blank"}
                size={20}
              />
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <TextInput
                placeholder="new check list"
                defaultValue={item.item}
                onChangeText={(text) => {
                  const editedCheckList = listCheckBox.map(
                    (itemArr, indexArr) => {
                      if (indexArr === index) {
                        return {
                          ...itemArr,
                          item: text,
                        };
                      }
                      return itemArr;
                    }
                  );
                  setArrayOfCheckList(editedCheckList);
                }}
                style={{
                  textDecorationLine: check ? "line-through" : "none",
                  paddingLeft: spacingWidth[3],
                  fontSize: 15,
                  fontFamily: Font.regular,
                }}
              />
            </TouchableWithoutFeedback>
          </View>
        );
      })}
      <TouchableOpacity
        onPress={() => {
          const newChecklist: checkListI = {
            item: "",
            isCheck: false,
          };
          setArrayOfCheckList(...listCheckBox, newChecklist);
        }}
      >
        <AppText>Add more</AppText>
      </TouchableOpacity>
    </View>
  );
}

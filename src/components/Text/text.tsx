import React from 'react';
import { TextProps, TextStyle } from 'react-native';
import { Text } from 'react-native-ui-lib';
import { Font } from 'src/theme/font-name';
import { color } from 'src/theme/color';
interface TextI extends TextProps {
  text?: string;
  present?: string;
  style?: TextStyle | TextStyle[]|null;
  children?: string | string[]| undefined| React.ReactNode;
  bold?: boolean;
  italic?: boolean;
  semiBold?:boolean;
  extraBold?:boolean
}
export function AppText(props: TextI) {
    const { text, present = Font.regular, style, children, bold, italic,semiBold, extraBold} = props;
    const textStyle = () => {
        if (bold) {
            return Font.bold;
        }
        if(extraBold){
            return Font.extraBold;
        }
        if (italic) {
            return Font.italic;
        } if(semiBold){
            return Font.semiBold;
        }
        else return Font.regular;
    };
    
    return (
        <Text {...props} style={[style, { fontFamily: textStyle() }]}>
            {children}
        </Text>
    );
}

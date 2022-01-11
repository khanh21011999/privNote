import React from "react";
import { TextProps, TextStyle } from "react-native";
import { Text } from "react-native-ui-lib";
import { Font } from "src/theme/font-name";
interface TextI extends TextProps {
  text?: string;
  present?: string;
  style?: TextStyle | TextStyle[];
  children?: string;
  bold?: boolean;
  italic?: boolean;
}
export function AppText(props: TextI) {
  const { text, present = Font.regular, style, children, bold, italic } = props;
  const textStyle = () => {
    if (bold) {
      return Font.bold;
    }
    if (italic) {
      return Font.italic;
    } else return Font.regular;
  };
  return (
    <Text {...props} style={[style, { fontFamily: textStyle() }]}>
      {children}
    </Text>
  );
}

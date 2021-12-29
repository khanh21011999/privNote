import React from "react";
import { ViewProps, TextProps, Text } from "react-native";
import { Button, View } from "react-native-ui-lib";
interface LoginI extends ViewProps {}
export default function Login(props: LoginI) {
  const {} = props;
  return (
    <View>
      <Button>
        <Text>abc</Text>
      </Button>
    </View>
  );
}

import React, { useRef, useState } from "react";
import { ViewProps, TextProps, Text } from "react-native";
import { Button, View } from "react-native-ui-lib";
interface LoginI extends ViewProps {}
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { color } from "src/theme/color";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { signedIn } from "src/redux/authentication";
import firestore from "@react-native-firebase/firestore";
import { Image } from "react-native";
GoogleSignin.configure({
  webClientId:
    "556280479080-e3he9kh8o9nhl84b9uqin4arbl2nsuq9.apps.googleusercontent.com",
});

interface User {
  idToken?: string | undefined;
  serverAuthCode?: string;
  scopes?: Array<string>; // on iOS this is empty array if no additional scopes are defined
  user?: {
    email: string;
    id: string;
    givenName: string;
    familyName: string;
    photo: string; // url
    name: string; // full name
  };
}
export default function Login(props: LoginI) {
  const user = useRef<User>();
  const token = useSelector(
    (item: RootState) => item.persistedReducer.token.token
  );
  const dispatch: AppDispatch = useDispatch();
  const {} = props;
  const addNew = () => {
    console.log(user.current?.user?.email);
    firestore().collection(user.current?.user?.familyName);

    // .then(() => {
    //   console.log("User added!");
    // });
  };
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      user.current = userInfo;
      addNew();

      dispatch(
        signedIn({ token: userInfo?.idToken, userInfomation: userInfo.user })
      );

      // console.log("token", userInfo);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  // async function signIn() {
  //   // Get the users ID token

  //   const user = await GoogleSignin.signIn();
  //   addNew();

  //   // Create a Google credential with the token
  //   const googleCredential = auth.GoogleAuthProvider.credential(user.idToken);

  //   // Sign-in the user with the credential
  //   return auth().signInWithCredential(googleCredential);
  // }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        onPress={() => {
          signIn().then(() => console.log("Signed in with Google!"));
          // addNew();
        }}
      >
        <Text style={{ color: "white" }}>Login</Text>
      </Button>
    </View>
  );
}

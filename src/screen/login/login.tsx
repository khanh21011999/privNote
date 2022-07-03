import React, { useEffect, useRef, useState } from 'react';
import { ViewProps, TextProps, Text, ActivityIndicator } from 'react-native';
import { Button, View } from 'react-native-ui-lib';
type LoginI = ViewProps
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { color } from 'src/theme/color';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';
import { signedIn } from 'src/redux/authentication';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { Image } from 'react-native';
GoogleSignin.configure({
    webClientId:
    '556280479080-e3he9kh8o9nhl84b9uqin4arbl2nsuq9.apps.googleusercontent.com',
});

interface User {
  idToken?: string | null;
  serverAuthCode?: string | null;
  scopes?: Array<string>; // on iOS this is empty array if no additional scopes are defined
  user?: {
    email: string;
    id: string;
    givenName: string | null;
    familyName: string | null;
    photo: string | null; // url
    name: string | null; // full name
  };
}
export default function Login(props: LoginI) {
    const user = useRef<User>(null);

    const [userExist, setUserExist] = useState<boolean>(false);
    const [isPressLoading, setPressLoading] = useState(false);

    const ListUser: any[] = [];
    const token = useSelector(
        (item: RootState) => item.persistedReducer.firebase.token
    );
    const dispatch: AppDispatch = useDispatch();

    const addNew = async () => {
        await firestore()
            .collection('Users')
            .doc(user.current?.user?.email)
            .set({
                userInfo: { ...user.current },
                note: [],
            });
    // .then(() => console.log("success"));
    };
    const getUser = async () => {
        await firebase
            .firestore()
            .collection('Users')
            .get()
            .then((data) => {
                data.forEach((snapshot) => {
                    ListUser.push(snapshot.id);
                });
            });
    };
    useEffect(() => {
        if (user.current) {
            getUser();
        }
    }, [ListUser]);
    async function signIn() {
    // Get the users ID token
        const userInfo = await GoogleSignin.signIn();
        setPressLoading(true);
        const googleCredential = auth.GoogleAuthProvider.credential(
            userInfo.idToken
        );

        await auth().signInWithCredential(googleCredential);
        await getUser();
        user.current = userInfo;
        if (ListUser.includes(user.current.user?.email)) {
            dispatch(
                signedIn({ token: userInfo?.idToken, userInfomation: userInfo.user })
            );
        } else {
            addNew();
            dispatch(
                signedIn({ token: userInfo?.idToken, userInfomation: userInfo.user })
            );
        }
        // ListUser = ListUser.concat(user.current.user?.email);

        // console.log(ListUser.includes(user.current.user?.email));
        // addNew();
        dispatch(
            signedIn({ token: userInfo?.idToken, userInfomation: userInfo.user })
        );

        // Create a Google credential with the token

    // Sign-in the user with the credential
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button
                onPress={() => {
                    signIn();

                }}
            >
                <Text style={{ color: 'white' }}>Login</Text>
            </Button>
            {isPressLoading && user.current == null && (
                <View >
                    <ActivityIndicator size="large" color="red" />

                </View>

            )}
        </View>
    );
}

import React from 'react';
import store, { persistStorageNote } from './src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NoteNavigation } from './src/navigation/note-navigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();
const firebaseConfig = {
    apiKey: 'AIzaSyAtGfOJoaISmrMoYDzp_FrIjkZ87aHbIeA',
    authDomain: 'privnote-cfcd6.firebaseapp.com',
    databaseURL: 'https://privnote-cfcd6-default-rtdb.firebaseio.com',
    projectId: 'privnote-cfcd6',
    storageBucket: 'privnote-cfcd6.appspot.com',
    messagingSenderId: '556280479080',
    appId: '1:556280479080:web:a183e322bbef7577a16add',
    measurementId: 'G-W6PDXPC924',
};

export default function App() {
    React.useEffect(() => {
        SplashScreen.hide();
    });
    return (
        <Provider store={store}>
            <PersistGate persistor={persistStorageNote}>
                <NoteNavigation />
            </PersistGate>
        </Provider>
    );
}

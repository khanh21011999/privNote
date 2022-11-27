/* eslint-disable @typescript-eslint/no-var-requires */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import noteReducer from './noteList-reducer';
import toggleReducer from './toggle-reducer';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authentication from './authentication';
import { useDispatch } from 'react-redux';

const reducer = combineReducers({
    note: noteReducer,
    firebase: authentication,
});
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
    reducer: { persistedReducer, toggle: toggleReducer },
    middleware: (getDefaultMiddleware) => {
        if (__DEV__) {
            const createDebugger = require('redux-flipper').default;

            return getDefaultMiddleware({
                serializableCheck:false,
                
            }).concat(createDebugger());
        }
        getDefaultMiddleware({
            serializableCheck:false,
            
        });
        return getDefaultMiddleware();
    },

    // getDefaultMiddleware({
    //     serializableCheck: false,
    // }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const persistStorageNote = persistStore(store);

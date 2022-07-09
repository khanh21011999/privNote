import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export const widthScreen = Dimensions.get('window').width;
// export const heightScreen = Dimensions.get(
//   Platform.OS === "ios" ? "screen" : "window"
// ).height;
export const heightScreen = Dimensions.get(
    Platform.OS === 'ios' ? 'screen' : 'window'
).height;
const defaultWidth = 390;
const defaultHeight = 844;
export const onePercentHeight = heightScreen / 100;
const screenHeight = Dimensions.get('screen').height;
const statusBarHeight = StatusBar?.currentHeight;

const windowHeight = Dimensions.get('window').height;
const bottomHeight = screenHeight - windowHeight;


export const bottomNavHeight = ()=>{
    if(screenHeight-windowHeight- statusBarHeight>0){
        return screenHeight-windowHeight- statusBarHeight;
    } else{
        return bottomHeight;
    }
};

let currentSize = widthScreen;
if (widthScreen < heightScreen) {
    currentSize = heightScreen;
}

export const onePercentWidth = widthScreen / 100;
export const size = {
    noteSize: {
        height: onePercentHeight * 25,
        width: onePercentWidth * 45,
    },
    addNoteButton: {
        height: onePercentWidth * 16,
        width: onePercentWidth * 16,
    },
    iconAssetSize: widthPercentageToDP(5),
    iconSize: widthPercentageToDP(5),
    noteCheckSize: onePercentWidth * 8,
    headerSearch: 10 * onePercentWidth,
};

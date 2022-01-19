import { Dimensions, PixelRatio, Platform, StatusBar } from "react-native";

export const widthScreen = Dimensions.get("window").width;
// export const heightScreen = Dimensions.get(
//   Platform.OS === "ios" ? "screen" : "window"
// ).height;
export const heightScreen = Dimensions.get(
  Platform.OS === "ios" ? "screen" : "window"
).height;
const defaultWidth = 390;
const defaultHeight = 844;
export const onePercentHeight = heightScreen / 100;
const screenHeight = Dimensions.get("screen").height;
const statusBarHeight = StatusBar.currentHeight;

const windowHeight = Dimensions.get("window").height;
export const bottomNavHeight = screenHeight - statusBarHeight! - windowHeight;

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
  iconAssetSize: onePercentHeight * 3.5,
  iconSize: onePercentHeight * 2,
  headerSearch: 5 * onePercentHeight,
};

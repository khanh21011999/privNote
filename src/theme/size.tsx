import { Dimensions, PixelRatio } from "react-native";

export const widthScreen = Dimensions.get("window").width;
export const heightScreen = Dimensions.get("window").height;
const defaultWidth = 390;
const defaultHeight = 844;
export const onePercentHeight =
  (heightScreen * heightScreen) / (defaultHeight * 100);

let currentSize = widthScreen;
if (widthScreen < heightScreen) {
  currentSize = heightScreen;
}

export const onePercentWidth =
  (widthScreen * widthScreen) / (defaultWidth * 100);
export const size = {
  noteSize: {
    height: onePercentHeight * 25,
    width: onePercentWidth * 43,
  },
  addNoteButton: {
    height: onePercentHeight * 5,
    width: onePercentWidth * 30,
  },
};

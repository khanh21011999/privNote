import { Dimensions } from "react-native";
import { onePercentHeight, onePercentWidth } from "./size";

//width and height on iphone 12

const currentWidth = Dimensions.get("window").width;
const currentHeight = Dimensions.get("window").width;
let currentSize = currentWidth;
if (currentHeight < currentWidth) {
  currentSize = currentHeight;
}

export const spacingWidth = [
  0,
  onePercentWidth,

  2 * onePercentWidth,
  4 * onePercentWidth,
  8 * onePercentWidth,
  12 * onePercentWidth,
  16 * onePercentWidth,
  20 * onePercentWidth,
  24 * onePercentWidth,
];
export const spacingHeight = [
  0,
  onePercentHeight,

  2 * onePercentHeight,
  4 * onePercentHeight,
  8 * onePercentHeight,
  12 * onePercentHeight,
  16 * onePercentHeight,
  20 * onePercentHeight,
  24 * onePercentHeight,
];

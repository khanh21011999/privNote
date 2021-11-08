import { Dimensions } from "react-native";
import { onePercentWidth } from "./size";

//width and height on iphone 12

const currentWidth = Dimensions.get("window").width;
const currentHeight = Dimensions.get("window").width;
let currentSize = currentWidth;
if (currentHeight < currentWidth) {
  currentSize = currentHeight;
}

export const spacing = [
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

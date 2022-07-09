import { Dimensions } from 'react-native';
import { onePercentHeight, onePercentWidth } from './size';

//width and height on iphone 12

const currentWidth = Dimensions.get('window').width;
const currentHeight = Dimensions.get('window').width;
let currentSize = currentWidth;
if (currentHeight < currentWidth) {
    currentSize = currentHeight;
}

export const spacingWidth = [
    0,
    onePercentWidth,

    1 * onePercentWidth,
    2 * onePercentWidth,
    3 * onePercentWidth,
    4 * onePercentWidth,
    5 * onePercentWidth,
    6 * onePercentWidth,
    7 * onePercentWidth,
    8 * onePercentWidth,
    9 * onePercentWidth,
    10 * onePercentWidth,
];
export const spacingHeight = [
    0,
    onePercentHeight,

    1 * onePercentHeight,
    2 * onePercentHeight,
    3 * onePercentHeight,
    4 * onePercentHeight,
    5 * onePercentHeight,
    6 * onePercentHeight,
    7 * onePercentHeight,
    8 * onePercentHeight,
    9 * onePercentHeight,
    10 * onePercentHeight,
];

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
declare module '@react-navigation/native' {
  export type ExtendedTheme = {
    dark: boolean;
    colors: {
      primary?: string;
      lightGrey?:string;
      capeHoney?:string;
      oldLace?:string;
      lightYellow?:string;
      secondary?:string;
      tertiary?:string;
      danger?:string;
      backgroundGrey?:string;
      background?:string;
      card?:string;
      black?:string;
      white?:string;
      darkGrey?:string;
      darkBurgundy?:string;
      littleGrey?:string;
      pastelGray?:string;
      dirtyWhite?:string;
      cornSilk?:string;
      crayola?:string;
      lighturple?:string;
      text?:string;
      subtext?:string;
      separator?:string;
      border?:string;
      highlight?:string;
      notification?:string;
    };
  };
  export function useTheme(): ExtendedTheme;
}
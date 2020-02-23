import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import colors from 'constants/colors';
import { ImageBackground } from 'react-native';

const BackgroundComponents = (props: any) => {
  if (props.image) {
    return (
      <ImageBackground source={props.image} style={{ flex: 1 }}>
        {props.children}
      </ImageBackground>
    )
  } else {
    return (
      <LinearGradient colors={colors.backgroundMainTheme} style={{ flex: 1 }}>
        {props.children}
      </LinearGradient>
    )
  }
};

export {
  BackgroundComponents
}
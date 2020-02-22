import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import colors from 'constants/colors';

const BackgroundComponents = (props: any) => (
  <LinearGradient colors={colors.backgroundMainTheme} style={{ flex: 1 }}>
    {props.children}
  </LinearGradient>
);

export {
  BackgroundComponents
}
import { Dimensions, Platform, PixelRatio } from 'react-native';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size: number) {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

const fontFamilies = {
  thin: {
    // fontFamily: 'Roboto-Thin',
    fontWeight: '100',
  },
  bold: {
    // fontFamily: 'Roboto-Bold',
    fontWeight: '600'
  },
  light: {
    // fontFamily: 'Roboto-Light',
  },
  medium: {
    // fontFamily: 'Roboto-Medium',
    fontWeight: '500',
  },
  regular: {
    // fontFamily: 'Roboto-Regular',
    fontWeight: '400',
  }
}

const fontSizes = {
  text: normalize(14),
  small: normalize(16),
  title: normalize(25),
  medimum: normalize(40),
  large: normalize(50),
  hero: normalize(60),
  superHero: normalize(112),
}

export { fontSizes, fontFamilies }
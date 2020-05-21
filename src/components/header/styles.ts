import { StyleSheet, Dimensions } from 'react-native';

import colors from 'constants/colors';
import { fontSizes } from 'constants/fonts';

import { getWidthAndHeight } from 'utils/dimensions'
const { width, height } = getWidthAndHeight();
const margin = width * 0.03;
const sidePadding = width * 0.05;
const topPadding = 0;
import { isIphoneX } from 'react-native-iphone-x-helper'

// width = 375 for IPhone X
const bottomPadding = 0;
export default StyleSheet.create({
  container: {
    width,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  containerNoShadow: {
    width
  },
  headerContainer: {
    height: isIphoneX() ? 100 : 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingTop: topPadding,
    paddingBottom: bottomPadding,
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
  },
  headerText: {
    color: colors.black,
    fontSize: fontSizes.small,
    height: 25,
    top: 3,
    textAlign: 'center',
    width: width / 2
  },
  secondaryHeaderText: {
    fontSize: fontSizes.smaller,
    fontWeight: 'bold',
    top: 10,
    left: 5,
    minWidth: 50,
  },
  styleTitle: {
    position: 'absolute',
    width, flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    alignItems: 'center'
  },
  secondaryHeaderImage: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
  },
  cancelText: {
    color: colors.white
  },
  doneText: {
    color: colors.done
  }
});

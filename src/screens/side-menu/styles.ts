import {
  StyleSheet,
} from 'react-native';
import colors from 'constants/colors';
import { isIOS } from 'constants/platform';
import { fontSizes, fontFamilies } from 'constants/fonts';
const styles = StyleSheet.create({
  container: { flex: 1, width: isIOS ? '75%' : '100%', alignItems: 'center' },
  block: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0'
  },
  icon: { width: 25, height: 25, marginRight: 20 },
  name: { marginTop: 10, color: colors.white, fontSize: fontSizes.small, ...fontFamilies.bold },
  email: { marginTop: 2, color: colors.white, fontSize: fontSizes.smallest, ...fontFamilies.regular },
  menuTitle: { color: colors.white, fontSize: fontSizes.smaller, ...fontFamilies.medium },
});

export default styles;
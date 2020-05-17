import {
  StyleSheet,
} from 'react-native';
import colors from 'constants/colors';
import { regularPadding } from '@constants/dimensions';

const styles = StyleSheet.create({
  container: { padding: regularPadding / 2, width: '100%', height: '100%', alignItems: 'center' },
  buttonStyle: {
    height: 50,
    borderWidth: 2,
    backgroundColor: 'transparent',
    borderColor: colors.white,
  },
  scrollView: { flex: 1, width: '100%' },
  contentContainer: { alignItems: 'center', height: '100%' },
  buttonContainer: { width: '100%', borderRadius: 27, top: 50, paddingLeft: 5, paddingRight: 5 },
  drawerIcon: { top: 8, width: 20, height: 20 },
  inputStyle: {
    borderWidth: 1,
    borderColor: colors.grayLight,
    borderRadius: 30,
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20
  },
  iconInputStyle: { marginLeft: -2, marginRight: '5%' }
});

export default styles;
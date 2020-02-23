import {
  StyleSheet,
} from 'react-native';
import colors from 'constants/colors';
import { regularPadding } from 'constants/dimensions';
import { getWidth } from '@utils/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  buttonStyle: {
    height: 50,
    borderWidth: 2,
    backgroundColor: 'transparent',
    borderColor: colors.white,
  },
  scrollView: { flex: 1, width: '100%' },
  contentContainer: { alignItems: 'center', height: '100%' },
  buttonContainer: { width: '100%', borderRadius: 27, top: 50, paddingLeft: 5, paddingRight: 5 },
  inputStyle: {
    borderBottomWidth: 1,
    borderColor: colors.white,
  },
  icon: { width: 25, height: 25 },
  logo: { height: '40%', width: getWidth() - regularPadding * 2 },
  form: { flex: 1.5, width: '100%', paddingLeft: regularPadding, paddingRight: regularPadding },
  iconInputStyle: { marginLeft: 0, marginRight: '5%' },
  errorText: { color: colors.white, left: 0 },
});

export default styles;
import {
  StyleSheet,
} from 'react-native';
import colors from 'constants/colors';
import { regularPadding } from 'constants/dimensions';
import { getWidth, getHeight } from '@utils/dimensions';

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
  scrollView: { position: 'absolute', top: 0, flex: 1, width: '100%' },
  contentContainer: { alignItems: 'center', paddingTop: 0.12 * getHeight() / 2},
  buttonContainer: { width: '100%', borderRadius: 27, top: 20, paddingLeft: 5, paddingRight: 5 },
  inputStyle: {
    borderBottomWidth: 1,
    borderColor: colors.white,
  },
  icon: { width: 25, height: 25 },
  logo: { height: '40%', width: getWidth() - regularPadding * 2 },
  form: { flex: 1, width: '100%', height: getHeight(), paddingLeft: regularPadding, paddingRight: regularPadding },
  iconInputStyle: { marginLeft: 0, marginRight: '5%' },
  errorText: { color: colors.white, left: 0 },
});

export default styles;
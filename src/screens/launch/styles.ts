import {
  StyleSheet,
} from 'react-native';
import colors from 'constants/colors';

const styles = StyleSheet.create({
  container: { width: '100%', height: '100%', alignItems: 'center', },
  buttonStyle: {
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.buttonColor,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonContainer: { width: '50%', borderRadius: 27, shadowColor: 'black', shadowRadius: 5 },
});

export default styles;
import { connect } from 'react-redux';
import LoginScreen from './login.screen';
import {
  navigationRootAction
} from 'actions/navigation';

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    navigationRootAction: (nameScreen: string) => dispatch(navigationRootAction({ name: nameScreen }))
  };
};

const mapStateToProps = ({ }) => {
  return ({
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

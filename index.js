/**
 * @format
 */

import LaunchScreen from './src/screens/launch';
import LoginScreen from './src/screens/login';
import SignupScreen from './src/screens/signup';
import Home from '@screens/home';
import { Navigation } from "react-native-navigation";
import { reduxProvider } from '@store/configureStore';
import HOME_ICON from './src/assets/images/home_icon.png';
import NavigationActionsService from './src/utils/navigation';
import { store } from '@store/configureStore';
import {
  STATUS_NO_AUTH,
  LOGIN_SCREEN,
  SIGNUP_SCREEN,
  LAUNCH_SCREEN,
  HOME_SCREEN,
  NAVIGATION_ROOT_WITH_EPIC,
} from '@constants';
Navigation.registerComponent(LAUNCH_SCREEN, () => reduxProvider(LaunchScreen), () => LaunchScreen);
Navigation.registerComponent(LOGIN_SCREEN, () => reduxProvider(LoginScreen), () => LoginScreen);
Navigation.registerComponent(SIGNUP_SCREEN, () => reduxProvider(SignupScreen), () => SignupScreen);
Navigation.registerComponent(HOME_SCREEN, () => reduxProvider(Home), () => Home);

let currentScreen = '';

Navigation.events().registerAppLaunchedListener(() => {
  store.subscribe(() => {
    // handle navigation changed
    let { navigation } = store.getState();
    if (currentScreen !== navigation.name) {
      let root = null;
      currentScreen = navigation.name;
      if (currentScreen == HOME_SCREEN) {
        let child = (name, icon, text = '') => {
          return {
            stack: {
              children: [{
                component: { name }
              }],
              options: {
                ...NavigationActionsService.defaultOptions,
                bottomTab: { text, icon }
              }
            }
          }
        }
        root = {
          sideMenu: {
            left: {
              component: {
                name: HOME_SCREEN
              },
            },
            center: {
              bottomTabs: {
                children: [
                  child(HOME_SCREEN, HOME_ICON, 'Tab1'),
                  child(HOME_SCREEN, HOME_ICON, 'Tab2'),
                  child(HOME_SCREEN, HOME_ICON, 'Tab3'),
                  child(HOME_SCREEN, HOME_ICON, 'Tab3'),
                ],
              }
            },
            // animationType: 'slide-and-scale', // defaults to none if not provided, options are 'parallax', 'door', 'slide', or 'slide-and-scale'    
            // openGestureMode: 'entireScreen' | 'bezel'
          }
        }
        // Navigation.showOverlay({
        //   component: {
        //     name: HOME_SCREEN,
        //     options: {
        //       overlay: {
        //         interceptTouchOutside: true
        //       }
        //     }
        //   }
        // });
      } else {
        root = {
          stack: {
            children: [{
              component: {
                name: currentScreen,
              }
            }],
            options: NavigationActionsService.defaultOptions
          },
        }
      }
      Navigation.setRoot({ root });
    }
  });
  store.dispatch({
    type: NAVIGATION_ROOT_WITH_EPIC,
    payload: { name: LAUNCH_SCREEN },
  });
});
/**
 * @format
 */

import LoadingPage from '@screens/loading';
import LoginScreen from '@screens/login';
import Home from '@screens/home';
import SideMenu from '@screens/side-menu';
import { Navigation } from "react-native-navigation";
import { reduxProvider } from '@store/configureStore';
import NavigationActionsService from './src/utils/navigation';
import { store } from '@store/configureStore';
import {
  LOADING_PAGE,
  LOGIN_SCREEN,
  HOME_SCREEN,
  SIDE_MENU,
  NAVIGATION_ROOT_WITH_SAGA,
} from '@constants';
Navigation.registerComponent(LOADING_PAGE, () => reduxProvider(LoadingPage), () => LoadingPage);
Navigation.registerComponent(LOGIN_SCREEN, () => reduxProvider(LoginScreen), () => LoginScreen);
Navigation.registerComponent(HOME_SCREEN, () => reduxProvider(Home), () => Home);
Navigation.registerComponent(SIDE_MENU, () => reduxProvider(SideMenu), () => SideMenu);

let currentScreen = '';

Navigation.events().registerAppLaunchedListener(() => {
  store.subscribe(() => {
    // handle navigation changed
    let { navigation } = store.getState();
    if (currentScreen !== navigation.name) {
      let root = null;
      currentScreen = navigation.name;
      if (currentScreen == HOME_SCREEN) {
        root = {
          sideMenu: {
            left: {
              component: {
                name: SIDE_MENU

              },
            },
            center: {
              stack: {
                children: [{
                  component: {
                    name: HOME_SCREEN,
                  }
                }],
                options: NavigationActionsService.defaultOptions
              },
            },
            // animationType: 'slide-and-scale', // defaults to none if not provided, options are 'parallax', 'door', 'slide', or 'slide-and-scale'    
            // openGestureMode: 'entireScreen' | 'bezel'
          }
        }
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
    type: NAVIGATION_ROOT_WITH_SAGA,
    payload: { name: LOGIN_SCREEN },
  });
});
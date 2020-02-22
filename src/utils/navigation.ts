import { Navigation } from "react-native-navigation";
import { Keyboard } from "react-native";

class NavigationActionsService {
  private static stackNavigation: any[] = [];
  private static navigation: any;
  private static instance: NavigationActionsService;
  private static defaultOptions = {
    topBar: {
      visible: false
    },
    animations: {
      push: {
        waitForRender: true
      }
    },
    sideMenu: {
      left: {
        shouldStretchDrawer: false,
        // animationVelocity: 200,
      },
      animationType: 'door', // defaults to none if not provided, options are 'parallax', 'door', 'slide', or 'slide-and-scale'    
    },
  }
  constructor(props?: any) {
  }

  static initInstance(navigation: any): NavigationActionsService {
    if (!NavigationActionsService.instance) {
      NavigationActionsService.instance = new NavigationActionsService();
    }
    NavigationActionsService.navigation = navigation
    NavigationActionsService.stackNavigation.push(
      navigation,
    )
    return NavigationActionsService.instance;
  }

  public static toggleDrawer = (bool: boolean) => Navigation.mergeOptions(
    NavigationActionsService.navigation, {
    sideMenu: {
      left: {
        visible: bool,
      },
    },
  });

  public static push = (screenName: string, passProps = {}) => {
    Navigation.push(
      NavigationActionsService.navigation, {
      component: {
        name: screenName,
        passProps,
        options: {
          topBar: {
            visible: false
          },
          animations: {
            push: {
              waitForRender: true
            }
          },
        }
      }
    })

  };

  public static pop = () => {
    Keyboard.dismiss();
    Navigation.pop(NavigationActionsService.navigation);
    NavigationActionsService.stackNavigation.pop()
    const maximumStackLength = NavigationActionsService.stackNavigation.length;
    NavigationActionsService.navigation = NavigationActionsService.stackNavigation[maximumStackLength - 1]
  }
}

export default NavigationActionsService
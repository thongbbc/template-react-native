import AVAILABLE_JOB_ICON from 'assets/images/availableJob.png';
import MY_JOB_ICON from 'assets/images/myJob.png';
import NOTIFICATION_ICON from 'assets/images/notification.png';
import SETTINGS_ICON from 'assets/images/settings.png';
import PROFILE_ICON from 'assets/images/profile.png';
import { Menu } from 'types/types';

enum RequestMethod {
  POST = 'POST',
  PATCH = 'PATCH',
  GET = 'GET',
}

const listMenu: Array<Menu> = Array({
  icon: AVAILABLE_JOB_ICON,
  name: 'Available Jobs'
}, {
  icon: MY_JOB_ICON,
  name: 'My Jobs'
}, {
  icon: NOTIFICATION_ICON,
  name: 'Notifications'
}, {
  icon: SETTINGS_ICON,
  name: 'Settings'
}, {
  icon: PROFILE_ICON,
  name: 'Profile'
});

const RESET_ALL_STATE = 'RESET_ALL_STATE';
const NAVIGATION_PREFIX = 'NAVIGATION_';

const STATUS_NO_AUTH = 'STATUS_NO_AUTH';
const STATUS_AUTHED = 'STATUS_AUTHED';

//SCREEN
const LOADING_PAGE = `${NAVIGATION_PREFIX}LOADING_PAGE`;
const LAUNCH_SCREEN = `${NAVIGATION_PREFIX}LAUNCH_SCREEN`;
const LOGIN_SCREEN = `${NAVIGATION_PREFIX}LOGIN_SCREEN`;
const SIGNUP_SCREEN = `${NAVIGATION_PREFIX}SIGNUP_SCREEN`;
const SIDE_MENU = `${NAVIGATION_PREFIX}SIDE_MENU`;
const HOME_SCREEN = `${NAVIGATION_PREFIX}NAVIGATION_HOME_SCREEN`;

const NAVIGATION_ROOT_WITH_SAGA = 'NAVIGATION_ROOT_WITH_SAGA';
const NAVIGATION_ROOT_SUCCESS = 'NAVIGATION_ROOT_SUCCESS';
const SELECTED_MENU = 'SELECTED_MENU';

const CREATE_NEW_APP_WITH_SAGA = 'CREATE_NEW_APP_WITH_SAGA';
const LOGIN_WITH_SAGA = 'LOGIN_WITH_SAGA';
const LOGIN_WITH_SAGA_SUCCESS = 'LOGIN_WITH_SAGA_SUCCESS';
const LOGIN_WITH_SAGA_FAILED = 'LOGIN_WITH_SAGA_FAILED';
const LOGOUT_WITH_SAGA = 'LOGOUT_WITH_SAGA';


export {
  listMenu,

  RESET_ALL_STATE,
  RequestMethod,

  LOADING_PAGE,
  LOGIN_SCREEN,
  HOME_SCREEN,
  LAUNCH_SCREEN,
  SIGNUP_SCREEN,
  SIDE_MENU,
  CREATE_NEW_APP_WITH_SAGA,
  SELECTED_MENU,

  LOGOUT_WITH_SAGA,
  LOGIN_WITH_SAGA,
  LOGIN_WITH_SAGA_SUCCESS,
  LOGIN_WITH_SAGA_FAILED,

  NAVIGATION_ROOT_WITH_SAGA,
  NAVIGATION_ROOT_SUCCESS,
  STATUS_NO_AUTH,
  STATUS_AUTHED
}
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import {
  StatusBar,
  Image,
} from 'react-native';
import Text from 'components/text.component';
import styles from './styles';
import { ViewVertical } from 'components/viewBox.component';
import Header from 'components/header/header.component';
import NavigationActionsService from 'utils/navigation';
import colors from '@constants/colors';
import { listMenu } from 'constants/';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers/';
import SettingsScreen from 'screens/settings';

import DRAWER_ICON from 'assets/images/drawer.png';
import { fontSizes, fontFamilies } from '@constants/fonts';
const HomeScreen = (props: any) => {
  useEffect(() => {
    NavigationActionsService.initInstance(props.componentId)

    return () => NavigationActionsService.destroyScreen();
  }, []);

  const selectedMenuIndex = useSelector<RootState>(
    (state: RootState) => state.navigation.selectedMenuIndex
  ) as number;

  const openDrawer = () => {
    NavigationActionsService
      .toggleDrawer(true);
  }

  const mainText = listMenu[selectedMenuIndex].name

  const renderSelectedItem = () => {
    switch (selectedMenuIndex) {
      case 0:
        return (
          <Text>Available Jobs</Text>
        );
      case 1:
        return (
          <Text>My Jobs</Text>
        );
      case 2:
        return (
          <Text>Notifications</Text>
        );
      case 3:
        return (
          <SettingsScreen />
        );
      case 4:
        return (
          <Text>Profile</Text>
        );
      default:
        break;
    }
  }

  return (
    <ViewVertical style={{ backgroundColor: colors.background }}>
      <StatusBar barStyle="default" />
      <ViewVertical style={styles.container}>
        <Header
          noShadow={true}
          stylesHeaderText={{ color: colors.white, fontSize: fontSizes.small, ...fontFamilies.medium }}
          mainText={mainText}
          stylesHeader={{ backgroundColor: colors.mainColor }}
          leftComponent={<Image
            resizeMode='cover'
            style={styles.drawerIcon}
            source={DRAWER_ICON}
          />}
          leftAction={openDrawer}
        />
        <ViewVertical>
          {renderSelectedItem()}
        </ViewVertical>
      </ViewVertical>
    </ViewVertical>
  );
};

export default HomeScreen;

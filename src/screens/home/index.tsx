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
  FlatList,
  View,
} from 'react-native';
import Text from 'components/text.component';
import styles from './styles';
import { ViewVertical, ViewHorizontal } from 'components/viewBox.component';
import Header from 'components/header/header.component';
import NavigationActionsService from 'utils/navigation';
import colors from '@constants/colors';
import { listMenu } from 'constants/';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers/';
import SettingsScreen from 'screens/settings';
import { Button } from 'react-native-elements';
import DRAWER_ICON from 'assets/images/drawer.png';
import { fontSizes, fontFamilies } from '@constants/fonts';
import { BackgroundComponents } from '@components/background.component';
import { regularPadding } from '@constants/dimensions';
import { getHeight } from '@utils/dimensions';
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
    <BackgroundComponents>
      <StatusBar barStyle="default" />
      <ViewVertical style={styles.container}>
        <Header
          noShadow={true}
        />
        <ViewVertical style={{backgroundColor: 'rgba(255,255,255,0.3)', width: '100%', padding: regularPadding, borderRadius: 5}}>
          <ViewHorizontal style={{width: '100%'}}>
            <Text style={{color: colors.black, fontSize: fontSizes.small, ...fontFamilies.regular, marginRight: 10}}>Name:</Text>
            <Text style={{color: colors.black, fontSize: fontSizes.small, ...fontFamilies.light}}>Nguyen Anh Thong</Text>
          </ViewHorizontal>
          <ViewHorizontal style={{width: '100%', marginTop: 5}}>
            <Text style={{color: colors.black, fontSize: fontSizes.small, ...fontFamilies.regular, marginRight: 10}}>AppId:</Text>
            <Text style={{color: colors.black, fontSize: fontSizes.small, ...fontFamilies.light}}>1321321321</Text>
          </ViewHorizontal>
        </ViewVertical>
        <ViewVertical style={{width: '100%', borderRadius: 5, marginTop: 20, height: getHeight() /2}}>
          <FlatList
            contentContainerStyle={{paddingVertical: regularPadding / 2}}
            keyExtractor={(item ,index) => index.toString()}
            data={Array(10).map(item => { phone: '12312312321'})}
            renderItem={({item, index}: any) => {
              return (
                <ViewVertical style = {{ borderRadius: 5, marginBottom: 10, width: '100%', height: 80, backgroundColor: 'rgba(255,255,255,0.3)'}}>
                  <ViewHorizontal style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: colors.black, fontSize: fontSizes.smaller, ...fontFamilies.regular, marginRight: 10}}>{index}.</Text>
                    <Text style={{color: colors.black, fontSize: fontSizes.smaller, ...fontFamilies.regular}}>1321321321</Text>
                  </ViewHorizontal>
                </ViewVertical>
              )
            }}
          />
        </ViewVertical>
        <Button
          onPress={() => {
          }}
          titleStyle={{ fontSize: fontSizes.small, color: colors.white, ...fontFamilies.bold }}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainer}
          title='SYNC'
        />
      </ViewVertical>
    </BackgroundComponents>
  );
};

export default HomeScreen;

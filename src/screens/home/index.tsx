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
} from 'react-native';
import { Icon } from 'react-native-elements';
import { BackgroundComponents } from 'components/background.component';
import styles from './styles';
import { ViewVertical } from 'components/viewBox.component';
import Header from 'components/header/header.component';
import NavigationActionsService from 'utils/navigation';
interface InputState {
  email: string,
  password: string,
}
const HomeScreen = (props: any) => {
  useEffect(() => {
    NavigationActionsService.initInstance(props.componentId)
  }, []);


  const openDrawer = () => {
    NavigationActionsService
      .toggleDrawer(true);
  }
  return (
    <BackgroundComponents>
      <StatusBar barStyle="default" />
      <ViewVertical style={styles.container}>
        <Header
          noShadow={true}
          leftComponent={<Icon type={'antdesign'} name='arrowleft' />}
          leftAction={openDrawer}
        />
      </ViewVertical>
    </BackgroundComponents>
  );
};



export default HomeScreen;

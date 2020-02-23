/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import {
  StatusBar, ActivityIndicator,
} from 'react-native';
import styles from './styles';
import { ViewVertical } from 'components/viewBox.component';
import NavigationActionsService from 'utils/navigation';
import colors from '@constants/colors';
const LoadingPage = (props: any) => {
  useEffect(() => {
    NavigationActionsService.initInstance(props.componentId)
  }, []);
  return (
    <ViewVertical style={styles.container}>
      <ActivityIndicator style={{ width: 100, height: 100 }} color='white' size='large' />
    </ViewVertical>
  );
};



export default LoadingPage;

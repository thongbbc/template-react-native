/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
} from 'react-native';
import { Button } from 'react-native-elements';
import Text from 'components/text.component';
import { BackgroundComponents } from 'components/background.component';
import colors from 'constants/colors';
import { fontSizes, fontFamilies } from 'constants/fonts';
import styles from './styles';
import {
  LOGIN_SCREEN,
} from '@constants';
import NavigationActionsService from 'utils/navigation';

const LaunchScreen = (props: any) => {
  NavigationActionsService.initInstance(props.componentId);
  const onPressLogin = () => {
    NavigationActionsService
      .push(LOGIN_SCREEN);
  }
  return (
    <BackgroundComponents>
      <StatusBar barStyle="default" />
      <SafeAreaView>
        <View style={styles.container}>
          <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.darkBlue, fontSize: fontSizes.hero, ...fontFamilies.thin }}>
              DEMO
            </Text>
            <Text style={{ color: colors.darkBlue, fontSize: fontSizes.large, left: '10%', top: '-5%', ...fontFamilies.regular }}>
              APP
            </Text>
            <Text style={{ color: colors.darkBlue, fontSize: fontSizes.text, left: '10%', top: '-5%', ...fontFamilies.regular }}>
              Thong Nguyen
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', width: '100%', justifyContent: 'center' }}>
            <Button
              onPress={onPressLogin}
              titleStyle={{ fontSize: fontSizes.small, color: colors.darkBlue, ...fontFamilies.bold }}
              buttonStyle={styles.buttonStyle}
              containerStyle={[styles.buttonContainer, { marginBottom: '7%' }]}
              title='START'
            />
          </View>
        </View>
      </SafeAreaView>
    </BackgroundComponents>
  );
};


export default LaunchScreen;

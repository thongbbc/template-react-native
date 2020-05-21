/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  StatusBar,
  FlatList,
  View,
  ScrollView,
  Animated,
  PermissionsAndroid,
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
import SmsAndroid from 'react-native-sms-android';
import BackgroundFetch from "react-native-background-fetch";
import BaseService from 'services';

const EachMessage = (props: any) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [HeaderHeight, setHeaderHeight] = useState(0)
  const y = scrollY.interpolate({      
    inputRange: [0, HeaderHeight],
    outputRange: [0, -HeaderHeight],      
    extrapolateRight: 'clamp',    
  });
  const alpha = scrollY.interpolate({      
    inputRange: [0, HeaderHeight],
    outputRange: [1, 0],      
    extrapolateRight: 'clamp',    
  });

  return (
    <BackgroundComponents>
      <StatusBar barStyle="default" />
      <Header
        noShadow={true}
        leftText='Back'
        leftAction={() =>NavigationActionsService.pop()}
      />
      <ViewVertical style={styles.container}>
        <Animated.View
        onLayout={({ nativeEvent }: any) => {
          setHeaderHeight(nativeEvent.layout.height);
        }}
        style = {{
          opacity: alpha,
          backgroundColor: 'rgba(255,255,255,0.3)', width: '100%', 
          paddingVertical: regularPadding/2,
          paddingHorizontal: regularPadding, borderRadius: 5,
          transform: [{translateY: y}]
        }}>
          <ViewHorizontal style={{width: '80%'}}>
            <Text style={{color: colors.black, fontSize: fontSizes.small, ...fontFamilies.regular, marginRight: 10}}>Name:</Text>
            <Text style={{color: colors.black, fontSize: fontSizes.small, ...fontFamilies.light}}>{props.name}</Text>
          </ViewHorizontal>
          <ViewHorizontal style={{width: '80%', marginTop: 5}}>
            <Text style={{color: colors.black, fontSize: fontSizes.small, ...fontFamilies.regular, marginRight: 10}}>AppId:</Text>
            <Text style={{color: colors.black, fontSize: fontSizes.small, ...fontFamilies.light}}>{props.appId}</Text>
          </ViewHorizontal>
        </Animated.View>
        <Animated.FlatList
          style={{flex: 1, width: '100%', marginTop: -HeaderHeight + 20}}
          onScroll={Animated.event(          
            [{nativeEvent: {contentOffset: {y: scrollY}}}],  
            {useNativeDriver: true},
          )}
          contentContainerStyle={{
            paddingTop:  HeaderHeight,
            paddingVertical: regularPadding / 2
          }}
          keyExtractor={(item: any ,index: number) => index.toString()}
          data={props.data}
          renderItem={({item, index}: any) => {
            return (
              <ViewVertical style = {{ borderRadius: 5, marginBottom: 10, width: '100%',
              justifyContent: 'center',
              paddingVertical: regularPadding / 2
              , backgroundColor: 'rgba(255,255,255,0.3)'}}>
                <View style  ={{width: '100%',  paddingHorizontal: regularPadding, }}>
                  <ViewHorizontal style={{width: '100%', alignItems: 'center'}}>
                    <Text style={{color: colors.black, fontSize: fontSizes.smaller, ...fontFamilies.regular}}>Phone: {item.phone_number}</Text>
                  </ViewHorizontal>
                  <Text numberOfLines={2} style={{marginTop: 5, color: colors.black, fontSize: fontSizes.smaller, ...fontFamilies.regular}}>Body: {item.body}</Text>
                </View>
              </ViewVertical>
            )
          }}
        />
      </ViewVertical>
    </BackgroundComponents>
  );
};

export default EachMessage;

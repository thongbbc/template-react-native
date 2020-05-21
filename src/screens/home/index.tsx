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
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Text from 'components/text.component';
import styles from './styles';
import { ViewVertical, ViewHorizontal } from 'components/viewBox.component';
import Header from 'components/header/header.component';
import NavigationActionsService from 'utils/navigation';
import colors from '@constants/colors';
import { listMenu, EACH_MESSAGE } from 'constants/';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers/';
import SettingsScreen from 'screens/settings';
import { Button } from 'react-native-elements';
import {sendSms} from '@utils/sms';
import DRAWER_ICON from 'assets/images/drawer.png';
import { fontSizes, fontFamilies } from '@constants/fonts';
import { BackgroundComponents } from '@components/background.component';
import { regularPadding } from '@constants/dimensions';
import BackgroundFetch from "react-native-background-fetch";
import BaseService from 'services';
import AsyncStorage from '@react-native-community/async-storage';
import {clone} from 'lodash';
const HomeScreen = (props: any) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [HeaderHeight, setHeaderHeight] = useState(0)
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [appId, setAppId] = useState('');
  const syncMessage = async () => {
    setLoading(true)
    const response = await BaseService.instance.auth.syncMessages()
    setLoading(false)
    setData(response)
  }
  const getInfo = async () => {
    const nameInfo = await AsyncStorage.getItem('name');
    const appId = await AsyncStorage.getItem('_id');
    setName(nameInfo ? nameInfo : '')
    setAppId(appId ? appId : '')
  }
  const sendBackground = async () => {
    const syncList = await AsyncStorage.getItem('syncList');
    let jsonSyncList = syncList ? JSON.parse(syncList) : [];
    let updatedListSyncList = clone(jsonSyncList)
    for (let i = 0; i<jsonSyncList.length; i++) {
      const item = jsonSyncList[i].body;
      for (let j = 0; j<item.length; j++) {
        try {
          await sendSms(item[j].phone_number, item[j].body)
        } catch (err) {}
      }
      try {
        updatedListSyncList = await BaseService.instance.auth.updateStatus(jsonSyncList[i]._id, updatedListSyncList)
      } catch (err) {
      }
    }
  }
  const testSms = async () => {
    await syncMessage();
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
            {
                title: 'YourProject App Sms Permission',
                message:
                'YourProject App needs access to your inbox ' +
                'so you can send messages in background.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        BackgroundFetch.configure({
          minimumFetchInterval: 15,
          forceAlarmManager: true,
          enableHeadless: true,
          stopOnTerminate: false,
        }, async (taskId) => {
          console.log("[BackgroundFetch] taskId: ", taskId);
          console.log("[BackgroundFetch]===========");
          await sendBackground();
          BackgroundFetch.finish(taskId);
        });
        // And with with #scheduleTask
        BackgroundFetch.scheduleTask({
          taskId: 'com.foo.customtask',
          delay: 5000,       // milliseconds
          forceAlarmManager: true,
          // periodic: false
        });


        let MyHeadlessTask = async (event: any) => {
          // Get task id from event {}:
          let taskId = event.taskId;
          console.log('[BackgroundFetch HeadlessTask] start: ', taskId);
          await sendBackground();
          // Required:  Signal to native code that your task is complete.
          // If you don't do this, your app could be terminated and/or assigned
          // battery-blame for consuming too much time in background.
          BackgroundFetch.finish(taskId);
        }

        // Register your BackgroundFetch HeadlessTask
        BackgroundFetch.registerHeadlessTask(MyHeadlessTask);
      } else {
        alert('SMS permission denied');
      }
    } catch (err) {
      alert('SMS permission denied');
    }
  }
  useEffect(() => {
    getInfo()
    NavigationActionsService.initInstance(props.componentId)
    testSms()
    return () => NavigationActionsService.destroyScreen();
  }, []);

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
      <ViewVertical style={styles.container}>
        {/* <Header
          noShadow={true}
        /> */}
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
            <Text style={{color: colors.black, fontSize: fontSizes.small, ...fontFamilies.bold, marginRight: 10}}>Name:</Text>
            <Text style={{color: colors.black, fontSize: fontSizes.small, ...fontFamilies.light}}>{name}</Text>
          </ViewHorizontal>
          <ViewHorizontal style={{width: '80%', marginTop: 5}}>
            <Text style={{color: colors.black, fontSize: fontSizes.small, ...fontFamilies.bold, marginRight: 10}}>AppId:</Text>
            <Text style={{color: colors.black, fontSize: fontSizes.small, ...fontFamilies.light}}>{appId}</Text>
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
          data={data}
          renderItem={({item, index}: any) => {
            return (
              <TouchableOpacity onPress={() => {
                NavigationActionsService.push(EACH_MESSAGE, {data: item.body, name, appId})
              }} style = {{ borderRadius: 5, marginBottom: 10, width: '100%', height: 40, backgroundColor: 'rgba(255,255,255,0.3)'}}>
                <ViewHorizontal style={{paddingHorizontal: regularPadding, width: '100%', height: '100%', alignItems: 'center'}}>
                  <Text style={{color: colors.black, fontSize: fontSizes.smaller, ...fontFamilies.regular, marginRight: 10}}>List {index}.</Text>
                  <Text style={{color: colors.black, fontSize: fontSizes.smaller, ...fontFamilies.regular}}>{item.body.length} Tin</Text>
                </ViewHorizontal>
              </TouchableOpacity>
            )
          }}
        />
        {loading ? <ActivityIndicator size='large' color={colors.white}/> : <Button
          onPress={syncMessage}
          titleStyle={{ fontSize: fontSizes.small, color: colors.white, ...fontFamilies.bold }}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainer}
          title='SYNC'
        />}
      </ViewVertical>
    </BackgroundComponents>
  );
};

export default HomeScreen;

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
  Alert,
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
  const [data, setData] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [appId, setAppId] = useState('');
  const syncMessage = async () => {
    setLoading(true)
    try {
      const response = await BaseService.instance.auth.syncMessages()
      setData(response)
    } catch (err) {}
    setLoading(false)
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
    const statusError = await AsyncStorage.getItem('StatusError');
    let arrayUpdateStatusError = statusError ? JSON.parse(statusError) : []
    let arrayUpdateStatusErrorRemoved = clone(arrayUpdateStatusError)
    for (let i = 0; i < arrayUpdateStatusError.length; i++) {
      try {
        updatedListSyncList = await BaseService.instance.auth.updateStatus(arrayUpdateStatusError[i], updatedListSyncList)
        arrayUpdateStatusErrorRemoved = arrayUpdateStatusError.filter((id:string) => id !== arrayUpdateStatusError[i])
        if (i===arrayUpdateStatusError.length - 1) {
          arrayUpdateStatusError = []
          await AsyncStorage.removeItem('StatusError')
        }
      } catch (err) {

      }
    }
    arrayUpdateStatusError = arrayUpdateStatusErrorRemoved


    for (let i = 0; i<jsonSyncList.length; i++) {
      const item = jsonSyncList[i].body;
      let send = jsonSyncList[i].send;
      for (let j = 0; j<item.length; j++) {
        try {
          if (send) {
            await new Promise((resolve, reject) => {
              setTimeout(async () => {
                try {
                  await sendSms(item[j].phone_number, item[j].body)
                } catch (err) {
                  send = undefined;
                  updatedListSyncList = updatedListSyncList.map((it: any) => {
                    if(it._id == jsonSyncList[i]._id) {
                      return {
                        ...it,
                        send: false,
                      }
                    }
                    return it;
                  })
                }  
                resolve()
              }, 3000)
            })
          }
        } catch (err) {}
      }
      if (send && jsonSyncList[i]._id) {
        try {
          updatedListSyncList = await BaseService.instance.auth.updateStatus(jsonSyncList[i]._id, updatedListSyncList)
          setData(updatedListSyncList)
        } catch (err) {
          arrayUpdateStatusError.push(jsonSyncList[i]._id)
        }
      }
    }
    await AsyncStorage.setItem('StatusError', JSON.stringify(arrayUpdateStatusError))
  }
  const testSms = async () => {
    await BackgroundFetch.stop('com.foo.customtask')
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
            {
                title: 'MySms App Sms Permission',
                message:
                'MySms App needs access to your inbox ' +
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

  const init = async () => {
    const syncList = await AsyncStorage.getItem('syncList');
    let jsonSyncList = syncList ? JSON.parse(syncList) : [];
    setData(jsonSyncList)
  }

  const onPressSyncItem = async (item: any) => {
    if (item.send == true) {
      return;
    }
    const newData: any[] = data.map((it: any) => {
      if(it._id == item._id) {
        return {
          ...it,
          send: true
        }
      }
      return it;
    })
    await AsyncStorage.setItem('syncList', JSON.stringify(newData));
    setData(newData)
    testSms()
  }

  const onPressDelete = async (item: any) => {
    Alert.alert(
      'Warning!',
      'Are you sure delete this message?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { 
          text: 'Yes', onPress: async () => {
            try {
              let newData = data.filter((it: any) => item._id !== it._id);
              await BaseService.instance.auth.updateStatus(item._id, data, true)
              await AsyncStorage.setItem('syncList', JSON.stringify(newData));
              setData(newData)
              testSms()
            } catch (err) {
              alert('Have some problem! Cannot remove this message!')
            }
          } 
        }
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    getInfo()
    NavigationActionsService.initInstance(props.componentId)
    init()
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
            <Text style={{color: colors.black, fontSize: fontSizes.smaller, ...fontFamilies.bold, marginRight: 10}}>Name:</Text>
            <Text style={{color: colors.black, fontSize: fontSizes.smaller, ...fontFamilies.light}}>{name}</Text>
          </ViewHorizontal>
          <ViewHorizontal style={{width: '80%', marginTop: 5}}>
            <Text style={{color: colors.black, fontSize: fontSizes.smaller, ...fontFamilies.bold, marginRight: 10}}>AppId:</Text>
            <Text style={{color: colors.black, fontSize: fontSizes.smaller, ...fontFamilies.light}}>{appId}</Text>
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
              }} style = {{alignItems: 'center', flexDirection: 'row' , justifyContent: 'space-between', borderRadius: 5, marginBottom: 10, width: '100%', height: 50, backgroundColor: 'rgba(255,255,255,0.3)'}}>
                <ViewHorizontal style={{paddingHorizontal: regularPadding, height: '100%', alignItems: 'center'}}>
                  <Text style={{color: colors.black, fontSize: fontSizes.smaller, ...fontFamilies.regular, marginRight: 10}}>List {index}.</Text>
                  <Text style={{color: colors.black, fontSize: fontSizes.smaller, ...fontFamilies.regular}}>{item.body.length} Tin</Text>
                </ViewHorizontal>
                <ViewHorizontal>
                  {!item.send &&<TouchableOpacity onPress={onPressSyncItem.bind(undefined, item)} style = {{marginRight: regularPadding/2, height: 30, width: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background, borderRadius: 5}}>
                    <Text style={{color: colors.black, fontSize: fontSizes.smaller, ...fontFamilies.bold}}>Send</Text>
                  </TouchableOpacity>}
                  <TouchableOpacity onPress={onPressDelete.bind(undefined, item)} style = {{marginRight: regularPadding/2, height: 30, width: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', borderRadius: 5}}>
                    <Text style={{color: colors.white, fontSize: fontSizes.smaller, ...fontFamilies.bold}}>Delete</Text>
                  </TouchableOpacity>
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

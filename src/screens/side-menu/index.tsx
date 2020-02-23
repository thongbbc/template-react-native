/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import {
  StatusBar, TouchableOpacity,
} from 'react-native';
import { Avatar, Image } from 'react-native-elements';
import { BackgroundComponents } from 'components/background.component';
import styles from './styles';
import { ViewVertical, ViewHorizontal } from 'components/viewBox.component';
import Header from 'components/header/header.component';
import NavigationActionsService from 'utils/navigation';
import Text from 'components/text.component';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducers';
import { selectMenuIndex } from '@actions/navigation.action';
import { listMenu } from 'constants/';
import { Menu } from 'types/types';

const HomeScreen = (props: any) => {
  useEffect(() => {
    NavigationActionsService.initInstance(props.componentId)
  }, []);
  const dispatch = useDispatch();
  const selectedMenuIndex = useSelector<RootState>(
    (state: RootState) => state.navigation.selectedMenuIndex
  );
  const onChangeMenu = (index: number) => {
    dispatch(selectMenuIndex({ selectedMenuIndex: index }));
    NavigationActionsService.toggleDrawer(false);
  }
  return (
    <BackgroundComponents>
      <StatusBar barStyle="default" />
      <ViewVertical style={styles.container}>
        <Header
          noShadow={true}
        />
        <ViewVertical style={{ alignItems: 'center' }}>
          <Avatar
            rounded
            size="xlarge"
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            }}
            showEditButton
          />
          <Text style={styles.name}>Pinny Geliebter</Text>
          <Text style={styles.email}>Pinnygeli@gmail.com</Text>
        </ViewVertical>
        {listMenu.map((icon: Menu, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              style={{ width: '100%' }}
              onPress={onChangeMenu.bind(undefined, index)}>
              <ViewHorizontal style={[
                styles.block,
                index === 0 && { marginTop: 40 },
                selectedMenuIndex === index && { backgroundColor: '#6CAA09' }
              ]}>
                <Image source={icon.icon} style={styles.icon} />
                <Text style={styles.menuTitle}>{icon.name}</Text>
              </ViewHorizontal>
            </TouchableOpacity>
          )
        })}

      </ViewVertical>
    </BackgroundComponents>
  );
};



export default HomeScreen;

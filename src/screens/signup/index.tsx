/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, createRef, useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  TextInput,
  Keyboard,
} from 'react-native';
import { Icon, Input, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Text from 'components/text.component';
import { BackgroundComponents } from 'components/background.component';
import colors from 'constants/colors';
import { fontSizes, fontFamilies } from 'constants/fonts';
import styles from './styles';
import { ViewVertical, ViewHorizontal } from 'components/viewBox.component';
import Header from 'components/header/header.component';
import NavigationActionsService from 'utils/navigation';
import { SIGNUP_SCREEN } from 'constants';
interface InputState {
  email: string,
  password: string,
}
const SignupScreen = (props: any) => {
  const emailRef: any = createRef();
  const passwordRef: any = createRef();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  useEffect(() => {
    NavigationActionsService.initInstance(props.componentId);
  }, []);

  const onChangeTextEmail = (text: string) => setEmail(text);
  const onChangeTextPassword = (text: string) => setPassword(text);

  const back = () => {
    NavigationActionsService
      .pop();
  }

  const goToSignUp = () => {
    NavigationActionsService
      .push(SIGNUP_SCREEN);
  }
  return (
    <BackgroundComponents>
      <StatusBar barStyle="default" />
      <ViewVertical style={styles.container}>
        <Header
          noShadow={true}
          leftComponent={<Icon type={'antdesign'} name='arrowleft' />}
          leftAction={back}
        />
        <ViewVertical onPress={() => Keyboard.dismiss()} style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-end' }}>
          <Text style={{ color: colors.darkBlue, fontSize: fontSizes.hero, ...fontFamilies.thin }}>
            SIGN <Text style={fontFamilies.regular}>UP</Text>
          </Text>
        </ViewVertical>

        <ViewVertical style={{ flex: 5, alignItems: 'center', width: '100%' }}>
          <KeyboardAwareScrollView
            style={{ flex: 1, width: '100%' }}
            keyboardShouldPersistTaps='handled'
            contentContainerStyle={{ alignItems: 'center' }}
          >
            <ViewVertical style={{ width: '85%', alignItems: 'center', height: 300 }}>
              <Input
                placeholder='Email'
                underlineColorAndroid='rgba(0,0,0,0)'
                autoCorrect={false}
                autoCapitalize='none'
                onChangeText={onChangeTextEmail}
                ref={emailRef}
                value={email}
                inputContainerStyle={styles.inputStyle}
                inputStyle={fontFamilies.regular}
                leftIconContainerStyle={styles.iconInputStyle}
                errorStyle={{ color: 'red', left: 20 }}
                // errorMessage='ENTER A VALID ERROR HERE'
                leftIcon={
                  <Icon
                    name='mail'
                    type='foundation'
                    size={25}
                    color={colors.gray}
                  />
                }
              />
              <Input
                placeholder='Password'
                autoCorrect={false}
                autoCapitalize='none'
                underlineColorAndroid='rgba(0,0,0,0)'
                inputStyle={fontFamilies.regular}
                value={password}
                onChangeText={onChangeTextPassword}
                containerStyle={{ marginTop: 20 }}
                inputContainerStyle={styles.inputStyle}
                leftIconContainerStyle={styles.iconInputStyle}
                errorStyle={{ color: 'red', left: 20 }}
                // errorMessage='ENTER A VALID ERROR HERE'
                leftIcon={
                  <Icon
                    name='unlock'
                    type='foundation'
                    size={25}
                    color={colors.gray}
                  />
                }
              />

              <Button
                onPress={() => emailRef && emailRef.current.isFocused()}
                titleStyle={{ fontSize: fontSizes.small, color: colors.darkBlue, ...fontFamilies.regular }}
                buttonStyle={styles.buttonStyle}
                containerStyle={styles.buttonContainer}
                title='SIGN UP'
              />
            </ViewVertical>
          </KeyboardAwareScrollView>
        </ViewVertical>
        <ViewHorizontal style={{ bottom: 30, alignItems: 'center' }}>
          <Text style={{ color: colors.gray, fontSize: fontSizes.text, ...fontFamilies.regular }}>
            Have an account?
            </Text>
          <Button
            onPress={back}
            buttonStyle={{ backgroundColor: 'transparent' }}
            titleStyle={{ fontSize: fontSizes.text, color: colors.darkBlue, ...fontFamilies.medium }}
            title='SIGN IN'
          />
        </ViewHorizontal>
      </ViewVertical>
    </BackgroundComponents>
  );
};


export default SignupScreen;

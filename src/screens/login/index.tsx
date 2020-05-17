/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useRef } from 'react';
import {
  StatusBar,
  Keyboard,
  Image,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup'
import { Input, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BackgroundComponents } from 'components/background.component';
import colors from 'constants/colors';
import { fontSizes, fontFamilies } from 'constants/fonts';
import styles from './styles';
import { ViewVertical, ViewHorizontal } from 'components/viewBox.component';
import Header from 'components/header/header.component';
import NavigationActionsService from 'utils/navigation';
import { useDispatch } from 'react-redux';
import { loginWithSaga } from 'actions/auth.action';
import Icon from 'react-native-vector-icons/Entypo';
import Text from '@components/text.component';

interface LoginProps {
  componentId: any
};
export interface SubmitFormLogin {
  email: string;
  password: string;
}

const LoginScreen = (props: LoginProps) => {
  const emailRef: any = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    NavigationActionsService.initInstance(props.componentId);
  }, []);

  const submit = (values: SubmitFormLogin) => {
    const { email, password } = values;
    dispatch(loginWithSaga({ email, password }))
  }
  return (
    <BackgroundComponents>
      <StatusBar barStyle="default" />
      <ViewVertical style={styles.container}>
        <Header
          noShadow={true}
        />
        <KeyboardAwareScrollView
          style={styles.scrollView}
          scrollEnabled={false}
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={styles.contentContainer}
        >
          <ViewVertical
            onPress={() => {
              Keyboard.dismiss();
            }}
            style={styles.container}>
              <ViewVertical style = {{
                position: 'absolute',
                width: 0,
                height: 0,
                borderLeftWidth: 25,
                borderRightWidth: 25,
                borderBottomWidth: 40,
                marginTop: 40,
                right: -10,
                borderStyle: 'solid',
                backgroundColor: 'transparent',
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: 'rgba(255,255,255,0.6)',
                transform: [{ rotate: '-90deg'}]
              }}/>
              <ViewHorizontal>
                <Text style={{fontSize: fontSizes.superHero, color: colors.white, left: -50, ...fontFamilies.light, transform: [{ rotate: '-90deg'}]}}>M</Text>
                <Text style={{fontSize: fontSizes.hero, color: 'white', top: 5, left: -50, ...fontFamilies.thin}}>y</Text>
              </ViewHorizontal>
              <Text style={{fontSize: fontSizes.large, color: 'white', left: 60, top: -95, ...fontFamilies.thin}}>sms</Text>
          </ViewVertical>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={submit}
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .required('Name must not empty'),
            })}
          >
            {({ handleSubmit, values, errors, isValid, setValues }) => (
              <ViewVertical style={styles.form}>
                <Input
                  placeholder='Name'
                  underlineColorAndroid='rgba(0,0,0,0)'
                  autoCorrect={false}
                  inputStyle={{ color: colors.white }}
                  placeholderTextColor={colors.white}
                  autoCapitalize='none'
                  onChangeText={(field: string) => setValues({ ...values, email: field })}
                  ref={emailRef}
                  value={values.email}
                  onFocus={() => emailRef.current.focus()}
                  errorMessage={errors.email}
                  inputContainerStyle={styles.inputStyle}
                  leftIconContainerStyle={styles.iconInputStyle}
                  errorStyle={styles.errorText}
                  leftIcon={<Icon color='white' size={30} style={styles.icon} name='user' />}
                />
                <Button
                  onPress={() => {
                    isValid && handleSubmit()
                  }}
                  titleStyle={{ fontSize: fontSizes.small, color: colors.white, ...fontFamilies.bold }}
                  buttonStyle={styles.buttonStyle}
                  containerStyle={styles.buttonContainer}
                  title='Start With New App'
                />
              </ViewVertical>)}
          </Formik>
        </KeyboardAwareScrollView>
      </ViewVertical>
    </BackgroundComponents>
  );
};

export default LoginScreen;

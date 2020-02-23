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
import { ViewVertical } from 'components/viewBox.component';
import Header from 'components/header/header.component';
import NavigationActionsService from 'utils/navigation';
import { useDispatch } from 'react-redux';
import { loginWithSaga } from 'actions/auth.action';
//IMAGE
import EMAIL_ICON from 'assets/images/email.png'
import PASSWORD_ICON from 'assets/images/password.png'

interface LoginProps {
  componentId: any
};
export interface SubmitFormLogin {
  email: string;
  password: string;
}

const LoginScreen = (props: LoginProps) => {
  const emailRef: any = useRef(null);
  const passwordRef: any = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    NavigationActionsService.initInstance(props.componentId);
    return () => NavigationActionsService.destroyScreen();
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
          </ViewVertical>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={submit}
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .email('Email must be a valid email')
                .required('Email must not empty'),
              password: yup
                .string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password must not empty'),
            })}
          >
            {({ handleSubmit, values, errors, isValid, setValues }) => (
              <ViewVertical style={styles.form}>
                <Input
                  placeholder='Email Address'
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
                  leftIcon={<Image style={styles.icon} source={EMAIL_ICON} />}
                />
                <Input
                  placeholder='Password'
                  ref={passwordRef}
                  errorMessage={errors.password}
                  autoCorrect={false}
                  inputStyle={{ color: colors.white }}
                  onFocus={() => passwordRef.current.focus()}
                  placeholderTextColor={colors.white}
                  secureTextEntry={true}
                  autoCapitalize='none'
                  underlineColorAndroid='rgba(0,0,0,0)'
                  value={values.password}
                  onChangeText={(field: string) => setValues({ ...values, password: field })}
                  containerStyle={{ marginTop: 20 }}
                  inputContainerStyle={styles.inputStyle}
                  leftIconContainerStyle={styles.iconInputStyle}
                  errorStyle={styles.errorText}
                  leftIcon={<Image style={styles.icon} source={PASSWORD_ICON} />}

                />
                <Button
                  onPress={() => {
                    isValid && handleSubmit()
                  }}
                  titleStyle={{ fontSize: fontSizes.small, color: colors.white, ...fontFamilies.bold }}
                  buttonStyle={styles.buttonStyle}
                  containerStyle={styles.buttonContainer}
                  title='LOGIN'
                />
              </ViewVertical>)}
          </Formik>
        </KeyboardAwareScrollView>
      </ViewVertical>
    </BackgroundComponents>
  );
};

export default LoginScreen;

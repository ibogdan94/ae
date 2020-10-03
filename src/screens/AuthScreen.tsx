import React, {useEffect} from 'react';
import {NavigationInjectedProps} from 'react-navigation';
import {getAccessToken, saveAccessToken} from '../storage';
import {setToken} from '../httpClient/client';
import {auth} from '../services/API';
import {API_KEY} from '../contants';
import {ActivityIndicator as NativeActivityIndicator, View} from 'react-native';

export const AuthScreen: React.FC<NavigationInjectedProps> = (
  props: NavigationInjectedProps,
): JSX.Element => {
  const navigation = props.navigation;

  useEffect(() => {
    handleAuth();
  });

  const handleAuth = async (): Promise<void> => {
    let accessToken: string | null;
    try {
      accessToken = await getAccessToken();
    } catch (e) {
      navigation.navigate('Error', {error: e.message});
      return;
    }

    if (!accessToken) {
      try {
        const {token} = await auth(API_KEY);
        accessToken = token;
      } catch (e) {
        navigation.navigate('Error', {error: e.message});
        return;
      }
    }

    if (__DEV__) {
      console.log('accessToken', accessToken);
    }

    await saveAccessToken(accessToken);
    setToken(accessToken);
    navigation.navigate('Home');
  };

  console.log('AuthScreen');

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: 'black',
      }}>
      <NativeActivityIndicator size="large" style={{flex: 1}} />
    </View>
  );
};

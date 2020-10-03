import * as React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {NavigationStackOptions} from 'react-navigation-stack';

const ErrorScreen = ({navigation}: any): JSX.Element => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={{color: '#fff'}}>
        {navigation?.state?.params?.error ?? 'Something went wrong'}
      </Text>
    </SafeAreaView>
  );
};

ErrorScreen.navigationOptions = (): NavigationStackOptions => ({
  headerLeft: () => null,
});

export default ErrorScreen;

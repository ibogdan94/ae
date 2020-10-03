import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import configureStore from './src/store/configureStore';
import AppNavigation from './src/navigation';
import {Provider} from 'react-redux';

const App = () => (
  <SafeAreaView style={styles.safeArea}>
    <Provider store={configureStore()}>
      <AppNavigation />
    </Provider>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default App;

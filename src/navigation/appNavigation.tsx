import * as React from 'react';
import {createAppContainer} from 'react-navigation';
import {Transition} from 'react-native-reanimated';

import Home from '../containers/HomeContainer';
import DetailView from '../containers/DetailViewContainer';
import {AuthScreen} from '../screens/AuthScreen';
import ErrorScreen from '../screens/ErrorScreen';
import {createStackNavigator} from 'react-navigation-stack';

//@todo if you want to use animation
// const AppAnimatedNavigator = createAnimatedSwitchNavigator(
//   {
//     Auth: {
//       screen: AuthScreen,
//       navigationOptions: {
//         title: '',
//         headerShown: false,
//       },
//     },
//     Error: {screen: ErrorScreen},
//     // @ts-ignore
//     Home: {screen: Home},
//     // @ts-ignore
//     DetailView: {
//       screen: DetailView,
//     },
//   },
//   {
//     transition: (
//       <Transition.Together>
//         <Transition.Out
//           type="slide-bottom"
//           durationMs={400}
//           interpolation="easeIn"
//         />
//         <Transition.In type="fade" durationMs={500} />
//       </Transition.Together>
//     ),
//     initialRouteName: 'Auth',
//   },
// );

const AppNavigator = createStackNavigator(
  {
    Auth: {
      screen: AuthScreen,
      navigationOptions: {
        title: '',
        headerShown: false,
      },
    },
    Error: {screen: ErrorScreen},
    // @ts-ignore
    Home: {screen: Home},
    // @ts-ignore
    DetailView: {
      screen: DetailView,
    },
  },
  {
    initialRouteName: 'Auth',
    headerMode: 'screen',
  },
);

export default createAppContainer(AppNavigator);

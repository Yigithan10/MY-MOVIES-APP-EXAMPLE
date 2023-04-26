import React from 'react';
import {StatusBar, useColorScheme, Easing} from 'react-native';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import reducers from './redux';
import Home from './screens/Home';
import Detail from './screens/Detail';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Navbar from './components/Navbar';
import Search from './screens/Search';
import Webview from './screens/Webview';
import {NativeBaseProvider} from 'native-base';

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 50,
    easing: Easing.linear,
  },
};

const App = () => {
  const Stack = createStackNavigator();
  const Store = configureStore({reducer: reducers});

  const theme = useColorScheme();
  const color = theme == 'dark' ? 'white' : 'black';
  const backColor = theme == 'dark' ? 'black' : 'white';

  return (
    <Provider store={Store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <StatusBar
            animated={true}
            backgroundColor={"transparent"}
            barStyle={theme === 'dark' ? 'dark-content' : 'light-content'}
            translucent={true}
          />
          <Stack.Navigator
            screenOptions={{
              headerTitle: ' ',
              headerTitleAlign: 'center',

              gestureEnabled: true,
              gestureDirection: 'horizontal',
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

              //...TransitionPresets.SlideFromRightIOS

              // transitionSpec: {
              //   open: config,
              //   close: closeConfig,
              // }
            }}>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                // headerStyle: {backgroundColor: backColor},
                // title: 'Home',
                // headerTitleStyle: {color: color},
                headerTransparent: true,
                header: () => <Navbar main={true} detail={false} />,
              }}
            />
            <Stack.Screen
              name="Detail"
              component={Detail}
              options={{
                headerTransparent: true,
                headerLeft: () => <Navbar main={false} detail={true} />,
              }}
            />
            <Stack.Screen
              name="Search"
              component={Search}
              options={{
                headerTransparent: true,
                headerLeft: () => <Navbar main={false} detail={false} />,
              }}
            />
            <Stack.Screen
              name="Webview"
              component={Webview}
              options={{
                headerTintColor: 'white',
                headerTransparent: true,
                headerLeft: () => <Navbar main={false} detail={true} />,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;

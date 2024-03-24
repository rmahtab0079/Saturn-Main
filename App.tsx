/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { Platform } from 'react-native';
import React from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import config from './auth0-configuration';
import { MD3DarkTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import NavigationScreen from './src/pages/Navigator';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f7e8d3', // primary color
    accent: '000000', // your cream color hex code
    background: '#f7e8d3', // cream color for background
    text: 'black', // text color
    // You can add more color adjustments here
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
    <Auth0Provider domain={config.domain} clientId={config.clientId}>
      <NavigationScreen />
    </Auth0Provider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  error: {
    margin: 20,
    textAlign: 'center',
    color: '#D8000C'
  }
});

export default App;
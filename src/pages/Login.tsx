import { Platform } from 'react-native';
import React from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import config from '../../auth0-configuration';
import { MD3DarkTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


const LoginScreen = ( { navigation } ) => {
  const {authorize, clearSession, user, getCredentials, error, isLoading} = useAuth0();

   // Define redirect URLs for each platform
  const redirectUrl = Platform.select({
    ios: config.redirectUrlIOS,
    android: config.redirectUrlAndroid,
  });

  const onLogin = async () => {
     
    console.log('Redirect URI: ', redirectUrl); // Log the redirect URI
    try {
      await authorize({redirectUrl}, {});
      const credentials = await getCredentials();
      Alert.alert('AccessToken: ' + credentials?.accessToken);
      navigation.navigate('Home');
    } catch (e) {
      console.error('Authorization Error: ', e);
    }
  };


  return (
    <View >
      <Text> Saturn </Text>
      <Button
        onPress={onLogin}
        title={'Log In'}
      />
      {error && <Text>{error.message}</Text>}
    </View>
  );
};

export default LoginScreen;
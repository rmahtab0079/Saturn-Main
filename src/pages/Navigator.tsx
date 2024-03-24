import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserGetterScreen from './UserGetter';
import {Text, View} from 'react-native';
import LoginScreen from './Login';
import ConnectSocialsScreen from "./ConnectSocials";
import HomePageScreen from './HomePage';
import { useAuth0 } from 'react-native-auth0';

const Stack = createStackNavigator();

const NavigationScreen = () => {
    // Assume this constant determines if the user is logged in or not
    // This could come from your app's state, context, or a global state management library like Redux
    const {authorize, clearSession, user, getCredentials, error, isLoading} = useAuth0();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
      if (user !== undefined && user !== null) {
        setLoggedIn(true);
      }
      
    }, [user])

    if (isLoading) {
      return <View><Text>Loading</Text></View>;
    }
  
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={loggedIn ? "UserGetterScreen" : "LoginScreen"}>
          <Stack.Screen name="UserGetterScreen" component={UserGetterScreen} />
          <Stack.Screen name="HomePageScreen" component={HomePageScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="ConnectSocials" component={ConnectSocialsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default NavigationScreen;

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
import {Text, View} from 'react-native';
import LoginScreen from './Login';
import { useAuth0 } from 'react-native-auth0';
import { useUserContext } from '../contexts/UserContext';

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
        <Stack.Navigator initialRouteName={loggedIn ? "Home" : "Login"}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default NavigationScreen;



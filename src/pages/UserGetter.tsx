
import React, { useState, useEffect} from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { Platform } from 'react-native';
import config from '../../auth0-configuration';
import { useUserStore } from "../userStore";
import { fetchUser } from '../api/firebase';

const UserGetterScreen = ({ navigation }) => {
  const { clearSession, user } = useAuth0();
  const { setFirebaseUser } = useUserStore(); // Destructuring to get setFirebaseUser from the store

  useEffect(() => {
      async function getCurrentUser() {
          // Ensure that user?.sub is defined before attempting to fetch
          if (user?.sub) {
              let firebaseUser = await fetchUser(user.sub);
              if (firebaseUser) {
                  setFirebaseUser(firebaseUser); // Correctly setting the Firebase user in the Zustand store
              } else {
                  navigation.navigate('ConnectSocials'); // Navigate to ConnectSocials if the user is not found
              }
          }
      }
      getCurrentUser();
  }, [user, setFirebaseUser, navigation]); // Add setFirebaseUser and navigation to the dependency array

  const redirectUrl = Platform.select({
      ios: config.redirectUrlIOS,
      android: config.redirectUrlAndroid,
  });

  const onLogout = async () => {
      try {
          await clearSession({ returnToUrl: redirectUrl });
      } catch (e) {
          console.error('Logout Error: ', e);
      }
  };

  return (
      <View>
          <Text>Saturn</Text>
          {user && <Text>You are logged in as {user.name}</Text>}
          <Button onPress={onLogout} title="Log Out" />
      </View>
  );
};

export default UserGetterScreen;
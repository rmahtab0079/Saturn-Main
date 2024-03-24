
import React, { useState } from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { Platform } from 'react-native';
import config from '../../auth0-configuration';

const HomeScreen = () => {
    const [hasUserInfo, setHasUserInfo] = useState();
    const [userInfo, setUserInfo] = useState({});
    const {clearSession, user, getCredentials, error, isLoading} = useAuth0();

      // Define redirect URLs for each platform
    const redirectUrl = Platform.select({
        ios: config.redirectUrlIOS,
        android: config.redirectUrlAndroid,
    });

    const onLogout = async () => {
        try {
          await clearSession({ returnToUrl: redirectUrl }, {});
        } catch (e) {
          console.error('Logout Error: ', e);
        }
    };
    return (
        <View>
            <Text> Saturn </Text>
            {user && <Text>You are logged in as {user.name}</Text>}
            <Button
                onPress={onLogout}
                title={'Log Out'}
            />
        </View>
    )
}

export default HomeScreen;
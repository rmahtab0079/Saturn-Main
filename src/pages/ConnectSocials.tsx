import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useUserStore, FirebaseUser } from '../userStore'; 
import { createUser } from '../api/firebase';

const ConnectSocialsScreen = ({ navigation }) => {
    const [instagramUrl, setInstagramUrl] = useState('');
    const [twitterUrl, setTwitterUrl] = useState('');
    const [linkedInUrl, setLinkedInUrl] = useState('');
    const [tiktokUrl, setTiktokUrl] = useState('');
    const [facebookUrl, setFacebookUrl] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const { auth0User, setFirebaseUser } = useUserStore(); // Access the user state from the store

    const handleSubmit = async () => {
        if (auth0User && auth0User.sub) {
            const userSocials = {
                instagramUrl,
                twitterUrl,
                linkedInUrl,
                tiktokUrl,
                facebookUrl,
                phoneNumber,
            };

            try {
                await createUser(auth0User.sub, auth0User, userSocials);
                console.log('User socials created successfully');

                // Create the FirebaseUser object to update the Zustand store
                const firebaseUser: FirebaseUser = {
                    user: auth0User, // Use the Auth0 user from the Zustand store
                    ...userSocials, // Spread the userSocials object to include all social links and phone number
                };
                // Update the Zustand store with the new FirebaseUser
                setFirebaseUser(firebaseUser);

            } catch (error) {
                console.error('Error creating user', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Instagram URL" value={instagramUrl} onChangeText={setInstagramUrl} style={styles.input} />
            <TextInput placeholder="Twitter URL" value={twitterUrl} onChangeText={setTwitterUrl} style={styles.input} />
            <TextInput placeholder="LinkedIn URL" value={linkedInUrl} onChangeText={setLinkedInUrl} style={styles.input} />
            <TextInput placeholder="TikTok URL" value={tiktokUrl} onChangeText={setTiktokUrl} style={styles.input} />
            <TextInput placeholder="Facebook URL" value={facebookUrl} onChangeText={setFacebookUrl} style={styles.input} />
            <TextInput placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} style={styles.input} />
            <Button title="Save Social Links" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
});

export default ConnectSocialsScreen;
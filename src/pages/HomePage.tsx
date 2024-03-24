import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useUserStore } from "../userStore"; // Adjust the path as needed

const HomePageScreen = ({ navigation }) => {
  const { firebaseUser } = useUserStore(); // Access firebaseUser from Zustand store

  // Ensure firebaseUser is not null before attempting to display attributes
  if (!firebaseUser) {
    return (
      <View style={styles.container}>
        <Text>No user data available</Text>
      </View>
    );
  }

  // Destructure attributes from firebaseUser for easier access
  const { user, instagramUrl, twitterUrl, linkedInUrl, tiktokUrl, facebookUrl, phoneNumber } = firebaseUser;

  return (
    <View style={styles.container}>
      {/* Display Auth0 User attributes */}
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Phone Number: {user.phoneNumber}</Text>
      {/* More attributes as needed... */}

      {/* Display Social Links */}
      <Text>Instagram: {instagramUrl || 'Not Provided'}</Text>
      <Text>Twitter: {twitterUrl || 'Not Provided'}</Text>
      <Text>LinkedIn: {linkedInUrl || 'Not Provided'}</Text>
      <Text>TikTok: {tiktokUrl || 'Not Provided'}</Text>
      <Text>Facebook: {facebookUrl || 'Not Provided'}</Text>
      <Text>Phone Number: {phoneNumber || 'Not Provided'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  // You can add more styles as needed
});

export default HomePageScreen;

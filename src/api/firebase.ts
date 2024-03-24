import firestore from '@react-native-firebase/firestore';
import { FirebaseUser, Auth0User } from '../userStore';

export async function fetchUser(userId: string | undefined): Promise<FirebaseUser | null> {
    if (!userId) {
        console.log("User ID is undefined");
        return null; // Return early if userId is undefined
    }
    try {
        const documentSnapshot = await firestore().collection('Users').doc(userId).get();
        if (documentSnapshot.exists) {
            const data = documentSnapshot.data() as FirebaseUser; // Cast the document data to FirebaseUser
            return data;
        } else {
            console.log("No user found with the given ID");
            return null; // Return null if the document does not exist
        }
    } catch (error) {
        console.error("Could not get user", error);
        return null; // Return null in case of an error
    }
}

export async function createUser(userSub: string, auth0User: Auth0User, userSocials: Omit<FirebaseUser, 'user'>): Promise<void> {
    const userDoc: FirebaseUser = {
        user: auth0User,
        ...userSocials,
    };

    try {
        await firestore().collection('Users').doc(userSub).set(userDoc);
        console.log('User created successfully');
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; // Rethrow error to handle it in the component
    }
}
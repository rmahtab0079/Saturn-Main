import { create } from 'zustand';

// Assuming User type is imported or defined in the same file
export type Auth0User = {
    sub?: string;
    name?: string;
    givenName?: string;
    familyName?: string;
    middleName?: string;
    nickname?: string;
    preferredUsername?: string;
    profile?: string;
    picture?: string;
    website?: string;
    email?: string;
    emailVerified?: boolean;
    gender?: string;
    birthdate?: string;
    zoneinfo?: string;
    locale?: string;
    phoneNumber?: string;
    phoneNumberVerified?: boolean;
    address?: string;
    updatedAt?: string;
    birthday: Date 
    [key: string]: any;
};

export type FirebaseUser = {
    user: Auth0User;
    instagramUrl: string | null;
    twitterUrl: string | null;
    linkedInUrl: string | null;
    tiktokUrl: string | null;
    facebookUrl: string | null;
    phoneNumber: string | null;
}

interface UserState {
    auth0User: Auth0User | null
    firebaseUser: FirebaseUser | null
    setAuth0User: (user: Auth0User) => void
    clearAuth0User: () => void
    setFirebaseUser: (user: FirebaseUser) => void
    clearFirebaseUser: () => void
};

export const useUserStore = create<UserState>()((set) => ({
    auth0User: null,
    firebaseUser: null,
    setAuth0User: (user) => set({ auth0User: user }),
    clearAuth0User: () => set({auth0User: null} ),
    setFirebaseUser: (user) => set({ firebaseUser: user}),
    clearFirebaseUser: () => set( { firebaseUser: null} )
}));
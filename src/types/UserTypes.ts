export type User = {
    name?: string;
    notLoggedIn: true;
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
    sub?: string;
    [key: string]: any;
};

export type UserAttributesFromDynamoDB = {
    userId: string;
}






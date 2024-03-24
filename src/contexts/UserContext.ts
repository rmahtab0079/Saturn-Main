import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserAttributesFromDynamoDB } from './UserTypes'; // Assuming you define UserAttributesFromDynamoDB in UserTypes.ts

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  userAttributes: UserAttributesFromDynamoDB | null;
  setUserAttributes: (attributes: UserAttributesFromDynamoDB | null) => void;
  notLoggedIn: boolean;
  setNotLoggedIn: (loggedIn: boolean) => void;
};

const defaultState: UserContextType = {
  user: null,
  setUser: () => {},
  userAttributes: null,
  setUserAttributes: () => {},
  notLoggedIn: true,
  setNotLoggedIn: () => {},
};

const UserContext = createContext<UserContextType>(defaultState);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(defaultState.user);
  const [userAttributes, setUserAttributes] = useState<UserAttributesFromDynamoDB | null>(defaultState.userAttributes);
  const [notLoggedIn, setNotLoggedIn] = useState<boolean>(defaultState.notLoggedIn);

  return (
    <UserContext.Provider value={{ user, setUser, userAttributes, setUserAttributes, notLoggedIn, setNotLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUserContext = () => useContext(UserContext);
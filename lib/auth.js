import React, { useState, useEffect, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import { createUser } from './db';
import firebase from './firebase';
const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(false);
  const Router = useRouter();
  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      const { token, ...userWithouttoken } = user;
      createUser(user.uid, userWithouttoken);
      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };
  const signinWithGithub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        handleUser(response.user);
      });
  };
  const signinWithGoogle = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user);
      });
  };

  const signOut = () => {
    
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
        Router.push('/');
      });
  };

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((user) => handleUser(user));

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signinWithGoogle,
    signOut
  };
}
const formatUser = (user) => {
  let name = '';
  if (user.displayName === null) name = user.email;
  else name = user.displayName;
  return {
    uid: user.uid,
    email: user.email,
    name,
    token: user.za,
    provider: user.providerData[0].providerId,
    photoURL: user.providerData[0].photoURL
  };
};

import React, { useEffect, useState } from "react";

import firebase from "../config/Firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("Loading...");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setCurrentUser(currentUser);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

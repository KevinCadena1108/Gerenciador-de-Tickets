import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const updateToken = (newToken, adminStatus) => {
    setToken(newToken);
    setIsAdmin(adminStatus);
  };

  return (
    <AuthContext.Provider value={{ token, isAdmin, updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
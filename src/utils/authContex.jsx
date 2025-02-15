import React, { createContext, useContext, useState, useEffect } from 'react';
import { account } from './Appwrite/config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      const user = await account.get();
      setUser(user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);
  

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      await checkSession(); // Update user state
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (error) {
      throw error;
    }
  };



  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



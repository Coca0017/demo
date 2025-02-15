import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContex'; 
import Spinner from '../Components/Widget/Loading/App';

export const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return  <Spinner />
  }

  return user ? children : <Navigate to="/Login" />;
};

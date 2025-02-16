import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import toast, { Toaster } from 'react-hot-toast';


import { AuthProvider } from './utils/authContex'
import { Protected } from './utils/privateRoutes'

import './index.scss'
import App from './Pages/Home/App';
import Login from './Pages/Auth/Login/App';
import SignUp from './Pages/Auth/SignUp/App';
import Reset from './Pages/Auth/PasswordReset/App';

import {
  createBrowserRouter,
  RouterProvider,
  Router,
  Link,
} from "react-router-dom";




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/Login",
    element: <Login />,
  },

  {
    path: "/Register",
    element: <SignUp />,
  },

  {
    path: "/Reset",
    element: <Reset />,
  }


]);

createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <RouterProvider router={router}>
      <Toaster  position="top-right" />
  </RouterProvider>
  </AuthProvider>
)

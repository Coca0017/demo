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

import Dashboard from './Pages/Dashboard/Dashboard/App.jsx';
import InvestmentPlan from './Pages/Dashboard/InvestmentPlan/App.jsx';
import WithdrawFunds from './Pages/Dashboard/Withdraw/App.jsx';
import History from './Pages/Dashboard/History/App.jsx';


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
  },

  {
    path: "/Dashboard",
    element:  <Protected><Dashboard /></Protected>,
  },

  {
    path: "/Dashboard/InvestmentPlans",
    element:  <Protected><InvestmentPlan /></Protected>,
  },

  {
    path: "/Dashboard/Withdraw",
    element:  <Protected><WithdrawFunds /></Protected>,
  },

  {
    path: "/Dashboard/History",
    element:  <Protected><History /></Protected>,
  }


  

  


]);

createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <RouterProvider router={router}>
      <Toaster  position="top-right" />
  </RouterProvider>
  </AuthProvider>
)

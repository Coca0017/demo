import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import {
  createBrowserRouter,
  RouterProvider,
  Router,
  Link,
} from "react-router-dom";


import './index.scss'
import App from './Pages/Home/App';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  }

]);

createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <RouterProvider router={router}>
      <Toaster  position="top-right" />
  </RouterProvider>
  </AuthProvider>
)

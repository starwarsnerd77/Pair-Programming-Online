import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Signup } from './components/Signup'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from './components/Layout'
import { Login } from './components/Login'
import { ErrorPage } from './components/ErrorPage'
import { Dashboard } from './components/Dashboard'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      }
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App

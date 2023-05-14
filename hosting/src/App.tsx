import { useState, useEffect } from 'react'
import React from 'react';
import './App.css'
import { Signup } from './components/Signup'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from './components/Layout'
import { Login } from './components/Login'
import { ErrorPage } from './components/ErrorPage'
import { Dashboard } from './components/Dashboard'
import { CodeEditor } from './components/CodeEditor';
import CssBaseline from '@mui/material/CssBaseline';
import { ResetPassword } from './components/ResetPassword';
import { ResponsiveDrawer } from './components/ResponsiveDrawer';


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
        element: <ResponsiveDrawer />
      },
      {
        path: "/editor",
        element: <CodeEditor />
      },
      {
        path: "/reset",
        element: <ResetPassword />
      }
    ]
  },
]);

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App

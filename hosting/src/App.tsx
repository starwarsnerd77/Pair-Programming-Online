import { useState, useEffect } from 'react'
import './App.css'
import { Signup } from './components/Signup'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from './components/Layout'
import { Login } from './components/Login'
import { ErrorPage } from './components/ErrorPage'
import { Dashboard } from './components/Dashboard'
import { CodeEditor } from './components/CodeEditor';

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
      },
      {
        path: "/editor",
        element: <CodeEditor />
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

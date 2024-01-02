import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Login from "./pages/Login"
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeScript } from '@chakra-ui/react'
import theme from "./theme.ts";
import axios from 'axios';
import ErrorPage from './pages/Error/index.tsx';
import ExamPage from './pages/Exam/index.tsx';
import { interceptorInit } from './interceptors/authInterceptor.ts';

export const router = createBrowserRouter([

  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/exam/:examid",
        element: <ExamPage />,
        errorElement: <ErrorPage />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/error",
    element: <ErrorPage />
  },
]);

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
interceptorInit();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)

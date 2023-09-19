import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Login from "./pages/Login"
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}



// 3. extend the theme
const theme = extendTheme({ config,
   fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  }, })

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)

import { Button, ChakraProvider, Modal, ModalOverlay, useDisclosure, Spinner } from "@chakra-ui/react"
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import LeftMenu from "./components/shared/leftMenu"
import { getPage } from "./services/AuthService"
import { useState, useEffect } from "react"

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

function App() {

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPage()
    .then(
      () => {
        setLoading(false);
      }
    )
    .catch(
      () => {
        setLoading(true);
      }
    )
  }, [])
  

  return (
    <ChakraProvider theme={theme}>
      <LeftMenu />
      {loading && <Spinner size="md"/> }
    </ChakraProvider>
  )

}


export default App

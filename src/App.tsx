import { Button, ChakraProvider, Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react"

import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import ExamForm from "./components/examForm"
import LeftMenu from "./components/shared/leftMenu"

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

  

  return (
    <ChakraProvider theme={theme}>
      <LeftMenu />
    </ChakraProvider>
  )

}


export default App

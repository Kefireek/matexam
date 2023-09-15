import { Button, ChakraProvider, Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react"

import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import ExamForm from "./components/examForm"

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

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider theme={theme}>
      <Button onClick={onOpen}>Start</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ExamForm/>
      </Modal>
    </ChakraProvider>
  )

}


export default App

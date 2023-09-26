import { Button, ChakraProvider, Modal, ModalOverlay, useDisclosure, Spinner, Box, HStack, VStack, ModalBody, ModalContent, Center, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import LeftMenu from "./components/shared/leftMenu"
import { getPage } from "./services/AuthService"
import { useState, useEffect } from "react"
import ModalSpinner from "./components/modalSpinner"

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

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    onOpen()
    getPage()
    .then(
      () => {
        setLoading(false);
        onClose()
        
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
      <Box>
        {loading &&
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalSpinner/>
        </Modal>}
      </Box>
    </ChakraProvider>
  )

}


export default App

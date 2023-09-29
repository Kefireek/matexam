import { Button, ChakraProvider, Modal, ModalOverlay, useDisclosure, Spinner, Box, HStack, VStack, ModalBody, ModalContent, Center, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import LeftMenu from "./components/shared/leftMenu"
import { getPage } from "./services/api/healthCheck/HealthCheckService"
import { useState, useEffect } from "react"
import ModalSpinner from "./components/modalSpinner"

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
    <ChakraProvider>
      <LeftMenu />
    
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

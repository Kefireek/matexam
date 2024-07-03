import { Modal, useDisclosure, Box, Flex, Text } from "@chakra-ui/react"
import LeftMenu from "./components/shared/leftMenu"
import { getPage } from "./services/api/healthCheck/HealthCheckService"
import { useState, useEffect } from "react"
import ModalSpinner from "./components/modalSpinner"
import { Outlet } from "react-router-dom"
import messageContext, { Message } from "./contexts/messageContext"
import MessagesContainer from "./components/shared/MessagesContainer"
import MainPage from "./pages/Main"


function App() {

  const [loading, setLoading] = useState<boolean>(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [message, setMessage] = useState<Message | null>(null);

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
      (err: any) => {
        console.log(err)
        throw new Error('Unable to load page due to server health check error')
      }
    )
  }, [onClose, onOpen])
  
  

  return (
    <messageContext.Provider value={{ message, setMessage }}>
      <Flex overflow="hidden">
        <LeftMenu />
        <Box width="100vw">
          {loading &&
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalSpinner/>
          </Modal>}
          <Outlet />

        </Box>
      </Flex>
      <MessagesContainer />
    </messageContext.Provider>
  )

}


export default App

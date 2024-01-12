import { Modal, useDisclosure, Box, Flex } from "@chakra-ui/react"
import LeftMenu from "./components/shared/leftMenu"
import { getPage } from "./services/api/healthCheck/HealthCheckService"
import { useState, useEffect } from "react"
import ModalSpinner from "./components/modalSpinner"
import { Outlet } from "react-router-dom"


function App() {

  
  const [loading, setLoading] = useState<boolean>(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  

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
  }, [])
  

  return (
    <>
      <Flex>
        <LeftMenu />
        <Box>
          {loading &&
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalSpinner/>
          </Modal>}
          <Outlet />
        </Box>
      </Flex>
    </>
  )

}


export default App

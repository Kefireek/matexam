
import { Modal, useDisclosure, Box, Text } from "@chakra-ui/react"
import LeftMenu from "./components/shared/leftMenu"
import { getPage } from "./services/api/healthCheck/HealthCheckService"
import { useState, useEffect } from "react"
import ModalSpinner from "./components/modalSpinner"
import { Outlet } from "react-router-dom"

function App() {

  const [loading, setLoading] = useState<boolean>(true);

  const { isOpen, onOpen, onClose } = useDisclosure()

  // const [isAuthenticated, setAuthenticated] = useState(() => {
  //   const token = localStorage.getItem("token");
  //   return token !== null;
  // });

  const token = localStorage.getItem("token");

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
    <>
      <LeftMenu />
      <Box>
        {loading &&
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalSpinner/>
        </Modal>}
        <Outlet />
      </Box>
    </>
  )

}


export default App

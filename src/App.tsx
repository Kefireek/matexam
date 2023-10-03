import { Modal, useDisclosure, Box } from "@chakra-ui/react"
import LeftMenu from "./components/shared/leftMenu"
import { getPage } from "./services/api/healthCheck/HealthCheckService"
import { useState, useEffect } from "react"
import ModalSpinner from "./components/modalSpinner"

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
        {token !== null &&
        <h1>ELO</h1>
        }
      </Box>
    </>
  )

}


export default App

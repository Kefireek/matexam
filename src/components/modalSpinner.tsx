import { 
    ModalBody, 
    ModalContent, 
    ModalOverlay, 
    Spinner, 
    VStack 
} from "@chakra-ui/react";

const ModalSpinner = () => {
    return (
        <ModalContent bg="transparent" shadow="none">
            <ModalOverlay/>
            <ModalBody>
              <VStack>
                <Spinner size="md"/> 
              </VStack>
            </ModalBody>
          </ModalContent>
    )
}

export default ModalSpinner;
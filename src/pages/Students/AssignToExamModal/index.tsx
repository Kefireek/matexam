import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";

function AssignToExamModal({open}: {open: () => {}}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  open

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Przypisz {selectedStudent?.name} {selectedStudent?.surname} do egzaminu</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Zamknij
            </Button>
            <Button variant='ghost'>Dodaj</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default AssignToExamModal
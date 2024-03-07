import { useEffect, useState } from "react";
import RoomService from "../../services/api/rooms/RoomsService";
import { RoomDescriptive } from "../../interfaces/rooms";
import { Box, Button, Flex, Heading, Modal, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import RoomForm from "../../components/roomForm";

const RoomPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rooms, setRooms] = useState<RoomDescriptive[]>([]);
  useEffect(() => {
      updateRooms();
  },[]);

  const updateRooms = () => {
    RoomService.getRooms().then((res) => {
        setRooms(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }
  return (
    <Box margin="1vw">
      <TableContainer>
        <Flex justifyContent="space-between">
          <Heading>Sale</Heading>
          <Button onClick={onOpen}>Dodaj salę</Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <RoomForm onRoomClose={onClose} refreshRooms={updateRooms}/>
              </Modal>
          </Flex>
        <Table variant='striped' colorScheme='teal'>
          <Thead>
            <Tr>
              <Th>Numer</Th>
              <Th>Rozmiar</Th>
              <Th>Komputery</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rooms?.map((room, i) => (
              <Tr key={i}>
                <Td>{room.number}</Td>
                <Td>{room.size}</Td>
                <Td>{room.computers ? "tak" : "nie"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default RoomPage;
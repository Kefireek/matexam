import { useEffect, useState } from "react";
import RoomService from "../../services/api/rooms/RoomsService";
import { RoomDescriptive } from "../../interfaces/rooms";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

const RoomPage = () => {

  const [rooms, setRooms] = useState<RoomDescriptive[]>([]);
  useEffect(() => {
      RoomService.getRooms().then((res) => {
          setRooms(res.data);
      }).catch((err) => {
        console.log(err);
      });
  },[]);
  return (
  <TableContainer>
    <Table>
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
            <Td>{room.computers}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </TableContainer>
  )
}

export default RoomPage;
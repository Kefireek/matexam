import axios from "axios"
import { RoomDescriptive } from "../../../interfaces/rooms"

const RoomService = {
    createRoom: (roomBody: RoomDescriptive) => {
        return axios.post<RoomDescriptive>(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GET_ROOMS}`, roomBody);
    },
    getRooms: () => {
        return axios.get<RoomDescriptive[]>(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GET_ROOMS}`);
    }
}

export default RoomService;
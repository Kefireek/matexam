import axios from "axios"
import { RoomDescriptive } from "../../../interfaces/rooms"

const RoomService = {
    createRoom: (roomBody: RoomDescriptive) => {
        return axios.post<RoomDescriptive>(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GET_ROOMS}`, roomBody);
    }
}

export default RoomService;
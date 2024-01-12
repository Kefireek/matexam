import axios from "axios";
import { StudentDescriptive } from "../../interfaces/students";


const studentService = {
    addStudent: (studentBody: StudentDescriptive) => {
        return axios.post(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GET_STUDENTS}`, studentBody);
    }

}
export default studentService;
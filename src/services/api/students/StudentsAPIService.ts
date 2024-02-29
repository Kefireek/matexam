import axios from 'axios'
import { StudentDescriptive } from '../../../interfaces/students';

const StudentsAPIService = {
  getStudentsList: function() {
    return axios.get<StudentDescriptive[]>(`${import.meta.env.VITE_GET_STUDENTS}`)
  },
}

export default StudentsAPIService;
import axios from 'axios'
import { StudentList } from '../../../interfaces/students';

const StudentsAPIService = {
  searchStudentsList: function(query: string, skip: number, take: number) {
    return axios.post<StudentList>(`${import.meta.env.VITE_SEARCH_STUDENTS}`.replace('{query}', query).replace('{skip}', skip.toString()).replace('{take}', take.toString()))
  },
}

export default StudentsAPIService;
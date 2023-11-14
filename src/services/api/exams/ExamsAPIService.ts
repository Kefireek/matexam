import axios from 'axios'
import { ExamBody, ExamItem, ExamView, ExamsList, StudentRoom } from '../../../interfaces/exams'

const ExamsAPIService = {
    getExams: function() {
        return axios.get<ExamsList>(`${import.meta.env.VITE_GET_EXAMS}`)
    },
    addExam: function(examBody: ExamBody) {
        return axios.post<ExamItem>(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GET_EXAMS}`, examBody)
    },
    getExam: function(id: number) {
        return axios.get<ExamView>(`${import.meta.env.VITE_GET_EXAMS}${id}`)
    },
    deleteExam: function(id: number) {
        return axios.delete<void>(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GET_EXAMS}${id}`)
    },
    updateRoomAssignments: function(id: number, studentRooms: StudentRoom[]) {
        return axios.put<void>(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GET_EXAMS}${id}/assignments`, studentRooms)
    }
}

export default ExamsAPIService;
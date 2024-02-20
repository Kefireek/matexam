import axios from 'axios'
import { ExamBody, ExamItem, ExamView, StudentRoom, StudentToExamsAssignments } from '../../../interfaces/exams'

const ExamsAPIService = {
    getExams: function() {
        return axios.get<ExamItem[]>(`${import.meta.env.VITE_GET_EXAMS}`)
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
    },
    assignExamsToStudent: function(PESEL: string, assignments: StudentToExamsAssignments) {
        return axios.put<void>(`${import.meta.env.VITE_GET_EXAMS}assignables/${PESEL}`, assignments)
    },
    getAssignableExams: function(studentId: string) {
        return axios.get<ExamItem[]>(`${import.meta.env.VITE_GET_EXAMS}assignables/${studentId}`)
    }
}

export default ExamsAPIService;
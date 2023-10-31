import axios from 'axios'
import { ExamBody, ExamItem, ExamView, ExamsList, StudentAssignedToRoom } from '../../../interfaces/exams'
import { AuthService } from '../../auth/AuthService'

const ExamsAPIService = {
    getExams: function() {
        return axios.get<ExamsList>(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GET_EXAMS}`)
    },
    addExam: function(examBody: ExamBody) {
        return axios.post<ExamItem>(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GET_EXAMS}`, examBody, AuthService.getAuthenticatedConfig())
    },
    getExam: function(id: number) {
        return axios.get<ExamView>(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GET_EXAMS}${id}`, AuthService.getAuthenticatedConfig())
    },
    deleteExam: function(id: number) {
        return axios.delete<void>(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GET_EXAMS}${id}`, AuthService.getAuthenticatedConfig())
    }
}

export default ExamsAPIService;
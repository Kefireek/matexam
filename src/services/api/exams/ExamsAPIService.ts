import axios from 'axios'
import { ExamBody, ExamItem, ExamsList } from '../../../interfaces/exams'
import { AuthService } from '../../auth/AuthService'

const ExamsAPIService = {
    getExams: function() {
        return axios.get<ExamsList>(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GET_EXAMS}`)
    },
    addExam: function(examBody: ExamBody) {
        return axios.post<ExamItem>(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GET_EXAMS}`, examBody)
    }
}

export default ExamsAPIService;
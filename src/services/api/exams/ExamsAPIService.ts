import axios from 'axios'
import { ExamItem, ExamView, ExamsList, StudentAssignedToRoom } from '../../../interfaces/exams'
import { ExamFormModel } from '../../../components/examForm'

const ExamsAPIService = {
    getExams: function() {
        return axios.get<ExamsList>(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GET_EXAMS}`)
    },
    addExam: function(examBody: ExamFormModel) {
        return axios.post<ExamItem>(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GET_EXAMS}`, examBody)
    },
    getExam: function(id: number) {
        return axios.get<ExamView>(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GET_EXAMS}${id}`)
    },
    deleteExam: function(id: number) {
        return axios.delete<void>(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GET_EXAMS}${id}`)
    }
}

export default ExamsAPIService;
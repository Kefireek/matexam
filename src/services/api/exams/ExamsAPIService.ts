import axios from 'axios'
import { ExamsList } from '../../../interfaces/exams'
import { AuthService } from '../../auth/AuthService'

const ExamsAPIService = {
    getExams: async function() {
        return axios.get<ExamsList>(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GET_EXAMS}`, AuthService.getAuthenticatedConfig())
    }
}

export default ExamsAPIService
import axios from 'axios'

const ExamsAPIService = {
    getExams: async function() {
        return axios.get(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GET_EXAMS}`)
    }
}

export default ExamsAPIService
import axios from 'axios'
import { ExamBody, ExamItem, ExamVM, ExamView, StudentRoom } from '../../../interfaces/exams'

const ExamsAPIService = {
    getExams: async function() {
        const exams = (await axios.get<ExamVM[]>(`${import.meta.env.VITE_GET_EXAMS}`)).data;
        return exams.map<ExamItem>(e => ({id: e.id, name: e.name, type: e.type, startTime: e.startTime ? new Date(e.startTime) : undefined, endTime: e.endTime ? new Date(e.endTime) : undefined}))
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
    editExam: function(examBody: ExamBody, id: number) {
        return axios.put<ExamItem>(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GET_EXAMS}${id}`, examBody)
    }
}

export default ExamsAPIService;
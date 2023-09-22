import { ExamsList } from "../../interfaces/exams"
import ExamsAPIService from "../api/exams/ExamsAPIService"

const ExamsService = {
  getExams: async function() {
    return await ExamsAPIService.getExams().then(data => data) as ExamsList
  }
}

export default ExamsService
import { ExamCsvInput, StudentDescriptive } from "./exams"

export interface CsvInput {
    students: StudentDescriptive[],
    exams: ExamCsvInput[]
}
import { ExamCsvInput } from "./exams"
import { StudentDescriptive } from "./students"

export interface CsvInput {
    students: StudentDescriptive[],
    exams: ExamCsvInput[]
}
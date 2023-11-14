import { RoomStudents } from "./rooms"
import { StudentDescriptive, StudentId } from "./students"

export interface ExamsList {
  items: ExamItem[],
  total: number
}

export interface ExamItem extends ExamId, ExamBody { }

export interface ExamBody {
  name: string,
  type?: ExamType,
  startTime?: Date,
  endTime?: Date
}

export interface ExamId {
  id: number
}

export interface ExamView extends ExamItem {
  assignedStudents: RoomStudents[],
  unassignedStudents: StudentDescriptive[]
}

export interface StudentRoom extends StudentId {
  number?: number
}

export enum ExamType {
  Basic = "basic",
  Extended = "extended",
  Oral = "oral"
}
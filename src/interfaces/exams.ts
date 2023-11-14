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
export interface RoomId {
  number: number
}

export interface RoomDescriptive extends RoomId {
  size: number,
  computers?: boolean
}

export interface RoomStudents extends RoomId {
  students?: StudentDescriptive[]
}

export interface StudentAssignedToRoom extends StudentDescriptive {
  roomId?: number
}

export interface StudentRoom extends StudentId, RoomId {
  number?: number;
}

export interface StudentId {
  PESEL: string
}

export interface StudentDescriptive extends StudentId {
  name: String,
  surname: String,
  department: String,
  ordinalNumber: number,
  phone?: String,
  email?: String,
  document?: String
}

export interface ExamCsvInput {
  name: String,
  studentIds: StudentId[]
}

export enum ExamType {
  Basic = "basic",
  Extended = "extended",
  Oral = "oral"
}
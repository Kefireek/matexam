export interface ExamsList {
  items: ExamItem[],
  total: number
}

export interface ExamItem {
  id: number,
  name: string,
  type: ExamType,
  startTime?: Date,
  endTime?: Date
}

export interface ExamBody {
  name: string,
  type: ExamType,
  startTime?: Date,
  endTime?: Date
}

export interface ExamView {
  assignedStudents: RoomStudents[],
  unassignedStudents: Student[]
}

export interface Room {
  number: number,
  size: number,
  computers?: boolean
}

export interface RoomStudents extends Room {
  students: Student[]
}

export interface StudentAssignedToRoom extends Student {
  roomId?: number
}

export interface Student {
  PESEL: string,
  name: string,
  surname: string,
  department: string,
  ordinalNumber: number,
  phone?: string,
  email?: string,
  document?: string
}

export enum ExamType {
  Basic = "basic",
  Extended = "extended",
  Oral = "oral"
}
export interface ExamsList {
  items: ExamItem[],
  total: number
}

export interface ExamItem extends ExamId {
  name: string,
  type: ExamType,
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

export interface StudentRoom extends StudentId, RoomId { }

export interface StudentId {
  PESEL: string
}

export interface StudentDescriptive extends StudentId {
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
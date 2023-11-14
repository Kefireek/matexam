import { StudentDescriptive } from "./students"

export interface RoomId {
  number: number
}

export interface RoomDescriptive extends RoomId {
  size: number,
  computers?: boolean
}

export interface RoomStudents extends RoomDescriptive {
  students?: StudentDescriptive[]
}
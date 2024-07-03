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

export interface StudentAssignedToRoom extends StudentDescriptive {
  roomId?: number
}

export interface StudentList {
  items: StudentDescriptive[],
  total: number
}
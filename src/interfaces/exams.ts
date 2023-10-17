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

export enum ExamType {
  Basic = "basic",
  Extended = "extended",
  Oral = "oral"
}
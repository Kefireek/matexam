export interface ExamsList {
  items: ExamItem[],
  total: number
}

interface ExamItem {
  id: number,
  name: string,
  type: ExamType,
  startTime?: Date,
  endTime?: Date
}

enum ExamType {
  Basic = "basic",
  Extended = "extended",
  Oral = "oral"
}
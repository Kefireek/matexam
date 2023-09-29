export interface ExamsList {
  items: ExamItem[],
  total: number
}

interface ExamItem {
  id: number,
  name: string,
  date: Date
}
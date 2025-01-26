import { FieldError } from "./todolistsApi.types"
import { TaskPriority, TaskStatus } from "common/enums"

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}

export type DomainTask = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type UpdateTaskModel = {
  title: string
  description: string
  status: number
  priority: number
  startDate: string
  deadline: string
}

export type BaseResponse<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
  data: D
}

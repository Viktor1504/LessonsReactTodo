import { AddItemForm } from "common/components"
import { useAddTaskMutation } from "../../../api/tasksApi"
import { DomainTodolist } from "../../../lib/types/types"

import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"

type Props = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: Props) => {
  const [addTask] = useAddTaskMutation()

  const addTaskCallback = (title: string) => {
    addTask({ title, todolistId: todolist.id })
  }

  return (
    <>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </>
  )
}

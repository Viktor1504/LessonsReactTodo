import { AddItemForm } from "common/components"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { DomainTodolist } from "../../../model/todolistsSlice"
import { useAddTaskMutation } from "../../../api/tasksApi"

export const Todolist = ({ todolist }: { todolist: DomainTodolist }) => {
  const [addTask] = useAddTaskMutation()

  const addTaskCallback = (title: string) => {
    addTask({ id: todolist.id, title })
  }

  return (
    <>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </>
  )
}

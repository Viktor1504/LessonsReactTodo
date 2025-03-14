import List from "@mui/material/List"
import { TaskStatus } from "common/enums"
import { Task } from "./Task/Task"
import { useGetTasksQuery } from "../../../../api/tasksApi"
import { DomainTodolist } from "../../../../api/todolistsApi"

export const Tasks = ({ todolist }: { todolist: DomainTodolist }) => {
  const { data } = useGetTasksQuery(todolist.id)

  let tasksForTodolist = data?.items

  if (todolist.filter === "active") {
    tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.New)
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist?.map((task) => {
            return <Task key={task.id} task={task} todolist={todolist} />
          })}
        </List>
      )}
    </>
  )
}

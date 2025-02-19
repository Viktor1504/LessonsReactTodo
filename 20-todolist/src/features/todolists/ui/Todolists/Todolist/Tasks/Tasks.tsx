import { Typography } from "@mui/material"
import List from "@mui/material/List"
import { TaskStatus } from "common/enums"
import { useEffect, useState } from "react"
import { useGetTasksQuery } from "../../../../api/tasksApi"
import { DomainTodolist } from "../../../../lib/types/types"
import { TasksSkeleton } from "../../../skeletons/TasksSkeleton/TasksSkeleton"
import { TasksPagination } from "../TasksPagination/TasksPagination"
import { Task } from "./Task/Task"

export const Tasks = ({ todolist }: { todolist: DomainTodolist }) => {
  const [page, setPage] = useState(1)
  const { data, isLoading, refetch } = useGetTasksQuery({ todolistId: todolist.id, args: { page } })

  let tasksForTodolist = data?.items || []

  if (todolist.filter === "active") {
    tasksForTodolist = tasksForTodolist.filter((task) => task.status === TaskStatus.New)
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = tasksForTodolist.filter((task) => task.status === TaskStatus.Completed)
  }

  // Проверка условий перед рендерингом
  if (tasksForTodolist.length === 0 && data && data.totalCount > 0 && page !== 1) {
    setPage(page - 1) // Переходим на предыдущую страницу
    refetch() // Перезагружаем данные
  }
  
  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {tasksForTodolist.length === 0 && page === 1 ? (
        <Typography variant="body1" sx={{ textAlign: "center", margin: "10px" }}>
          Тасок нет
        </Typography>
      ) : (
        <>
          <List>
            {tasksForTodolist.map((task) => {
              return <Task key={task.id} task={task} todolist={todolist} />
            })}
          </List>
          {data && data?.totalCount > 4 && (
            <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
          )}
        </>
      )}
    </>
  )
}

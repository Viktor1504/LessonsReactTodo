import { Typography } from "@mui/material"
import List from "@mui/material/List"
import { TaskStatus } from "common/enums"
import { useEffect, useState } from "react"
import { useGetTasksQuery } from "../../../../api/tasksApi"
import type { DomainTask } from "../../../../api/tasksApi.types"
import { DomainTodolist, type FilterValues } from "../../../../lib/types/types"
import { TasksSkeleton } from "../../../skeletons/TasksSkeleton/TasksSkeleton"
import { TasksPagination } from "../TasksPagination/TasksPagination"
import { Task } from "./Task/Task"

export const Tasks = ({ todolist }: { todolist: DomainTodolist }) => {
  const [page, setPage] = useState(1)
  const { data, isLoading, refetch } = useGetTasksQuery({ todolistId: todolist.id, args: { page } })

  let tasks = data?.items || []

  const changeFilter = (filter: FilterValues, tasks: DomainTask[]) => {
    switch (filter) {
      case "active": {
        return tasks.filter((task) => task.status === TaskStatus.New)
      }
      case "completed": {
        return tasks.filter((task) => task.status === TaskStatus.Completed)
      }
      default: {
        return tasks
      }
    }
  }

  const tasksForTodolist = changeFilter(todolist.filter, tasks)

  useEffect(() => {
    if (tasksForTodolist.length === 0 && data && data.totalCount > 0 && page !== 1) {
      setPage(page - 1)
      refetch()
    }
  }, [tasksForTodolist.length, data, page, refetch])

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
              return <Task key={task.id} task={task} todolist={todolist} page={page} />
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

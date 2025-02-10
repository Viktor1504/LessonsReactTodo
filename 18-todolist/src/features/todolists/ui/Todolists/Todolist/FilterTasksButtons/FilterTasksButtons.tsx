import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { filterButtonsContainerSx } from "./FilterTasksButtons.styles"
import { DomainTodolist, FilterValuesType, todolistsApi } from "../../../../api/todolistsApi"
import { useAppDispatch } from "common/hooks"

export const FilterTasksButtons = ({ todolist }: { todolist: DomainTodolist }) => {
  const { filter, id } = todolist
  const dispatch = useAppDispatch()

  const changeFilterTasksHandler = (newFilter: FilterValuesType) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (draft) => {
        const todo = draft.find((tl) => tl.id === id)
        if (todo) {
          todo.filter = newFilter
        }
      }),
    )
  }

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        color={"inherit"}
        onClick={() => changeFilterTasksHandler("all")}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilterTasksHandler("active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilterTasksHandler("completed")}
      >
        Completed
      </Button>
    </Box>
  )
}

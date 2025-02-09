import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { filterButtonsContainerSx } from "./FilterTasksButtons.styles"
import { changeTodolistFilter, DomainTodolist, FilterValuesType } from "../../../../model/todolistsSlice"
import { useAppDispatch } from "common/hooks"

export const FilterTasksButtons = ({ todolist }: { todolist: DomainTodolist }) => {
  const { filter, id } = todolist
  const dispatch = useAppDispatch()

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilter({ id, filter }))
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

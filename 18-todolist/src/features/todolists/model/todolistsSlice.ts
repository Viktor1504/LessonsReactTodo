import { createSlice } from "@reduxjs/toolkit"
import { RequestStatus } from "../../../app/appSlice"
import { Todolist } from "../api/todolistsApi.types"

export type FilterValuesType = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    removeTodolist: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    addTodolist: create.reducer<{ todolist: Todolist }>((state, action) => {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
    }),
    changeTodolistTitle: create.reducer<{ id: string; title: string }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    }),
    changeTodolistFilter: create.reducer<{ id: string; filter: FilterValuesType }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    }),
    changeTodolistEntityStatus: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].entityStatus = action.payload.entityStatus
      }
    }),

    clearTodolists: create.reducer(() => {
      return []
    }),
  }),
})

// Thunks

export const {
  removeTodolist,
  addTodolist,
  changeTodolistEntityStatus,
  changeTodolistFilter,
  changeTodolistTitle,
  clearTodolists,
} = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer

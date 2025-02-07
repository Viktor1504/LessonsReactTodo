import { ResultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { setAppError, setAppStatus } from "../../../app/appSlice"
import { RootState } from "../../../app/store"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskDomainModel, UpdateTaskModel } from "../api/tasksApi.types"
import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"
import { addTodolist, clearState, removeTodolist } from "./todolistsSlice"

export type TasksStateType = {
  [key: string]: DomainTask[]
}

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: (create) => {
    const createAThunk = create.asyncThunk.withTypes<{ rejectValue: null }>()

    return {
      fetchTasks: createAThunk(
        async (todolistId: string, { dispatch, rejectWithValue }) => {
          dispatch(setAppStatus({ status: "loading" }))
          try {
            const res = await tasksApi.getTasks(todolistId)
            dispatch(setAppStatus({ status: "succeeded" }))
            return { todolistId, tasks: res.data.items }
          } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
          },
        },
      ),
      removeTask: createAThunk(
        async (arg: { taskId: string; todolistId: string }, { dispatch, rejectWithValue }) => {
          dispatch(setAppStatus({ status: "loading" }))
          try {
            const res = await tasksApi.deleteTask(arg)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatus({ status: "succeeded" }))
              return arg
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId)
            if (index !== -1) {
              state[action.payload.todolistId].splice(index, 1)
            }
          },
        },
      ),
      addTask: createAThunk(
        async (arg: { title: string; todolistId: string }, { dispatch, rejectWithValue }) => {
          dispatch(setAppStatus({ status: "loading" }))
          try {
            const res = await tasksApi.createTask(arg)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatus({ status: "succeeded" }))
              return { task: res.data.data.item }
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
          },
        },
      ),
      updateTask: createAThunk(
        async (
          arg: {
            taskId: string
            todolistId: string
            domainModel: UpdateTaskDomainModel
          },
          { dispatch, rejectWithValue, getState },
        ) => {
          const { todolistId, taskId, domainModel } = arg
          const tasks = (getState() as RootState).tasks
          const task = tasks[todolistId].find((t) => t.id === taskId)

          if (!task) {
            dispatch(setAppError({ error: "Task not found" }))
            return rejectWithValue(null)
          }
          const model: UpdateTaskModel = {
            status: task.status,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            ...domainModel,
          }

          dispatch(setAppStatus({ status: "loading" }))
          try {
            const res = await tasksApi.updateTask({ taskId, todolistId, model })
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatus({ status: "succeeded" }))
              return arg
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((t) => t.id === action.payload.taskId)
            if (index !== -1) {
              tasks[index] = { ...tasks[index], ...action.payload.domainModel }
            }
          },
        },
      ),
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(clearState, () => ({}))
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors
export const { addTask, removeTask, updateTask, fetchTasks } = tasksSlice.actions

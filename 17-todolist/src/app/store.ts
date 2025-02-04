import { authReducer, authSlice } from "../features/auth/model/authSlice"
import { tasksReducer, tasksSlice } from "../features/todolists/model/tasksSlice"
import { todolistSlice, todolistsReducer } from "../features/todolists/model/todolistsSlice"
import { appReducer, appSlice } from "./appSlice"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store

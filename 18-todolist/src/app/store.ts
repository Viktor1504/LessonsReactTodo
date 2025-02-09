import { configureStore } from "@reduxjs/toolkit"
import { tasksReducer, tasksSlice } from "../features/todolists/model/tasksSlice"
import { appReducer, appSlice } from "./appSlice"
import { setupListeners } from "@reduxjs/toolkit/query"
import { baseApi } from "./baseApi"
import { todolistsReducer, todolistsSlice } from "../features/todolists/model/todolistsSlice"

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

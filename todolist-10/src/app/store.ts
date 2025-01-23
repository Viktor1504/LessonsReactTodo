import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../model/tasks-reducer.ts";
import {todolistsReducer} from "../model/todolists-reducer.ts";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = legacy_createStore(rootReducer)

export type RootState = ReturnType<typeof store.getState>

// @ts-ignore
window.store = store
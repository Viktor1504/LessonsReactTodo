import type {Task, TasksState} from '../App'
import {CreateTodolistAction, DeleteTodolistAction} from "./todolists-reducer.ts";

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'CREATE-TODOLIST': {
            return {...state, [action.payload.id]: []}
        }
        case 'DELETE-TODOLIST': {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }
        case 'DELETE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        }
        case 'CREATE-TASK': {
            const newTask: Task = {id: crypto.randomUUID(), title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATUS' : {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    isDone: action.payload.isDone
                } : task)
            }
        }
        case 'CHANGE-TASK-TITLE' : {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    title: action.payload.title
                } : task)
            }
        }
        default:
            return state
    }
}

export const deleteTaskAC = ({todolistId, taskId}: { todolistId: string, taskId: string }) => ({
    type: 'DELETE-TASK',
    payload: {todolistId, taskId}
}) as const

export const createTaskAC = ({todolistId, title}: { todolistId: string, title: string }) => ({
    type: 'CREATE-TASK',
    payload: {todolistId, title}
}) as const

export const changeTaskStatusAC = ({todolistId, taskId, isDone}: {
    todolistId: string,
    taskId: string,
    isDone: boolean
}) => ({
    type: 'CHANGE-TASK-STATUS',
    payload: {todolistId, taskId, isDone}
}) as const

export const changeTaskTitleAC = ({todolistId, taskId, title}: {
    todolistId: string,
    taskId: string,
    title: string
}) => ({
    type: 'CHANGE-TASK-TITLE',
    payload: {todolistId, taskId, title}
}) as const

type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
type CreateTaskAction = ReturnType<typeof createTaskAC>
type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>

type Actions =
    CreateTodolistAction
    | DeleteTodolistAction
    | DeleteTaskAction
    | CreateTaskAction
    | ChangeTaskStatusAction
    | ChangeTaskTitleAction
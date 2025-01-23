import type {Task, TasksState} from '../App'
import {CreateTodolistAction, DeleteTodolistAction} from "./todolists-reducer.ts";

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'create_todolist': {
            return {...state, [action.payload.id]: []}
        }
        case 'delete_todolist': {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }
        case 'delete_task': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        }
        case 'create_task': {
            const newTask: Task = {id: crypto.randomUUID(), title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        case 'change_taskStatus' : {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    isDone: action.payload.isDone
                } : task)
            }
        }
        case 'change_taskTitle' : {
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
    type: 'delete_task',
    payload: {todolistId, taskId}
}) as const

export const createTaskAC = ({todolistId, title}: { todolistId: string, title: string }) => ({
    type: 'create_task',
    payload: {todolistId, title}
}) as const

export const changeTaskStatusAC = ({todolistId, taskId, isDone}: {
    todolistId: string,
    taskId: string,
    isDone: boolean
}) => ({
    type: 'change_taskStatus',
    payload: {todolistId, taskId, isDone}
}) as const

export const changeTaskTitleAC = ({todolistId, taskId, title}: {
    todolistId: string,
    taskId: string,
    title: string
}) => ({
    type: 'change_taskTitle',
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
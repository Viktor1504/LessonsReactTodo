import {CreateTodolistAction, DeleteTodolistAction} from "./todolists-reducer.ts";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = Record<string, TaskType[]>

const initialState: TasksType = {
    ['todolistId1']: [
        {id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true},
        {id: crypto.randomUUID(), title: 'JS', isDone: true},
        {id: crypto.randomUUID(), title: 'ReactJS', isDone: false},
    ],
    ['todolistId2']: [
        {id: crypto.randomUUID(), title: 'Rest API', isDone: true},
        {id: crypto.randomUUID(), title: 'GraphQL', isDone: false},
    ]
}

export const tasksReducer = (state: TasksType = initialState, action: Actions): TasksType => {
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
            const newTask: TaskType = {id: crypto.randomUUID(), title: action.payload.title, isDone: false}
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

export const deleteTaskAC = (payload: { todolistId: string, taskId: string }) => ({
    type: 'DELETE-TASK',
    payload
}) as const

export const createTaskAC = (payload: { todolistId: string, title: string }) => ({
    type: 'CREATE-TASK',
    payload
}) as const

export const changeTaskStatusAC = (payload: { todolistId: string, taskId: string, isDone: boolean }) => ({
    type: 'CHANGE-TASK-STATUS',
    payload
}) as const

export const changeTaskTitleAC = (payload: { todolistId: string, taskId: string, title: string }) => ({
    type: 'CHANGE-TASK-TITLE',
    payload
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
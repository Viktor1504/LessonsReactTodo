import {FilterValues, Todolist} from "../App.tsx";

const initialState: Todolist[] = []


export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'DELETE-TODOLIST': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        case 'CREATE-TODOLIST': {
            const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE' : {
            return state.map(todolist => todolist.id === action.payload.id ? {
                ...todolist,
                title: action.payload.title
            } : todolist)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(todolist => todolist.id === action.payload.id ? {
                ...todolist,
                filter: action.payload.filter
            } : todolist)
        }
        default:
            return state
    }
}

export const deleteTodolistAC = (id: string) => ({type: 'DELETE-TODOLIST', payload: {id}} as const)
export const createTodolistAC = (title: string) => {
    const id = crypto.randomUUID()
    return {type: 'CREATE-TODOLIST', payload: {id, title}} as const
}

export const changeTodolistTitleAC = ({id, title}: { id: string, title: string }) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {id, title}
} as const)

export const changeTodolistFilterAC = ({id, filter}: { id: string, filter: FilterValues }) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {id, filter}
} as const)

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>

type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction
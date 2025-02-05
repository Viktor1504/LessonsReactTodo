import {FilterValues, Todolist} from "../App.tsx";

const initialState: Todolist[] = []


export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        case 'create_todolist': {
            const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [newTodolist, ...state]
        }
        case 'change_todolist_title' : {
            return state.map(todolist => todolist.id === action.payload.id ? {
                ...todolist,
                title: action.payload.title
            } : todolist)
        }
        case 'change_todolist_filter': {
            return state.map(todolist => todolist.id === action.payload.id ? {
                ...todolist,
                filter: action.payload.filter
            } : todolist)
        }
        default:
            return state
    }
}

export const deleteTodolistAC = (id: string) => ({type: 'delete_todolist', payload: {id}} as const)
export const createTodolistAC = (title: string) => {
    const id = crypto.randomUUID()
    return {type: 'create_todolist', payload: {id, title}} as const
}


export const changeTodolistTitleAC = ({id, title}: { id: string, title: string }) => ({
    type: 'change_todolist_title',
    payload: {id, title}
} as const)

export const changeTodolistFilterAC = ({id, filter}: { id: string, filter: FilterValues }) => ({
    type: 'change_todolist_filter',
    payload: {id, filter}
} as const)

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>

type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction
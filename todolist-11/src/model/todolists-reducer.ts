export type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'


const initialState: TodolistType[] = [
    {id: 'todolistId1', title: 'What to learn', filter: 'all'},
    {id: 'todolistId2', title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (state: TodolistType[] = initialState, action: Actions): TodolistType[] => {
    switch (action.type) {
        case 'DELETE-TODOLIST': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        case 'CREATE-TODOLIST': {
            const newTodolist: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'all'}
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

export const changeTodolistTitleAC = (payload: { id: string, title: string }) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload
} as const)

export const changeTodolistFilterAC = (payload: { id: string, filter: FilterValues }) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload
} as const)

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>

type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction
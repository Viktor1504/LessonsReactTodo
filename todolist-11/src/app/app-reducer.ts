export type ThemeMode = 'dark' | 'light'

type InitialState = typeof initialState

const initialState = {
    themeMode: 'light' as ThemeMode,
}

export const appReducer = (state: InitialState = initialState, action: Action): InitialState => {
    switch (action.type) {
        case 'CHANGE_THEME': {
            return {...state, themeMode: action.payload.themeMode}
        }
        default:
            return state
    }
}

export const changeThemeAC = (theme: ThemeMode) => ({type: 'CHANGE_THEME', payload: {themeMode: theme}})

type ChangeThemeAction = ReturnType<typeof changeThemeAC>

type Action = ChangeThemeAction
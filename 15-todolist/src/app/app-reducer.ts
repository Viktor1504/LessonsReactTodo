export type ThemeMode = "dark" | "light"

type InitialState = typeof initialState

const initialState = {
  themeMode: "light" as ThemeMode,
  status: "idle" as RequestStatus,
  error: null as string | null,
}

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...state, themeMode: action.payload.themeMode }
    case "SET_STATUS": {
      return { ...state, status: action.payload.status }
    }
    case "SET_ERROR": {
      return { ...state, error: action.payload.error }
    }
    default:
      return state
  }
}

// Action creators
export const changeThemeAC = (themeMode: ThemeMode) => ({ type: "CHANGE_THEME", payload: { themeMode } }) as const
export const setAppStatusAC = (status: RequestStatus) => ({ type: "SET_STATUS", payload: { status } }) as const
export const setAppErrorAC = (error: string | null) => ({ type: "SET_ERROR", payload: { error } }) as const

// Actions types
type ChangeThemeActionType = ReturnType<typeof changeThemeAC>
type SetStatusActionType = ReturnType<typeof setAppStatusAC>
type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

type ActionsType = ChangeThemeActionType | SetStatusActionType | SetAppErrorActionType

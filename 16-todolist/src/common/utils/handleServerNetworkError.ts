import axios from "axios"
import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer"
import { Dispatch } from "redux"

export const handleServerNetworkError = (error: unknown, dispatch: Dispatch) => {
  let errorMessage = "An unexpected error occurred"
  if (axios.isAxiosError(error)) {
    errorMessage = error.response?.data?.message || error.message || "Network error"
  } else if (error instanceof Error) {
    errorMessage = error.message
  }
  dispatch(setAppErrorAC(errorMessage))
  dispatch(setAppStatusAC("failed"))
}
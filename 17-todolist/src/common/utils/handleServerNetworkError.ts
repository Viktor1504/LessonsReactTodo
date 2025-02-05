import { Dispatch } from "redux"
import { setAppError, setAppStatus } from "../../app/appSlice"
import axios from "axios"

export const handleServerNetworkError = (error: unknown, dispatch: Dispatch): void => {
  let errorMessage = "An unexpected error occurred"
  if (axios.isAxiosError(error)) {
    errorMessage = error.response?.data?.message || error.message || errorMessage
  } else if (error instanceof Error) {
    errorMessage = `Native error: ${error.message}`
  }
  dispatch(setAppError({ error: errorMessage }))
  dispatch(setAppStatus({ status: "failed" }))
}

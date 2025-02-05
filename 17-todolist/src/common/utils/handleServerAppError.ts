import { BaseResponse } from "common/types"
import { Dispatch } from "redux"
import { setAppError, setAppStatus } from "../../app/appSlice"

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
  const errorMessage = data.messages.length ? data.messages[0] : "Some error occurred"
  dispatch(setAppError({ error: errorMessage }))
  dispatch(setAppStatus({ status: "failed" }))
}

import { Dispatch } from "redux"
import { BaseResponse } from "common/types"
import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer"

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
  const errorMessage = data.messages.length ? data.messages[0] : "Some error occurred"
  dispatch(setAppErrorAC(errorMessage))
  dispatch(setAppStatusAC("failed"))
}

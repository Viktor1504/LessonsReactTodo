import { ResultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { authApi } from "../api/authAPI"
import { LoginArgs } from "../api/authAPI.types"
import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"
import { setAppStatus } from "../../../app/appSlice"
import { clearState } from "../../todolists/model/todolistsSlice"

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

export const authSlice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
  },
  reducers: (create) => {
    const createAThunk = create.asyncThunk.withTypes<{ rejectValue: null }>()

    return {
      login: createAThunk(
        async (arg: LoginArgs, { dispatch, rejectWithValue }) => {
          dispatch(setAppStatus({ status: "loading" }))
          try {
            const res = await authApi.login(arg)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatus({ status: "succeeded" }))
              localStorage.setItem("sn-token", res.data.data.token)
              return { isLoggedIn: true }
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
          },
        },
      ),
      logout: createAThunk(
        async (arg, { dispatch, rejectWithValue }) => {
          dispatch(setAppStatus({ status: "loading" }))
          try {
            const res = await authApi.logout()
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatus({ status: "succeeded" }))
              dispatch(clearState())
              localStorage.removeItem("sn-token")
              return { isLoggedIn: false }
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
          },
        },
      ),
      initializeApp: createAThunk(
        async (_, { dispatch, rejectWithValue }) => {
          dispatch(setAppStatus({ status: "loading" }))
          try {
            const res = await authApi.me()
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatus({ status: "succeeded" }))
              return { isLoggedIn: true }
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
          },
          settled: (state) => {
            state.isInitialized = true
          },
        },
      ),
    }
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectIsInitialized: (state) => state.isInitialized,
  },
})
export const authReducer = authSlice.reducer
export const { selectIsLoggedIn, selectIsInitialized } = authSlice.selectors
export const { login, logout, initializeApp } = authSlice.actions

import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { ErrorSnackbar, Header } from "common/components"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { getTheme } from "common/theme"
import { selectThemeMode } from "./appSelectors"
import { Routing } from "common/routing"
import { useEffect } from "react"
import { initializeAppTC } from "../features/auth/model/auth-reducer"
import { selectIsInitialized } from "../features/auth/model/authSelectors"
import { CircularProgress } from "@mui/material"
import s from "./App.module.css"

export const App = () => {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const isInitialized = useAppSelector(selectIsInitialized)

  useEffect(() => {
    console.log("App is initialized")
    dispatch(initializeAppTC())
  }, [dispatch])

  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Routing />
      <ErrorSnackbar />
    </ThemeProvider>
  )
}

import { Page404 } from "common/components"
import { useAppSelector } from "common/hooks"
import { ProtectedRoutes } from "common/utils/ProtectedRoutes"
import { Route, Routes } from "react-router"
import { selectIsLoggedIn } from "../../app/appSlice"
import { Main } from "../../app/Main"
import { Login } from "../../features/auth/ui/Login/Login"

export const Path = {
  Main: "/",
  Login: "/login",
  NotFound: "*",
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      <Route path={Path.Login} element={<Login />} />
      <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
        <Route path={Path.Main} element={<Main />} />
        <Route path={Path.NotFound} element={<Page404 />} />
      </Route>
    </Routes>
  )
}

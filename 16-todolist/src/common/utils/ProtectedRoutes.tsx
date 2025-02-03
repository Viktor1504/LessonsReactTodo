import { Navigate, Outlet } from "react-router"
import { Path } from "common/routing/routing"

export const ProtectedRoutes = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to={Path.Login} />
}

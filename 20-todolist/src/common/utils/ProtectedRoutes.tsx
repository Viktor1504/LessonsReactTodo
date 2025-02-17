import { Outlet } from "react-router"
import { Login } from "../../features/auth/ui/Login/Login"

export const ProtectedRoutes = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return isLoggedIn ? <Outlet /> : <Login />
}

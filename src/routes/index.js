import React from "react"
import { Navigate } from "react-router-dom"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import ForgetEmail from "../pages/Authentication/ForgetEmail"
import UserProfile from "pages/Authentication/user-profile"
import ChangePassword from "pages/Authentication/ChangePassword"

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/profile", component: <UserProfile /> },
  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name

  {
    path: "/",
    exact: true,
    component: <Navigate to="/login" />,
  },
]

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
  { path: "/forgot-email", component: <ForgetEmail /> },
  { path: "/change/password", component: <ChangePassword /> },
]

export { authProtectedRoutes, publicRoutes }

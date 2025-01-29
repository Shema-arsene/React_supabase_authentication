import React from "react"
import { userAuth } from "../Context/AuthContext"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
  const { session } = userAuth()
  return <>{session ? <>{children}</> : <Navigate to="/signup" />}</>
}

export default PrivateRoute

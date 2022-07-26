import { Navigate } from "react-router-dom"
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }) => {
  let auth= useSelector((state) => state.login.login)
  if (!auth) return <Navigate to="/" />
  return children
}

export default ProtectedRoute
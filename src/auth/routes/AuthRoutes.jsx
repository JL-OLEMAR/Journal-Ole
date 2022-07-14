import { Navigate, Route, Routes } from 'react-router-dom'

import { Login, Register } from '../pages'

export function AuthRoutes() {
  return (
    <Routes>
      <Route element={<Login />} path='login' />
      <Route element={<Register />} path='register' />
      <Route element={<Navigate to='/auth/login' />} path='/*' />
    </Routes>
  )
}

import { Navigate, Route, Routes } from 'react-router-dom'

import { Journal } from '../pages'

export function JournalRoutes() {
  return (
    <Routes>
      <Route element={<Journal />} path='/' />
      <Route element={<Navigate to='/' />} path='/*' />
    </Routes>
  )
}

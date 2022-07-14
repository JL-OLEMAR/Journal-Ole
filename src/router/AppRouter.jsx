import { Routes, Route } from 'react-router-dom'

import { AuthRoutes } from '../auth'
import { JournalRoutes } from '../journal'

export function AppRouter() {
  return (
    <Routes>
      {/* Login y Registro */}
      <Route element={<AuthRoutes />} path='/auth/*' />

      {/* JournalApp */}
      <Route element={<JournalRoutes />} path='/*' />
    </Routes>
  )
}

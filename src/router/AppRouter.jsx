import { Routes, Route, Navigate } from 'react-router-dom'

import { useCheckAuth } from '../hooks'
import { AuthRoutes } from '../auth'
import { JournalRoutes } from '../journal'
import { CheckingAuth } from '../ui'

export function AppRouter() {
  const { status } = useCheckAuth()

  if (status === 'checking') return <CheckingAuth />

  return (
    <Routes>
      {status === 'authenticated' ? (
        <Route element={<JournalRoutes />} path='/*' />
      ) : (
        <Route element={<AuthRoutes />} path='/auth/*' />
      )}
      <Route element={<Navigate to='/auth/login' />} path='/*' />
    </Routes>
  )
}

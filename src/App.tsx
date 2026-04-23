import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import AppLayout from './components/layout/AppLayout'
import Login        from './pages/Login'
import Dashboard    from './pages/Dashboard'
import VisitMonth   from './pages/VisitMonth'
import Visits       from './pages/Visits'
import Tasks        from './pages/Tasks'
import CalendarPage from './pages/CalendarPage'
import Accounts     from './pages/Accounts'
import MOU         from './pages/MOU'
import Approval     from './pages/Approval'
import Forecast     from './pages/Forecast'
import Reports      from './pages/Reports'
import Settings     from './pages/Settings'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><AppLayout /></PrivateRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard"   element={<Dashboard />} />
          <Route path="visit-month" element={<VisitMonth />} />
          <Route path="visits"      element={<Visits />} />
          <Route path="tasks"       element={<Tasks />} />
          <Route path="calendar"    element={<CalendarPage />} />
          <Route path="accounts"    element={<Accounts />} />
          <Route path="mou"         element={<MOU />} />
          <Route path="approval"    element={<Approval />} />
          <Route path="forecast"    element={<Forecast />} />
          <Route path="reports"     element={<Reports />} />
          <Route path="settings"    element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const pageTitles: Record<string, string> = {
  '/dashboard':   'Dashboard',
  '/visit-month': 'Visit (เดือน)',
  '/visits':      'Visits',
  '/tasks':       'Tasks',
  '/calendar':    'ปฏิทินนัดหมาย',
  '/accounts':    'ลูกค้า (Accounts)',
  '/mou':         'MOU',
  '/approval':    'อนุมัติ',
  '/forecast':    'Sales Forecast',
  '/reports':     'รายงาน',
  '/settings':    'ตั้งค่า',
}

export default function AppLayout() {
  const { pathname } = useLocation()
  const title = pageTitles[pathname] ?? 'DH Sales'
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-56 flex flex-col min-h-screen">
        <Navbar title={title} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

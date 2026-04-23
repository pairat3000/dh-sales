import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, CalendarDays, Calendar, CheckSquare, Users,
  FileText, ThumbsUp, TrendingUp, Settings, BarChart2, LogOut, Bell
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const nav = [
  { to: '/dashboard',   label: 'Dashboard',          icon: LayoutDashboard },
  { to: '/visit-month', label: 'Visit (เดือน)',       icon: CalendarDays },
  { to: '/visits',      label: 'Visits',              icon: Calendar },
  { to: '/tasks',       label: 'Tasks',               icon: CheckSquare },
  { to: '/calendar',    label: 'ปฏิทินนัดหมาย',      icon: Calendar },
  { to: '/accounts',    label: 'ลูกค้า',              icon: Users },
  { to: '/mou',         label: 'MOU',                 icon: FileText },
  { to: '/approval',    label: 'อนุมัติ',             icon: ThumbsUp },
  { to: '/forecast',    label: 'Sales Forecast',      icon: TrendingUp },
  { to: '/reports',     label: 'รายงาน',              icon: BarChart2 },
  { to: '/settings',    label: 'ตั้งค่า',             icon: Settings },
]

export default function Sidebar() {
  const { user, logout } = useAuthStore()
  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-white border-r border-gray-100 flex flex-col z-30">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-gray-100">
        <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">DH</span>
        </div>
        <div>
          <div className="text-sm font-bold text-gray-800">DH Sales</div>
          <div className="text-xs text-gray-400">ระบบนัดหมายลูกค้า</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? 'active' : 'text-gray-600'}`
            }
          >
            <Icon size={17} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="border-t border-gray-100 p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold text-sm">
            {user?.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-gray-800 truncate">{user?.name}</div>
            <div className="text-xs text-gray-400">{user?.role}</div>
          </div>
          <Bell size={15} className="text-gray-400 cursor-pointer hover:text-primary-500" />
        </div>
        <button onClick={logout} className="btn-ghost w-full justify-start text-xs text-gray-500">
          <LogOut size={14} /> ออกจากระบบ
        </button>
      </div>
    </aside>
  )
}

import { NavLink } from 'react-router-dom'
import {
  Home, CalendarDays, LayoutGrid, ClipboardList, Calendar,
  Users, FileText, CheckSquare, TrendingUp, Settings, BarChart2,
  LogOut, Bell
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { mockDashboardStats } from '../../data/mockData'

const nav = [
  { to: '/dashboard',   label: 'Dashboard',       icon: Home },
  { to: '/visit-month', label: 'Visit (เดือน)',    icon: CalendarDays },
  { to: '/visits',      label: 'Visits',           icon: LayoutGrid },
  { to: '/tasks',       label: 'Tasks',            icon: ClipboardList },
  { to: '/calendar',    label: 'ปฏิทินนัดหมาย',   icon: Calendar },
  { to: '/accounts',    label: 'ลูกค้า',           icon: Users },
  { to: '/mou',         label: 'MOU',              icon: FileText },
  { to: '/approval',    label: 'อนุมัติ',          icon: CheckSquare, badge: mockDashboardStats.pendingApprovals },
  { to: '/forecast',    label: 'Sales Forecast',   icon: TrendingUp },
  { to: '/reports',     label: 'รายงาน',           icon: BarChart2 },
  { to: '/settings',    label: 'ตั้งค่า',          icon: Settings },
]

export default function Sidebar() {
  const { user, logout } = useAuthStore()
  const initials = user?.name?.split(' ').map(w => w[0]).slice(0, 2).join('') ?? 'U'

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-white border-r border-[#E2E8F0] flex flex-col z-30">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-16 border-b border-[#E2E8F0] flex-shrink-0">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: '#F16027' }}
        >
          <span className="text-white font-semibold text-sm leading-none">Db</span>
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-[#020817] leading-tight">DH Sales</div>
          <div className="text-xs text-[#64748B] leading-tight truncate">ระบบนัดหมายลูกค้า</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        {nav.map(({ to, label, icon: Icon, badge }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? 'active' : ''}`
            }
          >
            <Icon size={16} className="flex-shrink-0" />
            <span className="flex-1 truncate">{label}</span>
            {badge ? (
              <span
                className="ml-auto text-xs font-semibold text-white rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#F16027', minWidth: 18, height: 18, padding: '0 5px', fontSize: 11 }}
              >
                {badge}
              </span>
            ) : null}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-[#E2E8F0] p-3 flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0"
            style={{ backgroundColor: '#F16027' }}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-[#020817] truncate">{user?.name}</div>
            <div className="text-xs text-[#64748B] truncate">{user?.role} · {user?.branch}</div>
          </div>
          <Bell size={14} className="text-[#64748B] cursor-pointer hover:text-[#F16027] flex-shrink-0" />
        </div>
        <button
          onClick={logout}
          className="btn-ghost w-full justify-start text-xs text-[#64748B]"
        >
          <LogOut size={13} />
          ออกจากระบบ
        </button>
      </div>
    </aside>
  )
}

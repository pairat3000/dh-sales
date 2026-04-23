import { Bell, RefreshCw } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { mockDashboardStats } from '../../data/mockData'

interface NavbarProps { title: string; subtitle?: string }

export default function Navbar({ title, subtitle }: NavbarProps) {
  const { user } = useAuthStore()
  const pending = mockDashboardStats.pendingApprovals

  return (
    <header
      className="bg-white border-b border-[#E2E8F0] flex items-center justify-between px-6 sticky top-0 z-20"
      style={{ height: 64 }}
    >
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        <button className="btn-icon">
          <RefreshCw size={15} className="text-[#64748B]" />
        </button>

        <div className="relative cursor-pointer">
          <Bell size={18} className="text-[#64748B]" />
          {pending > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 text-white text-xs rounded-full flex items-center justify-center font-semibold"
              style={{ backgroundColor: '#F16027', minWidth: 16, height: 16, fontSize: 10, padding: '0 3px' }}
            >
              {pending}
            </span>
          )}
        </div>

        <div className="h-5 w-px bg-[#E2E8F0] mx-1" />

        <div className="text-sm text-[#64748B]">{user?.location} · {user?.branch}</div>
      </div>
    </header>
  )
}

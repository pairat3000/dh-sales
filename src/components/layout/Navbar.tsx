import { Bell, RefreshCw } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { mockApprovals } from '../../data/mockData'

interface NavbarProps { title: string }

export default function Navbar({ title }: NavbarProps) {
  const { user } = useAuthStore()
  const pendingCount = mockApprovals.filter(a => a.status === 'รออนุมัติ').length

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-20">
      <h1 className="text-base font-semibold text-gray-800">{title}</h1>
      <div className="flex items-center gap-3">
        <button className="btn-ghost p-2"><RefreshCw size={15} /></button>
        <div className="relative cursor-pointer">
          <Bell size={18} className="text-gray-500" />
          {pendingCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {pendingCount}
            </span>
          )}
        </div>
        <div className="h-5 w-px bg-gray-200" />
        <div className="text-sm text-gray-600">{user?.branch}</div>
      </div>
    </header>
  )
}

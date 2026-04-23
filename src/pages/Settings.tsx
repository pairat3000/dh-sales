import { useState } from 'react'
import { mockUsers } from '../data/mockData'
import { Plus, Search } from 'lucide-react'

const MENUS = [
  { id: 'users',    label: 'ผู้ใช้งาน' },
  { id: 'roles',    label: 'บทบาท (Roles)' },
  { id: 'travel',   label: 'อัตราค่าเดินทาง' },
  { id: 'expense',  label: 'เพดานค่าใช้จ่าย' },
  { id: 'docs',     label: 'เอกสารตารางนัดหมาย' },
  { id: 'branches', label: 'สาขา' },
  { id: 'points',   label: 'Visit Points' },
  { id: 'notif',    label: 'Notification Setting' },
]

function UsersTab() {
  const [search, setSearch] = useState('')
  const filtered = mockUsers.filter(u => u.name.includes(search) || u.role.includes(search))
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="input pl-8" placeholder="ค้นหาชื่อ..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className="btn-primary"><Plus size={15} /> เพิ่มผู้ใช้</button>
      </div>
      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="table-header"><th className="text-left py-3 px-4">ID</th><th className="text-left py-3 px-4">ชื่อ</th><th className="text-left py-3 px-4">สาขา</th><th className="text-left py-3 px-4">Report To</th><th className="text-left py-3 px-4">Role</th></tr></thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} className="table-row">
                <td className="py-3 px-4 text-gray-500 font-mono text-xs">{u.id}</td>
                <td className="py-3 px-4 font-medium text-gray-800">{u.name}</td>
                <td className="py-3 px-4 text-gray-600 text-xs">{u.branch}</td>
                <td className="py-3 px-4 text-gray-500 text-xs">{u.reportTo}</td>
                <td className="py-3 px-4"><span className={`badge ${u.role === 'Manager' ? 'badge-blue' : 'badge-gray'}`}>{u.role}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-2 border-t border-gray-50 text-xs text-gray-400">ผู้ใช้ทั้งหมด 861 คน (แสดงตัวอย่าง {filtered.length} คน)</div>
      </div>
    </div>
  )
}

function TravelTab() {
  const rates = [
    { zone: 'ในเขตกรุงเทพฯ',         rate: 4,  max: 500  },
    { zone: 'ปริมณฑล (50 กม.)',       rate: 4,  max: 1000 },
    { zone: 'ต่างจังหวัด (50–200 กม.)', rate: 3.5, max: 1500 },
    { zone: 'ต่างจังหวัด (200+ กม.)', rate: 3,  max: 2500 },
  ]
  return (
    <div className="card p-0 overflow-hidden">
      <table className="w-full text-sm">
        <thead><tr className="table-header"><th className="text-left py-3 px-4">โซน</th><th className="text-right py-3 px-4">อัตรา (บาท/กม.)</th><th className="text-right py-3 px-4">สูงสุด (บาท/ครั้ง)</th></tr></thead>
        <tbody>
          {rates.map(r => (
            <tr key={r.zone} className="table-row">
              <td className="py-3 px-4 text-gray-700">{r.zone}</td>
              <td className="py-3 px-4 text-right text-gray-700">{r.rate}</td>
              <td className="py-3 px-4 text-right text-gray-700">{r.max.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function NotifTab() {
  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Master Notifications</h3>
        <div className="space-y-2">
          {[
            { type: 'Visit Reminder', detail: 'แจ้งเตือนก่อน Visit 1 ชั่วโมง', schedule: 'ทุกวัน 08:00' },
            { type: 'Approval Alert',  detail: 'มีรายการรออนุมัติใหม่',           schedule: 'Real-time' },
            { type: 'Monthly Summary', detail: 'สรุปยอดประจำเดือน',               schedule: 'ทุกสิ้นเดือน' },
          ].map(n => (
            <div key={n.type} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-800">{n.type}</p>
                <p className="text-xs text-gray-400">{n.detail} · {n.schedule}</p>
              </div>
              <div className="w-10 h-5 bg-primary-500 rounded-full flex items-center justify-end px-1 cursor-pointer">
                <div className="w-3.5 h-3.5 bg-white rounded-full" />
              </div>
            </div>
          ))}
        </div>
        <button className="btn-primary mt-3 text-xs"><Plus size={13} /> เพิ่ม Notification</button>
      </div>
    </div>
  )
}

export default function Settings() {
  const [active, setActive] = useState('users')
  const current = MENUS.find(m => m.id === active)

  return (
    <div className="flex gap-5">
      {/* Side menu */}
      <div className="w-48 flex-shrink-0">
        <div className="card p-2 space-y-0.5">
          {MENUS.map(m => (
            <button
              key={m.id}
              onClick={() => setActive(m.id)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${active === m.id ? 'bg-primary-500 text-white font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-4">
        <h2 className="text-base font-semibold text-gray-800">{current?.label}</h2>
        {active === 'users'   && <UsersTab />}
        {active === 'travel'  && <TravelTab />}
        {active === 'notif'   && <NotifTab />}
        {!['users', 'travel', 'notif'].includes(active) && (
          <div className="card py-16 text-center text-gray-400">
            <p className="text-sm">หน้านี้อยู่ระหว่างพัฒนา</p>
          </div>
        )}
      </div>
    </div>
  )
}

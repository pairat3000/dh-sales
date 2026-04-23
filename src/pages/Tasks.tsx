import { useState } from 'react'
import { Plus, Search, Upload } from 'lucide-react'
import { mockTasks } from '../data/mockData'

const PRIORITY_STYLE: Record<string, string> = {
  'สูง':      'badge-red',
  'ปานกลาง': 'badge-yellow',
  'ต่ำ':      'badge-blue',
}
const STATUS_STYLE: Record<string, string> = {
  'รอดำเนินการ':     'badge-yellow',
  'กำลังดำเนินการ':  'badge-blue',
  'เสร็จสิ้น':       'badge-green',
}

export default function Tasks() {
  const [tab, setTab] = useState<'mine' | 'created'>('mine')
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('ทั้งหมด')

  const filtered = mockTasks.filter(t =>
    (filterStatus === 'ทั้งหมด' || t.status === filterStatus) &&
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {(['mine', 'created'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 text-sm rounded-md font-medium transition-colors ${tab === t ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'}`}
          >
            {t === 'mine' ? 'งานของฉัน' : 'สร้างโดยฉัน'}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="input pl-8" placeholder="ค้นหาชื่องาน..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input w-auto" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option>ทั้งหมด</option>
          <option>รอดำเนินการ</option>
          <option>กำลังดำเนินการ</option>
          <option>เสร็จสิ้น</option>
        </select>
        <button className="btn-secondary"><Upload size={14} /> Import</button>
        <button className="btn-primary"><Plus size={15} /> สร้างงาน</button>
      </div>

      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="table-header">
              <th className="text-left py-3 px-4">ลำดับ</th>
              <th className="text-left py-3 px-4">ชื่องาน</th>
              <th className="text-left py-3 px-4">ผู้รับผิดชอบ</th>
              <th className="text-left py-3 px-4">ความสำคัญ</th>
              <th className="text-left py-3 px-4">สถานะ</th>
              <th className="text-left py-3 px-4">กำหนดส่ง</th>
              <th className="text-left py-3 px-4">สร้างโดย</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, i) => (
              <tr key={t.id} className="table-row">
                <td className="py-3 px-4 text-gray-500">{i + 1}</td>
                <td className="py-3 px-4 font-medium text-gray-800">{t.name}</td>
                <td className="py-3 px-4 text-gray-600">{t.assignee}</td>
                <td className="py-3 px-4"><span className={PRIORITY_STYLE[t.priority] ?? 'badge-gray'}>{t.priority}</span></td>
                <td className="py-3 px-4"><span className={STATUS_STYLE[t.status] ?? 'badge-gray'}>{t.status}</span></td>
                <td className="py-3 px-4 text-gray-600">{t.dueDate}</td>
                <td className="py-3 px-4 text-gray-500 text-xs">{t.createdBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="py-12 text-center text-gray-400 text-sm">ไม่พบข้อมูล</div>}
      </div>
    </div>
  )
}

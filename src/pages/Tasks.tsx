import { useState } from 'react'
import { Plus, Search, Upload } from 'lucide-react'
import { mockTasks } from '../data/mockData'

const PRIORITY_CLASS: Record<string, string> = {
  'สูง':  'badge-cancelled',
  'กลาง': 'badge-pending',
  'ต่ำ':  'badge-info',
}
const STATUS_CLASS: Record<string, string> = {
  'ใหม่':            'badge-info',
  'กำลังดำเนินการ': 'badge-pending',
  'เสร็จแล้ว':      'badge-approved',
  'ค้างอยู่':       'badge-cancelled',
}

export default function Tasks() {
  const [tab, setTab]                   = useState<'mine' | 'created'>('mine')
  const [search, setSearch]             = useState('')
  const [filterStatus, setFilterStatus] = useState('ทั้งหมด')
  const [filterPriority, setFilterPriority] = useState('ทั้งหมด')

  const filtered = mockTasks.filter(t =>
    (filterStatus   === 'ทั้งหมด' || t.status   === filterStatus) &&
    (filterPriority === 'ทั้งหมด' || t.priority === filterPriority) &&
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-1 bg-[#F1F5F9] p-1 rounded w-fit">
        {(['mine', 'created'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-1.5 text-sm rounded font-medium transition-colors"
            style={{
              backgroundColor: tab === t ? 'white' : 'transparent',
              color: tab === t ? '#020817' : '#64748B',
              boxShadow: tab === t ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
              border: 'none', cursor: 'pointer',
            }}
          >
            {t === 'mine' ? 'งานของฉัน' : 'สร้างโดยฉัน'}
          </button>
        ))}
      </div>

      <div className="filter-bar">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            className="input"
            style={{ paddingLeft: 36, width: 260 }}
            placeholder="ค้นหาชื่องาน..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="input" style={{ width: 'auto' }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="ทั้งหมด">ทุกสถานะ</option>
          <option>ใหม่</option>
          <option>กำลังดำเนินการ</option>
          <option>เสร็จแล้ว</option>
          <option>ค้างอยู่</option>
        </select>
        <select className="input" style={{ width: 'auto' }} value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
          <option value="ทั้งหมด">ทุกระดับ</option>
          <option>สูง</option>
          <option>กลาง</option>
          <option>ต่ำ</option>
        </select>
        <button className="btn-secondary ml-auto"><Upload size={14} /> Import</button>
        <button className="btn-primary"><Plus size={15} /> สร้างงาน</button>
      </div>

      <div className="tbl-container">
        <table className="w-full">
          <thead>
            <tr className="tbl-header">
              <th style={{ width: 48 }}>ลำดับ</th>
              <th>ชื่องาน</th>
              <th>ผู้รับผิดชอบ</th>
              <th>ความสำคัญ</th>
              <th>สถานะ</th>
              <th>กำหนดส่ง</th>
              <th>สร้างโดย</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, i) => (
              <tr key={t.id} className="tbl-row">
                <td className="text-[#64748B]">{i + 1}</td>
                <td className="font-medium">{t.name}</td>
                <td className="text-[#64748B] text-xs">{t.assignee}</td>
                <td><span className={`badge ${PRIORITY_CLASS[t.priority] ?? 'badge-draft'}`}>{t.priority}</span></td>
                <td><span className={`badge ${STATUS_CLASS[t.status]   ?? 'badge-draft'}`}>{t.status}</span></td>
                <td className="text-[#64748B]">{t.dueDate}</td>
                <td className="text-[#64748B] text-xs font-mono">{t.createdBy}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="text-center py-12 text-[#64748B]">ไม่พบข้อมูล</td></tr>
            )}
          </tbody>
        </table>
        <div className="px-3 py-2.5 border-t border-[#E2E8F0] text-xs text-[#64748B]">
          แสดง {filtered.length} รายการ
        </div>
      </div>
    </div>
  )
}

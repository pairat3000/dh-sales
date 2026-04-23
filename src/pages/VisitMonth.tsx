import { useState } from 'react'
import { Plus, Eye, Search } from 'lucide-react'
import { mockVisitGroups } from '../data/mockData'

const STATUS_STYLE: Record<string, string> = {
  'อนุมัติแผน': 'badge-green',
  'แบบร่าง':    'badge-gray',
}

export default function VisitMonth() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('ทั้งหมด')

  const filtered = mockVisitGroups.filter(g =>
    (filterStatus === 'ทั้งหมด' || g.status === filterStatus) &&
    g.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="input pl-8" placeholder="ค้นหาชื่อแผน..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input w-auto" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option>ทั้งหมด</option>
          <option>อนุมัติแผน</option>
          <option>แบบร่าง</option>
        </select>
        <button className="btn-primary ml-auto"><Plus size={15} /> สร้างแผนตารางนัดหมาย</button>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="table-header">
              <th className="text-left py-3 px-4">ลำดับ</th>
              <th className="text-left py-3 px-4">ชื่อแผน</th>
              <th className="text-left py-3 px-4">เดือน/ปี</th>
              <th className="text-left py-3 px-4">วันที่เริ่ม</th>
              <th className="text-left py-3 px-4">วันที่สิ้นสุด</th>
              <th className="text-right py-3 px-4">ยอดเบิก (บาท)</th>
              <th className="text-left py-3 px-4">สร้างโดย</th>
              <th className="text-left py-3 px-4">สถานะ</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((g, i) => (
              <tr key={g.id} className="table-row">
                <td className="py-3 px-4 text-gray-500">{i + 1}</td>
                <td className="py-3 px-4 font-medium text-gray-800">{g.name}</td>
                <td className="py-3 px-4 text-gray-600">{g.month}/{g.year}</td>
                <td className="py-3 px-4 text-gray-600">{g.startDate}</td>
                <td className="py-3 px-4 text-gray-600">{g.endDate}</td>
                <td className="py-3 px-4 text-right text-gray-700">{g.totalExpense.toLocaleString()}</td>
                <td className="py-3 px-4 text-gray-600">{g.createdBy}</td>
                <td className="py-3 px-4">
                  <span className={STATUS_STYLE[g.status] ?? 'badge-gray'}>{g.status}</span>
                </td>
                <td className="py-3 px-4">
                  <button className="btn-ghost p-1.5 text-gray-400 hover:text-primary-500"><Eye size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-400 text-sm">ไม่พบข้อมูล</div>
        )}
        <div className="px-4 py-3 border-t border-gray-50 text-xs text-gray-400">
          แสดง {filtered.length} รายการ
        </div>
      </div>
    </div>
  )
}

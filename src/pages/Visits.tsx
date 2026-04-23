import { useState } from 'react'
import { Plus, Eye, Search, CheckCircle } from 'lucide-react'
import { mockVisits } from '../data/mockData'

const STATUS_STYLE: Record<string, string> = {
  'อนุมัติ':    'badge-green',
  'รออนุมัติ':  'badge-yellow',
}

export default function Visits() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('ทั้งหมด')
  const [filterType, setFilterType] = useState('ทั้งหมด')

  const filtered = mockVisits.filter(v =>
    (filterStatus === 'ทั้งหมด' || v.status === filterStatus) &&
    (filterType === 'ทั้งหมด' || (filterType === 'Adhoc' ? v.adhoc : !v.adhoc)) &&
    (v.customerName.includes(search) || v.customerId.includes(search))
  )

  const maskName = (name: string) => {
    const parts = name.split(' ')
    return parts.map(p => p.charAt(0) + '*'.repeat(Math.max(p.length - 1, 2))).join(' ')
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="input pl-8" placeholder="ค้นหา Customer ID, ชื่อ..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input w-auto" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option>ทั้งหมด</option>
          <option>อนุมัติ</option>
          <option>รออนุมัติ</option>
        </select>
        <select className="input w-auto" value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option>ทั้งหมด</option>
          <option>แผน</option>
          <option>Adhoc</option>
        </select>
        <button className="btn-primary ml-auto"><Plus size={15} /> สร้างนัดหมายนอกแผน</button>
      </div>

      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="table-header">
              <th className="text-left py-3 px-4">ลำดับ</th>
              <th className="text-left py-3 px-4">Visit Group</th>
              <th className="text-left py-3 px-4">ลูกค้า</th>
              <th className="text-left py-3 px-4">วันที่</th>
              <th className="text-left py-3 px-4">เวลา</th>
              <th className="text-center py-3 px-4">Adhoc</th>
              <th className="text-left py-3 px-4">สาขา</th>
              <th className="text-left py-3 px-4">สร้างโดย</th>
              <th className="text-left py-3 px-4">สถานะ</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v, i) => (
              <tr key={v.id} className="table-row">
                <td className="py-3 px-4 text-gray-500">{i + 1}</td>
                <td className="py-3 px-4 text-gray-600 text-xs">{v.groupName}</td>
                <td className="py-3 px-4 font-medium text-gray-800">{maskName(v.customerName)}</td>
                <td className="py-3 px-4 text-gray-600">{v.date}</td>
                <td className="py-3 px-4 text-gray-600">{v.time}</td>
                <td className="py-3 px-4 text-center">
                  {v.adhoc && <CheckCircle size={15} className="text-emerald-500 mx-auto" />}
                </td>
                <td className="py-3 px-4 text-gray-600">{v.branch}</td>
                <td className="py-3 px-4 text-gray-600 text-xs">{v.createdBy}</td>
                <td className="py-3 px-4">
                  <span className={STATUS_STYLE[v.status] ?? 'badge-gray'}>{v.status}</span>
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

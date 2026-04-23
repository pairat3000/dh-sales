import { useState } from 'react'
import { Plus, Eye, Search, CheckCircle } from 'lucide-react'
import { mockVisits } from '../data/mockData'

const STATUS_CLASS: Record<string, string> = {
  'อนุมัติ':         'badge-approved',
  'รออนุมัติ':       'badge-pending',
  'เช็คเอาท์แล้ว':  'badge-plan',
  'ยกเลิก':         'badge-cancelled',
}

export default function Visits() {
  const [search, setSearch]             = useState('')
  const [filterStatus, setFilterStatus] = useState('ทั้งหมด')
  const [filterType, setFilterType]     = useState('ทั้งหมด')

  const filtered = mockVisits.filter(v =>
    (filterStatus === 'ทั้งหมด' || v.status === filterStatus) &&
    (filterType   === 'ทั้งหมด' || (filterType === 'Adhoc' ? v.adhoc : !v.adhoc)) &&
    (v.customerName.includes(search) || v.customerId.includes(search))
  )

  return (
    <div className="space-y-4">
      <div className="filter-bar">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            className="input"
            style={{ paddingLeft: 36, width: 260 }}
            placeholder="ค้นหา Customer ID, ชื่อ..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="input" style={{ width: 'auto' }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="ทั้งหมด">ทุกสถานะ</option>
          <option>อนุมัติ</option>
          <option>รออนุมัติ</option>
          <option>เช็คเอาท์แล้ว</option>
          <option>ยกเลิก</option>
        </select>
        <select className="input" style={{ width: 'auto' }} value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="ทั้งหมด">ทุกประเภท</option>
          <option value="แผน">Visit ในแผน</option>
          <option value="Adhoc">Adhoc</option>
        </select>
        <button className="btn-primary ml-auto"><Plus size={15} /> สร้างนัดหมายนอกแผน</button>
      </div>

      <div className="tbl-container">
        <table className="w-full">
          <thead>
            <tr className="tbl-header">
              <th style={{ width: 48 }}>ลำดับ</th>
              <th>Visit Group</th>
              <th>ลูกค้า</th>
              <th>วันที่</th>
              <th>เวลา</th>
              <th style={{ textAlign: 'center', width: 70 }}>Adhoc</th>
              <th>สาขา</th>
              <th>สร้างโดย</th>
              <th>สถานะ</th>
              <th style={{ width: 48 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v, i) => (
              <tr key={v.id} className="tbl-row">
                <td className="text-[#64748B]">{i + 1}</td>
                <td className="text-[#64748B] text-xs" style={{ maxWidth: 200 }}>
                  <span className="block truncate" title={v.groupName}>{v.groupName}</span>
                </td>
                <td className="font-medium">{v.customerName}</td>
                <td className="text-[#64748B]">{v.date}</td>
                <td className="text-[#64748B]">{v.time}</td>
                <td style={{ textAlign: 'center' }}>
                  {v.adhoc && <CheckCircle size={15} style={{ color: '#16A34A', margin: '0 auto' }} />}
                </td>
                <td className="text-[#64748B] text-xs">{v.branch}</td>
                <td className="text-[#64748B] text-xs font-mono">{v.createdBy}</td>
                <td><span className={`badge ${STATUS_CLASS[v.status] ?? 'badge-draft'}`}>{v.status}</span></td>
                <td>
                  <button className="btn-icon" style={{ width: 32, height: 32 }}>
                    <Eye size={14} className="text-[#64748B]" />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={10} className="text-center py-12 text-[#64748B]">ไม่พบข้อมูล</td></tr>
            )}
          </tbody>
        </table>
        <div className="px-3 py-2.5 border-t border-[#E2E8F0] text-xs text-[#64748B]">
          แสดง {filtered.length} จาก {mockVisits.length} รายการ
        </div>
      </div>
    </div>
  )
}

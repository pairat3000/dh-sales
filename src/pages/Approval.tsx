import { useState } from 'react'
import { Eye, CheckCircle, XCircle } from 'lucide-react'
import { mockApprovals } from '../data/mockData'

const STATUS_CLASS: Record<string, string> = {
  'รออนุมัติ': 'badge-pending',
  'อนุมัติ':   'badge-approved',
  'ปฏิเสธ':    'badge-cancelled',
}
const TYPE_CLASS: Record<string, string> = {
  'Visit (Adhoc)':      'badge-info',
  'Visit Group':        'badge-draft',
  'Expense Group':      'badge-draft',
  'Check-in/Check-out': 'badge-info',
  'Request Up-tier':    'badge-pending',
}

export default function Approval() {
  const [filterType,   setFilterType]   = useState('ทั้งหมด')
  const [filterStatus, setFilterStatus] = useState('รออนุมัติ')
  const [list, setList]                 = useState(mockApprovals)

  const approve = (id: string) => setList(prev => prev.map(a => a.id === id ? { ...a, status: 'อนุมัติ' } : a))
  const reject  = (id: string) => setList(prev => prev.map(a => a.id === id ? { ...a, status: 'ปฏิเสธ' } : a))

  const filtered = list.filter(a =>
    (filterType   === 'ทั้งหมด' || a.type   === filterType) &&
    (filterStatus === 'ทั้งหมด' || a.status === filterStatus)
  )

  const counts = {
    pending:  list.filter(a => a.status === 'รออนุมัติ').length,
    approved: list.filter(a => a.status === 'อนุมัติ').length,
    rejected: list.filter(a => a.status === 'ปฏิเสธ').length,
  }

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="flex gap-3">
        {[
          { label: 'รออนุมัติ',  count: counts.pending,  bg: '#FEF9C3', text: '#020817', border: '#FDE047' },
          { label: 'อนุมัติแล้ว', count: counts.approved, bg: '#DCFCE7', text: '#16A34A', border: '#86EFAC' },
          { label: 'ปฏิเสธ',     count: counts.rejected,  bg: '#FEE2E2', text: '#EF4444', border: '#FCA5A5' },
        ].map(({ label, count, bg, text, border }) => (
          <div
            key={label}
            className="px-4 py-2 rounded text-sm font-medium"
            style={{ backgroundColor: bg, color: text, border: `1px solid ${border}` }}
          >
            {label}: <span className="font-bold">{count}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <select className="input" style={{ width: 'auto' }} value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="ทั้งหมด">ทุกประเภท</option>
          <option>Visit (Adhoc)</option>
          <option>Visit Group</option>
          <option>Expense Group</option>
          <option>Check-in/Check-out</option>
        </select>
        <select className="input" style={{ width: 'auto' }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="ทั้งหมด">ทุกสถานะ</option>
          <option>รออนุมัติ</option>
          <option>อนุมัติ</option>
          <option>ปฏิเสธ</option>
        </select>
      </div>

      <div className="tbl-container">
        <table className="w-full">
          <thead>
            <tr className="tbl-header">
              <th style={{ width: 48 }}>No</th>
              <th>ชื่อรายการ</th>
              <th>Owner (ID)</th>
              <th>ชื่อผู้ทำรายการ</th>
              <th>ประเภท</th>
              <th>วันที่ส่ง</th>
              <th>สถานะ</th>
              <th style={{ width: 100 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <tr key={a.id} className="tbl-row">
                <td className="text-[#64748B]">{i + 1}</td>
                <td className="font-medium" style={{ maxWidth: 280 }}>
                  <span className="block truncate" title={a.name}>{a.name}</span>
                </td>
                <td className="text-[#64748B] text-xs font-mono">{a.owner}</td>
                <td className="text-[#64748B] text-xs">{a.ownerName}</td>
                <td><span className={`badge ${TYPE_CLASS[a.type] ?? 'badge-draft'}`}>{a.type}</span></td>
                <td className="text-[#64748B] text-xs">{a.dateSubmitted}</td>
                <td><span className={`badge ${STATUS_CLASS[a.status] ?? 'badge-draft'}`}>{a.status}</span></td>
                <td>
                  <div className="flex items-center gap-1">
                    <button className="btn-icon" style={{ width: 32, height: 32 }}>
                      <Eye size={14} className="text-[#64748B]" />
                    </button>
                    {a.status === 'รออนุมัติ' && (
                      <>
                        <button
                          onClick={() => approve(a.id)}
                          className="btn-icon" style={{ width: 32, height: 32 }}
                          title="อนุมัติ"
                        >
                          <CheckCircle size={14} style={{ color: '#16A34A' }} />
                        </button>
                        <button
                          onClick={() => reject(a.id)}
                          className="btn-icon" style={{ width: 32, height: 32 }}
                          title="ปฏิเสธ"
                        >
                          <XCircle size={14} style={{ color: '#EF4444' }} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="text-center py-12 text-[#64748B]">ไม่มีรายการ</td></tr>
            )}
          </tbody>
        </table>
        <div className="px-3 py-2.5 border-t border-[#E2E8F0] text-xs text-[#64748B]">
          แสดง {filtered.length} จาก {list.length} รายการ
        </div>
      </div>
    </div>
  )
}

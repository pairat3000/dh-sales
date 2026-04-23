import { useState } from 'react'
import { Plus, Eye, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { mockVisitGroups } from '../data/mockData'

const STATUS_CLASS: Record<string, string> = {
  'อนุมัติแผน':           'badge-plan',
  'แบบร่าง':              'badge-draft',
  'รออนุมัติค่าใช้จ่าย': 'badge-pending',
}

export default function VisitMonth() {
  const [search, setSearch]           = useState('')
  const [filterStatus, setFilterStatus] = useState('ทั้งหมด')
  const [filterMonth, setFilterMonth]   = useState('ทั้งหมด')
  const [page, setPage]               = useState(1)
  const PAGE_SIZE = 10

  const filtered = mockVisitGroups.filter(g =>
    (filterStatus === 'ทั้งหมด' || g.status === filterStatus) &&
    (filterMonth === 'ทั้งหมด' || String(g.month) === filterMonth) &&
    g.name.toLowerCase().includes(search.toLowerCase())
  )
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="filter-bar">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            className="input"
            style={{ paddingLeft: 36, width: 260 }}
            placeholder="ค้นหาชื่อแผน..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
          />
        </div>
        <select className="input" style={{ width: 'auto' }} value={filterMonth} onChange={e => { setFilterMonth(e.target.value); setPage(1) }}>
          <option value="ทั้งหมด">ทุกเดือน</option>
          {[4,5,6,7,8,9,10].map(m => <option key={m} value={String(m)}>{m}/2026</option>)}
        </select>
        <select className="input" style={{ width: 'auto' }} value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1) }}>
          <option value="ทั้งหมด">ทุกสถานะ</option>
          <option>อนุมัติแผน</option>
          <option>แบบร่าง</option>
          <option>รออนุมัติค่าใช้จ่าย</option>
        </select>
        <button className="btn-primary ml-auto"><Plus size={15} /> สร้างแผนตารางนัดหมาย</button>
      </div>

      {/* Table */}
      <div className="tbl-container">
        <table className="w-full">
          <thead>
            <tr className="tbl-header">
              <th style={{ width: 48 }}>ลำดับ</th>
              <th>ชื่อแผน</th>
              <th>เดือน/ปี</th>
              <th>วันที่เริ่ม</th>
              <th>วันที่สิ้นสุด</th>
              <th style={{ textAlign: 'right' }}>ยอดเบิก (฿)</th>
              <th>สร้างโดย</th>
              <th>สถานะ</th>
              <th style={{ width: 48 }}></th>
            </tr>
          </thead>
          <tbody>
            {paged.map((g, i) => (
              <tr key={g.id} className="tbl-row">
                <td className="text-[#64748B]">{(page - 1) * PAGE_SIZE + i + 1}</td>
                <td className="font-medium" style={{ maxWidth: 320 }}>
                  <span className="block truncate" title={g.name}>{g.name}</span>
                </td>
                <td className="text-[#64748B]">{g.month}/{g.year}</td>
                <td className="text-[#64748B]">{g.startDate}</td>
                <td className="text-[#64748B]">{g.endDate}</td>
                <td style={{ textAlign: 'right' }}>{g.totalExpense.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</td>
                <td className="text-[#64748B] text-xs">{g.createdBy}</td>
                <td><span className={`badge ${STATUS_CLASS[g.status] ?? 'badge-draft'}`}>{g.status}</span></td>
                <td>
                  <button className="btn-icon" style={{ width: 32, height: 32 }}>
                    <Eye size={14} className="text-[#64748B]" />
                  </button>
                </td>
              </tr>
            ))}
            {paged.length === 0 && (
              <tr><td colSpan={9} className="text-center py-12 text-[#64748B]">ไม่พบข้อมูล</td></tr>
            )}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex items-center justify-between px-3 py-2.5 border-t border-[#E2E8F0]">
          <span className="text-xs text-[#64748B]">ทั้งหมด {filtered.length} รายการ</span>
          <div className="flex items-center gap-1">
            <button className="btn-icon" style={{ width: 32, height: 32 }} onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className="text-xs rounded font-medium"
                style={{
                  width: 32, height: 32, border: p === page ? 'none' : '1px solid #E2E8F0',
                  backgroundColor: p === page ? '#F16027' : 'white',
                  color: p === page ? 'white' : '#020817',
                  cursor: 'pointer',
                }}
              >{p}</button>
            ))}
            <button className="btn-icon" style={{ width: 32, height: 32 }} onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

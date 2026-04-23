import { useState } from 'react'
import { Eye, CheckCircle, XCircle } from 'lucide-react'
import { mockApprovals } from '../data/mockData'

const STATUS_STYLE: Record<string, string> = {
  'รออนุมัติ': 'badge-yellow',
  'อนุมัติ':   'badge-green',
  'ปฏิเสธ':    'badge-red',
}
const TYPE_STYLE: Record<string, string> = {
  'Visit (Adhoc)':      'badge-blue',
  'Visit Group':        'badge-gray',
  'Check-in/Check-out': 'badge-blue',
  'Request Up-tier':    'badge-yellow',
}

export default function Approval() {
  const [filterType,   setFilterType]   = useState('ทั้งหมด')
  const [filterStatus, setFilterStatus] = useState('รออนุมัติ')
  const [list, setList] = useState(mockApprovals)

  const filtered = list.filter(a =>
    (filterType   === 'ทั้งหมด' || a.type   === filterType) &&
    (filterStatus === 'ทั้งหมด' || a.status === filterStatus)
  )

  const approve = (id: string) => setList(prev => prev.map(a => a.id === id ? { ...a, status: 'อนุมัติ' } : a))
  const reject  = (id: string) => setList(prev => prev.map(a => a.id === id ? { ...a, status: 'ปฏิเสธ' } : a))

  return (
    <div className="space-y-4">
      {/* Summary badges */}
      <div className="flex gap-3">
        {[
          { label: 'รออนุมัติ', count: list.filter(a => a.status === 'รออนุมัติ').length, style: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
          { label: 'อนุมัติแล้ว', count: list.filter(a => a.status === 'อนุมัติ').length,  style: 'bg-green-50 text-green-700 border-green-200'  },
          { label: 'ปฏิเสธ', count: list.filter(a => a.status === 'ปฏิเสธ').length,         style: 'bg-red-50 text-red-700 border-red-200'        },
        ].map(({ label, count, style }) => (
          <div key={label} className={`px-4 py-2 rounded-lg border text-sm font-medium ${style}`}>
            {label}: <span className="font-bold">{count}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select className="input w-auto" value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option>ทั้งหมด</option>
          <option>Visit (Adhoc)</option>
          <option>Visit Group</option>
          <option>Check-in/Check-out</option>
          <option>Request Up-tier</option>
        </select>
        <select className="input w-auto" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option>ทั้งหมด</option>
          <option>รออนุมัติ</option>
          <option>อนุมัติ</option>
          <option>ปฏิเสธ</option>
        </select>
      </div>

      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="table-header">
              <th className="text-left py-3 px-4">No</th>
              <th className="text-left py-3 px-4">ชื่อรายการ</th>
              <th className="text-left py-3 px-4">Owner</th>
              <th className="text-left py-3 px-4">ประเภท</th>
              <th className="text-left py-3 px-4">Action ล่าสุด</th>
              <th className="text-left py-3 px-4">วันที่ส่ง</th>
              <th className="text-left py-3 px-4">สถานะ</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <tr key={a.id} className="table-row">
                <td className="py-3 px-4 text-gray-500">{i + 1}</td>
                <td className="py-3 px-4 font-medium text-gray-800">{a.name}</td>
                <td className="py-3 px-4 text-gray-600 text-xs">{a.owner}</td>
                <td className="py-3 px-4"><span className={TYPE_STYLE[a.type] ?? 'badge-gray'}>{a.type}</span></td>
                <td className="py-3 px-4 text-gray-500 text-xs">{a.lastAction}</td>
                <td className="py-3 px-4 text-gray-600 text-xs">{a.dateSubmitted}</td>
                <td className="py-3 px-4"><span className={STATUS_STYLE[a.status] ?? 'badge-gray'}>{a.status}</span></td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <button className="btn-ghost p-1.5 text-gray-400 hover:text-primary-500"><Eye size={14} /></button>
                    {a.status === 'รออนุมัติ' && (
                      <>
                        <button onClick={() => approve(a.id)} className="btn-ghost p-1.5 text-gray-400 hover:text-emerald-600" title="อนุมัติ">
                          <CheckCircle size={14} />
                        </button>
                        <button onClick={() => reject(a.id)} className="btn-ghost p-1.5 text-gray-400 hover:text-red-500" title="ปฏิเสธ">
                          <XCircle size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="py-12 text-center text-gray-400 text-sm">ไม่มีรายการ</div>}
      </div>
    </div>
  )
}

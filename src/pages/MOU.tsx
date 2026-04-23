import { useState } from 'react'
import { Search, Plus, Eye } from 'lucide-react'
import { mockMOUs } from '../data/mockData'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const STATUS_STYLE: Record<string, string> = {
  Active:  'badge-green',
  Expired: 'badge-gray',
}

export default function MOU() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<typeof mockMOUs[0] | null>(null)

  const filtered = mockMOUs.filter(m =>
    m.customerName.includes(search) || m.customerId.includes(search) || m.mouId.includes(search)
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="input pl-8" placeholder="ค้นหา Customer ID, ชื่อ, MOU ID..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className="btn-primary ml-auto"><Plus size={15} /> เพิ่ม MOU ใหม่</button>
      </div>

      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="table-header">
              <th className="text-left py-3 px-4">ลำดับ</th>
              <th className="text-left py-3 px-4">Customer ID</th>
              <th className="text-left py-3 px-4">ชื่อลูกค้า</th>
              <th className="text-left py-3 px-4">MOU ID</th>
              <th className="text-left py-3 px-4">ประเภท</th>
              <th className="text-right py-3 px-4">เป้าหมาย</th>
              <th className="text-right py-3 px-4">ยอดจริง</th>
              <th className="text-left py-3 px-4">วันหมดอายุ</th>
              <th className="text-left py-3 px-4">สถานะ</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => {
              const pct = Math.round((m.actual / m.target) * 100)
              return (
                <tr key={m.id} className="table-row">
                  <td className="py-3 px-4 text-gray-500">{i + 1}</td>
                  <td className="py-3 px-4 text-gray-600 font-mono text-xs">{m.customerId}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">{m.customerName}</td>
                  <td className="py-3 px-4 text-gray-600 text-xs font-mono">{m.mouId}</td>
                  <td className="py-3 px-4 text-gray-600 text-xs">{m.category}</td>
                  <td className="py-3 px-4 text-right text-gray-600">฿{m.target.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={pct >= 80 ? 'text-emerald-600 font-medium' : pct >= 50 ? 'text-yellow-600' : 'text-red-500'}>
                      ฿{m.actual.toLocaleString()}
                    </span>
                    <div className="mt-1 h-1 bg-gray-100 rounded-full w-20 ml-auto">
                      <div className={`h-1 rounded-full ${pct >= 80 ? 'bg-emerald-400' : pct >= 50 ? 'bg-yellow-400' : 'bg-red-400'}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600 text-xs">{m.expireDate}</td>
                  <td className="py-3 px-4"><span className={STATUS_STYLE[m.status] ?? 'badge-gray'}>{m.status}</span></td>
                  <td className="py-3 px-4">
                    <button onClick={() => setSelected(m)} className="btn-ghost p-1.5 text-gray-400 hover:text-primary-500"><Eye size={15} /></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="p-5 border-b border-gray-100 flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold text-gray-800">{selected.customerName}</h2>
                <p className="text-sm text-gray-500">{selected.mouId} · {selected.category}</p>
              </div>
              <button onClick={() => setSelected(null)} className="btn-ghost p-1.5 text-gray-400">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'เป้าหมาย', value: `฿${selected.target.toLocaleString()}` },
                  { label: 'ยอดจริง', value: `฿${selected.actual.toLocaleString()}` },
                  { label: 'Achievement', value: `${Math.round((selected.actual / selected.target) * 100)}%` },
                ].map(({ label, value }) => (
                  <div key={label} className="card text-center">
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="text-lg font-bold text-gray-800">{value}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Sales Performance</p>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={[
                    { name: 'เป้าหมาย', value: selected.target },
                    { name: 'ยอดจริง',   value: selected.actual },
                  ]}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={v => `${(v/1000000).toFixed(1)}M`} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(v: unknown) => `฿${Number(v).toLocaleString()}`} />
                    <Bar dataKey="value" fill="#f97316" radius={[3,3,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">รายการ MOU</p>
                <table className="w-full text-xs">
                  <thead><tr className="table-header"><th className="text-left py-2 px-3">MC</th><th className="text-left py-2 px-3">Condition</th><th className="text-right py-2 px-3">Target</th><th className="text-right py-2 px-3">Value</th></tr></thead>
                  <tbody>
                    {[
                      { mc: 'วัสดุก่อสร้าง', cond: 'Volume Rebate', target: '2%', value: '฿100,000' },
                      { mc: 'สุขภัณฑ์', cond: 'Special Discount', target: '5%', value: '฿50,000' },
                    ].map(r => (
                      <tr key={r.mc} className="table-row">
                        <td className="py-2 px-3">{r.mc}</td>
                        <td className="py-2 px-3">{r.cond}</td>
                        <td className="py-2 px-3 text-right">{r.target}</td>
                        <td className="py-2 px-3 text-right">{r.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button className="btn-secondary text-xs text-red-500 border-red-200 hover:bg-red-50">ยกเลิก MOU</button>
                <button className="btn-primary text-xs">ปรับปรุง MOU</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

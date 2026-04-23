import { useState } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, FunnelChart, Funnel, LabelList } from 'recharts'
import { mockForecast } from '../data/mockData'

const funnelData = [
  { name: 'Prospect',    value: 42, fill: '#fed7aa' },
  { name: 'Qualified',   value: 30, fill: '#fdba74' },
  { name: 'Proposal',    value: 18, fill: '#fb923c' },
  { name: 'Negotiation', value: 10, fill: '#f97316' },
  { name: 'Closed',      value: 6,  fill: '#ea6c0a' },
]

const byRep = [
  { name: 'สมชาย',  commit: 2800000, bestCase: 3500000 },
  { name: 'สุนีย์', commit: 1600000, bestCase: 2100000 },
  { name: 'ประยุทธ์', commit: 1200000, bestCase: 1800000 },
  { name: 'อรุณี',  commit: 2200000, bestCase: 2800000 },
]

export default function Forecast() {
  const [scenario, setScenario] = useState(0)

  const totalCommit   = mockForecast.reduce((s, m) => s + m.commit, 0)
  const totalTarget   = mockForecast.reduce((s, m) => s + m.target, 0)
  const totalBestCase = mockForecast.reduce((s, m) => s + m.bestCase, 0)
  const adjustedCommit = Math.round(totalCommit * (1 + scenario / 100))

  return (
    <div className="space-y-5">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Target',   value: `฿${(totalTarget/1000000).toFixed(1)}M`,   sub: 'เป้าหมายรวม',  color: 'bg-gray-100 text-gray-600' },
          { label: 'Commit',         value: `฿${(totalCommit/1000000).toFixed(1)}M`,   sub: `${Math.round((totalCommit/totalTarget)*100)}% of target`, color: 'bg-primary-50 text-primary-700' },
          { label: 'Best Case',      value: `฿${(totalBestCase/1000000).toFixed(1)}M`, sub: 'กรณีที่ดีที่สุด', color: 'bg-emerald-50 text-emerald-700' },
          { label: 'Pipeline',       value: `฿${(mockForecast.reduce((s,m)=>s+m.pipeline,0)/1000000).toFixed(1)}M`, sub: 'Pipeline ทั้งหมด', color: 'bg-blue-50 text-blue-700' },
        ].map(({ label, value, sub, color }) => (
          <div key={label} className={`card ${color}`}>
            <p className="text-xs font-medium opacity-70">{label}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <p className="text-xs opacity-60 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Monthly Bar */}
        <div className="card col-span-2">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Forecast vs Target รายเดือน</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockForecast} barGap={2}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={v => `${(v/1000000).toFixed(0)}M`} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v: unknown) => `฿${Number(v).toLocaleString()}`} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="target"   name="เป้า"      fill="#e5e7eb" radius={[3,3,0,0]} />
              <Bar dataKey="commit"   name="Commit"    fill="#f97316" radius={[3,3,0,0]} />
              <Bar dataKey="bestCase" name="Best Case" fill="#fb923c" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Scenario Planning */}
        <div className="card">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Scenario Planning</h3>
          <p className="text-xs text-gray-400 mb-3">ถ้า Close Rate เปลี่ยน {scenario > 0 ? '+' : ''}{scenario}%</p>
          <input
            type="range" min="-20" max="30" value={scenario}
            onChange={e => setScenario(Number(e.target.value))}
            className="w-full accent-primary-500"
          />
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs"><span className="text-gray-500">Commit ปัจจุบัน</span><span className="font-medium">฿{totalCommit.toLocaleString()}</span></div>
            <div className="flex justify-between text-xs"><span className="text-primary-600 font-medium">Adjusted Commit</span><span className={`font-bold text-base ${adjustedCommit >= totalTarget ? 'text-emerald-600' : 'text-primary-600'}`}>฿{adjustedCommit.toLocaleString()}</span></div>
            <div className="flex justify-between text-xs"><span className="text-gray-500">vs เป้า</span><span className={adjustedCommit >= totalTarget ? 'text-emerald-600 font-medium' : 'text-red-500 font-medium'}>{Math.round((adjustedCommit/totalTarget)*100)}%</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Pipeline Funnel */}
        <div className="card">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Pipeline Funnel</h3>
          <ResponsiveContainer width="100%" height={220}>
            <FunnelChart>
              <Tooltip formatter={(v: unknown) => `${Number(v)} deals`} />
              <Funnel dataKey="value" data={funnelData} isAnimationActive>
                <LabelList position="right" fill="#6b7280" stroke="none" dataKey="name" style={{ fontSize: 12 }} />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>

        {/* By Rep */}
        <div className="card">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Forecast by Sales Rep</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={byRep} layout="vertical" barGap={2}>
              <XAxis type="number" tickFormatter={v => `${(v/1000000).toFixed(1)}M`} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={55} />
              <Tooltip formatter={(v: unknown) => `฿${Number(v).toLocaleString()}`} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="commit"   name="Commit"    fill="#f97316" radius={[0,3,3,0]} />
              <Bar dataKey="bestCase" name="Best Case" fill="#fb923c" radius={[0,3,3,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trend Line */}
      <div className="card">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">แนวโน้มยอดขาย (Commit vs Target)</h3>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={mockForecast}>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={v => `${(v/1000000).toFixed(1)}M`} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v: unknown) => `฿${Number(v).toLocaleString()}`} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="target" name="เป้า"   stroke="#d1d5db" strokeWidth={2} strokeDasharray="5 5" />
            <Line type="monotone" dataKey="commit" name="Commit" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

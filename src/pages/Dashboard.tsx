import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Users, MapPin, TrendingUp, Wallet, CheckSquare, RefreshCw } from 'lucide-react'
import { mockLeaderboard, mockForecast, mockDashboardStats, mockVisits } from '../data/mockData'

const visitTrend = [
  { day: 'จ', visits: 5 }, { day: 'อ', visits: 8 }, { day: 'พ', visits: 4 },
  { day: 'พฤ', visits: 9 }, { day: 'ศ', visits: 7 }, { day: 'ส', visits: 2 }, { day: 'อา', visits: 1 },
]

function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: any; label: string; value: string | number; sub?: string; color: string
}) {
  return (
    <div className="card flex items-start gap-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {sub && <p className="text-xs text-gray-400">{sub}</p>}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { plan, actual, totalCustomers, totalExpense, pendingTasks } = mockDashboardStats
  const coverage = Math.round((actual / totalCustomers) * 100)
  const achievement = Math.round((actual / plan) * 100)

  return (
    <div className="space-y-5">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={MapPin}     label="เยี่ยมจริง / แผน" value={`${actual} / ${plan}`}  sub={`${achievement}% ของแผน`}        color="bg-primary-500" />
        <StatCard icon={Users}      label="ลูกค้าทั้งหมด"    value={totalCustomers}           sub={`ครอบคลุม ${coverage}%`}          color="bg-blue-500"    />
        <StatCard icon={Wallet}     label="ค่าใช้จ่ายรวม"    value={`฿${totalExpense.toLocaleString()}`} sub="เดือนนี้"             color="bg-emerald-500" />
        <StatCard icon={CheckSquare} label="งานรออยู่"        value={pendingTasks}             sub="งาน"                              color="bg-violet-500"  />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Visit trend */}
        <div className="card col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700">การเยี่ยมลูกค้า 7 วันที่ผ่านมา</h3>
            <button className="btn-ghost p-1"><RefreshCw size={13} /></button>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={visitTrend}>
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="visits" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Goal */}
        <div className="card">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">เป้าหมายการเยี่ยม</h3>
          <div className="space-y-4">
            {[
              { label: 'แผน',            val: plan,           color: 'bg-gray-200' },
              { label: 'เยี่ยมจริง',     val: actual,         color: 'bg-primary-500' },
              { label: 'ลูกค้าทั้งหมด', val: totalCustomers, color: 'bg-blue-400' },
            ].map(({ label, val, color }) => (
              <div key={label}>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{label}</span><span className="font-medium text-gray-700">{val}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className={`h-2 rounded-full ${color}`} style={{ width: `${Math.min((val / totalCustomers) * 100, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Leaderboard */}
        <div className="card col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">ประสิทธิภาพ Sales (Leaderboard)</h3>
            <TrendingUp size={15} className="text-gray-400" />
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="table-header">
                <th className="text-left py-2 px-3">#</th>
                <th className="text-left py-2 px-3">ชื่อ</th>
                <th className="text-right py-2 px-3">เยี่ยม</th>
                <th className="text-right py-2 px-3">นาที/ครั้ง</th>
                <th className="text-right py-2 px-3">ครอบคลุม%</th>
              </tr>
            </thead>
            <tbody>
              {mockLeaderboard.map(r => (
                <tr key={r.rank} className="table-row">
                  <td className="py-2.5 px-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${r.rank === 1 ? 'bg-yellow-400 text-white' : r.rank === 2 ? 'bg-gray-300 text-gray-700' : r.rank === 3 ? 'bg-orange-300 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {r.rank}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-medium text-gray-700">{r.name}</td>
                  <td className="py-2.5 px-3 text-right text-gray-600">{r.visits}</td>
                  <td className="py-2.5 px-3 text-right text-gray-600">{r.minutesPerVisit}</td>
                  <td className="py-2.5 px-3 text-right">
                    <span className={`font-medium ${r.coverage >= 80 ? 'text-emerald-600' : r.coverage >= 60 ? 'text-yellow-600' : 'text-red-500'}`}>
                      {r.coverage}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent visits */}
        <div className="card">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">การเยี่ยมล่าสุด</h3>
          <div className="space-y-3">
            {mockVisits.slice(0, 4).map(v => (
              <div key={v.id} className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-400 mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-gray-700 leading-tight">{v.customerName}</p>
                  <p className="text-xs text-gray-400">{v.date} · {v.createdBy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Forecast chart */}
      <div className="card">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Sales Forecast ภาพรวม (ม.ค. – มิ.ย.)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={mockForecast} barGap={3}>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={v => `${(v / 1000000).toFixed(0)}M`} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v: unknown) => `฿${Number(v).toLocaleString()}`} />
            <Bar dataKey="target"   name="เป้า"     fill="#e5e7eb" radius={[3,3,0,0]} />
            <Bar dataKey="commit"   name="Commit"   fill="#f97316" radius={[3,3,0,0]} />
            <Bar dataKey="bestCase" name="Best Case" fill="#fb923c" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

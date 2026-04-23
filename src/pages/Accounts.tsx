import { useState } from 'react'
import { Search, Eye, X, TrendingUp, ShoppingBag, Star } from 'lucide-react'
import { mockAccounts } from '../data/mockData'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const TIER_STYLE: Record<string, string> = {
  Platinum: 'bg-violet-100 text-violet-700',
  Gold:     'bg-yellow-100 text-yellow-700',
  Silver:   'bg-gray-200 text-gray-600',
  Bronze:   'bg-orange-100 text-orange-600',
}

const salesHistory = [
  { month: 'ม.ค.', revenue: 450000 }, { month: 'ก.พ.', revenue: 380000 },
  { month: 'มี.ค.', revenue: 520000 }, { month: 'เม.ย.', revenue: 290000 },
]
const mcData = [
  { name: 'วัสดุก่อสร้าง', value: 45 },
  { name: 'สุขภัณฑ์', value: 28 },
  { name: 'ไฟฟ้า', value: 15 },
  { name: 'อื่นๆ', value: 12 },
]
const MC_COLORS = ['#f97316', '#fb923c', '#fdba74', '#d1d5db']

function Customer360({ account, onClose }: { account: typeof mockAccounts[0]; onClose: () => void }) {
  const [tab, setTab] = useState('profile')
  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'sales', label: 'Sales History' },
    { id: 'opportunity', label: 'Opportunity' },
    { id: 'payment', label: 'Payment/Credit' },
    { id: 'assortment', label: 'Assortment' },
  ]
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-800">{account.name}</h2>
              <span className={`badge ${TIER_STYLE[account.tier]}`}>{account.tier}</span>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">{account.id} · {account.type}</p>
          </div>
          <button onClick={onClose} className="btn-ghost p-1.5"><X size={18} /></button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-5 pt-3 border-b border-gray-100 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-3 py-2 text-sm font-medium rounded-t-lg whitespace-nowrap transition-colors ${tab === t.id ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-500 hover:text-gray-700'}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {tab === 'profile' && (
            <div className="grid grid-cols-2 gap-4">
              {[
                ['Customer ID', account.id], ['ชื่อ', account.name],
                ['Tax ID', account.taxId], ['ประเภท', account.type],
                ['มือถือ', account.mobile], ['Owner', account.owner],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-xs text-gray-400">{k}</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">{v}</p>
                </div>
              ))}
              <div className="col-span-2">
                <p className="text-xs text-gray-400 mb-1">Loyalty Tier Progress</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-3 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full" style={{ width: '68%' }} />
                  </div>
                  <span className="text-sm font-semibold text-primary-600">68%</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">ต้องการยอดซื้ออีก ฿320,000 เพื่อเลื่อนระดับ</p>
              </div>
            </div>
          )}
          {tab === 'sales' && (
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: TrendingUp, label: 'Total Revenue', value: '฿1,640,000' },
                  { icon: ShoppingBag, label: 'Last Purchase', value: '15 เม.ย. 68' },
                  { icon: Star,        label: 'Avg / Order',   value: '฿85,000' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="card flex-1 text-center">
                    <Icon size={18} className="text-primary-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="text-base font-bold text-gray-800">{value}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">ยอดขายรายเดือน</p>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={salesHistory}>
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tickFormatter={v => `${v/1000}k`} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v: unknown) => `฿${Number(v).toLocaleString()}`} />
                    <Bar dataKey="revenue" fill="#f97316" radius={[3,3,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">สัดส่วน MC</p>
                <div className="flex items-center gap-4">
                  <PieChart width={120} height={120}>
                    <Pie data={mcData} cx={55} cy={55} innerRadius={35} outerRadius={55} dataKey="value">
                      {mcData.map((_, i) => <Cell key={i} fill={MC_COLORS[i]} />)}
                    </Pie>
                  </PieChart>
                  <div className="space-y-1.5">
                    {mcData.map((d, i) => (
                      <div key={d.name} className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: MC_COLORS[i] }} />
                        <span className="text-gray-600">{d.name}</span>
                        <span className="font-medium text-gray-800 ml-auto">{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {tab === 'opportunity' && (
            <div className="space-y-3">
              {[
                { name: 'โครงการ The Forest Residence', amount: '฿2,400,000', stage: 'Proposal', prob: 70, close: '2568-06-30' },
                { name: 'อาคารพาณิชย์ ถนนลาดพร้าว',     amount: '฿850,000',  stage: 'Negotiation', prob: 85, close: '2568-05-15' },
              ].map(o => (
                <div key={o.name} className="card border border-gray-100">
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold text-gray-800">{o.name}</p>
                    <span className="badge badge-blue">{o.stage}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-3 text-xs text-gray-500">
                    <div><span className="block text-gray-400">มูลค่า</span>{o.amount}</div>
                    <div><span className="block text-gray-400">ปิด</span>{o.close}</div>
                    <div><span className="block text-gray-400">Probability</span>{o.prob}%</div>
                  </div>
                  <div className="mt-2 h-1.5 bg-gray-100 rounded-full">
                    <div className="h-1.5 bg-primary-500 rounded-full" style={{ width: `${o.prob}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === 'payment' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'วงเงินเครดิต', value: `฿${account.credit.toLocaleString()}`, color: 'text-blue-600' },
                  { label: 'ยอดค้างชำระ', value: `฿${account.outstanding.toLocaleString()}`, color: 'text-red-500' },
                  { label: 'คงเหลือ', value: `฿${(account.credit - account.outstanding).toLocaleString()}`, color: 'text-emerald-600' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="card text-center">
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className={`text-lg font-bold ${color}`}>{value}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Aging</p>
                {[
                  { label: 'ปัจจุบัน', amount: account.outstanding * 0.4, color: 'bg-green-400' },
                  { label: '1–30 วัน', amount: account.outstanding * 0.35, color: 'bg-yellow-400' },
                  { label: '31–60 วัน', amount: account.outstanding * 0.15, color: 'bg-orange-400' },
                  { label: '60+ วัน', amount: account.outstanding * 0.1, color: 'bg-red-400' },
                ].map(({ label, amount, color }) => (
                  <div key={label} className="flex items-center gap-3 py-1.5 text-sm">
                    <span className="w-20 text-gray-500 text-xs">{label}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full">
                      <div className={`h-2 rounded-full ${color}`} style={{ width: `${(amount / account.credit) * 100}%` }} />
                    </div>
                    <span className="w-24 text-right text-gray-700 text-xs">฿{Math.round(amount).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'assortment' && (
            <div className="space-y-4">
              {[
                { label: 'Current Assortment', items: ['กระเบื้อง A100', 'สีทาบ้าน Premium', 'ซีเมนต์ตราช้าง'], color: 'bg-green-100 text-green-700' },
                { label: 'Recommended Assortment', items: ['ฉนวนกันความร้อน', 'วอลเปเปอร์ Series B', 'โคมไฟ LED'], color: 'bg-blue-100 text-blue-700' },
                { label: 'Missing Assortment', items: ['ปูนปลาสเตอร์', 'ท่อ PVC ขนาดใหญ่'], color: 'bg-red-100 text-red-700' },
              ].map(({ label, items, color }) => (
                <div key={label}>
                  <p className="text-sm font-semibold text-gray-700 mb-2">{label}</p>
                  <div className="flex flex-wrap gap-2">
                    {items.map(item => (
                      <span key={item} className={`badge ${color}`}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Assortment Coverage</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-gray-100 rounded-full">
                    <div className="h-3 bg-primary-500 rounded-full" style={{ width: '60%' }} />
                  </div>
                  <span className="text-sm font-bold text-primary-600">60%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 flex gap-2 justify-end">
          <button className="btn-secondary text-xs">Request KYC</button>
          <button className="btn-secondary text-xs">Update Contact</button>
          <button className="btn-primary text-xs">Request Up-tier</button>
        </div>
      </div>
    </div>
  )
}

export default function Accounts() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<typeof mockAccounts[0] | null>(null)

  const filtered = mockAccounts.filter(a =>
    a.name.includes(search) || a.id.includes(search) || a.taxId.includes(search)
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="input pl-8" placeholder="ค้นหา ID, ชื่อ, Tax ID..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <p className="text-xs text-gray-400 ml-auto">อัพเดตล่าสุด: วันนี้ 08:00</p>
      </div>

      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="table-header">
              <th className="text-left py-3 px-4">ลำดับ</th>
              <th className="text-left py-3 px-4">Customer ID</th>
              <th className="text-left py-3 px-4">ชื่อลูกค้า</th>
              <th className="text-left py-3 px-4">Tax ID</th>
              <th className="text-left py-3 px-4">ประเภท</th>
              <th className="text-left py-3 px-4">มือถือ</th>
              <th className="text-left py-3 px-4">Owner</th>
              <th className="text-left py-3 px-4">Tier</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <tr key={a.id} className="table-row">
                <td className="py-3 px-4 text-gray-500">{i + 1}</td>
                <td className="py-3 px-4 text-gray-600 font-mono text-xs">{a.id}</td>
                <td className="py-3 px-4 font-medium text-gray-800">{a.name}</td>
                <td className="py-3 px-4 text-gray-500 text-xs font-mono">{a.taxId}</td>
                <td className="py-3 px-4 text-gray-600 text-xs">{a.type}</td>
                <td className="py-3 px-4 text-gray-600">{a.mobile}</td>
                <td className="py-3 px-4 text-gray-600 text-xs">{a.owner}</td>
                <td className="py-3 px-4">
                  <span className={`badge ${TIER_STYLE[a.tier]}`}>{a.tier}</span>
                </td>
                <td className="py-3 px-4">
                  <button onClick={() => setSelected(a)} className="btn-ghost p-1.5 text-gray-400 hover:text-primary-500">
                    <Eye size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="py-12 text-center text-gray-400 text-sm">ไม่พบข้อมูล</div>}
      </div>

      {selected && <Customer360 account={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

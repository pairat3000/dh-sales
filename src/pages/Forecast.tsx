import { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend, FunnelChart, Funnel, LabelList,
} from 'recharts'
import { Search, Edit2, Check, X, ChevronDown, ChevronRight, TrendingUp } from 'lucide-react'
import { mockForecast, mockForecastByMC, mockForecastByQuarter, mockDeals } from '../data/mockData'

// ─── types ───────────────────────────────────────────────────────────────────
type Tab = 'dashboard' | 'weighted' | 'pipeline' | 'bestworst'

// ─── constants ────────────────────────────────────────────────────────────────
const TABS: { id: Tab; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'weighted',  label: 'Weighted Forecast' },
  { id: 'pipeline',  label: 'Pipeline Forecast' },
  { id: 'bestworst', label: 'Best / Worst Case' },
]

const STAGE_COLORS: Record<string, string> = {
  'Prospect':    '#E2E8F0',
  'Qualified':   '#FDE68A',
  'Proposal':    '#FED7AA',
  'Negotiation': '#F16027',
  'Closed Won':  '#DCFCE7',
}
const STAGE_TEXT: Record<string, string> = {
  'Prospect':    '#64748B',
  'Qualified':   '#92400E',
  'Proposal':    '#9A3412',
  'Negotiation': '#FFFFFF',
  'Closed Won':  '#16A34A',
}

const fmtM   = (v: number) => `${(v / 1000000).toFixed(1)}M`
const fmtB   = (v: number) => `฿${v.toLocaleString()}`
const fmtPct = (a: number, b: number) => `${Math.round((a / b) * 100)}%`

// ─── sub-components ──────────────────────────────────────────────────────────
function KpiCard({ label, value, sub, color, textColor }: {
  label: string; value: string; sub: string; color: string; textColor: string
}) {
  return (
    <div className="card" style={{ backgroundColor: color }}>
      <p className="text-xs font-medium" style={{ color: textColor, opacity: 0.7 }}>{label}</p>
      <p className="text-2xl font-bold mt-1" style={{ color: textColor }}>{value}</p>
      <p className="text-xs mt-0.5" style={{ color: textColor, opacity: 0.6 }}>{sub}</p>
    </div>
  )
}

// ─── tabs ────────────────────────────────────────────────────────────────────
function DashboardTab() {
  const [scenario, setScenario] = useState(0)
  const totalCommit    = mockForecast.reduce((s, m) => s + m.commit, 0)
  const totalTarget    = mockForecast.reduce((s, m) => s + m.target, 0)
  const totalBestCase  = mockForecast.reduce((s, m) => s + m.bestCase, 0)
  const totalPipeline  = mockForecast.reduce((s, m) => s + m.pipeline, 0)
  const adjustedCommit = Math.round(totalCommit * (1 + scenario / 100))
  const achievement    = Math.round((totalCommit / totalTarget) * 100)

  return (
    <div className="space-y-4">
      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Target"   value={`฿${fmtM(totalTarget)}`}   sub="เป้าหมายรวม ม.ค.–มิ.ย."  color="#F1F5F9" textColor="#020817" />
        <KpiCard label="Commit"         value={`฿${fmtM(totalCommit)}`}   sub={`${achievement}% of target`}  color="rgba(241,96,39,0.08)" textColor="#F16027" />
        <KpiCard label="Best Case"      value={`฿${fmtM(totalBestCase)}`} sub="กรณีที่ดีที่สุด"             color="rgba(34,197,94,0.08)"  textColor="#16A34A" />
        <KpiCard label="Pipeline"       value={`฿${fmtM(totalPipeline)}`} sub="Pipeline ทั้งหมด"            color="rgba(59,130,246,0.08)"  textColor="#3B82F6" />
      </div>

      {/* Progress bar achievement */}
      <div className="card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#020817]">% Achievement (Commit vs Target)</span>
          <span className="text-sm font-bold" style={{ color: achievement >= 80 ? '#16A34A' : achievement >= 50 ? '#F16027' : '#EF4444' }}>
            {achievement}%
          </span>
        </div>
        <div className="h-3 bg-[#F1F5F9] rounded-full overflow-hidden">
          <div
            className="h-3 rounded-full transition-all"
            style={{ width: `${Math.min(achievement, 100)}%`, backgroundColor: achievement >= 80 ? '#16A34A' : '#F16027' }}
          />
        </div>
        <div className="flex justify-between text-xs text-[#64748B] mt-1">
          <span>฿0</span><span>Commit ฿{fmtM(totalCommit)}</span><span>Target ฿{fmtM(totalTarget)}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Monthly bar */}
        <div className="card col-span-2">
          <h3 className="text-sm font-semibold text-[#020817] mb-3">Forecast vs Target รายเดือน</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockForecast} barGap={2}>
              <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: 'Prompt' }} />
              <YAxis tickFormatter={v => `${(v/1000000).toFixed(0)}M`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: unknown) => fmtB(Number(v))} />
              <Legend wrapperStyle={{ fontSize: 12, fontFamily: 'Prompt' }} />
              <Bar dataKey="target"   name="Target"    fill="#E2E8F0" radius={[3,3,0,0]} />
              <Bar dataKey="commit"   name="Commit"    fill="#F16027" radius={[3,3,0,0]} />
              <Bar dataKey="bestCase" name="Best Case" fill="#FBC9A9" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Scenario planning */}
        <div className="card">
          <h3 className="text-sm font-semibold text-[#020817] mb-1">Scenario Planning</h3>
          <p className="text-xs text-[#64748B] mb-3">
            ถ้า Close Rate เปลี่ยน <span className="font-semibold" style={{ color: scenario > 0 ? '#16A34A' : scenario < 0 ? '#EF4444' : '#64748B' }}>
              {scenario > 0 ? '+' : ''}{scenario}%
            </span>
          </p>
          <input
            type="range" min="-20" max="30" step="5" value={scenario}
            onChange={e => setScenario(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#F16027' }}
          />
          <div className="flex justify-between text-xs text-[#64748B] mt-1">
            <span>-20%</span><span>+30%</span>
          </div>
          <div className="mt-4 space-y-2.5 border-t border-[#E2E8F0] pt-3">
            <div className="flex justify-between text-xs">
              <span className="text-[#64748B]">Commit ปัจจุบัน</span>
              <span className="font-medium text-[#020817]">฿{fmtM(totalCommit)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="font-medium" style={{ color: '#F16027' }}>Adjusted</span>
              <span className="font-bold text-sm" style={{ color: adjustedCommit >= totalTarget ? '#16A34A' : '#F16027' }}>
                ฿{fmtM(adjustedCommit)}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#64748B]">vs Target</span>
              <span className="font-semibold" style={{ color: adjustedCommit >= totalTarget ? '#16A34A' : '#EF4444' }}>
                {fmtPct(adjustedCommit, totalTarget)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* By Quarter */}
        <div className="card">
          <h3 className="text-sm font-semibold text-[#020817] mb-3">Forecast by Quarter</h3>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={mockForecastByQuarter} barGap={2}>
              <XAxis dataKey="quarter" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={v => `${(v/1000000).toFixed(0)}M`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: unknown) => fmtB(Number(v))} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="target" name="Target" fill="#E2E8F0" radius={[3,3,0,0]} />
              <Bar dataKey="commit" name="Commit" fill="#F16027" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* By MC */}
        <div className="card">
          <h3 className="text-sm font-semibold text-[#020817] mb-3">Forecast by MC</h3>
          <div className="space-y-2.5">
            {mockForecastByMC.map(mc => {
              const pct = Math.round((mc.commit / mc.target) * 100)
              return (
                <div key={mc.mc}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#020817]">{mc.mc}</span>
                    <span className="text-[#64748B]">
                      ฿{fmtM(mc.commit)} / ฿{fmtM(mc.target)} · <span style={{ color: pct >= 70 ? '#16A34A' : '#F16027' }}>{pct}%</span>
                    </span>
                  </div>
                  <div className="h-2 bg-[#F1F5F9] rounded-full">
                    <div className="h-2 rounded-full" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: pct >= 70 ? '#16A34A' : '#F16027' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Trend line + By Sales Rep */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card">
          <h3 className="text-sm font-semibold text-[#020817] mb-3">แนวโน้มยอดขาย (Commit vs Target)</h3>
          <ResponsiveContainer width="100%" height={170}>
            <LineChart data={mockForecast}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={v => `${(v/1000000).toFixed(1)}M`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: unknown) => fmtB(Number(v))} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="target" name="Target" stroke="#E2E8F0" strokeWidth={2} strokeDasharray="5 5" />
              <Line type="monotone" dataKey="commit" name="Commit" stroke="#F16027" strokeWidth={2} dot={{ r: 3, fill: '#F16027' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-sm font-semibold text-[#020817] mb-3">Forecast by Sales Rep</h3>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart
              data={[
                { name: 'อรณี',       commit: 4280000, bestCase: 5200000 },
                { name: 'ปรียานุช',   commit: 3930000, bestCase: 4800000 },
                { name: 'พรพรรณณี',   commit: 2840000, bestCase: 3600000 },
                { name: 'พนักงานขาย', commit: 2280000, bestCase: 3200000 },
              ]}
              layout="vertical" barGap={2}
            >
              <XAxis type="number" tickFormatter={v => `${(v/1000000).toFixed(1)}M`} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={65} />
              <Tooltip formatter={(v: unknown) => fmtB(Number(v))} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="commit"   name="Commit"    fill="#F16027" radius={[0,3,3,0]} />
              <Bar dataKey="bestCase" name="Best Case" fill="#FBC9A9" radius={[0,3,3,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function WeightedTab() {
  const [search, setSearch]         = useState('')
  const [filterOwner, setFilterOwner] = useState('ทั้งหมด')
  const [editId, setEditId]         = useState<string | null>(null)
  const [overrides, setOverrides]   = useState<Record<string, number>>({})
  const [editVal, setEditVal]       = useState('')
  const [expanded, setExpanded]     = useState<string | null>(null)

  const owners = ['ทั้งหมด', ...Array.from(new Set(mockDeals.map(d => d.owner)))]
  const filtered = mockDeals.filter(d =>
    (filterOwner === 'ทั้งหมด' || d.owner === filterOwner) &&
    (d.name.includes(search) || d.customer.includes(search))
  )

  const totalWeighted = filtered.reduce((s, d) => {
    const w = overrides[d.id] ?? d.weighted
    return s + w
  }, 0)

  const saveOverride = (id: string) => {
    const v = Number(editVal.replace(/,/g, ''))
    if (!isNaN(v) && v >= 0) setOverrides(prev => ({ ...prev, [id]: v }))
    setEditId(null)
  }

  return (
    <div className="space-y-4">
      <div className="filter-bar">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input className="input" style={{ paddingLeft: 36, width: 260 }} placeholder="ค้นหา Deal, ลูกค้า..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input" style={{ width: 'auto' }} value={filterOwner} onChange={e => setFilterOwner(e.target.value)}>
          {owners.map(o => <option key={o}>{o}</option>)}
        </select>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs text-[#64748B]">Weighted รวม:</span>
          <span className="text-base font-bold" style={{ color: '#F16027' }}>฿{fmtM(totalWeighted)}</span>
        </div>
      </div>

      <div className="tbl-container">
        <table className="w-full">
          <thead>
            <tr className="tbl-header">
              <th style={{ width: 32 }}></th>
              <th>Deal</th>
              <th>ลูกค้า</th>
              <th>Owner</th>
              <th>MC</th>
              <th>Stage</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
              <th style={{ textAlign: 'right' }}>Prob%</th>
              <th style={{ textAlign: 'right' }}>Weighted</th>
              <th>Close Date</th>
              <th style={{ textAlign: 'center' }}>Commit</th>
              <th style={{ width: 64 }}>Override</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(d => {
              const hasOverride = overrides[d.id] !== undefined
              const weighted    = overrides[d.id] ?? d.weighted
              return (
                <>
                  <tr key={d.id} className="tbl-row" style={{ cursor: 'pointer' }} onClick={() => setExpanded(expanded === d.id ? null : d.id)}>
                    <td>
                      {expanded === d.id
                        ? <ChevronDown size={13} className="text-[#64748B]" />
                        : <ChevronRight size={13} className="text-[#64748B]" />}
                    </td>
                    <td className="font-medium" style={{ maxWidth: 220 }}>
                      <span className="block truncate" title={d.name}>{d.name}</span>
                    </td>
                    <td className="text-[#64748B] text-xs">{d.customer}</td>
                    <td className="text-[#64748B] text-xs">{d.owner}</td>
                    <td className="text-xs">
                      <span className="badge badge-info">{d.mc}</span>
                    </td>
                    <td>
                      <span className="badge" style={{ backgroundColor: STAGE_COLORS[d.stage] ?? '#F1F5F9', color: STAGE_TEXT[d.stage] ?? '#64748B' }}>
                        {d.stage}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }} className="text-[#64748B]">{fmtB(d.amount)}</td>
                    <td style={{ textAlign: 'right' }}>{d.prob}%</td>
                    <td style={{ textAlign: 'right' }}>
                      <span className={`font-semibold ${hasOverride ? 'text-[#3B82F6]' : 'text-[#020817]'}`}>
                        {fmtB(weighted)}
                        {hasOverride && <span className="text-xs ml-1 text-[#64748B]">(แก้)</span>}
                      </span>
                    </td>
                    <td className="text-[#64748B] text-xs">{d.closeDate}</td>
                    <td style={{ textAlign: 'center' }}>
                      {d.commit && <Check size={14} style={{ color: '#16A34A', margin: '0 auto' }} />}
                    </td>
                    <td onClick={e => e.stopPropagation()}>
                      {editId === d.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            className="input text-xs" style={{ width: 80, height: 28, padding: '0 6px' }}
                            value={editVal} onChange={e => setEditVal(e.target.value)}
                            autoFocus
                          />
                          <button onClick={() => saveOverride(d.id)} className="btn-icon" style={{ width: 24, height: 24 }}>
                            <Check size={12} style={{ color: '#16A34A' }} />
                          </button>
                          <button onClick={() => setEditId(null)} className="btn-icon" style={{ width: 24, height: 24 }}>
                            <X size={12} style={{ color: '#EF4444' }} />
                          </button>
                        </div>
                      ) : (
                        <button className="btn-icon" style={{ width: 28, height: 28 }}
                          onClick={() => { setEditId(d.id); setEditVal(String(weighted)) }}>
                          <Edit2 size={12} className="text-[#64748B]" />
                        </button>
                      )}
                    </td>
                  </tr>
                  {expanded === d.id && (
                    <tr key={`${d.id}-detail`}>
                      <td colSpan={12} style={{ backgroundColor: '#F9FAFB', padding: '12px 24px' }}>
                        <div className="grid grid-cols-4 gap-4 text-xs">
                          {[
                            ['Owner ID', d.ownerId],
                            ['Owner & Team', d.owner],
                            ['Merchandise Category', d.mc],
                            ['Pipeline Stage', d.stage],
                            ['Deal Amount', fmtB(d.amount)],
                            ['Probability', `${d.prob}%`],
                            ['Weighted Forecast', fmtB(weighted)],
                            ['Expected Close', d.closeDate],
                          ].map(([k, v]) => (
                            <div key={k}>
                              <p className="text-[#64748B]">{k}</p>
                              <p className="font-medium text-[#020817] mt-0.5">{v}</p>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              )
            })}
            {filtered.length === 0 && (
              <tr><td colSpan={12} className="text-center py-12 text-[#64748B]">ไม่พบข้อมูล</td></tr>
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-3 py-2.5 border-t border-[#E2E8F0] text-xs text-[#64748B]">
          <span>{filtered.length} deals</span>
          <span>Weighted รวม: <strong className="text-[#020817]">฿{fmtM(totalWeighted)}</strong></span>
        </div>
      </div>
    </div>
  )
}

const funnelData = [
  { name: 'Prospect',    value: 42, fill: '#E2E8F0' },
  { name: 'Qualified',   value: 30, fill: '#FDE68A' },
  { name: 'Proposal',    value: 18, fill: '#FED7AA' },
  { name: 'Negotiation', value: 10, fill: '#F16027' },
  { name: 'Closed Won',  value: 6,  fill: '#DCFCE7' },
]

function PipelineTab() {
  const byStage = ['Prospect', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won'].map(stage => ({
    stage,
    count:  mockDeals.filter(d => d.stage === stage).length,
    amount: mockDeals.filter(d => d.stage === stage).reduce((s, d) => s + d.amount, 0),
  }))

  const [drillStage, setDrillStage] = useState<string | null>(null)
  const drillDeals = drillStage ? mockDeals.filter(d => d.stage === drillStage) : []

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="card">
          <h3 className="text-sm font-semibold text-[#020817] mb-3">Pipeline Funnel</h3>
          <ResponsiveContainer width="100%" height={240}>
            <FunnelChart>
              <Tooltip formatter={(v: unknown) => `${Number(v)} deals`} />
              <Funnel dataKey="value" data={funnelData} isAnimationActive onClick={(d: { name?: string }) => setDrillStage(d?.name ?? null)}>
                <LabelList position="right" fill="#64748B" stroke="none" dataKey="name" style={{ fontSize: 12, fontFamily: 'Prompt' }} />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
          <p className="text-xs text-[#64748B] text-center mt-1">คลิก Funnel เพื่อดู Drill Down</p>
        </div>

        <div className="card">
          <h3 className="text-sm font-semibold text-[#020817] mb-3">Pipeline by Stage</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="tbl-header">
                <th>Stage</th>
                <th style={{ textAlign: 'right' }}>Deals</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {byStage.map(s => (
                <tr key={s.stage} className="tbl-row cursor-pointer" onClick={() => setDrillStage(s.stage === drillStage ? null : s.stage)}>
                  <td>
                    <span className="badge" style={{ backgroundColor: STAGE_COLORS[s.stage], color: STAGE_TEXT[s.stage] }}>
                      {s.stage}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }} className="font-medium">{s.count}</td>
                  <td style={{ textAlign: 'right' }} className="font-medium">{fmtB(s.amount)}</td>
                </tr>
              ))}
              <tr>
                <td className="font-semibold text-[#020817] pt-2">รวม</td>
                <td style={{ textAlign: 'right' }} className="font-semibold">{mockDeals.length}</td>
                <td style={{ textAlign: 'right' }} className="font-semibold">฿{fmtM(mockDeals.reduce((s, d) => s + d.amount, 0))}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Drill Down */}
      {drillStage && (
        <div className="tbl-container">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#E2E8F0]">
            <TrendingUp size={15} style={{ color: '#F16027' }} />
            <h3 className="text-sm font-semibold text-[#020817]">Drill Down: {drillStage}</h3>
            <button className="ml-auto btn-ghost text-xs" onClick={() => setDrillStage(null)}>✕ ปิด</button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="tbl-header">
                <th>Deal</th><th>ลูกค้า</th><th>Owner</th><th>MC</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
                <th style={{ textAlign: 'right' }}>Prob%</th>
                <th>Close Date</th>
              </tr>
            </thead>
            <tbody>
              {drillDeals.map(d => (
                <tr key={d.id} className="tbl-row">
                  <td className="font-medium">{d.name}</td>
                  <td className="text-[#64748B] text-xs">{d.customer}</td>
                  <td className="text-[#64748B] text-xs">{d.owner}</td>
                  <td><span className="badge badge-info">{d.mc}</span></td>
                  <td style={{ textAlign: 'right' }} className="font-medium">{fmtB(d.amount)}</td>
                  <td style={{ textAlign: 'right' }}>{d.prob}%</td>
                  <td className="text-[#64748B] text-xs">{d.closeDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function BestWorstTab() {
  const bestData = mockForecast.map(m => ({
    ...m,
    worstCase: Math.round(m.commit * 0.7),
  }))
  const totalWorst = bestData.reduce((s, m) => s + m.worstCase, 0)
  const totalBest  = mockForecast.reduce((s, m) => s + m.bestCase, 0)
  const totalCommit = mockForecast.reduce((s, m) => s + m.commit, 0)
  const totalTarget = mockForecast.reduce((s, m) => s + m.target, 0)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Worst Case', value: fmtM(totalWorst), pct: fmtPct(totalWorst, totalTarget), color: '#FEE2E2', text: '#EF4444' },
          { label: 'Commit',     value: fmtM(totalCommit), pct: fmtPct(totalCommit, totalTarget), color: 'rgba(241,96,39,0.08)', text: '#F16027' },
          { label: 'Best Case',  value: fmtM(totalBest),  pct: fmtPct(totalBest, totalTarget),  color: '#DCFCE7', text: '#16A34A' },
        ].map(({ label, value, pct, color, text }) => (
          <div key={label} className="card text-center" style={{ backgroundColor: color }}>
            <p className="text-xs font-medium" style={{ color: text, opacity: 0.7 }}>{label}</p>
            <p className="text-3xl font-bold mt-1" style={{ color: text }}>฿{value}</p>
            <p className="text-xs mt-0.5" style={{ color: text }}>{pct} of Target</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 className="text-sm font-semibold text-[#020817] mb-3">Best / Commit / Worst — รายเดือน</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={bestData} barGap={2}>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={v => `${(v/1000000).toFixed(0)}M`} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v: unknown) => fmtB(Number(v))} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="target"   name="Target"     fill="#E2E8F0" radius={[3,3,0,0]} />
            <Bar dataKey="bestCase" name="Best Case"  fill="#DCFCE7" radius={[3,3,0,0]} />
            <Bar dataKey="commit"   name="Commit"     fill="#F16027" radius={[3,3,0,0]} />
            <Bar dataKey="worstCase" name="Worst Case" fill="#FEE2E2" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3 className="text-sm font-semibold text-[#020817] mb-3">สรุปตาราง Best / Worst รายเดือน</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="tbl-header">
              <th>เดือน</th>
              <th style={{ textAlign: 'right' }}>Target</th>
              <th style={{ textAlign: 'right' }}>Best Case</th>
              <th style={{ textAlign: 'right' }}>Commit</th>
              <th style={{ textAlign: 'right' }}>Worst Case</th>
              <th style={{ textAlign: 'right' }}>Achievement%</th>
            </tr>
          </thead>
          <tbody>
            {bestData.map(m => {
              const pct = Math.round((m.commit / m.target) * 100)
              return (
                <tr key={m.month} className="tbl-row">
                  <td className="font-medium">{m.month}</td>
                  <td style={{ textAlign: 'right' }} className="text-[#64748B]">{fmtB(m.target)}</td>
                  <td style={{ textAlign: 'right', color: '#16A34A' }} className="font-medium">{fmtB(m.bestCase)}</td>
                  <td style={{ textAlign: 'right', color: '#F16027' }} className="font-medium">{fmtB(m.commit)}</td>
                  <td style={{ textAlign: 'right', color: '#EF4444' }}>{fmtB(m.worstCase)}</td>
                  <td style={{ textAlign: 'right' }}>
                    <span style={{ color: pct >= 80 ? '#16A34A' : pct >= 50 ? '#F16027' : '#EF4444', fontWeight: 600 }}>
                      {pct}%
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── main page ───────────────────────────────────────────────────────────────
export default function Forecast() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')

  return (
    <div className="space-y-4">
      {/* Tab bar */}
      <div className="flex gap-1 bg-white border border-[#E2E8F0] rounded-lg p-1 w-fit">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className="px-4 py-2 text-sm rounded font-medium transition-colors"
            style={{
              backgroundColor: activeTab === t.id ? '#F16027' : 'transparent',
              color: activeTab === t.id ? 'white' : '#64748B',
              border: 'none', cursor: 'pointer',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'dashboard' && <DashboardTab />}
      {activeTab === 'weighted'  && <WeightedTab />}
      {activeTab === 'pipeline'  && <PipelineTab />}
      {activeTab === 'bestworst' && <BestWorstTab />}
    </div>
  )
}

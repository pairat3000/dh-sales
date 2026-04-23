import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { mockVisits } from '../data/mockData'

const DAYS_SHORT = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
const MONTHS_TH = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDay(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export default function CalendarPage() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [view, setView] = useState<'month' | 'week'>('month')

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDay(year, month)

  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }
  const next = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }

  const getVisitsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return mockVisits.filter(v => v.date === dateStr)
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {(['month', 'week'] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              className={`px-3 py-1 text-sm rounded-md font-medium transition-colors ${view === v ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'}`}>
              {v === 'month' ? 'เดือน' : 'สัปดาห์'}
            </button>
          ))}
        </div>
        <button onClick={() => { setYear(now.getFullYear()); setMonth(now.getMonth()) }} className="btn-secondary text-xs">วันนี้</button>
        <div className="flex items-center gap-1">
          <button onClick={prev} className="btn-ghost p-2"><ChevronLeft size={16} /></button>
          <span className="text-sm font-semibold text-gray-800 min-w-40 text-center">{MONTHS_TH[month]} {year + 543}</span>
          <button onClick={next} className="btn-ghost p-2"><ChevronRight size={16} /></button>
        </div>
        <button className="btn-primary ml-auto"><Plus size={15} /> สร้างนัดหมาย</button>
      </div>

      {/* Calendar grid */}
      <div className="card p-0 overflow-hidden">
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
          {DAYS_SHORT.map(d => (
            <div key={d} className="py-2 text-center text-xs font-semibold text-gray-500">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="border-b border-r border-gray-50 h-24 bg-gray-50/50" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const visits = getVisitsForDay(day)
            const isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear()
            return (
              <div key={day} className="border-b border-r border-gray-100 h-24 p-1.5 hover:bg-gray-50 transition-colors">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mb-1 ${isToday ? 'bg-primary-500 text-white' : 'text-gray-700'}`}>
                  {day}
                </div>
                <div className="space-y-0.5">
                  {visits.slice(0, 2).map(v => (
                    <div key={v.id} className="text-xs bg-primary-100 text-primary-700 rounded px-1 truncate cursor-pointer hover:bg-primary-200">
                      {v.time} {v.customerName.split(' ')[0]}
                    </div>
                  ))}
                  {visits.length > 2 && <div className="text-xs text-gray-400">+{visits.length - 2} เพิ่มเติม</div>}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="text-xs text-gray-400">นัดหมายทั้งหมดในเดือนนี้: {mockVisits.length} รายการ</div>
    </div>
  )
}

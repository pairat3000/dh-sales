import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  '/dashboard':   { title: 'Dashboard',            subtitle: 'ภาพรวมการเยี่ยมลูกค้าประจำเดือน' },
  '/visit-month': { title: 'Visit (เดือน)',         subtitle: 'จัดการแผนตารางนัดหมายลูกค้ารายเดือน' },
  '/visits':      { title: 'Visits',               subtitle: 'จัดการตารางนัดหมายลูกค้ารายครั้ง' },
  '/tasks':       { title: 'Tasks',                subtitle: 'จัดการงานที่ได้รับมอบหมาย' },
  '/calendar':    { title: 'ปฏิทินนัดหมาย',        subtitle: 'ตารางนัดหมายทั้งหมดในรูปแบบปฏิทิน' },
  '/accounts':    { title: 'ลูกค้า (Accounts)',    subtitle: 'จัดการข้อมูลลูกค้าและ Customer 360' },
  '/mou':         { title: 'MOU',                  subtitle: 'จัดการ Memorandum of Understanding' },
  '/approval':    { title: 'อนุมัติ',              subtitle: 'รายการรออนุมัติทุกประเภท' },
  '/forecast':    { title: 'Sales Forecast',       subtitle: 'การพยากรณ์ยอดขายและ Pipeline' },
  '/reports':     { title: 'รายงาน',               subtitle: 'ดาวน์โหลดรายงานในรูปแบบ Excel' },
  '/settings':    { title: 'ตั้งค่า',              subtitle: 'จัดการการตั้งค่าระบบ' },
}

export default function AppLayout() {
  const { pathname } = useLocation()
  const meta = pageMeta[pathname] ?? { title: 'DH Sales', subtitle: '' }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F1F5F9' }}>
      <Sidebar />
      <div className="flex-1 ml-56 flex flex-col min-h-screen">
        <Navbar title={meta.title} subtitle={meta.subtitle} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

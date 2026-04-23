import { Download, FileText } from 'lucide-react'

const reports = [
  {
    id: 'R01', title: 'Visit Detail',
    desc: 'รายงานรายละเอียดการเยี่ยมลูกค้า Full Detail',
    cols: ['Employee ID', 'Visitor Name', 'Visit Group', 'Branch', 'Customer', 'Status'],
    filters: ['ปี', 'เดือน', 'สาขา', 'ผู้ใช้'],
  },
  {
    id: 'R02', title: 'สรุปค่าใช้จ่ายประจำเดือน',
    desc: 'สรุปค่าใช้จ่ายรายเดือนของ Sales แต่ละคน',
    cols: ['ชื่อ Sales', 'จำนวน Visit', 'ค่าเดินทาง', 'ค่าอื่นๆ', 'รวม'],
    filters: ['ปี', 'เดือน', 'ผู้ใช้'],
  },
  {
    id: 'R03', title: 'สรุปการเบิกค่าใช้จ่ายผู้แทนขาย',
    desc: 'รายงานการเบิกจ่ายแยกตามผู้แทนขาย',
    cols: ['ผู้แทนขาย', 'รายการเบิก', 'จำนวนเงิน', 'สถานะ', 'อนุมัติโดย'],
    filters: ['ปี', 'เดือน', 'สาขา'],
  },
  {
    id: 'R04', title: 'รายงานอัตราค่าเดินทาง',
    desc: 'รายงานค่าเดินทางตามอัตราที่กำหนด',
    cols: ['ชื่อ', 'ระยะทาง (กม.)', 'อัตรา (บาท/กม.)', 'ยอดรวม'],
    filters: ['ปี', 'เดือน'],
  },
]

export default function Reports() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {reports.map(r => (
          <div key={r.id} className="card">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-primary-50 rounded-lg">
                  <FileText size={20} className="text-primary-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">{r.title}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{r.desc}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {r.filters.map(f => (
                      <span key={f} className="badge badge-blue">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
              <button className="btn-primary text-xs flex-shrink-0">
                <Download size={13} /> Export Excel
              </button>
            </div>

            <div className="mt-4 border-t border-gray-50 pt-3">
              <p className="text-xs text-gray-400 mb-2">คอลัมน์:</p>
              <div className="flex flex-wrap gap-1">
                {r.cols.map(c => (
                  <span key={c} className="badge badge-gray">{c}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

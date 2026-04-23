export const mockUsers = [
  { id: 'U001', name: 'สมชาย ใจดี',      role: 'Sales',   branch: 'สาขาลาดพร้าว',  reportTo: 'วิชัย มั่นคง' },
  { id: 'U002', name: 'สุนีย์ สวัสดี',    role: 'Sales',   branch: 'สาขารังสิต',    reportTo: 'วิชัย มั่นคง' },
  { id: 'U003', name: 'ประยุทธ์ เก่งกาจ', role: 'Sales',   branch: 'สาขาบางนา',    reportTo: 'วิชัย มั่นคง' },
  { id: 'U004', name: 'วิชัย มั่นคง',     role: 'Manager', branch: 'สำนักงานใหญ่', reportTo: '-' },
  { id: 'U005', name: 'อรุณี ฉลาดเฉลียว', role: 'Sales',   branch: 'สาขาปทุมธานี', reportTo: 'วิชัย มั่นคง' },
]

export const mockAccounts = [
  { id: 'C001', name: 'บริษัท สร้างบ้าน จำกัด',    taxId: '0105560123456', type: 'Corporate', mobile: '081-000-0001', owner: 'สมชาย ใจดี',   tier: 'Gold',     credit: 500000, outstanding: 120000 },
  { id: 'C002', name: 'ห้างหุ้นส่วน ก่อสร้างดี',   taxId: '0103550234567', type: 'SME',       mobile: '082-000-0002', owner: 'สุนีย์ สวัสดี', tier: 'Silver',   credit: 200000, outstanding: 45000  },
  { id: 'C003', name: 'นายณรงค์ บ้านสวย',           taxId: '3100600345678', type: 'Individual', mobile: '083-000-0003', owner: 'ประยุทธ์ เก่งกาจ', tier: 'Bronze', credit: 50000,  outstanding: 5000   },
  { id: 'C004', name: 'บริษัท พัฒนาอสังหา จำกัด',  taxId: '0105570456789', type: 'Corporate', mobile: '084-000-0004', owner: 'สมชาย ใจดี',   tier: 'Platinum', credit: 2000000, outstanding: 380000 },
  { id: 'C005', name: 'หจก. โรงแรมสบาย',            taxId: '0103560567890', type: 'SME',       mobile: '085-000-0005', owner: 'อรุณี ฉลาดเฉลียว', tier: 'Gold',  credit: 300000, outstanding: 67000  },
  { id: 'C006', name: 'นางสาวมาลี รักสวย',           taxId: '3100700678901', type: 'Individual', mobile: '086-000-0006', owner: 'สุนีย์ สวัสดี', tier: 'Bronze', credit: 30000,  outstanding: 0      },
]

export const mockVisitGroups = [
  { id: 'VG001', name: 'แผนเยี่ยมลูกค้า เมษายน 2568', month: 4, year: 2568, startDate: '2568-04-01', endDate: '2568-04-30', totalExpense: 12500, status: 'อนุมัติแผน', createdBy: 'สมชาย ใจดี' },
  { id: 'VG002', name: 'แผนเยี่ยมลูกค้า เมษายน 2568', month: 4, year: 2568, startDate: '2568-04-01', endDate: '2568-04-30', totalExpense: 8200,  status: 'อนุมัติแผน', createdBy: 'สุนีย์ สวัสดี' },
  { id: 'VG003', name: 'แผนเยี่ยมลูกค้า เมษายน 2568', month: 4, year: 2568, startDate: '2568-04-01', endDate: '2568-04-30', totalExpense: 0,     status: 'แบบร่าง',   createdBy: 'ประยุทธ์ เก่งกาจ' },
  { id: 'VG004', name: 'แผนเยี่ยมลูกค้า มีนาคม 2568',  month: 3, year: 2568, startDate: '2568-03-01', endDate: '2568-03-31', totalExpense: 15800, status: 'อนุมัติแผน', createdBy: 'สมชาย ใจดี' },
  { id: 'VG005', name: 'แผนเยี่ยมลูกค้า มีนาคม 2568',  month: 3, year: 2568, startDate: '2568-03-01', endDate: '2568-03-31', totalExpense: 9100,  status: 'อนุมัติแผน', createdBy: 'อรุณี ฉลาดเฉลียว' },
]

export const mockVisits = [
  { id: 'V001', groupName: 'แผนเยี่ยม เม.ย. 68', customerId: 'C001', customerName: 'บริษัท สร้างบ้าน จำกัด', date: '2568-04-24', time: '09:00', adhoc: false, branch: 'ลาดพร้าว', createdBy: 'สมชาย ใจดี', status: 'อนุมัติ' },
  { id: 'V002', groupName: 'แผนเยี่ยม เม.ย. 68', customerId: 'C004', customerName: 'บริษัท พัฒนาอสังหา จำกัด', date: '2568-04-25', time: '13:00', adhoc: false, branch: 'ลาดพร้าว', createdBy: 'สมชาย ใจดี', status: 'อนุมัติ' },
  { id: 'V003', groupName: '-',                    customerId: 'C002', customerName: 'ห้างหุ้นส่วน ก่อสร้างดี', date: '2568-04-23', time: '10:30', adhoc: true,  branch: 'รังสิต',    createdBy: 'สุนีย์ สวัสดี', status: 'รออนุมัติ' },
  { id: 'V004', groupName: 'แผนเยี่ยม เม.ย. 68', customerId: 'C005', customerName: 'หจก. โรงแรมสบาย', date: '2568-04-26', time: '14:00', adhoc: false, branch: 'ปทุมธานี',  createdBy: 'อรุณี ฉลาดเฉลียว', status: 'อนุมัติ' },
  { id: 'V005', groupName: '-',                    customerId: 'C003', customerName: 'นายณรงค์ บ้านสวย',  date: '2568-04-23', time: '11:00', adhoc: true,  branch: 'บางนา',    createdBy: 'ประยุทธ์ เก่งกาจ', status: 'รออนุมัติ' },
]

export const mockTasks = [
  { id: 'T001', name: 'ติดตาม Proposal บริษัท สร้างบ้าน', assignee: 'สมชาย ใจดี',   priority: 'สูง',   status: 'รอดำเนินการ', dueDate: '2568-04-25', createdBy: 'วิชัย มั่นคง' },
  { id: 'T002', name: 'ส่งข้อเสนอราคาวัสดุก่อสร้าง',     assignee: 'สุนีย์ สวัสดี', priority: 'ปานกลาง', status: 'กำลังดำเนินการ', dueDate: '2568-04-30', createdBy: 'วิชัย มั่นคง' },
  { id: 'T003', name: 'Update ข้อมูลลูกค้า C003',         assignee: 'ประยุทธ์ เก่งกาจ', priority: 'ต่ำ', status: 'เสร็จสิ้น', dueDate: '2568-04-20', createdBy: 'สมชาย ใจดี' },
  { id: 'T004', name: 'นำเสนอสินค้าใหม่ กลุ่ม premium',  assignee: 'อรุณี ฉลาดเฉลียว', priority: 'สูง', status: 'รอดำเนินการ', dueDate: '2568-04-28', createdBy: 'วิชัย มั่นคง' },
  { id: 'T005', name: 'ติดต่อลูกค้าที่ไม่ได้เยี่ยม 3 เดือน', assignee: 'สมชาย ใจดี', priority: 'ปานกลาง', status: 'รอดำเนินการ', dueDate: '2568-05-05', createdBy: 'วิชัย มั่นคง' },
]

export const mockMOUs = [
  { id: 'M001', customerId: 'C001', customerName: 'บริษัท สร้างบ้าน จำกัด',   mouId: 'MOU-2568-001', category: 'Volume Rebate', status: 'Active',   expireDate: '2568-12-31', target: 5000000, actual: 2150000 },
  { id: 'M002', customerId: 'C004', customerName: 'บริษัท พัฒนาอสังหา จำกัด', mouId: 'MOU-2568-002', category: 'Special Price', status: 'Active',   expireDate: '2568-09-30', target: 10000000, actual: 6800000 },
  { id: 'M003', customerId: 'C005', customerName: 'หจก. โรงแรมสบาย',           mouId: 'MOU-2567-015', category: 'Volume Rebate', status: 'Expired',  expireDate: '2567-12-31', target: 2000000, actual: 1980000 },
  { id: 'M004', customerId: 'C002', customerName: 'ห้างหุ้นส่วน ก่อสร้างดี',  mouId: 'MOU-2568-003', category: 'Credit Term',   status: 'Active',   expireDate: '2568-06-30', target: 1500000, actual: 420000 },
]

export const mockApprovals = [
  { id: 'A001', name: 'Adhoc Visit — หจก. โรงแรมสบาย',          owner: 'สุนีย์ สวัสดี', type: 'Visit (Adhoc)', lastAction: 'ส่งคำขอ',  dateSubmitted: '2568-04-23', status: 'รออนุมัติ' },
  { id: 'A002', name: 'แผนเยี่ยม เม.ย. 68 — ประยุทธ์',          owner: 'ประยุทธ์ เก่งกาจ', type: 'Visit Group', lastAction: 'ส่งคำขอ', dateSubmitted: '2568-04-01', status: 'รออนุมัติ' },
  { id: 'A003', name: 'Request Up-tier — บริษัท สร้างบ้าน',     owner: 'สมชาย ใจดี', type: 'Request Up-tier', lastAction: 'ส่งคำขอ',    dateSubmitted: '2568-04-15', status: 'รออนุมัติ' },
  { id: 'A004', name: 'Check-in/Check-out — 23 เม.ย.',          owner: 'ประยุทธ์ เก่งกาจ', type: 'Check-in/Check-out', lastAction: 'ส่งคำขอ', dateSubmitted: '2568-04-23', status: 'รออนุมัติ' },
  { id: 'A005', name: 'แผนเยี่ยม มี.ค. 68 — สมชาย',            owner: 'สมชาย ใจดี', type: 'Visit Group', lastAction: 'อนุมัติ',       dateSubmitted: '2568-03-01', status: 'อนุมัติ' },
]

export const mockForecast = [
  { month: 'ม.ค.', target: 8000000, commit: 6200000, bestCase: 7500000, pipeline: 9200000 },
  { month: 'ก.พ.', target: 8000000, commit: 5800000, bestCase: 7200000, pipeline: 8800000 },
  { month: 'มี.ค.', target: 9000000, commit: 8100000, bestCase: 9000000, pipeline: 10500000 },
  { month: 'เม.ย.', target: 9000000, commit: 5200000, bestCase: 8000000, pipeline: 11000000 },
  { month: 'พ.ค.', target: 9500000, commit: 4100000, bestCase: 7000000, pipeline: 10200000 },
  { month: 'มิ.ย.', target: 9500000, commit: 2800000, bestCase: 5500000, pipeline: 9000000 },
]

export const mockLeaderboard = [
  { rank: 1, name: 'สมชาย ใจดี',      visits: 24, minutesPerVisit: 48, coverage: 92 },
  { rank: 2, name: 'อรุณี ฉลาดเฉลียว', visits: 21, minutesPerVisit: 52, coverage: 85 },
  { rank: 3, name: 'สุนีย์ สวัสดี',    visits: 18, minutesPerVisit: 45, coverage: 78 },
  { rank: 4, name: 'ประยุทธ์ เก่งกาจ', visits: 15, minutesPerVisit: 61, coverage: 65 },
]

export const mockDashboardStats = {
  plan: 80,
  actual: 62,
  totalCustomers: 120,
  totalExpense: 45800,
  pendingTasks: 8,
}

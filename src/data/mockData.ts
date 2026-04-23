// UAT Data — DH Sales (22 เม.ย. 2026)

export const mockUsers = [
  { id: '1000217', name: 'อุไรพร เจริญราษฎร์',  role: 'Admin',   branch: '0000 - สำนักงานใหญ่', reportTo: '-' },
  { id: '1000075', name: 'ไชยพร เกตมะณี',        role: 'Manager', branch: '0004 - ขอนแก่น',      reportTo: '1040925 - วุฒิภัทร' },
  { id: '1000181', name: 'ภูมิชาย โกศัลวิตร์',   role: 'Manager', branch: '0026 - แหลมฉบัง',    reportTo: '1049566 - ธนกร' },
  { id: '1000080', name: 'พนักงานขาย (UAT)',       role: 'Sales',   branch: '0001 - อุบลราชธานี', reportTo: '1045588 - แหวน เครือแสง' },
  { id: '1000006', name: 'กรวิทย์ เจริญนิตย์',   role: 'BOF',     branch: '0001 - อุบลราชธานี', reportTo: '1000008' },
  { id: '1000008', name: 'พนักงานสาขา (UAT)',      role: 'BOF',     branch: '0001 - อุบลราชธานี', reportTo: '1007377 - ธนวรรณ' },
  { id: '1049269', name: 'อรณี พรมมา',            role: 'Sales',   branch: '0000 - สำนักงานใหญ่', reportTo: '1070920 - ศศิประภา' },
  { id: '1072349', name: 'ปรียานุช พลวิชิต',      role: 'Sales',   branch: '0004 - ขอนแก่น',      reportTo: '1000075 - ไชยพร' },
  { id: '1004301', name: 'พรพรรณณี จันณรงค์',     role: 'Sales',   branch: '0006 - นครราชสีมา',   reportTo: '1000075 - ไชยพร' },
  { id: '1004967', name: 'ชนัญชิดา การนอก',       role: 'Sales',   branch: '0006 - นครราชสีมา',   reportTo: '1000075 - ไชยพร' },
]

export const mockAccounts = [
  { id: '100000806', name: 'บริษัท รุ่ยไท่ คอนสตรัคชั่น จำกัด', taxId: '0105560111111', type: 'นิติบุคคล', mobile: '044-000-0001', owner: 'อรณี พรมมา',       tier: 'Gold',     credit: 500000, outstanding: 120000 },
  { id: '100121763', name: 'นายสุวิเชษฐ์ สุวรรณวงศ์',              taxId: '3401600222222', type: 'บุคคล',     mobile: '087-000-0002', owner: 'ปรียานุช พลวิชิต', tier: 'Silver',   credit: 150000, outstanding: 28000  },
  { id: '100006403', name: 'หจก. 3 เจ.จักราช (1993)',              taxId: '0103550333333', type: 'นิติบุคคล', mobile: '044-000-0003', owner: 'พรพรรณณี จันณรงค์', tier: 'Bronze',   credit: 80000,  outstanding: 5000   },
  { id: '100018098', name: 'บริษัท ดีโฮม ทดสอบ UAT จำกัด',        taxId: '0105xxxxxxxx',  type: 'นิติบุคคล', mobile: '02-000-0004',  owner: 'พนักงานขาย (UAT)', tier: 'Platinum', credit: 2000000, outstanding: 380000 },
  { id: '100005755', name: 'หจก. สุวรรณภัทร์ธนกิจ',               taxId: '0103560555555', type: 'นิติบุคคล', mobile: '044-000-0005', owner: 'ไชยพร เกตมะณี',   tier: 'Gold',     credit: 300000, outstanding: 67000  },
  { id: '300000008', name: 'บริษัท ทิพย์รัชต์ ริเวอร์ วิว จำกัด', taxId: '0105570666666', type: 'นิติบุคคล', mobile: '038-000-0006', owner: 'ภูมิชาย โกศัลวิตร์', tier: 'Gold',  credit: 400000, outstanding: 90000  },
]

export const mockVisitGroups = [
  { id: 'VG001', name: '04.2026-KR00-1052204-เกรียงไกร แก้วจันทร์เป็ง', month: 4, year: 2026, startDate: '01/04/2026', endDate: '30/04/2026', totalExpense: 215.34,   status: 'อนุมัติแผน', createdBy: 'เกรียงไกร แก้วจันทร์เป็ง' },
  { id: 'VG002', name: '04.2026-KR00-1025852-สุกัญญา สิงห์ทอง',         month: 4, year: 2026, startDate: '01/04/2026', endDate: '30/04/2026', totalExpense: 8683.08,  status: 'อนุมัติแผน', createdBy: 'สุกัญญา สิงห์ทอง' },
  { id: 'VG003', name: '04.2026-UB00-1058938-พิชิตชัย เที่ยงแก้ว',      month: 4, year: 2026, startDate: '01/04/2026', endDate: '30/04/2026', totalExpense: 6978.04,  status: 'อนุมัติแผน', createdBy: 'พิชิตชัย เที่ยงแก้ว' },
  { id: 'VG004', name: '04.2026-KR00-1004301-พรพรรณณี จันณรงค์',        month: 4, year: 2026, startDate: '01/04/2026', endDate: '30/04/2026', totalExpense: 7694.64,  status: 'อนุมัติแผน', createdBy: 'พรพรรณณี จันณรงค์' },
  { id: 'VG005', name: '04.2026-KR00-1004967-ชนัญชิดา การนอก',          month: 4, year: 2026, startDate: '01/04/2026', endDate: '30/04/2026', totalExpense: 4118.14,  status: 'รออนุมัติค่าใช้จ่าย', createdBy: 'ชนัญชิดา การนอก' },
  { id: 'VG006', name: '04.2026-UB00-1012819-นงลักษณ์ วงศ์วัชระเมธี',  month: 4, year: 2026, startDate: '01/04/2026', endDate: '30/04/2026', totalExpense: 0,        status: 'แบบร่าง',    createdBy: 'นงลักษณ์ วงศ์วัชระเมธี' },
  { id: 'VG007', name: '04.2026-UB00-1002118-ปรียาภรณ์ ผลชะอุ่ม',      month: 4, year: 2026, startDate: '01/04/2026', endDate: '30/04/2026', totalExpense: 0,        status: 'แบบร่าง',    createdBy: 'ปรียาภรณ์ ผลชะอุ่ม' },
  { id: 'VG008', name: '06.2026-HQ00-1049269-อรณี พรมมา',               month: 6, year: 2026, startDate: '01/06/2026', endDate: '30/06/2026', totalExpense: 0,        status: 'แบบร่าง',    createdBy: 'อรณี พรมมา' },
  { id: 'VG009', name: '04.2026-BP00-1049269-อรณี พรมมา',               month: 4, year: 2026, startDate: '01/04/2026', endDate: '30/04/2026', totalExpense: 12400.00, status: 'อนุมัติแผน', createdBy: 'อรณี พรมมา' },
  { id: 'VG010', name: '04.2026-KK00-1072349-ปรียานุช พลวิชิต',         month: 4, year: 2026, startDate: '01/04/2026', endDate: '30/04/2026', totalExpense: 3200.00,  status: 'อนุมัติแผน', createdBy: 'ปรียานุช พลวิชิต' },
]

export const mockVisits = [
  { id: 'V001', groupName: '04.2026-CM00-1031484-ภาคภูมิ หล้าคำลือ', customerId: '100000806', customerName: 'บ****** ร***** ค***', date: '30/04/2026', time: '09:00-10:00', adhoc: false, branch: '0008', createdBy: '1031484', status: 'รออนุมัติ' },
  { id: 'V002', groupName: '04.2026-UD00-1048730-เตชินี สองเมือง',    customerId: '100005755', customerName: 'ห***** ส*****',      date: '30/04/2026', time: '09:00-10:00', adhoc: false, branch: '0000', createdBy: '1048730', status: 'อนุมัติ' },
  { id: 'V003', groupName: '04.2026-UB00-1047336-มลิวรรณ์ สิทธิการ', customerId: '100000806', customerName: 'บริษัท รุ่ยไท่ คอนสตรัคชั่น', date: '27/04/2026', time: '09:00-10:00', adhoc: false, branch: '0030', createdBy: '1047336', status: 'รออนุมัติ' },
  { id: 'V004', groupName: '04.2026-BR00-1049530-ลาวัลย์ วัชรพลเดช', customerId: '100018098', customerName: 'บ****** ด****',      date: '29/04/2026', time: '09:00-10:00', adhoc: false, branch: '0038', createdBy: '1049530', status: 'อนุมัติ' },
  { id: 'V005', groupName: '-',                                         customerId: '100121763', customerName: 'บริษัท ตั้งเจริญ จำกัด (T.P.K)', date: '24/04/2026', time: '15:00-16:00', adhoc: true, branch: '0001', createdBy: '1000080', status: 'รออนุมัติ' },
  { id: 'V006', groupName: '-',                                         customerId: '300000008', customerName: '1**',               date: '24/04/2026', time: '08:00-09:00', adhoc: true,  branch: '0001', createdBy: '1000080', status: 'รออนุมัติ' },
  { id: 'V007', groupName: '04.2026-BP00-1049269-อรณี พรมมา',         customerId: '100000806', customerName: 'ห****** ห*****',    date: '22/04/2026', time: '12:00-13:00', adhoc: false, branch: '0000', createdBy: '1049269', status: 'เช็คเอาท์แล้ว' },
  { id: 'V008', groupName: '04.2026-KK00-1072349-ปรียานุช พลวิชิต',  customerId: '100121763', customerName: 'นายสุวิเชษฐ์ สุวรรณวงศ์', date: '22/04/2026', time: '09:00-10:00', adhoc: false, branch: '0004', createdBy: '1072349', status: 'รออนุมัติ' },
]

export const mockTasks = [
  { id: 'T001', name: 'UAT-TASK-01: ทดสอบสร้างงาน',        assignee: '1000080 - พนักงานขาย (UAT)', priority: 'สูง',   status: 'ใหม่',            type: 'งานขาย',    dueDate: '30/04/2026', createdBy: '1000080' },
  { id: 'T002', name: 'UAT-TASK-02: ทดสอบ Assign งาน',     assignee: '1000075 - ไชยพร เกตมะณี',    priority: 'กลาง',  status: 'กำลังดำเนินการ', type: 'ติดตาม',    dueDate: '05/05/2026', createdBy: '1000217' },
  { id: 'T003', name: 'UAT-TASK-03: ทดสอบงานเสร็จแล้ว',   assignee: '1000006 - กรวิทย์ เจริญนิตย์', priority: 'ต่ำ', status: 'เสร็จแล้ว',      type: 'รายงาน',    dueDate: '22/04/2026', createdBy: '1000080' },
  { id: 'T004', name: 'UAT-TASK-04: ทดสอบ Import Excel',   assignee: '1000217 - อุไรพร เจริญราษฎร์', priority: 'สูง', status: 'ใหม่',            type: 'Admin',     dueDate: '25/04/2026', createdBy: '1000217' },
  { id: 'T005', name: 'UAT-TASK-05: ทดสอบงานเกินกำหนด',   assignee: '1000181 - ภูมิชาย โกศัลวิตร์', priority: 'สูง', status: 'ค้างอยู่',       type: 'ติดตาม',    dueDate: '01/04/2026', createdBy: '1000075' },
]

export const mockMOUs = [
  { id: 'M001', customerId: '100000806', customerName: 'บริษัท รุ่ยไท่ คอนสตรัคชั่น', mouId: 'MOU-2026-001', category: 'Volume Rebate', status: 'Active',  expireDate: '31/12/2026', target: 5000000,  actual: 2150000 },
  { id: 'M002', customerId: '100018098', customerName: 'บริษัท ดีโฮม ทดสอบ UAT จำกัด', mouId: 'MOU-2026-002', category: 'Special Price', status: 'Active',  expireDate: '30/09/2026', target: 10000000, actual: 6800000 },
  { id: 'M003', customerId: '100005755', customerName: 'หจก. สุวรรณภัทร์ธนกิจ',         mouId: 'MOU-2025-015', category: 'Volume Rebate', status: 'Expired', expireDate: '31/12/2025', target: 2000000,  actual: 1980000 },
  { id: 'M004', customerId: '100121763', customerName: 'นายสุวิเชษฐ์ สุวรรณวงศ์',        mouId: 'MOU-2026-003', category: 'Credit Term',   status: 'Active',  expireDate: '30/06/2026', target: 1500000,  actual: 420000  },
]

export const mockApprovals = [
  { id: 'A001', name: 'โรงแรมบีทู โคราช พรีเมียร์ (Adhoc)',         owner: '1044964', ownerName: 'สันติ ด้นประดิษฐ์',  type: 'Visit (Adhoc)',    lastAction: 'ส่งคำขอ', dateSubmitted: '22/04/2026', status: 'รออนุมัติ' },
  { id: 'A002', name: 'บริษัท ตั้งเจริญ จำกัด T.P.K (Adhoc)',       owner: '1000080', ownerName: 'พนักงานขาย (UAT)',   type: 'Visit (Adhoc)',    lastAction: 'ส่งคำขอ', dateSubmitted: '24/04/2026', status: 'รออนุมัติ' },
  { id: 'A003', name: '05.2026-BP00-1049269-อรณี พรมมา',             owner: '1049269', ownerName: 'อรณี พรมมา',         type: 'Visit Group',      lastAction: 'ส่งคำขอ', dateSubmitted: '01/05/2026', status: 'รออนุมัติ' },
  { id: 'A004', name: '04.2026-KK00-1072349-ปรียานุช พลวิชิต',      owner: '1072349', ownerName: 'ปรียานุช พลวิชิต',  type: 'Visit Group',      lastAction: 'ส่งคำขอ', dateSubmitted: '01/04/2026', status: 'รออนุมัติ' },
  { id: 'A005', name: '04.2026-KR00-1004967-ชนัญชิดา (Expense)',     owner: '1004967', ownerName: 'ชนัญชิดา การนอก',   type: 'Expense Group',    lastAction: 'ส่งคำขอ', dateSubmitted: '30/04/2026', status: 'รออนุมัติ' },
  { id: 'A006', name: 'คำขอ Check-in — 1035493',                     owner: '1035493', ownerName: 'กิตย์มณี (UAT)',    type: 'Check-in/Check-out', lastAction: 'ส่งคำขอ', dateSubmitted: '22/04/2026', status: 'รออนุมัติ' },
  { id: 'A007', name: '04.2026-KR00-1004301-พรพรรณณี จันณรงค์',     owner: '1004301', ownerName: 'พรพรรณณี จันณรงค์', type: 'Visit Group',      lastAction: 'อนุมัติ', dateSubmitted: '01/04/2026', status: 'อนุมัติ' },
]

export const mockForecast = [
  { month: 'ม.ค.', target: 8000000,  commit: 6200000,  bestCase: 7500000,  pipeline: 9200000  },
  { month: 'ก.พ.', target: 8000000,  commit: 5800000,  bestCase: 7200000,  pipeline: 8800000  },
  { month: 'มี.ค.', target: 9000000, commit: 8100000,  bestCase: 9000000,  pipeline: 10500000 },
  { month: 'เม.ย.', target: 9000000, commit: 5200000,  bestCase: 8000000,  pipeline: 11000000 },
  { month: 'พ.ค.', target: 9500000,  commit: 4100000,  bestCase: 7000000,  pipeline: 10200000 },
  { month: 'มิ.ย.', target: 9500000, commit: 2800000,  bestCase: 5500000,  pipeline: 9000000  },
]

export const mockLeaderboard = [
  { rank: 1, name: 'อรณี พรมมา',          id: '1049269', visits: 24, minutesPerVisit: 48, coverage: 92 },
  { rank: 2, name: 'ปรียานุช พลวิชิต',    id: '1072349', visits: 21, minutesPerVisit: 52, coverage: 85 },
  { rank: 3, name: 'พรพรรณณี จันณรงค์',   id: '1004301', visits: 18, minutesPerVisit: 45, coverage: 78 },
  { rank: 4, name: 'ชนัญชิดา การนอก',     id: '1004967', visits: 15, minutesPerVisit: 61, coverage: 65 },
]

export const mockDashboardStats = {
  plan:           80,
  actual:         62,
  totalCustomers: 120,
  totalExpense:   45800,
  pendingTasks:   5,
  pendingApprovals: 6,
}

export const mockForecastByMC = [
  { mc: 'วัสดุก่อสร้าง', target: 18000000, commit: 12400000, bestCase: 16000000, pipeline: 21000000 },
  { mc: 'สุขภัณฑ์',      target: 12000000, commit: 8200000,  bestCase: 10500000, pipeline: 14000000 },
  { mc: 'ไฟฟ้า',         target: 8000000,  commit: 5100000,  bestCase: 7000000,  pipeline: 9500000  },
  { mc: 'เฟอร์นิเจอร์',  target: 6000000,  commit: 3800000,  bestCase: 5200000,  pipeline: 7200000  },
  { mc: 'สี',            target: 5000000,  commit: 2600000,  bestCase: 4000000,  pipeline: 5800000  },
  { mc: 'อื่นๆ',         target: 4000000,  commit: 2000000,  bestCase: 3300000,  pipeline: 4500000  },
]

export const mockForecastByQuarter = [
  { quarter: 'Q1',  target: 24000000, commit: 20100000, bestCase: 23700000, pipeline: 28500000 },
  { quarter: 'Q2',  target: 27000000, commit: 16000000, bestCase: 23500000, pipeline: 32200000 },
  { quarter: 'Q3',  target: 30000000, commit: 9800000,  bestCase: 18000000, pipeline: 27000000 },
  { quarter: 'Q4',  target: 33000000, commit: 4200000,  bestCase: 12000000, pipeline: 24000000 },
]

export const mockDeals = [
  { id: 'D001', name: 'โครงการ The Forest Residence', customer: 'บริษัท รุ่ยไท่ คอนสตรัคชั่น', owner: 'อรณี พรมมา',        ownerId: '1049269', mc: 'วัสดุก่อสร้าง', stage: 'Proposal',    amount: 2400000, prob: 70,  weighted: 1680000, closeDate: '30/06/2026', commit: false, managerOverride: null },
  { id: 'D002', name: 'อาคารพาณิชย์ ถ.ลาดพร้าว',     customer: 'นายสุวิเชษฐ์ สุวรรณวงศ์',   owner: 'ปรียานุช พลวิชิต', ownerId: '1072349', mc: 'สุขภัณฑ์',      stage: 'Negotiation', amount: 850000,  prob: 85,  weighted: 722500,  closeDate: '15/05/2026', commit: true,  managerOverride: null },
  { id: 'D003', name: 'Renovation โรงแรม Feel@Home',   customer: 'Feel@Home Place',            owner: 'อรณี พรมมา',        ownerId: '1049269', mc: 'เฟอร์นิเจอร์',  stage: 'Qualified',   amount: 1200000, prob: 50,  weighted: 600000,  closeDate: '31/07/2026', commit: false, managerOverride: null },
  { id: 'D004', name: 'ปรับปรุงสำนักงาน T.P.K',       customer: 'บริษัท ตั้งเจริญ จำกัด',    owner: 'พนักงานขาย (UAT)', ownerId: '1000080', mc: 'ไฟฟ้า',         stage: 'Prospect',    amount: 480000,  prob: 20,  weighted: 96000,   closeDate: '31/08/2026', commit: false, managerOverride: null },
  { id: 'D005', name: 'ทิพย์รัชต์ ริเวอร์ วิว Phase 2', customer: 'ทิพย์รัชต์ ริเวอร์ วิว', owner: 'ปรียานุช พลวิชิต', ownerId: '1072349', mc: 'วัสดุก่อสร้าง', stage: 'Proposal',    amount: 3200000, prob: 65,  weighted: 2080000, closeDate: '30/09/2026', commit: false, managerOverride: null },
  { id: 'D006', name: 'ห้องน้ำ Premium — สุวรรณภัทร์', customer: 'หจก. สุวรรณภัทร์ธนกิจ',   owner: 'พรพรรณณี จันณรงค์', ownerId: '1004301', mc: 'สุขภัณฑ์',      stage: 'Closed Won',  amount: 620000,  prob: 100, weighted: 620000,  closeDate: '10/04/2026', commit: true,  managerOverride: null },
  { id: 'D007', name: 'ไฟฟ้า + ระบบ Smart Home',       customer: 'บริษัท ดีโฮม ทดสอบ UAT',   owner: 'พนักงานขาย (UAT)', ownerId: '1000080', mc: 'ไฟฟ้า',         stage: 'Negotiation', amount: 1800000, prob: 80,  weighted: 1440000, closeDate: '31/05/2026', commit: true,  managerOverride: 1500000 },
]

export const mockCalendarEvents = [
  { date: '2026-04-20', time: '12:30', customer: 'ดวงรัตนา สุขปูรณะ',         createdBy: '1049269' },
  { date: '2026-04-21', time: '08:00', customer: 'Feel@Home Place',              createdBy: '1072349' },
  { date: '2026-04-22', time: '08:00', customer: 'ทิพย์รัชต์ ริเวอร์ วิว รีสอร์ท 2', createdBy: '1047336' },
  { date: '2026-04-22', time: '12:00', customer: 'C**** ****2',                  createdBy: '1031484' },
  { date: '2026-04-24', time: '15:00', customer: 'บริษัท ตั้งเจริญ จำกัด (T.P.K)', createdBy: '1000080' },
  { date: '2026-04-24', time: '08:00', customer: '1**',                           createdBy: '1000080' },
  { date: '2026-04-27', time: '09:00', customer: 'บริษัท รุ่ยไท่ คอนสตรัคชั่น', createdBy: '1047336' },
  { date: '2026-04-29', time: '09:00', customer: 'ล**** ว*****',                  createdBy: '1049530' },
  { date: '2026-04-30', time: '09:00', customer: 'บ****** ร*****',                createdBy: '1031484' },
  { date: '2026-04-30', time: '09:00', customer: 'ห***** ส*****',                 createdBy: '1048730' },
]

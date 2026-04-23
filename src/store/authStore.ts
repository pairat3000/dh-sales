import { create } from 'zustand'

interface User {
  id: string
  name: string
  role: 'Admin' | 'Manager' | 'Sales' | 'BOF'
  branch: string
  location: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const MOCK_CREDENTIALS: Record<string, { password: string; user: User }> = {
  '1000217': {
    password: '1234',
    user: { id: '1000217', name: 'อุไรพร เจริญราษฎร์', role: 'Admin', branch: 'สำนักงานใหญ่', location: '0000' },
  },
  '1000075': {
    password: '1234',
    user: { id: '1000075', name: 'ไชยพร เกตมะณี', role: 'Manager', branch: 'ขอนแก่น', location: '0004' },
  },
  '1000181': {
    password: '1234',
    user: { id: '1000181', name: 'ภูมิชาย โกศัลวิตร์', role: 'Manager', branch: 'แหลมฉบัง', location: '0026' },
  },
  '1000080': {
    password: '1234',
    user: { id: '1000080', name: 'พนักงานขาย (UAT)', role: 'Sales', branch: 'อุบลราชธานี', location: '0001' },
  },
  '1000006': {
    password: '1234',
    user: { id: '1000006', name: 'กรวิทย์ เจริญนิตย์', role: 'BOF', branch: 'อุบลราชธานี', location: '0001' },
  },
  admin: {
    password: '1234',
    user: { id: '1000217', name: 'อุไรพร เจริญราษฎร์', role: 'Admin', branch: 'สำนักงานใหญ่', location: '0000' },
  },
  manager: {
    password: '1234',
    user: { id: '1000075', name: 'ไชยพร เกตมะณี', role: 'Manager', branch: 'ขอนแก่น', location: '0004' },
  },
  sales: {
    password: '1234',
    user: { id: '1000080', name: 'พนักงานขาย (UAT)', role: 'Sales', branch: 'อุบลราชธานี', location: '0001' },
  },
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (username, password) => {
    const found = MOCK_CREDENTIALS[username.trim()]
    if (found && found.password === password) {
      set({ user: found.user, isAuthenticated: true })
      return true
    }
    return false
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}))

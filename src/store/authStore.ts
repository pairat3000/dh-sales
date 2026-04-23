import { create } from 'zustand'

interface User {
  id: string
  name: string
  role: 'Admin' | 'Manager' | 'Sales' | 'BOF'
  branch: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const MOCK_CREDENTIALS: Record<string, { password: string; user: User }> = {
  admin: {
    password: '1234',
    user: { id: 'U000', name: 'Admin ระบบ', role: 'Admin', branch: 'สำนักงานใหญ่' },
  },
  manager: {
    password: '1234',
    user: { id: 'U004', name: 'วิชัย มั่นคง', role: 'Manager', branch: 'สำนักงานใหญ่' },
  },
  sales: {
    password: '1234',
    user: { id: 'U001', name: 'สมชาย ใจดี', role: 'Sales', branch: 'สาขาลาดพร้าว' },
  },
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (username, password) => {
    const found = MOCK_CREDENTIALS[username.toLowerCase()]
    if (found && found.password === password) {
      set({ user: found.user, isAuthenticated: true })
      return true
    }
    return false
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}))

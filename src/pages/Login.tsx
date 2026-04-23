import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [error, setError]       = useState('')
  const login    = useAuthStore(s => s.login)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (login(username, password)) navigate('/dashboard')
    else setError('ไม่มีสิทธิ์การเข้าถึง กรุณาตรวจสอบชื่อผู้ใช้และรหัสผ่าน')
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #F16027 0%, #D14E18 100%)' }}
    >
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-8" style={{ boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}>
          {/* Logo */}
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-lg mb-3"
              style={{ backgroundColor: '#F16027' }}
            >
              <span className="text-white font-bold text-2xl">Db</span>
            </div>
            <h2 className="text-lg font-semibold text-[#020817]">DH Sales</h2>
            <p className="text-xs text-[#64748B] mt-1">ระบบจัดการตารางนัดหมายลูกค้า</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#020817] block mb-1.5">
                รหัสพนักงาน / Username
              </label>
              <input
                className="input"
                placeholder="เช่น 1000217, admin, manager, sales"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#020817] block mb-1.5">รหัสผ่าน</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  className="input"
                  style={{ paddingRight: 40 }}
                  placeholder="รหัสผ่าน"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#020817]"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-[#EF4444] bg-[#FEE2E2] rounded px-3 py-2">{error}</p>
            )}

            <button type="submit" className="btn-primary w-full justify-center" style={{ marginTop: 8 }}>
              <LogIn size={15} /> เข้าสู่ระบบ
            </button>
          </form>

          {/* Demo hints */}
          <div className="mt-5 p-3 bg-[#F1F5F9] rounded text-xs text-[#64748B] space-y-1">
            <p className="font-medium text-[#020817]">Demo accounts (รหัสผ่าน: 1234)</p>
            <p>Admin: <span className="font-mono">1000217</span> · อุไรพร เจริญราษฎร์</p>
            <p>Manager: <span className="font-mono">1000075</span> · ไชยพร เกตมะณี</p>
            <p>Sales: <span className="font-mono">1000080</span> · พนักงานขาย UAT</p>
            <p>หรือใช้: <span className="font-mono">admin</span> / <span className="font-mono">manager</span> / <span className="font-mono">sales</span></p>
          </div>
        </div>
        <p className="text-center text-white/60 text-xs mt-4">© 2026 Dohome Public Company Limited</p>
      </div>
    </div>
  )
}

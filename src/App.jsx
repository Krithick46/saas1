import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Invoice from './pages/Invoice'
import Schedule from './pages/Schedule'
import Calendar from './pages/Calendar'
import Messages from './pages/Messages'
import Notification from './pages/Notification'
import Settings from './pages/Settings'

const SCREEN_TITLES = {
  dashboard: 'Dashboard',
  analytics: 'Analytics',
  invoice: 'Invoice',
  schedule: 'Schedule',
  calendar: 'Calendar',
  messages: 'Messages',
  notification: 'Notifications',
  settings: 'Settings',
}

const SCREENS = {
  dashboard: Dashboard,
  analytics: Analytics,
  invoice: Invoice,
  schedule: Schedule,
  calendar: Calendar,
  messages: Messages,
  notification: Notification,
  settings: Settings,
}

export default function App() {
  const [screen, setScreen] = useState('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isNarrow, setIsNarrow] = useState(window.innerWidth < 1000)

  useEffect(() => {
    const onResize = () => setIsNarrow(window.innerWidth < 1000)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const title = SCREEN_TITLES[screen] || 'Dashboard'
  const Page = SCREENS[screen] || Dashboard

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%', background: '#FAFAFB', color: '#030229', position: 'relative' }}>
      {/* Mobile backdrop */}
      {isNarrow && mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(3,2,41,0.35)', zIndex: 55 }}
        />
      )}

      <Sidebar
        screen={screen}
        onNavigate={setScreen}
        isNarrow={isNarrow}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Mobile top bar */}
        {isNarrow && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 14, padding: '16px 18px',
            position: 'sticky', top: 0, background: '#FAFAFB', zIndex: 40,
          }}>
            <button
              onClick={() => setMobileOpen(v => !v)}
              style={{
                border: 'none', background: '#fff', width: 42, height: 42,
                borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', boxShadow: '0 2px 8px rgba(3,2,41,0.08)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#030229" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="5" x2="17" y2="5" />
                <line x1="3" y1="10" x2="17" y2="10" />
                <line x1="3" y1="15" x2="17" y2="15" />
              </svg>
            </button>
            <span style={{ fontWeight: 800, fontSize: 18 }}>{title}</span>
            <div style={{ width: 42 }} />
          </div>
        )}

        <Page />
      </main>
    </div>
  )
}

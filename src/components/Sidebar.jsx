import { useState } from 'react'

const NAV_ITEMS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: (color) => (
      <span style={{
        width: 21, height: 21, flexShrink: 0,
        background: color,
        WebkitMask: 'url(/assets/icons/category.svg) center/contain no-repeat',
        mask: 'url(/assets/icons/category.svg) center/contain no-repeat',
        display: 'inline-block',
      }} />
    ),
  },
  {
    key: 'analytics',
    label: 'Analytics',
    icon: (color) => (
      <svg width="21" height="21" viewBox="0 0 20 20" fill={color}>
        <rect x="1" y="11" width="4" height="8" rx="1.5" />
        <rect x="8" y="6" width="4" height="13" rx="1.5" />
        <rect x="15" y="2" width="4" height="17" rx="1.5" />
      </svg>
    ),
  },
  {
    key: 'invoice',
    label: 'Invoice',
    icon: (color) => (
      <svg width="21" height="21" viewBox="0 0 20 20" fill={color}>
        <path d="M4 1.5h12a1.5 1.5 0 011.5 1.5v15l-3-1.8-2.2 1.8-2.3-1.8L7.5 19l-2.2-1.8L2.5 19V3A1.5 1.5 0 014 1.5z" opacity="0.25" />
        <rect x="5.5" y="6" width="9" height="1.8" rx="0.9" />
        <rect x="5.5" y="9.6" width="9" height="1.8" rx="0.9" />
      </svg>
    ),
  },
  {
    key: 'schedule',
    label: 'Schedule',
    icon: (color) => (
      <svg width="21" height="21" viewBox="0 0 20 20" fill={color}>
        <circle cx="3" cy="4.5" r="1.8" />
        <circle cx="3" cy="10" r="1.8" />
        <circle cx="3" cy="15.5" r="1.8" />
        <rect x="7.5" y="3.2" width="11" height="2.6" rx="1.3" />
        <rect x="7.5" y="8.7" width="11" height="2.6" rx="1.3" />
        <rect x="7.5" y="14.2" width="11" height="2.6" rx="1.3" />
      </svg>
    ),
  },
  {
    key: 'calendar',
    label: 'Calendar',
    icon: (color) => (
      <span style={{
        width: 20, height: 21, flexShrink: 0,
        background: color,
        WebkitMask: 'url(/assets/icons/calendar.svg) center/contain no-repeat',
        mask: 'url(/assets/icons/calendar.svg) center/contain no-repeat',
        display: 'inline-block',
      }} />
    ),
  },
  {
    key: 'messages',
    label: 'Messages',
    badge: '49',
    icon: (color) => (
      <svg width="21" height="21" viewBox="0 0 20 20" fill={color}>
        <path d="M10 2C5 2 1.5 5 1.5 9c0 1.9.9 3.6 2.3 4.9-.2 1.2-.8 2.3-1.6 3.1 1.5 0 3-.5 4.2-1.4 1.1.4 2.3.6 3.6.6 5 0 8.5-3 8.5-7S15 2 10 2z" />
      </svg>
    ),
  },
  {
    key: 'notification',
    label: 'Notification',
    icon: (color) => (
      <span style={{
        width: 18, height: 21, flexShrink: 0,
        background: color,
        WebkitMask: 'url(/assets/icons/notification.svg) center/contain no-repeat',
        mask: 'url(/assets/icons/notification.svg) center/contain no-repeat',
        display: 'inline-block',
      }} />
    ),
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: (color) => (
      <span style={{
        width: 20, height: 21, flexShrink: 0,
        background: color,
        WebkitMask: 'url(/assets/icons/setting.svg) center/contain no-repeat',
        mask: 'url(/assets/icons/setting.svg) center/contain no-repeat',
        display: 'inline-block',
      }} />
    ),
  },
]

export default function Sidebar({ screen, onNavigate, isNarrow, mobileOpen, onClose }) {
  const [hoveredKey, setHoveredKey] = useState(null)

  const sidebarStyle = isNarrow
    ? {
        width: 250,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: mobileOpen ? 0 : -270,
        height: '100vh',
        zIndex: 60,
        transition: 'left 0.28s ease',
        boxShadow: mobileOpen ? '0 0 40px rgba(3,2,41,0.18)' : 'none',
        overflowY: 'auto',
      }
    : {
        width: 232,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        flexShrink: 0,
        borderRight: '1px solid #F0F0F3',
        overflowY: 'auto',
      }

  return (
    <aside style={sidebarStyle}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '34px 26px 30px' }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: 'linear-gradient(135deg,#7B8BFF,#605BFF)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <polyline points="4,16 9,10 13,13 21,5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="21" cy="5" r="2.4" fill="#fff" />
          </svg>
        </div>
        <span style={{ fontSize: 24, fontWeight: 800, color: '#030229' }}>Base</span>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', padding: '6px 0', flex: 1 }}>
        {NAV_ITEMS.map(({ key, label, icon, badge }) => {
          const active = screen === key
          const hovered = hoveredKey === key
          const color = active ? '#605BFF' : hovered ? '#605BFF' : 'rgba(3,2,41,0.6)'
          const bg = active
            ? 'rgba(96,91,255,0.08)'
            : hovered
            ? 'rgba(96,91,255,0.06)'
            : 'transparent'

          return (
            <a
              key={key}
              onClick={() => { onNavigate(key); onClose?.() }}
              onMouseEnter={() => setHoveredKey(key)}
              onMouseLeave={() => setHoveredKey(null)}
              style={{
                display: 'flex', alignItems: 'center', gap: 15,
                padding: '12px 24px', margin: '2px 14px', borderRadius: 10,
                cursor: 'pointer', fontWeight: 600, fontSize: 15,
                textDecoration: 'none', background: bg, color,
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              {icon(color)}
              <span style={{ flex: 1 }}>{label}</span>
              {badge && (
                <span style={{
                  background: '#FFE3E3', color: '#FF5B5B',
                  fontSize: 11, fontWeight: 700,
                  padding: '3px 8px', borderRadius: 8,
                }}>
                  {badge}
                </span>
              )}
            </a>
          )
        })}
      </nav>

      {/* Upgrade card */}
      <div style={{
        margin: '10px 22px 18px', borderRadius: 16,
        background: 'linear-gradient(180deg,#EEF1FF,#F6F4FF)',
        padding: 18, textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', left: '50%', top: -10,
          transform: 'translateX(-50%)',
          width: 120, height: 120,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(123,139,255,0.45), rgba(123,139,255,0) 70%)',
        }} />
        <img
          src="/assets/lamp.png"
          alt=""
          style={{
            position: 'relative', width: 96, height: 'auto',
            margin: '0 auto 14px', display: 'block',
            filter: 'brightness(0.92) sepia(1) hue-rotate(193deg) saturate(2.6)',
          }}
        />
        <button style={{
          position: 'relative', width: '100%', border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg,#7B8BFF,#605BFF)',
          color: '#fff', fontFamily: 'inherit', fontWeight: 700, fontSize: 13,
          padding: 12, borderRadius: 10,
          boxShadow: '0 8px 18px rgba(96,91,255,0.35)',
        }}>
          Upgrade Now
        </button>
      </div>

      {/* Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 26px 26px' }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'linear-gradient(135deg,#5B93FF,#605BFF)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontSize: 15, flexShrink: 0,
        }}>EA</div>
        <div style={{ flex: 1, lineHeight: 1.35 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: '#030229' }}>Easin Arafat</div>
          <div style={{ fontSize: 11, color: 'rgba(3,2,41,0.45)' }}>Free Account</div>
        </div>
        <span style={{
          width: 18, height: 18, opacity: 0.4,
          background: '#030229',
          WebkitMask: 'url(/assets/icons/logout.svg) center/contain no-repeat',
          mask: 'url(/assets/icons/logout.svg) center/contain no-repeat',
          cursor: 'pointer', display: 'inline-block',
        }} />
      </div>
    </aside>
  )
}

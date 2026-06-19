import { useState } from 'react'

const NOTIFS = [
  {
    id: 1, type: 'order', icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="#605BFF">
        <path d="M6 8h12l-1 9a2 2 0 01-2 1.8H7A2 2 0 015 17L4 8z" opacity="0.25"/>
        <path d="M7 8a3 3 0 016 0" fill="none" stroke="#605BFF" strokeWidth="1.8"/>
      </svg>
    ),
    iconBg: 'rgba(96,91,255,0.1)',
    title: 'New order received',
    desc: 'Order #INV-0009 from Acme Corp for $4,200 has been placed.',
    time: '2 minutes ago',
    read: false,
  },
  {
    id: 2, type: 'payment', icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="#16a34a">
        <rect x="1" y="5" width="18" height="13" rx="2" opacity="0.2"/>
        <rect x="1" y="8" width="18" height="3" opacity="0.5"/>
        <rect x="3" y="12.5" width="4" height="2" rx="1"/>
      </svg>
    ),
    iconBg: 'rgba(34,197,94,0.1)',
    title: 'Payment confirmed',
    desc: 'Invoice #INV-0001 from Acme Corp has been paid successfully.',
    time: '15 minutes ago',
    read: false,
  },
  {
    id: 3, type: 'message', icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="#5B93FF">
        <path d="M10 2C5 2 1.5 5 1.5 9c0 1.9.9 3.6 2.3 4.9-.2 1.2-.8 2.3-1.6 3.1 1.5 0 3-.5 4.2-1.4 1.1.4 2.3.6 3.6.6 5 0 8.5-3 8.5-7S15 2 10 2z"/>
      </svg>
    ),
    iconBg: 'rgba(91,147,255,0.1)',
    title: 'New message from Sarah',
    desc: 'Sarah Mitchell: "Sure, let me check the report and get back to you!"',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 4, type: 'alert', icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="#FF8F6B">
        <path d="M10 2l7.5 14H2.5L10 2z" opacity="0.2"/>
        <line x1="10" y1="8" x2="10" y2="11.5" stroke="#FF8F6B" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="10" cy="13.5" r="1" fill="#FF8F6B"/>
      </svg>
    ),
    iconBg: 'rgba(255,143,107,0.1)',
    title: 'Low stock alert',
    desc: 'Stock Products inventory dropped below 5 units. Consider restocking.',
    time: '3 hours ago',
    read: true,
  },
  {
    id: 5, type: 'system', icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="#26C0E2">
        <circle cx="10" cy="10" r="8" opacity="0.15"/>
        <path d="M10 6v4l3 2" stroke="#26C0E2" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    iconBg: 'rgba(38,192,226,0.1)',
    title: 'System maintenance scheduled',
    desc: 'Scheduled maintenance on Jun 20, 2:00–4:00 AM UTC. Expect brief downtime.',
    time: '5 hours ago',
    read: true,
  },
  {
    id: 6, type: 'order', icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="#605BFF">
        <path d="M6 8h12l-1 9a2 2 0 01-2 1.8H7A2 2 0 015 17L4 8z" opacity="0.25"/>
        <path d="M7 8a3 3 0 016 0" fill="none" stroke="#605BFF" strokeWidth="1.8"/>
      </svg>
    ),
    iconBg: 'rgba(96,91,255,0.1)',
    title: 'Order shipped',
    desc: 'Order #876368 (Black Sleep Dress) has been shipped and is on its way.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 7, type: 'payment', icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="#FF5B5B">
        <rect x="1" y="5" width="18" height="13" rx="2" opacity="0.2"/>
        <rect x="1" y="8" width="18" height="3" opacity="0.5"/>
        <rect x="3" y="12.5" width="4" height="2" rx="1"/>
      </svg>
    ),
    iconBg: 'rgba(255,91,91,0.1)',
    title: 'Payment overdue',
    desc: 'Invoice #INV-0003 from Global Foods is 4 days overdue. Send a reminder.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 8, type: 'message', icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="#5B93FF">
        <path d="M10 2C5 2 1.5 5 1.5 9c0 1.9.9 3.6 2.3 4.9-.2 1.2-.8 2.3-1.6 3.1 1.5 0 3-.5 4.2-1.4 1.1.4 2.3.6 3.6.6 5 0 8.5-3 8.5-7S15 2 10 2z"/>
      </svg>
    ),
    iconBg: 'rgba(91,147,255,0.1)',
    title: 'Design Team shared a file',
    desc: 'New Figma file "Q3 Dashboard Redesign v2" has been shared in the channel.',
    time: '2 days ago',
    read: true,
  },
]

const FILTERS = ['All', 'Unread', 'Orders', 'Payments', 'Messages']

export default function Notification() {
  const [filter, setFilter] = useState('All')
  const [notifs, setNotifs] = useState(NOTIFS)

  const filtered = notifs.filter(n => {
    if (filter === 'Unread') return !n.read
    if (filter === 'Orders') return n.type === 'order'
    if (filter === 'Payments') return n.type === 'payment'
    if (filter === 'Messages') return n.type === 'message'
    return true
  })

  const unreadCount = notifs.filter(n => !n.read).length

  const markAllRead = () => setNotifs(ns => ns.map(n => ({ ...n, read: true })))
  const markRead = (id) => setNotifs(ns => ns.map(n => n.id === id ? { ...n, read: true } : n))

  return (
    <div style={{ padding: 'clamp(18px,3vw,34px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginBottom: 26 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#030229' }}>Notifications</h1>
          {unreadCount > 0 && (
            <span style={{ background: '#FF5B5B', color: '#fff', fontSize: 13, fontWeight: 700, padding: '4px 10px', borderRadius: 10 }}>
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} style={{
            border: '1px solid #EEEEF2', background: '#fff', cursor: 'pointer',
            fontFamily: 'inherit', fontWeight: 600, fontSize: 13,
            color: '#605BFF', padding: '10px 18px', borderRadius: 10,
          }}>Mark all as read</button>
        )}
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 4, background: '#fff', border: '1px solid #EEEEF2', borderRadius: 12, padding: 4, marginBottom: 24, flexWrap: 'wrap' }}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              fontWeight: 600, fontSize: 13, padding: '9px 16px', borderRadius: 9,
              background: filter === f ? '#605BFF' : 'transparent',
              color: filter === f ? '#fff' : 'rgba(3,2,41,0.5)',
              transition: 'all 0.15s',
            }}
          >{f}</button>
        ))}
      </div>

      {/* Notification list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.length === 0 && (
          <div style={{ background: '#fff', borderRadius: 14, padding: '60px 32px', textAlign: 'center', boxShadow: '0 4px 18px rgba(79,78,105,0.06)', color: 'rgba(3,2,41,0.4)', fontSize: 15, fontWeight: 600 }}>
            No notifications here
          </div>
        )}
        {filtered.map(notif => (
          <div
            key={notif.id}
            onClick={() => markRead(notif.id)}
            style={{
              background: '#fff', borderRadius: 14, padding: '18px 22px',
              boxShadow: '0 4px 18px rgba(79,78,105,0.06)',
              display: 'flex', alignItems: 'flex-start', gap: 16, cursor: 'pointer',
              borderLeft: notif.read ? '3px solid transparent' : '3px solid #605BFF',
              transition: 'border-color 0.2s',
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 12, background: notif.iconBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              {notif.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 15, fontWeight: notif.read ? 600 : 700, color: '#030229' }}>{notif.title}</span>
                {!notif.read && (
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#605BFF', display: 'inline-block', flexShrink: 0 }} />
                )}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(3,2,41,0.55)', marginBottom: 6 }}>{notif.desc}</div>
              <div style={{ fontSize: 12, color: 'rgba(3,2,41,0.35)', fontWeight: 600 }}>{notif.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

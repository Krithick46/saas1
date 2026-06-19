import { useState } from 'react'

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const EVENTS = {
  3:  [{ title: 'Team Meeting', color: '#605BFF' }],
  5:  [{ title: 'Product Launch', color: '#FF8F6B' }],
  8:  [{ title: 'Code Review', color: '#26C0E2' }, { title: 'Design Sync', color: '#605BFF' }],
  10: [{ title: 'Client Call', color: '#FFD66B' }],
  14: [{ title: 'Sprint Demo', color: '#5B93FF' }, { title: 'Retro', color: '#E93BFF' }],
  17: [{ title: 'Q2 Planning', color: '#605BFF' }],
  20: [{ title: 'Investor Update', color: '#FF8F6B' }],
  22: [{ title: 'UX Workshop', color: '#26C0E2' }],
  25: [{ title: 'Team Lunch', color: '#FFD66B' }],
  28: [{ title: 'Monthly Review', color: '#5B93FF' }],
}

const UPCOMING = [
  { date: 'Mon, 14 Jun', time: '09:00 AM', title: 'Sprint Demo', color: '#5B93FF' },
  { date: 'Mon, 14 Jun', time: '03:00 PM', title: 'Retro', color: '#E93BFF' },
  { date: 'Wed, 16 Jun', time: '11:00 AM', title: 'Client Call', color: '#FFD66B' },
  { date: 'Thu, 17 Jun', time: '02:00 PM', title: 'Q2 Planning', color: '#605BFF' },
  { date: 'Sun, 20 Jun', time: '10:00 AM', title: 'Investor Update', color: '#FF8F6B' },
]

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrev = new Date(year, month, 0).getDate()
  const days = []
  for (let i = firstDay - 1; i >= 0; i--) days.push({ day: daysInPrev - i, current: false })
  for (let d = 1; d <= daysInMonth; d++) days.push({ day: d, current: true })
  const remaining = 42 - days.length
  for (let d = 1; d <= remaining; d++) days.push({ day: d, current: false })
  return days
}

export default function Calendar() {
  const [month, setMonth] = useState(5) // June (0-indexed)
  const [year, setYear] = useState(2021)
  const [selected, setSelected] = useState(14)
  const days = getCalendarDays(year, month)

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }

  return (
    <div style={{ padding: 'clamp(18px,3vw,34px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginBottom: 26 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#030229' }}>Calendar</h1>
        <button style={{
          border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          background: 'linear-gradient(135deg,#7B8BFF,#605BFF)',
          color: '#fff', fontWeight: 700, fontSize: 14,
          padding: '12px 22px', borderRadius: 10,
          boxShadow: '0 8px 18px rgba(96,91,255,0.3)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
            <line x1="8" y1="2" x2="8" y2="14" /><line x1="2" y1="8" x2="14" y2="8" />
          </svg>
          New Event
        </button>
      </div>

      <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
        {/* Calendar grid */}
        <div style={{ flex: '2 1 500px', minWidth: 320, background: '#fff', borderRadius: 14, padding: 26, boxShadow: '0 4px 18px rgba(79,78,105,0.06)' }}>
          {/* Month nav */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
            <button onClick={prevMonth} style={{ border: 'none', background: 'rgba(96,91,255,0.07)', color: '#605BFF', width: 36, height: 36, borderRadius: 9, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#030229' }}>{MONTH_NAMES[month]} {year}</h3>
            <button onClick={nextMonth} style={{ border: 'none', background: 'rgba(96,91,255,0.07)', color: '#605BFF', width: 36, height: 36, borderRadius: 9, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
          </div>

          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', marginBottom: 8 }}>
            {DAY_NAMES.map(d => (
              <div key={d} style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, color: 'rgba(3,2,41,0.4)', padding: '0 0 10px' }}>{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '4px 2px' }}>
            {days.map(({ day, current }, i) => {
              const isSelected = current && day === selected
              const events = current ? (EVENTS[day] || []) : []
              return (
                <div
                  key={i}
                  onClick={() => current && setSelected(day)}
                  style={{
                    borderRadius: 10, padding: '8px 4px 6px', minHeight: 70,
                    cursor: current ? 'pointer' : 'default',
                    background: isSelected ? 'linear-gradient(135deg,#7B8BFF,#605BFF)' : 'transparent',
                    opacity: current ? 1 : 0.35,
                    transition: 'background 0.15s',
                  }}
                >
                  <div style={{
                    textAlign: 'center', fontSize: 14, fontWeight: isSelected ? 800 : 600,
                    color: isSelected ? '#fff' : '#030229', marginBottom: 4,
                  }}>{day}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {events.slice(0, 2).map((ev, ei) => (
                      <div key={ei} style={{
                        fontSize: 9, fontWeight: 700, padding: '2px 4px', borderRadius: 4,
                        background: isSelected ? 'rgba(255,255,255,0.25)' : ev.color + '18',
                        color: isSelected ? '#fff' : ev.color,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>{ev.title}</div>
                    ))}
                    {events.length > 2 && (
                      <div style={{ fontSize: 9, color: isSelected ? 'rgba(255,255,255,0.7)' : 'rgba(3,2,41,0.4)', textAlign: 'center' }}>+{events.length - 2}</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Upcoming events */}
        <div style={{ flex: '1 1 260px', minWidth: 240 }}>
          <div style={{ background: '#fff', borderRadius: 14, padding: 26, boxShadow: '0 4px 18px rgba(79,78,105,0.06)' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: 17, fontWeight: 700, color: '#030229' }}>Upcoming Events</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {UPCOMING.map((ev, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                  padding: '14px 16px', borderRadius: 12,
                  background: 'rgba(250,250,251,1)', borderLeft: `3px solid ${ev.color}`,
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#030229', marginBottom: 3 }}>{ev.title}</div>
                    <div style={{ fontSize: 12, color: 'rgba(3,2,41,0.45)' }}>{ev.date}</div>
                    <div style={{ fontSize: 12, color: 'rgba(3,2,41,0.45)', marginTop: 1 }}>{ev.time}</div>
                  </div>
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%', background: ev.color,
                    flexShrink: 0, marginTop: 4, display: 'inline-block',
                  }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

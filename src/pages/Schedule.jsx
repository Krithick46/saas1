import { useState } from 'react'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const TODAY = 14

const WEEK = [
  { day: 'Sun', date: 13 },
  { day: 'Mon', date: 14, active: true },
  { day: 'Tue', date: 15 },
  { day: 'Wed', date: 16 },
  { day: 'Thu', date: 17 },
  { day: 'Fri', date: 18 },
  { day: 'Sat', date: 19 },
]

const TASKS = [
  {
    time: '09:00 AM',
    duration: '1h 30m',
    title: 'Team Standup Meeting',
    desc: 'Daily sync with product and engineering teams',
    color: '#605BFF',
    bg: 'rgba(96,91,255,0.06)',
    border: '#605BFF',
    category: 'Meeting',
    participants: ['EA', 'JS', 'MK'],
  },
  {
    time: '10:30 AM',
    duration: '2h',
    title: 'UI Design Review',
    desc: 'Review new dashboard components and approve designs',
    color: '#26C0E2',
    bg: 'rgba(38,192,226,0.06)',
    border: '#26C0E2',
    category: 'Design',
    participants: ['EA', 'NR'],
  },
  {
    time: '12:00 PM',
    duration: '1h',
    title: 'Lunch Break',
    desc: '',
    color: '#FFD66B',
    bg: 'rgba(255,214,107,0.08)',
    border: '#FFD66B',
    category: 'Break',
    participants: [],
  },
  {
    time: '01:00 PM',
    duration: '1h',
    title: 'Client Call – Acme Corp',
    desc: 'Project status update and next milestone planning',
    color: '#FF8F6B',
    bg: 'rgba(255,143,107,0.07)',
    border: '#FF8F6B',
    category: 'Call',
    participants: ['EA', 'JS', 'AC'],
  },
  {
    time: '02:30 PM',
    duration: '2h',
    title: 'Sprint Planning',
    desc: 'Plan the upcoming 2-week sprint backlog',
    color: '#5B93FF',
    bg: 'rgba(91,147,255,0.06)',
    border: '#5B93FF',
    category: 'Meeting',
    participants: ['EA', 'MK', 'TL', 'VL'],
  },
  {
    time: '05:00 PM',
    duration: '30m',
    title: 'End of Day Review',
    desc: 'Review tasks completed today and update status board',
    color: '#E93BFF',
    bg: 'rgba(233,59,255,0.06)',
    border: '#E93BFF',
    category: 'Review',
    participants: ['EA'],
  },
]

const CATEGORY_COLORS = {
  Meeting: { bg: 'rgba(96,91,255,0.1)', color: '#605BFF' },
  Design: { bg: 'rgba(38,192,226,0.1)', color: '#26C0E2' },
  Break: { bg: 'rgba(255,214,107,0.15)', color: '#B98900' },
  Call: { bg: 'rgba(255,143,107,0.12)', color: '#FF8F6B' },
  Review: { bg: 'rgba(233,59,255,0.1)', color: '#E93BFF' },
}

function Avatar({ initials, idx }) {
  const colors = ['#605BFF', '#5B93FF', '#26C0E2', '#FF8F6B', '#FFD66B']
  return (
    <div style={{
      width: 28, height: 28, borderRadius: '50%',
      background: colors[idx % colors.length] + '22',
      color: colors[idx % colors.length],
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 10, fontWeight: 700, border: '2px solid #fff',
      marginLeft: idx > 0 ? -8 : 0, flexShrink: 0,
    }}>{initials}</div>
  )
}

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState(TODAY)

  return (
    <div style={{ padding: 'clamp(18px,3vw,34px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginBottom: 26 }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 800, color: '#030229' }}>Schedule</h1>
          <div style={{ fontSize: 14, color: 'rgba(3,2,41,0.45)', fontWeight: 600 }}>Monday, 14 June 2021</div>
        </div>
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
          Add Task
        </button>
      </div>

      {/* Week strip */}
      <div style={{ background: '#fff', borderRadius: 14, padding: '16px 20px', boxShadow: '0 4px 18px rgba(79,78,105,0.06)', marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          {WEEK.map(({ day, date }) => {
            const active = date === selectedDay
            return (
              <button
                key={date}
                onClick={() => setSelectedDay(date)}
                style={{
                  flex: 1, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  borderRadius: 12, padding: '12px 8px',
                  background: active ? 'linear-gradient(135deg,#7B8BFF,#605BFF)' : 'transparent',
                  transition: 'all 0.15s',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 600, color: active ? 'rgba(255,255,255,0.75)' : 'rgba(3,2,41,0.45)' }}>{day}</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: active ? '#fff' : '#030229' }}>{date}</span>
                {date === TODAY && !active && (
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#605BFF', display: 'inline-block' }} />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Task list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {TASKS.map((task, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: 14, padding: '20px 24px',
            boxShadow: '0 4px 18px rgba(79,78,105,0.06)',
            borderLeft: `4px solid ${task.border}`,
            display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
          }}>
            {/* Time */}
            <div style={{ minWidth: 100, flexShrink: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#030229' }}>{task.time}</div>
              <div style={{ fontSize: 12, color: 'rgba(3,2,41,0.4)', marginTop: 2 }}>{task.duration}</div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: task.desc ? 4 : 0 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#030229' }}>{task.title}</span>
                {task.category && (
                  <span style={{
                    fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 6,
                    ...CATEGORY_COLORS[task.category],
                  }}>{task.category}</span>
                )}
              </div>
              {task.desc && <div style={{ fontSize: 13, color: 'rgba(3,2,41,0.5)' }}>{task.desc}</div>}
            </div>

            {/* Participants */}
            {task.participants.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {task.participants.map((p, pi) => <Avatar key={pi} initials={p} idx={pi} />)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

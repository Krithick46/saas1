import { useState } from 'react'

const CONVERSATIONS = [
  {
    id: 1, name: 'Sarah Mitchell', initials: 'SM', color: '#605BFF',
    lastMsg: 'Sure, let me check the report and get back to you!', time: '9:42 AM', unread: 3, online: true,
  },
  {
    id: 2, name: 'James Carter', initials: 'JC', color: '#5B93FF',
    lastMsg: 'The invoice has been sent to the client.', time: '8:15 AM', unread: 0, online: true,
  },
  {
    id: 3, name: 'Priya Nair', initials: 'PN', color: '#26C0E2',
    lastMsg: 'Can we schedule a call for tomorrow?', time: 'Yesterday', unread: 1, online: false,
  },
  {
    id: 4, name: 'Marcus Webb', initials: 'MW', color: '#FF8F6B',
    lastMsg: 'Great work on the dashboard design!', time: 'Yesterday', unread: 0, online: false,
  },
  {
    id: 5, name: 'Design Team', initials: 'DT', color: '#E93BFF',
    lastMsg: 'New Figma file has been shared in the channel', time: 'Mon', unread: 12, online: false,
  },
  {
    id: 6, name: 'Alex Thompson', initials: 'AT', color: '#FFD66B',
    lastMsg: 'Please review the pull request when you get a chance', time: 'Sun', unread: 0, online: false,
  },
]

const MESSAGES = {
  1: [
    { from: 'them', text: 'Hey! Have you had a chance to look at the Q2 analytics report I sent over?', time: '9:20 AM' },
    { from: 'me', text: 'Hi Sarah! Yes, I was just going through it. The numbers look great overall.', time: '9:28 AM' },
    { from: 'them', text: 'Thanks! The revenue growth is really promising. What about the customer retention section?', time: '9:31 AM' },
    { from: 'me', text: 'That section needs a bit more work. The data for March seems off — can you double check the source?', time: '9:35 AM' },
    { from: 'them', text: 'Sure, let me check the report and get back to you!', time: '9:42 AM' },
  ],
  2: [
    { from: 'them', text: 'Hey, just wanted to confirm — the Acme Corp invoice is ready.', time: '7:50 AM' },
    { from: 'me', text: 'Great, please send it over to their billing contact.', time: '8:02 AM' },
    { from: 'them', text: 'The invoice has been sent to the client.', time: '8:15 AM' },
  ],
  3: [
    { from: 'them', text: 'Can we schedule a call for tomorrow?', time: 'Yesterday, 4:12 PM' },
  ],
  4: [
    { from: 'them', text: 'Great work on the dashboard design!', time: 'Yesterday, 11:30 AM' },
    { from: 'me', text: 'Thanks Marcus! Appreciate the feedback.', time: 'Yesterday, 11:45 AM' },
  ],
  5: [
    { from: 'them', text: 'New Figma file has been shared in the channel', time: 'Mon, 3:00 PM' },
  ],
  6: [
    { from: 'them', text: 'Please review the pull request when you get a chance', time: 'Sun, 6:00 PM' },
  ],
}

export default function Messages() {
  const [activeConv, setActiveConv] = useState(1)
  const [input, setInput] = useState('')
  const [localMessages, setLocalMessages] = useState(MESSAGES)
  const [search, setSearch] = useState('')

  const conv = CONVERSATIONS.find(c => c.id === activeConv)
  const msgs = localMessages[activeConv] || []

  const filtered = CONVERSATIONS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.lastMsg.toLowerCase().includes(search.toLowerCase())
  )

  const send = () => {
    if (!input.trim()) return
    setLocalMessages(prev => ({
      ...prev,
      [activeConv]: [...(prev[activeConv] || []), { from: 'me', text: input, time: 'Just now' }],
    }))
    setInput('')
  }

  return (
    <div style={{ padding: 'clamp(18px,3vw,34px)' }}>
      <h1 style={{ margin: '0 0 24px', fontSize: 28, fontWeight: 800, color: '#030229' }}>Messages</h1>

      <div style={{ display: 'flex', gap: 22, height: 'calc(100vh - 200px)', minHeight: 500 }}>
        {/* Sidebar */}
        <div style={{ width: 300, flexShrink: 0, background: '#fff', borderRadius: 14, boxShadow: '0 4px 18px rgba(79,78,105,0.06)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '18px 18px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#FAFAFB', border: '1px solid #EEEEF2', borderRadius: 10, padding: '10px 14px' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="rgba(3,2,41,0.4)" strokeWidth="1.8">
                <circle cx="7" cy="7" r="5" /><path d="M11 11l3 3" strokeLinecap="round" />
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search conversations..."
                style={{ border: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 13, color: '#030229', outline: 'none', flex: 1 }}
              />
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filtered.map(conv => (
              <div
                key={conv.id}
                onClick={() => setActiveConv(conv.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px',
                  cursor: 'pointer', transition: 'background 0.1s',
                  background: activeConv === conv.id ? 'rgba(96,91,255,0.06)' : 'transparent',
                  borderLeft: activeConv === conv.id ? '3px solid #605BFF' : '3px solid transparent',
                }}
              >
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%',
                    background: conv.color + '22', color: conv.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 13,
                  }}>{conv.initials}</div>
                  {conv.online && (
                    <span style={{
                      position: 'absolute', bottom: 0, right: 0,
                      width: 10, height: 10, borderRadius: '50%',
                      background: '#22c55e', border: '2px solid #fff',
                    }} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#030229' }}>{conv.name}</span>
                    <span style={{ fontSize: 11, color: 'rgba(3,2,41,0.4)' }}>{conv.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(3,2,41,0.5)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{conv.lastMsg}</div>
                </div>
                {conv.unread > 0 && (
                  <span style={{
                    background: '#FF5B5B', color: '#fff',
                    fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 8, flexShrink: 0,
                  }}>{conv.unread}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div style={{ flex: 1, minWidth: 0, background: '#fff', borderRadius: 14, boxShadow: '0 4px 18px rgba(79,78,105,0.06)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #F0F0F3', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: conv.color + '22', color: conv.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 14,
              }}>{conv.initials}</div>
              {conv.online && (
                <span style={{ position: 'absolute', bottom: 0, right: 0, width: 11, height: 11, borderRadius: '50%', background: '#22c55e', border: '2px solid #fff' }} />
              )}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#030229' }}>{conv.name}</div>
              <div style={{ fontSize: 12, color: conv.online ? '#22c55e' : 'rgba(3,2,41,0.4)', fontWeight: 600 }}>
                {conv.online ? 'Online' : 'Offline'}
              </div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
              {[
                <svg key="call" width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="rgba(3,2,41,0.45)" strokeWidth="1.8"><path d="M2 4.5c0 7.4 6.1 13.5 13.5 13.5l2-3.5-3-1.5-1.5 1.5a9 9 0 01-7-7l1.5-1.5L6 3 2.5 2.5 2 4.5z" /></svg>,
                <svg key="video" width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="rgba(3,2,41,0.45)" strokeWidth="1.8"><rect x="1" y="5" width="12" height="10" rx="2" /><path d="M13 8.5l5-2v7l-5-2" /></svg>,
              ].map((icon, i) => (
                <button key={i} style={{ border: 'none', background: '#FAFAFB', width: 38, height: 38, borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {msgs.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start', gap: 10 }}>
                {msg.from === 'them' && (
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: conv.color + '22', color: conv.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11, flexShrink: 0 }}>{conv.initials}</div>
                )}
                <div style={{ maxWidth: '65%' }}>
                  <div style={{
                    padding: '12px 16px', borderRadius: msg.from === 'me' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                    background: msg.from === 'me' ? 'linear-gradient(135deg,#7B8BFF,#605BFF)' : '#F4F4F8',
                    color: msg.from === 'me' ? '#fff' : '#030229',
                    fontSize: 14, lineHeight: 1.5,
                  }}>{msg.text}</div>
                  <div style={{ fontSize: 11, color: 'rgba(3,2,41,0.35)', marginTop: 4, textAlign: msg.from === 'me' ? 'right' : 'left' }}>{msg.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '14px 24px 20px', borderTop: '1px solid #F0F0F3', display: 'flex', gap: 12, alignItems: 'center' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Type a message..."
              style={{
                flex: 1, border: '1px solid #EEEEF2', borderRadius: 12,
                padding: '12px 16px', fontFamily: 'inherit', fontSize: 14, color: '#030229',
                outline: 'none', background: '#FAFAFB',
              }}
            />
            <button
              onClick={send}
              style={{
                border: 'none', cursor: 'pointer', width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: 'linear-gradient(135deg,#7B8BFF,#605BFF)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(96,91,255,0.35)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 10l16-8-8 16v-8L2 10z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

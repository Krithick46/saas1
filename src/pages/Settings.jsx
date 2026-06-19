import { useState } from 'react'

const TABS = ['Profile', 'Account', 'Notifications', 'Privacy']

function Section({ title, children }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: 26, boxShadow: '0 4px 18px rgba(79,78,105,0.06)', marginBottom: 20 }}>
      <h3 style={{ margin: '0 0 22px', fontSize: 16, fontWeight: 700, color: '#030229' }}>{title}</h3>
      {children}
    </div>
  )
}

function Field({ label, children, note }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'rgba(3,2,41,0.7)', marginBottom: 8 }}>{label}</label>
      {children}
      {note && <div style={{ fontSize: 12, color: 'rgba(3,2,41,0.4)', marginTop: 6 }}>{note}</div>}
    </div>
  )
}

function Input({ value, onChange, type = 'text', placeholder }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%', border: '1px solid #EEEEF2', borderRadius: 10,
        padding: '12px 14px', fontFamily: 'inherit', fontSize: 14,
        color: '#030229', outline: 'none', background: '#FAFAFB',
        boxSizing: 'border-box',
      }}
    />
  )
}

function Toggle({ on, onChange, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #F0F0F3' }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: '#030229' }}>{label}</span>
      <div
        onClick={() => onChange(!on)}
        style={{
          width: 46, height: 26, borderRadius: 13, cursor: 'pointer',
          background: on ? '#605BFF' : '#E2E2E8',
          position: 'relative', transition: 'background 0.2s', flexShrink: 0,
        }}
      >
        <div style={{
          position: 'absolute', top: 3, left: on ? 23 : 3,
          width: 20, height: 20, borderRadius: '50%', background: '#fff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.2s',
        }} />
      </div>
    </div>
  )
}

export default function Settings() {
  const [tab, setTab] = useState('Profile')

  const [profile, setProfile] = useState({
    name: 'Easin Arafat',
    email: 'easin.arafat@example.com',
    phone: '+1 (555) 012-3456',
    role: 'Product Manager',
    bio: 'Product manager with a passion for great UX and data-driven decisions.',
    website: 'https://easin.dev',
  })

  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' })

  const [notifSettings, setNotifSettings] = useState({
    emailOrders: true, emailPayments: true, emailMessages: false,
    pushOrders: true, pushPayments: false, pushMessages: true,
    weeklyDigest: true, productUpdates: false,
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true, showEmail: false, showActivity: true, dataAnalytics: true,
  })

  const toggle = (key) => setNotifSettings(s => ({ ...s, [key]: !s[key] }))
  const togglePrivacy = (key) => setPrivacy(s => ({ ...s, [key]: !s[key] }))

  const SaveBtn = () => (
    <button style={{
      border: 'none', cursor: 'pointer', fontFamily: 'inherit',
      background: 'linear-gradient(135deg,#7B8BFF,#605BFF)',
      color: '#fff', fontWeight: 700, fontSize: 14,
      padding: '12px 28px', borderRadius: 10,
      boxShadow: '0 6px 14px rgba(96,91,255,0.3)',
    }}>Save Changes</button>
  )

  return (
    <div style={{ padding: 'clamp(18px,3vw,34px)' }}>
      <h1 style={{ margin: '0 0 24px', fontSize: 28, fontWeight: 800, color: '#030229' }}>Settings</h1>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, background: '#fff', border: '1px solid #EEEEF2', borderRadius: 12, padding: 4, marginBottom: 26, flexWrap: 'wrap' }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              fontWeight: 600, fontSize: 14, padding: '10px 22px', borderRadius: 9,
              background: tab === t ? '#605BFF' : 'transparent',
              color: tab === t ? '#fff' : 'rgba(3,2,41,0.5)',
              transition: 'all 0.15s',
            }}
          >{t}</button>
        ))}
      </div>

      {tab === 'Profile' && (
        <>
          <Section title="Profile Information">
            {/* Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 26 }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'linear-gradient(135deg,#5B93FF,#605BFF)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 800, fontSize: 26, flexShrink: 0,
              }}>EA</div>
              <div>
                <button style={{ border: '1.5px solid #605BFF', background: 'transparent', color: '#605BFF', fontFamily: 'inherit', fontWeight: 700, fontSize: 13, padding: '9px 18px', borderRadius: 9, cursor: 'pointer', marginRight: 10 }}>
                  Change Photo
                </button>
                <button style={{ border: '1px solid #EEEEF2', background: 'transparent', color: 'rgba(3,2,41,0.5)', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, padding: '9px 18px', borderRadius: 9, cursor: 'pointer' }}>
                  Remove
                </button>
                <div style={{ fontSize: 12, color: 'rgba(3,2,41,0.4)', marginTop: 8 }}>JPG, PNG or GIF. Max 2MB.</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0 24px' }}>
              <Field label="Full Name">
                <Input value={profile.name} onChange={v => setProfile(s => ({ ...s, name: v }))} />
              </Field>
              <Field label="Email Address">
                <Input value={profile.email} onChange={v => setProfile(s => ({ ...s, email: v }))} type="email" />
              </Field>
              <Field label="Phone Number">
                <Input value={profile.phone} onChange={v => setProfile(s => ({ ...s, phone: v }))} />
              </Field>
              <Field label="Role / Title">
                <Input value={profile.role} onChange={v => setProfile(s => ({ ...s, role: v }))} />
              </Field>
              <Field label="Website" note="Your personal or company website">
                <Input value={profile.website} onChange={v => setProfile(s => ({ ...s, website: v }))} />
              </Field>
            </div>

            <Field label="Bio">
              <textarea
                value={profile.bio}
                onChange={e => setProfile(s => ({ ...s, bio: e.target.value }))}
                rows={3}
                style={{
                  width: '100%', border: '1px solid #EEEEF2', borderRadius: 10,
                  padding: '12px 14px', fontFamily: 'inherit', fontSize: 14,
                  color: '#030229', outline: 'none', background: '#FAFAFB',
                  resize: 'vertical', boxSizing: 'border-box',
                }}
              />
            </Field>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SaveBtn />
            </div>
          </Section>
        </>
      )}

      {tab === 'Account' && (
        <>
          <Section title="Change Password">
            <div style={{ maxWidth: 480 }}>
              <Field label="Current Password">
                <Input type="password" value={passwords.current} onChange={v => setPasswords(s => ({ ...s, current: v }))} placeholder="Enter current password" />
              </Field>
              <Field label="New Password">
                <Input type="password" value={passwords.new} onChange={v => setPasswords(s => ({ ...s, new: v }))} placeholder="Enter new password" />
              </Field>
              <Field label="Confirm New Password">
                <Input type="password" value={passwords.confirm} onChange={v => setPasswords(s => ({ ...s, confirm: v }))} placeholder="Confirm new password" />
              </Field>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <SaveBtn />
              </div>
            </div>
          </Section>

          <Section title="Plan & Billing">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#030229', marginBottom: 4 }}>Free Plan</div>
                <div style={{ fontSize: 13, color: 'rgba(3,2,41,0.5)' }}>5 projects · 1 GB storage · Basic analytics</div>
              </div>
              <button style={{
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                background: 'linear-gradient(135deg,#7B8BFF,#605BFF)',
                color: '#fff', fontWeight: 700, fontSize: 13,
                padding: '11px 22px', borderRadius: 10,
                boxShadow: '0 6px 14px rgba(96,91,255,0.3)',
              }}>Upgrade to Pro</button>
            </div>
          </Section>

          <Section title="Danger Zone">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#FF5B5B', marginBottom: 4 }}>Delete Account</div>
                <div style={{ fontSize: 13, color: 'rgba(3,2,41,0.5)' }}>Permanently delete your account and all data. This cannot be undone.</div>
              </div>
              <button style={{
                border: '1.5px solid #FF5B5B', background: 'transparent', cursor: 'pointer',
                fontFamily: 'inherit', fontWeight: 700, fontSize: 13,
                color: '#FF5B5B', padding: '11px 22px', borderRadius: 10,
              }}>Delete Account</button>
            </div>
          </Section>
        </>
      )}

      {tab === 'Notifications' && (
        <>
          <Section title="Email Notifications">
            <Toggle label="New orders" on={notifSettings.emailOrders} onChange={() => toggle('emailOrders')} />
            <Toggle label="Payment received" on={notifSettings.emailPayments} onChange={() => toggle('emailPayments')} />
            <Toggle label="New messages" on={notifSettings.emailMessages} onChange={() => toggle('emailMessages')} />
            <Toggle label="Weekly digest report" on={notifSettings.weeklyDigest} onChange={() => toggle('weeklyDigest')} />
            <Toggle label="Product updates & announcements" on={notifSettings.productUpdates} onChange={() => toggle('productUpdates')} />
          </Section>
          <Section title="Push Notifications">
            <Toggle label="New orders" on={notifSettings.pushOrders} onChange={() => toggle('pushOrders')} />
            <Toggle label="Payment received" on={notifSettings.pushPayments} onChange={() => toggle('pushPayments')} />
            <Toggle label="New messages" on={notifSettings.pushMessages} onChange={() => toggle('pushMessages')} />
          </Section>
        </>
      )}

      {tab === 'Privacy' && (
        <Section title="Privacy Settings">
          <Toggle label="Public profile visibility" on={privacy.profileVisible} onChange={() => togglePrivacy('profileVisible')} />
          <Toggle label="Show email address to others" on={privacy.showEmail} onChange={() => togglePrivacy('showEmail')} />
          <Toggle label="Show activity status" on={privacy.showActivity} onChange={() => togglePrivacy('showActivity')} />
          <Toggle label="Allow usage data analytics" on={privacy.dataAnalytics} onChange={() => togglePrivacy('dataAnalytics')} />
        </Section>
      )}
    </div>
  )
}

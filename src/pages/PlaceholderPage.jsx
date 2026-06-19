export default function PlaceholderPage({ title }) {
  return (
    <div style={{ padding: 'clamp(18px,3vw,34px)' }}>
      <h1 style={{ margin: '0 0 24px', fontSize: 28, fontWeight: 800, color: '#030229' }}>{title}</h1>
      <div style={{
        background: '#fff', borderRadius: 14, padding: '80px 32px',
        textAlign: 'center', boxShadow: '0 4px 18px rgba(79,78,105,0.06)',
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', background: 'rgba(96,91,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#605BFF" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v4l3 2" />
          </svg>
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#030229', marginBottom: 8 }}>{title} screen</div>
        <div style={{ fontSize: 15, color: 'rgba(3,2,41,0.5)', maxWidth: 420, margin: '0 auto' }}>
          This screen is part of the Base kit and is being built in the next pass. Use the sidebar to return to the Dashboard.
        </div>
      </div>
    </div>
  )
}

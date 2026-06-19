export default function AnalyticsCard() {
  return (
    <div style={{
      flex: '1 1 300px', minWidth: 280, background: '#fff', borderRadius: 14,
      padding: 26, boxShadow: '0 4px 18px rgba(79,78,105,0.06)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: '#030229' }}>Analytics</h3>
        <span style={{ color: 'rgba(3,2,41,0.3)', fontWeight: 800, letterSpacing: 1 }}>···</span>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '18px 0' }}>
        <div style={{
          width: 230, height: 230, borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, #6E9BFF, #5B7CFF)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          color: '#fff', boxShadow: '0 18px 40px rgba(91,124,255,0.4)',
        }}>
          <div style={{ fontSize: 40, fontWeight: 800, lineHeight: 1 }}>80%</div>
          <div style={{ fontSize: 15, opacity: 0.9, marginTop: 6 }}>Transactions</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 22, flexWrap: 'wrap' }}>
        {[
          { color: '#5B93FF', label: 'Sale' },
          { color: '#FFD66B', label: 'Distribute' },
          { color: '#FF8F6B', label: 'Return' },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#030229' }}>
            <span style={{ width: 13, height: 13, borderRadius: 4, background: color, display: 'inline-block' }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

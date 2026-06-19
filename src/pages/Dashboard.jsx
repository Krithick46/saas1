import ReportsChart from '../components/ReportsChart'
import AnalyticsCard from '../components/AnalyticsCard'
import RecentOrders from '../components/RecentOrders'
import TopSelling from '../components/TopSelling'

const STAT_CARDS = [
  {
    value: '178+',
    label: 'Save Products',
    bg: 'rgba(91,147,255,0.12)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#5B93FF">
        <path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21z" />
      </svg>
    ),
  },
  {
    value: '20+',
    label: 'Stock Products',
    bg: 'rgba(255,199,67,0.16)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFB200">
        <path d="M7 9a5 5 0 0110 0c1.5 0 2.5 1.3 2.2 2.8l-1 5A3 3 0 0115.3 19H8.7a3 3 0 01-2.9-2.2l-1-5C4.5 10.3 5.5 9 7 9z" />
        <circle cx="9.5" cy="12" r="1" fill="#fff" />
        <circle cx="14.5" cy="12" r="1" fill="#fff" />
      </svg>
    ),
  },
  {
    value: '190+',
    label: 'Sales Products',
    bg: 'rgba(255,143,107,0.14)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#FF8F6B">
        <path d="M6 8h12l-1 11a2 2 0 01-2 1.8H9A2 2 0 017 19L6 8z" />
        <path d="M9 8a3 3 0 016 0" fill="none" stroke="#FF8F6B" strokeWidth="2" />
      </svg>
    ),
  },
  {
    value: '12+',
    label: 'Job Application',
    bg: 'rgba(96,91,255,0.12)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#605BFF">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5.5A1.5 1.5 0 019.5 4h5A1.5 1.5 0 0116 5.5V7" fill="none" stroke="#605BFF" strokeWidth="2" />
      </svg>
    ),
  },
]

const DatePicker = ({ value }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 30,
    background: '#fff', border: '1px solid #EEEEF2', borderRadius: 10,
    padding: '11px 16px', fontWeight: 600, fontSize: 14, color: '#030229', cursor: 'pointer',
  }}>
    {value}
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#030229" strokeWidth="1.6" strokeLinecap="round">
      <path d="M2 4l4 4 4-4" />
    </svg>
  </div>
)

export default function Dashboard() {
  return (
    <div style={{ padding: 'clamp(18px,3vw,34px)' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 14, marginBottom: 26,
      }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#030229' }}>Dashboard</h1>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <DatePicker value="10-06-2021" />
          <DatePicker value="10-10-2021" />
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', marginBottom: 24 }}>
        {STAT_CARDS.map(({ value, label, bg, icon }) => (
          <div key={label} style={{
            flex: '1 1 220px', minWidth: 200, background: '#fff', borderRadius: 14,
            padding: 26, display: 'flex', alignItems: 'center', gap: 20,
            boxShadow: '0 4px 18px rgba(79,78,105,0.06)',
          }}>
            <div style={{
              width: 62, height: 62, borderRadius: '50%', background: bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              {icon}
            </div>
            <div>
              <div style={{ fontSize: 25, fontWeight: 800, color: '#030229', lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 14, color: 'rgba(3,2,41,0.55)', marginTop: 7 }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Reports + Analytics */}
      <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', marginBottom: 24 }}>
        <ReportsChart />
        <AnalyticsCard />
      </div>

      {/* Recent Orders + Top Selling */}
      <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
        <RecentOrders />
        <TopSelling />
      </div>
    </div>
  )
}

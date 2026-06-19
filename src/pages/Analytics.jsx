import { useState } from 'react'

const PERIODS = ['Weekly', 'Monthly', 'Yearly']

const REVENUE_VALS = [42, 68, 45, 75, 55, 88, 62, 91, 74, 83, 96, 78]
const REVENUE_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const W = 900, H = 340
const PAD = { l: 56, r: 20, t: 20, b: 44 }
const X0 = PAD.l, X1 = W - PAD.r, Y0 = PAD.t, Y1 = H - PAD.b
const N = REVENUE_VALS.length
const XS = REVENUE_VALS.map((_, i) => X0 + (X1 - X0) * i / (N - 1))
const YS = REVENUE_VALS.map(v => Y1 - (Y1 - Y0) * (v / 100))
const Y_TICKS = [0, 25, 50, 75, 100]

function smoothPath(xs, ys) {
  let d = 'M ' + xs[0] + ' ' + ys[0]
  for (let i = 0; i < xs.length - 1; i++) {
    const x0 = xs[i - 1] ?? xs[i], y0 = ys[i - 1] ?? ys[i]
    const x1 = xs[i], y1 = ys[i]
    const x2 = xs[i + 1], y2 = ys[i + 1]
    const x3 = xs[i + 2] ?? xs[i + 1], y3 = ys[i + 2] ?? ys[i + 1]
    const c1x = x1 + (x2 - x0) / 6, c1y = y1 + (y2 - y0) / 6
    const c2x = x2 - (x3 - x1) / 6, c2y = y2 - (y3 - y1) / 6
    d += ' C ' + c1x + ' ' + c1y + ' ' + c2x + ' ' + c2y + ' ' + x2 + ' ' + y2
  }
  return d
}

const LINE = smoothPath(XS, YS)
const AREA = LINE + ` L ${X1} ${Y1} L ${X0} ${Y1} Z`

const STATS = [
  { label: 'Total Revenue', value: '$84,254', change: '+12.5%', up: true, color: '#605BFF', bg: 'rgba(96,91,255,0.1)' },
  { label: 'Total Orders', value: '12,543', change: '+8.2%', up: true, color: '#26C0E2', bg: 'rgba(38,192,226,0.1)' },
  { label: 'Customers', value: '3,847', change: '+5.1%', up: true, color: '#5B93FF', bg: 'rgba(91,147,255,0.1)' },
  { label: 'Avg Order Value', value: '$67.20', change: '-2.4%', up: false, color: '#FF8F6B', bg: 'rgba(255,143,107,0.12)' },
]

const TRAFFIC = [
  { label: 'Organic Search', value: 38, color: '#605BFF' },
  { label: 'Direct', value: 24, color: '#5B93FF' },
  { label: 'Social Media', value: 22, color: '#FFD66B' },
  { label: 'Referral', value: 16, color: '#FF8F6B' },
]

function DonutChart({ segments }) {
  const total = segments.reduce((s, x) => s + x.value, 0)
  let startAngle = -Math.PI / 2
  const R = 80, cx = 110, cy = 110, gap = 0.04

  const paths = segments.map(seg => {
    const angle = (seg.value / total) * Math.PI * 2 - gap
    const x1 = cx + R * Math.cos(startAngle)
    const y1 = cy + R * Math.sin(startAngle)
    const endAngle = startAngle + angle
    const x2 = cx + R * Math.cos(endAngle)
    const y2 = cy + R * Math.sin(endAngle)
    const large = angle > Math.PI ? 1 : 0
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} Z`
    startAngle = endAngle + gap
    return { path, color: seg.color }
  })

  return (
    <svg viewBox="0 0 220 220" style={{ width: 180, height: 180 }}>
      <circle cx={cx} cy={cy} r={R} fill="transparent" />
      {paths.map((p, i) => (
        <path key={i} d={p.path} fill={p.color} />
      ))}
      <circle cx={cx} cy={cy} r={52} fill="#fff" />
    </svg>
  )
}

const TOP_PRODUCTS = [
  { name: 'Camera Lens', sales: 325, revenue: '$58,000', growth: '+14%' },
  { name: 'iPhone 12', sales: 211, revenue: '$42,879', growth: '+8%' },
  { name: 'NIKE Shoes', sales: 198, revenue: '$17,226', growth: '+22%' },
  { name: 'Argan Oil', sales: 178, revenue: '$3,738', growth: '+3%' },
  { name: 'EAU DE Parfum', sales: 98, revenue: '$3,136', growth: '-1%' },
]

export default function Analytics() {
  const [period, setPeriod] = useState('Monthly')
  const [hoverIdx, setHoverIdx] = useState(7)
  const STEP = (X1 - X0) / (N - 1)
  const tipX = XS[hoverIdx], tipY = YS[hoverIdx]
  const revVal = `$${Math.round(REVENUE_VALS[hoverIdx] * 843).toLocaleString()}`

  return (
    <div style={{ padding: 'clamp(18px,3vw,34px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginBottom: 26 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#030229' }}>Analytics</h1>
        <div style={{ display: 'flex', gap: 4, background: '#fff', border: '1px solid #EEEEF2', borderRadius: 10, padding: 4 }}>
          {PERIODS.map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                fontWeight: 600, fontSize: 13, padding: '8px 18px', borderRadius: 8,
                background: period === p ? '#605BFF' : 'transparent',
                color: period === p ? '#fff' : 'rgba(3,2,41,0.5)',
                transition: 'all 0.15s',
              }}
            >{p}</button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', marginBottom: 24 }}>
        {STATS.map(({ label, value, change, up, color, bg }) => (
          <div key={label} style={{
            flex: '1 1 200px', minWidth: 180, background: '#fff', borderRadius: 14,
            padding: '22px 24px', boxShadow: '0 4px 18px rgba(79,78,105,0.06)',
          }}>
            <div style={{ fontSize: 13, color: 'rgba(3,2,41,0.5)', fontWeight: 600, marginBottom: 10 }}>{label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#030229', marginBottom: 8 }}>{value}</div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontSize: 12, fontWeight: 700,
              background: up ? 'rgba(34,197,94,0.1)' : 'rgba(255,91,91,0.1)',
              color: up ? '#16a34a' : '#FF5B5B',
              padding: '3px 8px', borderRadius: 6,
            }}>
              {up ? '↑' : '↓'} {change} vs last period
            </div>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div style={{ background: '#fff', borderRadius: 14, padding: '26px 26px 14px', boxShadow: '0 4px 18px rgba(79,78,105,0.06)', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: '#030229' }}>Revenue Overview</h3>
          <span style={{ color: 'rgba(3,2,41,0.3)', fontWeight: 800, letterSpacing: 1 }}>···</span>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
          <defs>
            <linearGradient id="revLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#5B93FF" /><stop offset="1" stopColor="#605BFF" />
            </linearGradient>
            <linearGradient id="revArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#605BFF" stopOpacity="0.15" />
              <stop offset="1" stopColor="#605BFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          {Y_TICKS.map(t => {
            const y = Y1 - (Y1 - Y0) * (t / 100)
            return (
              <g key={t}>
                <line x1={X0} y1={y} x2={X1} y2={y} stroke="#F1F1F5" strokeWidth="1" />
                <text x={X0 - 14} y={y + 4} fill="rgba(3,2,41,0.35)" fontSize="13" fontFamily="Nunito" textAnchor="end">{t}</text>
              </g>
            )
          })}
          {XS.map((x, i) => (
            <text key={i} x={x} y={H - 12} fill="rgba(3,2,41,0.4)" fontSize="13" fontFamily="Nunito" textAnchor="middle">{REVENUE_LABELS[i]}</text>
          ))}
          <path d={AREA} fill="url(#revArea)" />
          <path d={LINE} fill="none" stroke="url(#revLine)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          {XS.map((x, i) => (
            <circle key={i} cx={x} cy={YS[i]} r="4.5" fill="#fff" stroke="#605BFF" strokeWidth="2.5" />
          ))}
          <line x1={tipX} y1={tipY} x2={tipX} y2={Y1} stroke="#B9B9CC" strokeWidth="1.5" strokeDasharray="3 4" />
          <circle cx={tipX} cy={tipY} r="6" fill="#fff" stroke="#605BFF" strokeWidth="3.5" />
          <rect x={tipX - 55} y={tipY - 80} width="110" height="54" rx="11" fill="#030229" />
          <text x={tipX} y={tipY - 56} fill="rgba(255,255,255,0.6)" fontSize="13" fontFamily="Nunito" textAnchor="middle">Revenue</text>
          <text x={tipX} y={tipY - 34} fill="#fff" fontSize="18" fontWeight="700" fontFamily="Nunito" textAnchor="middle">{revVal}</text>
          {XS.map((x, i) => (
            <rect key={i} x={x - STEP / 2} y={20} width={STEP} height={Y1 - 20} fill="transparent" onMouseEnter={() => setHoverIdx(i)} style={{ cursor: 'pointer' }} />
          ))}
        </svg>
      </div>

      {/* Traffic + Top Products */}
      <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
        {/* Traffic sources */}
        <div style={{ flex: '1 1 280px', minWidth: 260, background: '#fff', borderRadius: 14, padding: 26, boxShadow: '0 4px 18px rgba(79,78,105,0.06)' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: 19, fontWeight: 700, color: '#030229' }}>Traffic Sources</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <DonutChart segments={TRAFFIC} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {TRAFFIC.map(({ label, value, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 12, height: 12, borderRadius: 3, background: color, flexShrink: 0, display: 'inline-block' }} />
                  <span style={{ fontSize: 13, color: 'rgba(3,2,41,0.6)', flex: 1 }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#030229' }}>{value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div style={{ flex: '2 1 380px', minWidth: 320, background: '#fff', borderRadius: 14, padding: 26, boxShadow: '0 4px 18px rgba(79,78,105,0.06)' }}>
          <h3 style={{ margin: '0 0 18px', fontSize: 19, fontWeight: 700, color: '#030229' }}>Top Products</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ fontSize: 12, fontWeight: 600, color: 'rgba(3,2,41,0.45)' }}>
                <th style={{ padding: '0 8px 12px 0', textAlign: 'left', fontWeight: 600 }}>Product</th>
                <th style={{ padding: '0 8px 12px', textAlign: 'left', fontWeight: 600 }}>Sales</th>
                <th style={{ padding: '0 8px 12px', textAlign: 'left', fontWeight: 600 }}>Revenue</th>
                <th style={{ padding: '0 0 12px 8px', textAlign: 'right', fontWeight: 600 }}>Growth</th>
              </tr>
            </thead>
            <tbody>
              {TOP_PRODUCTS.map((p, i) => (
                <tr key={p.name} style={{ background: i % 2 === 1 ? '#FAFAFB' : 'transparent' }}>
                  <td style={{ padding: '12px 8px 12px 0', fontSize: 14, fontWeight: 600, color: '#030229', borderRadius: i % 2 === 1 ? '6px 0 0 6px' : 0 }}>{p.name}</td>
                  <td style={{ padding: '12px 8px', fontSize: 14, color: 'rgba(3,2,41,0.7)' }}>{p.sales}</td>
                  <td style={{ padding: '12px 8px', fontSize: 14, color: 'rgba(3,2,41,0.7)' }}>{p.revenue}</td>
                  <td style={{ padding: '12px 0 12px 8px', textAlign: 'right', borderRadius: i % 2 === 1 ? '0 6px 6px 0' : 0 }}>
                    <span style={{
                      fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 6,
                      background: p.growth.startsWith('+') ? 'rgba(34,197,94,0.1)' : 'rgba(255,91,91,0.1)',
                      color: p.growth.startsWith('+') ? '#16a34a' : '#FF5B5B',
                    }}>{p.growth}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

import { useState, useCallback } from 'react'

const VALS = [54, 31, 57, 35, 42, 48, 14, 34, 66, 72]
const X_LABELS = ['10am', '11am', '12am', '01am', '02am', '03am', '04am', '05am', '06am', '07am']
const Y_TICKS = [0, 20, 40, 60, 80, 100]
const MARKER_IDX = [2, 3, 5, 7, 8]

const W = 900, H = 420
const PAD_L = 56, PAD_R = 20, PAD_T = 20, PAD_B = 44
const X0 = PAD_L, X1 = W - PAD_R, Y0 = PAD_T, Y1 = H - PAD_B
const N = VALS.length
const XS = VALS.map((_, i) => X0 + (X1 - X0) * i / (N - 1))
const YS = VALS.map(v => Y1 - (Y1 - Y0) * (v / 100))

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

const LINE_PATH = smoothPath(XS, YS)
const AREA_PATH = LINE_PATH + ' L ' + X1 + ' ' + Y1 + ' L ' + X0 + ' ' + Y1 + ' Z'
const STEP = (X1 - X0) / (N - 1)

export default function ReportsChart() {
  const [hoverIdx, setHoverIdx] = useState(5)

  const tipX = XS[hoverIdx]
  const tipY = YS[hoverIdx]
  const sales = Math.round(VALS[hoverIdx] * 55.79).toLocaleString('en-US')

  return (
    <div style={{
      flex: '2 1 520px', minWidth: 320, background: '#fff', borderRadius: 14,
      padding: '26px 26px 14px',
      boxShadow: '0 4px 18px rgba(79,78,105,0.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: '#030229' }}>Reports</h3>
        <span style={{ color: 'rgba(3,2,41,0.3)', fontWeight: 800, letterSpacing: 1 }}>···</span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#5B93FF" />
            <stop offset="0.5" stopColor="#605BFF" />
            <stop offset="1" stopColor="#E93BFF" />
          </linearGradient>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#605BFF" stopOpacity="0.18" />
            <stop offset="1" stopColor="#605BFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Y grid lines + labels */}
        {Y_TICKS.map(t => {
          const y = Y1 - (Y1 - Y0) * (t / 100)
          return (
            <g key={t}>
              <line x1={X0} y1={y} x2={X1} y2={y} stroke="#F1F1F5" strokeWidth="1" />
              <text x={X0 - 14} y={y + 4} fill="rgba(3,2,41,0.35)" fontSize="13" fontFamily="Nunito" textAnchor="end">{t}</text>
            </g>
          )
        })}

        {/* X labels */}
        {XS.map((x, i) => (
          <text key={i} x={x} y={H - 12} fill="rgba(3,2,41,0.4)" fontSize="13" fontFamily="Nunito" textAnchor="middle">
            {X_LABELS[i]}
          </text>
        ))}

        {/* Area fill */}
        <path d={AREA_PATH} fill="url(#areaGrad)" />

        {/* Line */}
        <path d={LINE_PATH} fill="none" stroke="url(#lineGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

        {/* Markers */}
        {MARKER_IDX.map(i => (
          <circle key={i} cx={XS[i]} cy={YS[i]} r="5.5" fill="#fff" stroke="#7E83FF" strokeWidth="3" />
        ))}

        {/* Tooltip vertical line */}
        <line x1={tipX} y1={tipY} x2={tipX} y2={Y1} stroke="#B9B9CC" strokeWidth="1.5" strokeDasharray="3 4" />

        {/* Active point */}
        <circle cx={tipX} cy={tipY} r="6" fill="#fff" stroke="#605BFF" strokeWidth="3.5" />

        {/* Tooltip box */}
        <g>
          <rect x={tipX - 55} y={tipY - 80} width="110" height="54" rx="11" fill="#030229" />
          <text x={tipX} y={tipY - 56} fill="rgba(255,255,255,0.6)" fontSize="13" fontFamily="Nunito" textAnchor="middle">Sales</text>
          <text x={tipX} y={tipY - 34} fill="#fff" fontSize="18" fontWeight="700" fontFamily="Nunito" textAnchor="middle">{sales}</text>
        </g>

        {/* Hover bands */}
        {XS.map((x, i) => (
          <rect
            key={i}
            x={x - STEP / 2}
            y={20}
            width={STEP}
            height={Y1 - 20}
            fill="transparent"
            onMouseEnter={() => setHoverIdx(i)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </svg>
    </div>
  )
}

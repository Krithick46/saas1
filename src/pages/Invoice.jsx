import { useState } from 'react'

const TABS = ['All', 'Paid', 'Pending', 'Overdue']

const INVOICES = [
  { id: '#INV-0001', client: 'Acme Corp', clientInitials: 'AC', clientColor: '#605BFF', date: '01 Jun 2021', due: '15 Jun 2021', amount: '$4,200.00', status: 'Paid' },
  { id: '#INV-0002', client: 'TechStart Ltd', clientInitials: 'TL', clientColor: '#5B93FF', date: '03 Jun 2021', due: '17 Jun 2021', amount: '$1,850.00', status: 'Pending' },
  { id: '#INV-0003', client: 'Global Foods', clientInitials: 'GF', clientColor: '#26C0E2', date: '05 Jun 2021', due: '10 Jun 2021', amount: '$3,640.00', status: 'Overdue' },
  { id: '#INV-0004', client: 'Nimble Media', clientInitials: 'NM', clientColor: '#FF8F6B', date: '06 Jun 2021', due: '20 Jun 2021', amount: '$890.00', status: 'Paid' },
  { id: '#INV-0005', client: 'BlueWave Inc', clientInitials: 'BW', clientColor: '#FFD66B', date: '08 Jun 2021', due: '22 Jun 2021', amount: '$5,120.00', status: 'Pending' },
  { id: '#INV-0006', client: 'Spark Design', clientInitials: 'SD', clientColor: '#E93BFF', date: '10 Jun 2021', due: '05 Jun 2021', amount: '$2,300.00', status: 'Overdue' },
  { id: '#INV-0007', client: 'Vertex Labs', clientInitials: 'VL', clientColor: '#605BFF', date: '12 Jun 2021', due: '26 Jun 2021', amount: '$7,480.00', status: 'Paid' },
  { id: '#INV-0008', client: 'Nova Retail', clientInitials: 'NR', clientColor: '#5B93FF', date: '14 Jun 2021', due: '28 Jun 2021', amount: '$960.00', status: 'Pending' },
]

const STATUS_STYLE = {
  Paid: { bg: 'rgba(34,197,94,0.1)', color: '#16a34a' },
  Pending: { bg: 'rgba(255,199,67,0.15)', color: '#B98900' },
  Overdue: { bg: 'rgba(255,91,91,0.12)', color: '#FF5B5B' },
}

export default function Invoice() {
  const [tab, setTab] = useState('All')

  const filtered = tab === 'All' ? INVOICES : INVOICES.filter(inv => inv.status === tab)

  const totals = {
    paid: INVOICES.filter(i => i.status === 'Paid').reduce((s, i) => s + parseFloat(i.amount.replace(/[$,]/g, '')), 0),
    pending: INVOICES.filter(i => i.status === 'Pending').reduce((s, i) => s + parseFloat(i.amount.replace(/[$,]/g, '')), 0),
    overdue: INVOICES.filter(i => i.status === 'Overdue').reduce((s, i) => s + parseFloat(i.amount.replace(/[$,]/g, '')), 0),
  }

  return (
    <div style={{ padding: 'clamp(18px,3vw,34px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginBottom: 26 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#030229' }}>Invoice</h1>
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
          New Invoice
        </button>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', marginBottom: 24 }}>
        {[
          { label: 'Total Paid', value: `$${totals.paid.toLocaleString()}`, color: '#16a34a', bg: 'rgba(34,197,94,0.08)' },
          { label: 'Total Pending', value: `$${totals.pending.toLocaleString()}`, color: '#B98900', bg: 'rgba(255,199,67,0.1)' },
          { label: 'Total Overdue', value: `$${totals.overdue.toLocaleString()}`, color: '#FF5B5B', bg: 'rgba(255,91,91,0.08)' },
          { label: 'Total Invoices', value: INVOICES.length, color: '#605BFF', bg: 'rgba(96,91,255,0.08)' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} style={{
            flex: '1 1 180px', minWidth: 160, background: '#fff', borderRadius: 14,
            padding: '22px 24px', boxShadow: '0 4px 18px rgba(79,78,105,0.06)',
          }}>
            <div style={{ fontSize: 13, color: 'rgba(3,2,41,0.5)', fontWeight: 600, marginBottom: 8 }}>{label}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div style={{ background: '#fff', borderRadius: 14, padding: 26, boxShadow: '0 4px 18px rgba(79,78,105,0.06)' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '1px solid #F0F0F3', paddingBottom: 0 }}>
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                fontWeight: 600, fontSize: 14, padding: '10px 20px',
                background: 'transparent', color: tab === t ? '#605BFF' : 'rgba(3,2,41,0.45)',
                borderBottom: tab === t ? '2px solid #605BFF' : '2px solid transparent',
                marginBottom: -1, transition: 'all 0.15s',
              }}
            >{t}</button>
          ))}
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr style={{ fontSize: 13, fontWeight: 600, color: 'rgba(3,2,41,0.45)', textAlign: 'left' }}>
                <th style={{ padding: '0 12px 14px 0', fontWeight: 600 }}>Invoice</th>
                <th style={{ padding: '0 12px 14px', fontWeight: 600 }}>Client</th>
                <th style={{ padding: '0 12px 14px', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '0 12px 14px', fontWeight: 600 }}>Due Date</th>
                <th style={{ padding: '0 12px 14px', fontWeight: 600 }}>Amount</th>
                <th style={{ padding: '0 0 14px 12px', fontWeight: 600, textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv, i) => (
                <tr key={inv.id} style={{ background: i % 2 === 1 ? '#FAFAFB' : 'transparent' }}>
                  <td style={{ padding: '14px 12px 14px 0', fontSize: 14, fontWeight: 700, color: '#605BFF', borderRadius: i % 2 === 1 ? '6px 0 0 6px' : 0 }}>{inv.id}</td>
                  <td style={{ padding: '14px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                        background: inv.clientColor + '22',
                        color: inv.clientColor,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: 12,
                      }}>{inv.clientInitials}</div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#030229' }}>{inv.client}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 12px', fontSize: 14, color: 'rgba(3,2,41,0.6)' }}>{inv.date}</td>
                  <td style={{ padding: '14px 12px', fontSize: 14, color: inv.status === 'Overdue' ? '#FF5B5B' : 'rgba(3,2,41,0.6)', fontWeight: inv.status === 'Overdue' ? 600 : 400 }}>{inv.due}</td>
                  <td style={{ padding: '14px 12px', fontSize: 14, fontWeight: 700, color: '#030229' }}>{inv.amount}</td>
                  <td style={{ padding: '14px 0 14px 12px', textAlign: 'center', borderRadius: i % 2 === 1 ? '0 6px 6px 0' : 0 }}>
                    <span style={{
                      fontSize: 12, fontWeight: 700, padding: '5px 14px', borderRadius: 8,
                      ...STATUS_STYLE[inv.status],
                    }}>{inv.status}</span>
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

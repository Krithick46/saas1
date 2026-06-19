const ORDERS = [
  {
    id: '#876364',
    name: 'Camera Lens',
    img: null,
    price: '$178',
    qty: 325,
    total: '$1,46,660',
    alt: true,
  },
  {
    id: '#876368',
    name: 'Black Sleep Dress',
    img: '/assets/order-dress.jpg',
    price: '$14',
    qty: 53,
    total: '$46,660',
    alt: false,
  },
  {
    id: '#876412',
    name: 'Argan Oil',
    img: '/assets/order-argan.jpg',
    price: '$21',
    qty: 78,
    total: '$3,46,676',
    alt: true,
  },
  {
    id: '#876621',
    name: 'EAU DE Parfum',
    img: '/assets/order-parfum.jpg',
    price: '$32',
    qty: 98,
    total: '$3,46,981',
    alt: false,
  },
]

export default function RecentOrders() {
  return (
    <div style={{
      flex: '2 1 520px', minWidth: 320, background: '#fff', borderRadius: 14,
      padding: 26, boxShadow: '0 4px 18px rgba(79,78,105,0.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: '#030229' }}>Recent Orders</h3>
        <span style={{ color: 'rgba(3,2,41,0.3)', fontWeight: 800, letterSpacing: 1 }}>···</span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 480 }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'rgba(3,2,41,0.55)', fontSize: 13, fontWeight: 600 }}>
              <th style={{ padding: '0 8px 16px 0', fontWeight: 600 }}>Tracking no</th>
              <th style={{ padding: '0 8px 16px', fontWeight: 600 }}>Product Name</th>
              <th style={{ padding: '0 8px 16px', fontWeight: 600 }}>Price</th>
              <th style={{ padding: '0 8px 16px', fontWeight: 600 }}>Total Order</th>
              <th style={{ padding: '0 0 16px 8px', fontWeight: 600, textAlign: 'right' }}>Total Amount</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: 14, color: '#030229' }}>
            {ORDERS.map((order) => (
              <tr key={order.id} style={{ background: order.alt ? 'transparent' : '#FAFAFB' }}>
                <td style={{
                  padding: '14px 8px 14px 0',
                  borderRadius: order.alt ? 0 : '6px 0 0 6px',
                }}>
                  {order.id}
                </td>
                <td style={{ padding: '14px 8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {order.img
                      ? <img src={order.img} alt={order.name} style={{ width: 30, height: 30, borderRadius: 6, objectFit: 'cover' }} />
                      : <span style={{ width: 30, height: 30, borderRadius: 6, background: '#F1F1F4', display: 'inline-block' }} />
                    }
                    {order.name}
                  </div>
                </td>
                <td style={{ padding: '14px 8px' }}>{order.price}</td>
                <td style={{ padding: '14px 8px' }}>
                  <span style={{
                    background: 'rgba(38,192,226,0.1)', color: '#26C0E2',
                    fontWeight: 700, fontSize: 12,
                    padding: '6px 16px', borderRadius: 8,
                  }}>
                    {order.qty}
                  </span>
                </td>
                <td style={{
                  padding: '14px 0 14px 8px',
                  textAlign: 'right', fontWeight: 600,
                  borderRadius: order.alt ? 0 : '0 6px 6px 0',
                }}>
                  {order.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

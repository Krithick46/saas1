const Stars = ({ filled = 4, total = 5 }) => (
  <div style={{ color: '#FFC745', fontSize: 14, letterSpacing: 2, marginBottom: 6 }}>
    {'★'.repeat(filled)}
    <span style={{ color: '#E2E2E8' }}>{'★'.repeat(total - filled)}</span>
  </div>
)

const PRODUCTS = [
  {
    img: '/assets/nike-shoe.jpg',
    name: 'NIKE Shoes Black Pattern',
    stars: 4,
    price: '$87',
  },
  {
    img: '/assets/iphone12.png',
    name: 'iPhone 12',
    stars: 4,
    price: '$987',
    imgBg: '#EAF0FF',
  },
]

export default function TopSelling() {
  return (
    <div style={{
      flex: '1 1 300px', minWidth: 280, background: '#fff', borderRadius: 14,
      padding: 26, boxShadow: '0 4px 18px rgba(79,78,105,0.06)',
    }}>
      <h3 style={{ margin: '0 0 22px', fontSize: 19, fontWeight: 700, color: 'rgba(3,2,41,0.7)' }}>
        Top Selling Products
      </h3>

      {PRODUCTS.map((product, i) => (
        <div key={product.name}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img
              src={product.img}
              alt={product.name}
              style={{
                width: 84, height: 84, borderRadius: 12, objectFit: 'cover',
                flexShrink: 0, background: product.imgBg || 'transparent',
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, color: '#030229', marginBottom: 6 }}>{product.name}</div>
              <Stars filled={product.stars} />
              <div style={{ fontWeight: 800, fontSize: 15 }}>{product.price}</div>
            </div>
          </div>
          {i < PRODUCTS.length - 1 && (
            <div style={{ height: 1, background: 'rgba(3,2,41,0.05)', margin: '22px 0' }} />
          )}
        </div>
      ))}
    </div>
  )
}

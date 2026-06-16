import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const RED  = '#A8232A'
const font = "'Pretendard', -apple-system, sans-serif"

const navItems = [
  { label: '다인 전문가', path: '/partners' },
  { label: '고객 리뷰',       path: '/review' },
  { label: '문의하기',   path: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(245,244,240,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(34,34,34,0.06)',
        fontFamily: font,
      }}>
        <div style={{
          maxWidth: 1000, margin: '0 auto',
          padding: '0 20px',
          height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* 로고 */}
          <Link to="/" onClick={() => setOpen(false)} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/logo.png" alt="다인" style={{ height: 40, objectFit: 'contain' }} />
            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#222', letterSpacing: '0.05em' }}>믿고 맡길 수 있는 전문가를 찾는 곳, 다인</span>
          </Link>

          {/* 데스크탑 메뉴 */}
          <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }}
            className="desktop-nav">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} style={{
                textDecoration: 'none',
                fontSize: '0.88rem', fontWeight: 600,
                color: location.pathname.startsWith(item.path) ? RED : 'rgba(34,34,34,0.65)',
                borderBottom: location.pathname.startsWith(item.path) ? `2px solid ${RED}` : '2px solid transparent',
                paddingBottom: 2,
                transition: 'color 0.15s',
                whiteSpace: 'nowrap',
              }}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 햄버거 버튼 (모바일) */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="메뉴"
            style={{
              background: 'none', border: 'none',
              cursor: 'pointer', padding: 8,
              display: 'flex', flexDirection: 'column',
              gap: 5, justifyContent: 'center', alignItems: 'center',
            }}
            className="mobile-menu-btn"
          >
            <span style={{
              display: 'block', width: 22, height: 2,
              background: open ? RED : '#222',
              borderRadius: 2,
              transform: open ? 'translateY(7px) rotate(45deg)' : 'none',
              transition: 'all 0.25s',
            }} />
            <span style={{
              display: 'block', width: 22, height: 2,
              background: open ? RED : '#222',
              borderRadius: 2,
              opacity: open ? 0 : 1,
              transition: 'all 0.25s',
            }} />
            <span style={{
              display: 'block', width: 22, height: 2,
              background: open ? RED : '#222',
              borderRadius: 2,
              transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none',
              transition: 'all 0.25s',
            }} />
          </button>
        </div>
      </header>

      {/* 모바일 드로어 */}
      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: 'rgba(0,0,0,0.3)',
        }} onClick={() => setOpen(false)}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'absolute', top: 64, right: 0,
              width: '72%', maxWidth: 280,
              background: '#FDFCF8',
              boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
              padding: '12px 0 32px',
              fontFamily: font,
            }}
          >
            {navItems.map((item, i) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  padding: '16px 28px',
                  textDecoration: 'none',
                  fontSize: '1rem', fontWeight: 700,
                  color: location.pathname.startsWith(item.path) ? RED : '#222',
                  background: location.pathname.startsWith(item.path) ? 'rgba(168,35,42,0.05)' : 'transparent',
                  borderLeft: location.pathname.startsWith(item.path) ? `3px solid ${RED}` : '3px solid transparent',
                }}
              >
                {item.label}
              </Link>
            ))}

            <div style={{ margin: '20px 28px 0', borderTop: '1px solid rgba(34,34,34,0.08)', paddingTop: 20 }}>
              <p style={{ fontSize: '0.72rem', color: '#aaa', lineHeight: 1.6 }}>
                좋은 시공은 좋은 사람에게서 시작됩니다.<br />
                다인은 믿을 수 있는 전문가와 고객을 연결합니다.
           
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .desktop-nav { display: none !important; }
        .mobile-menu-btn { display: flex !important; }

        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </>
  )
}
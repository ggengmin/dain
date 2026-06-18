import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

const RED   = '#A8232A'
const BG    = '#F5F4F0'
const WHITE = '#FFFFFF'
const font  = "'Pretendard', -apple-system, sans-serif"

function formatDate(timestamp) {
  if (!timestamp) return ''
  const d = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp)
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
}

// ── 모달 ──────────────────────────────────────────────────────
function ReviewModal({ item, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.55)',
        zIndex: 300,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: WHITE, borderRadius: 20,
          maxWidth: 480, width: '100%',
          maxHeight: '85vh', overflowY: 'auto',
          fontFamily: font,
        }}
      >
        {/* 사진 */}
        {item.photos?.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: item.photos.length === 1 ? '1fr'
              : item.photos.length === 2 ? '1fr 1fr' : '1fr 1fr 1fr',
            gap: 2,
          }}>
            {item.photos.map((url, i) => (
              <div key={i} style={{ aspectRatio: '1', overflow: 'hidden', background: '#EAE8E2' }}>
                <img src={url} alt={`시공사진 ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            ))}
          </div>
        )}

        <div style={{ padding: '24px 24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{
              fontSize: '0.7rem', fontWeight: 700, color: RED,
              background: 'rgba(168,35,42,0.07)',
              padding: '4px 10px', borderRadius: 4,
            }}>{item.category}</span>
            <span style={{ fontSize: '0.75rem', color: '#bbb' }}>{formatDate(item.date)}</span>
          </div>

          <p style={{
            fontSize: '0.95rem', color: '#222',
            lineHeight: 1.9, marginBottom: 16, wordBreak: 'keep-all',
          }}>
            "{item.review?.text}"
          </p>

          {item.partnerName && (
            <p style={{ fontSize: '0.75rem', color: '#aaa', marginBottom: 20 }}>
              {item.partnerName}
            </p>
          )}

          <button onClick={onClose} style={{
            width: '100%', padding: '12px',
            borderRadius: 10, border: '1px solid #E5E5E5',
            background: '#fff', fontSize: '0.85rem',
            fontWeight: 600, color: '#888',
            cursor: 'pointer', fontFamily: font,
          }}>
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 리뷰 카드 ─────────────────────────────────────────────────
function ReviewCard({ item, onClick }) {
  const [photoIdx, setPhotoIdx] = useState(0)
  const photos = item.photos || []

  return (
    <div
      onClick={onClick}
      style={{
        background: WHITE,
        border: '1px solid rgba(34,34,34,0.06)',
        borderRadius: 16, overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column',
        height: 300,
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.09)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* 사진 */}
      <div style={{ height: 150, flexShrink: 0, position: 'relative', background: '#EAE8E2', overflow: 'hidden' }}>
      {photos.length > 0 ? (
        <img src={photos[photoIdx]} alt="시공사진"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '2rem', opacity: 0.2 }}>🔨</span>
        </div>
      )}

      {photoIdx > 0 && (
        <button onClick={e => { e.stopPropagation(); setPhotoIdx(p => p - 1) }}
          style={{ position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.35)', border: 'none', color: '#fff',
            borderRadius: '50%', width: 26, height: 26, cursor: 'pointer', fontSize: '1rem' }}>‹</button>
      )}
      {photoIdx < photos.length - 1 && (
        <button onClick={e => { e.stopPropagation(); setPhotoIdx(p => p + 1) }}
          style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.35)', border: 'none', color: '#fff',
            borderRadius: '50%', width: 26, height: 26, cursor: 'pointer', fontSize: '1rem' }}>›</button>
      )}
      {photos.length > 1 && (
        <div style={{ position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 4 }}>
          {photos.map((_, i) => (
            <div key={i} style={{
              width: i === photoIdx ? 14 : 5, height: 5, borderRadius: 3,
              background: i === photoIdx ? '#fff' : 'rgba(255,255,255,0.5)',
              transition: 'all 0.2s',
            }} />
          ))}
        </div>
      )}
        {/* 안심케어 인증 뱃지 */}
        <span style={{
          position: 'absolute', top: 8, left: 8,
          background: 'rgba(168,35,42,0.85)', color: '#fff',
          fontSize: '0.6rem', fontWeight: 700,
          padding: '3px 7px', borderRadius: 4, fontFamily: font,
          letterSpacing: '0.03em',
        }}>안심케어 인증</span>
      </div>

      {/* 텍스트 */}
      <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexShrink: 0 }}>
          <span style={{
            fontSize: '0.66rem', fontWeight: 700,
            color: RED, background: 'rgba(168,35,42,0.07)',
            padding: '2px 7px', borderRadius: 4, fontFamily: font,
          }}>{item.category}</span>
          <span style={{ fontSize: '0.7rem', color: '#ccc', fontFamily: font }}>
            {formatDate(item.date)}
          </span>
        </div>

        <p style={{
          fontSize: '0.875rem', color: '#333', fontFamily: font,
          lineHeight: 1.75, margin: 0, flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden', wordBreak: 'keep-all',
        }}>
          "{item.review?.text}"
        </p>

        {item.partnerName && (
          <p style={{
            fontSize: '0.7rem', color: '#ccc',
            fontFamily: font, marginTop: 8, marginBottom: 0, flexShrink: 0,
          }}>
            {item.partnerName}
          </p>
        )}
      </div>
    </div>
  )
}

// ── 메인 ──────────────────────────────────────────────────────
export default function Review() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, 'care'),
          where('isActivated', '==', true),
        )
        const snap = await getDocs(q)
        const data = snap.docs
          .map(d => ({ docId: d.id, ...d.data() }))
          .sort((a, b) => {
            const aTime = a.date?.toDate?.() ?? new Date(0)
            const bTime = b.date?.toDate?.() ?? new Date(0)
            return bTime - aTime
          })
        setReviews(data)
      } catch (err) {
        console.error('[리뷰 불러오기 오류]', err)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  return (
    <main style={{ fontFamily: font, background: BG, minHeight: '100vh', paddingBottom: 80 }}>

      {/* ── 히어로 ── */}
      <section style={{
        background: WHITE,
        borderBottom: '1px solid rgba(34,34,34,0.06)',
        padding: '64px 24px 48px',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.025,
          backgroundImage: `radial-gradient(${RED} 0.8px, transparent 0.8px)`,
          backgroundSize: '18px 18px', pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 600, margin: '0 auto' }}>
          <p style={{
            fontSize: '0.72rem', fontWeight: 700, color: RED,
            letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 14,
          }}>
            DAIN CARE REVIEW
          </p>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 800, color: '#111',
            lineHeight: 1.5, marginBottom: 20,
            letterSpacing: '-0.02em',
          }}>
            시공이 끝난 뒤, 다인이 발급하는<br />
            <span style={{ color: RED }}>'안심케어 인증서'</span>를 받으신<br />
            고객님만 작성할 수 있는 책임 기록입니다.
          </h1>
          <p style={{
            fontSize: '0.88rem', color: '#666', lineHeight: 1.9,
            maxWidth: 480, margin: '0 auto', wordBreak: 'keep-all', fontWeight: 500,
          }}>
            다인의 리뷰는 전문가의 실력을 증명하고, 고객에게 보여주는 곳입니다. 허위 리뷰를 원천 차단하기 위해, 현장 검수와 마감이 공식 인증된 고객님만 직접 작성하실 수 있습니다.
          </p>
          <p style={{
            fontSize: '0.82rem', color: '#aaa',
            marginTop: 16, fontWeight: 500,
          }}>
            고객에게는 믿을 수 있는 선택을, 전문가에게는 정당한 가치를.
          </p>
        </div>
      </section>

      {/* ── 리뷰 리스트 ── */}
      <section style={{ padding: '36px 24px 0' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#222' }}>
              전체 후기
              {reviews.length > 0 && (
                <span style={{ fontSize: '0.78rem', color: '#aaa', fontWeight: 500, marginLeft: 8 }}>
                  {reviews.length}건
                </span>
              )}
            </h2>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ color: '#bbb', fontSize: '0.88rem' }}>후기를 불러오는 중...</p>
            </div>
          )}

          {!loading && reviews.length === 0 && (
            <div style={{
              textAlign: 'center', padding: '80px 20px',
              background: WHITE, borderRadius: 16,
              border: '1px solid rgba(34,34,34,0.05)',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 16, opacity: 0.25 }}>📋</div>
              <p style={{ fontWeight: 800, fontSize: '1rem', color: '#333', marginBottom: 8 }}>
                아직 등록된 후기가 없습니다.
              </p>
              <p style={{ fontSize: '0.82rem', color: '#aaa', lineHeight: 1.7 }}>
                첫 번째 안심케어 후기의 주인공이 되어주세요.
              </p>
            </div>
          )}

          {!loading && reviews.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 16,
            }}>
              {reviews.map((item) => (
                <ReviewCard
                  key={item.docId}
                  item={item}
                  onClick={() => setSelected(item)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 하단 CTA ── */}
      {!loading && reviews.length > 0 && (
        <section style={{ padding: '48px 24px 0', textAlign: 'center' }}>
          <div style={{ maxWidth: 480, margin: '0 auto' }}>
            <p style={{ fontSize: '0.95rem', color: '#333', lineHeight: 1.8, marginBottom: 20, fontWeight: 500 }}>
             우리 집에 딱 필요한 믿을 수 있는 선택, <br/> 다인이 검증한 분야별 전문가를 지금 만나보세요.
            </p>
            <a href="/partners" style={{
              display: 'inline-block', background: RED, color: '#fff',
              padding: '14px 36px', borderRadius: 6,
              fontWeight: 700, fontSize: '0.92rem',
              textDecoration: 'none', fontFamily: font,
              boxShadow: '0 4px 16px rgba(168,35,42,0.25)',
            }}>
              우리집 전문가 찾으러 가기 →
            </a>
          </div>
        </section>
      )}

      {/* ── 모달 ── */}
      {selected && (
        <ReviewModal item={selected} onClose={() => setSelected(null)} />
      )}

    </main>
  )
}
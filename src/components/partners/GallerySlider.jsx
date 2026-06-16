// components/partners/GallerySlider.jsx
// 역할: 파트너 시공 갤러리 슬라이더
// - 화면 너비에 따라 보이는 장수 자동 조절
// - 좌우 화살표로 넘기기
// - 클릭하면 모달로 크게 보기

import { useState, useEffect, useRef } from 'react'

const RED  = '#A8232A'
const font = "'Pretendard', -apple-system, sans-serif"

// ── 모달 ──────────────────────────────────────────────────────
function ImageModal({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft')  setCurrent(p => Math.max(0, p - 1))
      if (e.key === 'ArrowRight') setCurrent(p => Math.min(images.length - 1, p + 1))
      if (e.key === 'Escape')     onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [images.length, onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
    >
      {/* 닫기 */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 16, right: 16,
          background: 'rgba(255,255,255,0.15)', border: 'none',
          color: '#fff', fontSize: '1.2rem', width: 36, height: 36,
          borderRadius: '50%', cursor: 'pointer', fontFamily: font,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >✕</button>

      {/* 이전 버튼 */}
      {current > 0 && (
        <button
          onClick={e => { e.stopPropagation(); setCurrent(p => p - 1) }}
          style={arrowBtnStyle('left')}
        >‹</button>
      )}

      {/* 이미지 */}
      <div onClick={e => e.stopPropagation()} style={{ maxWidth: 800, width: '100%' }}>
        <img
          src={images[current]}
          alt={`갤러리 ${current + 1}`}
          style={{
            width: '100%', maxHeight: '80vh',
            objectFit: 'contain', borderRadius: 8, display: 'block',
          }}
        />
        {/* 인디케이터 */}
        <p style={{
          textAlign: 'center', color: 'rgba(255,255,255,0.5)',
          fontSize: '0.78rem', marginTop: 12, fontFamily: font,
        }}>
          {current + 1} / {images.length}
        </p>
      </div>

      {/* 다음 버튼 */}
      {current < images.length - 1 && (
        <button
          onClick={e => { e.stopPropagation(); setCurrent(p => p + 1) }}
          style={arrowBtnStyle('right')}
        >›</button>
      )}
    </div>
  )
}

function arrowBtnStyle(side) {
  return {
    position: 'absolute',
    [side]: 12,
    background: 'rgba(255,255,255,0.15)',
    border: 'none', color: '#fff',
    fontSize: '2rem', width: 44, height: 44,
    borderRadius: '50%', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Pretendard', sans-serif",
    transition: 'background 0.2s',
  }
}

// ── 슬라이더 ──────────────────────────────────────────────────
export default function GallerySlider({ images, title }) {
  const [index, setIndex]       = useState(0)   // 현재 첫 번째 보이는 인덱스
  const [perView, setPerView]   = useState(1)   // 한 번에 보이는 장수
  const [modalIdx, setModalIdx] = useState(null) // 모달 열린 이미지 인덱스
  const containerRef = useRef(null)

  // 너비에 따라 perView 계산
  useEffect(() => {
    const calc = () => {
      const w = containerRef.current?.offsetWidth ?? window.innerWidth
      if (w >= 720)      setPerView(3)
      else if (w >= 480) setPerView(2)
      else               setPerView(1)
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  const maxIndex = Math.max(0, images.length - perView)
  const canPrev  = index > 0
  const canNext  = index < maxIndex

  const prev = () => setIndex(p => Math.max(0, p - 1))
  const next = () => setIndex(p => Math.min(maxIndex, p + 1))

  // 터치 스와이프
  const touchStart = useRef(null)
  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX }
  const handleTouchEnd   = (e) => {
    if (touchStart.current === null) return
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (diff > 40 && canNext) next()
    if (diff < -40 && canPrev) prev()
    touchStart.current = null
  }

  const visibleImages = images.slice(index, index + perView)

  return (
    <div style={{ marginBottom: 28 }}>
      {title && (
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#222', marginBottom: 16 }}>
          {title}
        </h3>
      )}

      <div style={{ position: 'relative' }} ref={containerRef}>
        {/* 이미지 영역 */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${perView}, 1fr)`,
            gap: 10,
          }}
        >
          {visibleImages.map((src, i) => (
            <div
              key={index + i}
              onClick={() => setModalIdx(index + i)}
              style={{
                aspectRatio: '4/3', borderRadius: 12,
                overflow: 'hidden', background: '#EAE8E2',
                cursor: 'pointer', position: 'relative',
              }}
            >
              <img
                src={src}
                alt={`시공사진 ${index + i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => { e.target.style.display = 'none' }}
              />
              {/* 호버 오버레이 */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.25)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0)'}
              >
                <span style={{
                  color: '#fff', fontSize: '1.4rem', opacity: 0,
                  transition: 'opacity 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                >🔍</span>
              </div>
            </div>
          ))}
        </div>

        {/* 왼쪽 화살표 */}
        {canPrev && (
          <button onClick={prev} style={{
            position: 'absolute', left: -16, top: '50%',
            transform: 'translateY(-50%)',
            width: 32, height: 32, borderRadius: '50%',
            background: '#fff', border: '1px solid #E5E5E5',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            fontSize: '1rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: font, zIndex: 1,
          }}>‹</button>
        )}

        {/* 오른쪽 화살표 */}
        {canNext && (
          <button onClick={next} style={{
            position: 'absolute', right: -16, top: '50%',
            transform: 'translateY(-50%)',
            width: 32, height: 32, borderRadius: '50%',
            background: '#fff', border: '1px solid #E5E5E5',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            fontSize: '1rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: font, zIndex: 1,
          }}>›</button>
        )}
      </div>

      {/* 인디케이터 도트 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 14 }}>
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: i === index ? 18 : 6, height: 6,
              borderRadius: 3, cursor: 'pointer',
              background: i === index ? RED : 'rgba(34,34,34,0.15)',
              transition: 'all 0.25s',
            }}
          />
        ))}
      </div>

      {/* 장수 표시 */}
      <p style={{
        textAlign: 'center', fontSize: '0.72rem',
        color: '#ccc', marginTop: 6, fontFamily: font,
      }}>
        {index + 1}–{Math.min(index + perView, images.length)} / {images.length}장
      </p>

      {/* 모달 */}
      {modalIdx !== null && (
        <ImageModal
          images={images}
          startIndex={modalIdx}
          onClose={() => setModalIdx(null)}
        />
      )}
    </div>
  )
}
// components/partners/ContactSection.jsx
// 역할: 번호 공개 + 특전 배너 (모든 전문가 공통)

import { useState } from 'react'
import ContactModal from './ContactModal'

const RED  = '#A8232A'
const BG   = '#F5F4F0'
const font = "'Pretendard', -apple-system, sans-serif"

export default function ContactSection({ data }) {
  const [showModal, setShowModal] = useState(false)
  const [revealed, setRevealed]   = useState(false)

  return (
    <>
      <div style={{
        background: '#fff', borderRadius: 24, padding: '36px 28px',
        textAlign: 'center', border: '1px solid rgba(34,34,34,0.06)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
      }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: 4 }}>
          {data.name} 직통 채널
        </h3>
        <p style={{ fontSize: '0.82rem', color: '#666', marginBottom: 24, lineHeight: 1.7 }}>
          중간 수수료 없이 전문가와 직접 연결됩니다.
        </p>

        {/* 특전 배너 */}
        <div style={{
          background: BG,
          border: '1px solid rgba(168,35,42,0.15)',
          padding: '18px 20px', borderRadius: 14,
          textAlign: 'left', maxWidth: 440, margin: '0 auto 24px',
        }}>
          <span style={{ color: RED, fontWeight: 800, fontSize: '0.82rem', display: 'block', marginBottom: 8 }}>
            🎁 다인 고객 전용 특전
          </span>
          <p style={{ fontSize: '0.82rem', fontWeight: 500, color: '#444', lineHeight: 1.75, margin: 0 }}>
            {data.benefit}
          </p>
          <p style={{ fontSize: '0.72rem', color: '#aaa', marginTop: 10, margin: '10px 0 0' }}>
            ※ 자세한 적용 조건은 상담 시 안내드립니다.
          </p>
        </div>

        {/* 번호 버튼 or 공개된 번호 */}
        {!revealed ? (
          <button onClick={() => setShowModal(true)} style={{
            width: '100%', maxWidth: 440,
            background: RED, color: '#fff',
            fontWeight: 700, padding: '16px',
            borderRadius: 12, border: 'none',
            fontSize: '0.95rem', cursor: 'pointer',
            boxShadow: `0 6px 16px rgba(168,35,42,0.2)`,
            fontFamily: font,
          }}>
            📞 {data.owner} 전문가 직통 번호 확인하기
          </button>
        ) : (
          <div style={{
            maxWidth: 440, margin: '0 auto',
            background: '#fff', border: `2px solid ${RED}`,
            padding: '14px 18px', borderRadius: 14,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.68rem', color: RED, fontWeight: 800 }}>
                {data.name} {data.owner} 대표 직통 연락처
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111', marginTop: 4 }}>
                {data.contact}
              </div>
            </div>
            <a href={`tel:${data.contact.replace(/-/g, '')}`} style={{
              background: '#10B981', color: '#fff',
              fontWeight: 700, padding: '10px 16px',
              borderRadius: 8, textDecoration: 'none',
              fontSize: '0.82rem', fontFamily: font,
            }}>
              즉시 전화걸기
            </a>
          </div>
        )}
      </div>

      {showModal && (
        <ContactModal
          onClose={() => setShowModal(false)}
          onConfirm={() => { setShowModal(false); setRevealed(true) }}
        />
      )}
    </>
  )
}
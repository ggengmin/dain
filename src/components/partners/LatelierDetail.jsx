// components/partners/LatelierDetail.jsx
// 구조: 설득카피+4원칙 → 철학섹션 → 공간종류 → 갤러리 → 프로필 → 인사말 → 번호공개

import PartnerProfileSection from './PartnerProfileSection'
import ContactSection from './ContactSection'
import GallerySlider from './GallerySlider'

const RED  = '#A8232A'
const BG   = '#F5F4F0'
const font = "'Pretendard', -apple-system, sans-serif"

export default function LatelierDetail({ data }) {
  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 0 60px' }}>

      {/* ── 섹션1: 설득 카피 + 4원칙 ── */}
      <div style={{ textAlign: 'center', padding: '48px 0 32px', borderBottom: '1px solid rgba(34,34,34,0.08)' }}>
        <div style={{ fontSize: '0.8rem', color: RED, fontWeight: 800, letterSpacing: '0.05em', marginBottom: 12 }}>
          {data.categoryLabel}
        </div>
        <h2 style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.7rem)',
          fontWeight: 800, letterSpacing: '-0.02em',
          lineHeight: 1.55, color: '#111', whiteSpace: 'pre-line',
        }}>
          {data.reason.title}
        </h2>
      </div>

      <div style={{
        background: '#fff', borderRadius: 24, padding: '36px 32px',
        margin: '28px 0', border: '1px solid rgba(34,34,34,0.06)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.01)',
      }}>
        {data.reason.body.map((p, i) => (
          <p key={i} style={{
            fontSize: '0.97rem', color: '#444', fontWeight: 500,
            lineHeight: 1.9, marginBottom: i < data.reason.body.length - 1 ? 18 : 0,
            wordBreak: 'keep-all',
          }}>{p}</p>
        ))}

        <div style={{
          background: BG, borderLeft: `4px solid ${RED}`,
          padding: '18px 20px', borderRadius: '0 16px 16px 0',
          marginTop: 24, marginBottom: 24,
        }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 800, color: RED, marginBottom: 6 }}>
            {data.reason.highlight.title}
          </div>
          <p style={{ fontSize: '0.9rem', color: '#222', fontWeight: 600, lineHeight: 1.8, margin: 0 }}>
            {data.reason.highlight.body}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {data.reason.principles.map((p, i) => (
            <div key={i} style={{
              display: 'flex', gap: 14, alignItems: 'flex-start',
              background: BG, borderRadius: 12, padding: '16px 18px',
              border: '1px solid rgba(34,34,34,0.05)',
            }}>
              <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{p.icon}</span>
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111', marginBottom: 4 }}>{p.title}</p>
                <p style={{ fontSize: '0.82rem', color: '#666', lineHeight: 1.75, margin: 0, wordBreak: 'keep-all' }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 섹션2: 좋은 인테리어 철학 ── */}
      {data.philosophy && (
        <div style={{
          background: '#1C1C1A', borderRadius: 24, padding: '36px 32px',
          margin: '28px 0',
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: 20 }}>
            💭 {data.philosophy.title}
          </h3>
          {data.philosophy.body.map((p, i) => (
            <p key={i} style={{
              fontSize: '0.92rem', color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.95, marginBottom: i < data.philosophy.body.length - 1 ? 16 : 24,
              wordBreak: 'keep-all', fontWeight: 500,
            }}>{p}</p>
          ))}

          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: 24,
          }}>
            <p style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fff', marginBottom: 10 }}>
              🪑 {data.philosophy.reason.title}
            </p>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.85, margin: 0, wordBreak: 'keep-all' }}>
              {data.philosophy.reason.body}
            </p>
          </div>
        </div>
      )}

      {/* ── 섹션3: 만드는 공간 종류 ── */}
      {data.spaces && (
        <div style={{
          background: '#fff', borderRadius: 24, padding: '28px 24px',
          border: '1px solid rgba(34,34,34,0.06)', marginBottom: 28,
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#222', marginBottom: 18 }}>
            🏡 라뜰리에 인테리어가 만드는 공간
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 12,
          }}>
            {data.spaces.map((s) => (
              <div key={s.title} style={{
                background: BG, borderRadius: 12, padding: '18px 16px',
                border: '1px solid rgba(34,34,34,0.04)',
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{s.icon}</div>
                <p style={{ fontSize: '0.82rem', fontWeight: 800, color: RED, marginBottom: 4 }}>{s.title}</p>
                <p style={{ fontSize: '0.78rem', color: '#666', lineHeight: 1.65, margin: 0, wordBreak: 'keep-all' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 섹션4: 시공 갤러리 ── */}
      <div style={{
        background: '#fff', borderRadius: 24, padding: '28px 24px',
        border: '1px solid rgba(34,34,34,0.06)', marginBottom: 28,
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#222', marginBottom: 8 }}>
          📸 공간에 맞춰 만든 실제 시공 사례
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.7, marginBottom: 20, wordBreak: 'keep-all' }}>
          단순히 비어 있는 공간에 가구를 채우는 것이 아니라, 그 공간에서 어떻게 생활할지를 먼저 생각합니다.
        </p>
        <GallerySlider images={data.gallery} />
      </div>

      {/* ── 섹션5: 프로필 ── */}
      <PartnerProfileSection data={data} />

      {/* ── 섹션6: 인사말 ── */}
      <div style={{
        fontSize: '0.88rem', color: '#555', lineHeight: 1.95,
        whiteSpace: 'pre-line', background: '#FAFAFA',
        padding: '24px 28px', borderRadius: 16,
        border: '1px solid #EEE', marginBottom: 28,
      }}>
        <strong style={{ display: 'block', marginBottom: 14 }}>다인 공식 전문가 인사말</strong>
        {data.intro}
      </div>

      {/* ── 섹션7: 번호 공개 ── */}
      <ContactSection data={data} />
    </div>
  )
}
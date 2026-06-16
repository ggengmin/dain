// components/partners/ArtairDetail.jsx
// 역할: 아트에어(에어컨 설치) 전용 상세 페이지 레이아웃
// 구조: 설득카피 → 4원칙 → 갤러리 슬라이더 → 프로필 → 레퍼런스 → 인사말 → 번호공개

import PartnerProfileSection from './PartnerProfileSection'
import ContactSection from './ContactSection'
import GallerySlider from './GallerySlider'

const RED = '#A8232A'
const BG  = '#F5F4F0'

export default function ArtairDetail({ data }) {
  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 0 60px' }}>

      {/* ── 섹션1: 설득 카피 ── */}
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

        {/* 하이라이트 */}
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

        {/* 4가지 원칙 */}
        {data.reason.principles && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {data.reason.principles.map((p, i) => (
              <div key={i} style={{
                display: 'flex', gap: 14, alignItems: 'flex-start',
                background: '#fff', borderRadius: 12, padding: '16px',
                border: '1px solid rgba(34,34,34,0.06)',
              }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{p.icon}</span>
                <div>
                  <p style={{ fontSize: '0.88rem', fontWeight: 800, color: '#111', marginBottom: 4 }}>
                    {p.title}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#666', lineHeight: 1.75, margin: 0, wordBreak: 'keep-all' }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── 섹션2: 시공 갤러리 슬라이더 ── */}
      <div style={{ margin: '36px 0' }}>
        <GallerySlider
          images={data.gallery}
          title={`📸 ${data.owner} 전문가의 시공 갤러리`}
        />
      </div>

      {/* ── 섹션3: 프로필 (공통) ── */}
      <PartnerProfileSection data={data} />

      {/* ── 섹션4: 전문성 레퍼런스 ── */}
      {data.references && (
        <div style={{
          background: '#fff', borderRadius: 24, padding: '28px 24px',
          border: '1px solid rgba(34,34,34,0.06)', marginBottom: 28,
        }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: 18 }}>
            🎖️ 실력으로 검증된 아트에어의 시공 레퍼런스
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {data.references.map((ref, i) => (
              <div key={i} style={{
                display: 'flex', gap: 14, alignItems: 'flex-start',
                padding: '14px 0',
                borderBottom: i < data.references.length - 1 ? '1px solid #F0EAE0' : 'none',
              }}>
                <span style={{ fontSize: '1.3rem', flexShrink: 0, marginTop: 1 }}>{ref.icon}</span>
                <div>
                  <p style={{ fontSize: '0.88rem', fontWeight: 800, color: '#111', marginBottom: 4 }}>
                    {ref.title}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#666', lineHeight: 1.75, margin: 0, wordBreak: 'keep-all' }}>
                    {ref.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 섹션5: 인사말 ── */}
      <div style={{
        fontSize: '0.88rem', color: '#555', lineHeight: 1.95,
        whiteSpace: 'pre-line', background: '#FAFAFA',
        padding: '24px 28px', borderRadius: 16,
        border: '1px solid #EEE', marginBottom: 28,
      }}>
        <strong style={{ display: 'block', marginBottom: 14 }}>문병국 대표 인사말</strong>
        {data.intro}
      </div>

      {/* ── 섹션6: 번호 공개 (공통) ── */}
      <ContactSection data={data} />
    </div>
  )
}
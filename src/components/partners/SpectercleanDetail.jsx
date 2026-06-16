// components/partners/SpectercleanDetail.jsx
// 역할: 스펙터클린(입주청소) 전용 상세 페이지 레이아웃
// 구조: 설득카피+체크리스트 → Before/After → 프로필 → 인사말 → 청소범위표+요금 → 번호공개

import PartnerProfileSection from './PartnerProfileSection'
import ContactSection from './ContactSection'
import GallerySlider from './GallerySlider'

const RED  = '#A8232A'
const BG   = '#F5F4F0'

export default function SpectercleanDetail({ data }) {
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
          lineHeight: 1.5, color: '#111', whiteSpace: 'pre-line',
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
          padding: '18px 20px', borderRadius: '0 16px 16px 0', marginTop: 24,
        }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 800, color: RED, marginBottom: 6 }}>
            {data.reason.highlight.title}
          </div>
          <p style={{ fontSize: '0.9rem', color: '#222', fontWeight: 600, lineHeight: 1.8, margin: 0 }}>
            {data.reason.highlight.body}
          </p>
        </div>

        {/* 걱정 해소 체크리스트 */}
        {data.reason.checklist && (
          <div style={{ marginTop: 24 }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 800, color: '#888', marginBottom: 12 }}>
              ✅ 이런 걱정, 스펙터클린이 해소해드립니다
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {data.reason.checklist.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  background: '#fff', borderRadius: 10, padding: '12px 14px',
                  border: '1px solid rgba(34,34,34,0.05)',
                }}>
                  <span style={{ fontSize: '0.82rem', flexShrink: 0, marginTop: 1 }}>😟</span>
                  <div>
                    <p style={{ fontSize: '0.78rem', color: '#888', marginBottom: 3 }}>{item.worry}</p>
                    <p style={{ fontSize: '0.82rem', fontWeight: 700, color: RED }}>→ {item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
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

      {/* ── 섹션3: 프로필 (공통 컴포넌트) ── */}
      <PartnerProfileSection data={data} />

      {/* ── 섹션4: 인사말 ── */}
      <div style={{
        fontSize: '0.88rem', color: '#555', lineHeight: 1.95,
        whiteSpace: 'pre-line', background: '#FAFAFA',
        padding: '24px 28px', borderRadius: 16,
        border: '1px solid #EEE', marginBottom: 28,
      }}>
        <strong style={{ display: 'block', marginBottom: 14 }}>{data.owner} 대표 인사말</strong>
        {data.intro}
      </div>

      {/* ── 섹션5: 청소 범위표 ── */}
      <div style={{
        background: '#fff', borderRadius: 24, padding: '28px 24px',
        border: '1px solid rgba(34,34,34,0.06)', marginBottom: 16,
      }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: 4 }}>
          {data.serviceTable.title}
        </div>
        <p style={{ fontSize: '0.75rem', color: '#aaa', marginBottom: 20 }}>
          {data.serviceTable.subtitle}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {data.serviceTable.rows.map((row, i) => (
            <div key={row.area} style={{
              display: 'flex', gap: 14, alignItems: 'flex-start',
              padding: '13px 0',
              borderBottom: i < data.serviceTable.rows.length - 1 ? '1px solid #F0EAE0' : 'none',
            }}>
              <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: 1 }}>{row.icon}</span>
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#111', marginRight: 8 }}>{row.area}</span>
                <span style={{ fontSize: '0.78rem', color: '#666' }}>{row.items}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 추가 작업 */}
        <div style={{ marginTop: 20, background: BG, borderRadius: 12, padding: '14px 16px' }}>
          <p style={{ fontSize: '0.78rem', fontWeight: 800, marginBottom: 10 }}>
            {data.serviceTable.extra.title}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {data.serviceTable.extra.items.map((item) => (
              <span key={item} style={{
                fontSize: '0.72rem', fontWeight: 600, color: '#555',
                background: '#fff', padding: '4px 10px', borderRadius: 20,
                border: '1px solid rgba(34,34,34,0.08)',
              }}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 섹션5-2: 요금표 ── */}
      <div style={{
        background: '#fff', borderRadius: 24, padding: '24px',
        border: '1px solid rgba(34,34,34,0.06)', marginBottom: 28,
      }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: 4 }}>
          {data.pricing.title}
        </div>
        <p style={{ fontSize: '0.72rem', color: '#aaa', marginBottom: 16 }}>
          {data.pricing.note}
        </p>
        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          {data.pricing.items.map((item) => (
            <div key={item.label} style={{
              flex: 1, background: BG, borderRadius: 12, padding: '16px',
              textAlign: 'center', border: '1px solid rgba(34,34,34,0.05)',
            }}>
              <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: 6 }}>{item.label}</p>
              <p style={{ fontSize: '1.05rem', fontWeight: 800, color: RED }}>{item.price}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.7rem', color: '#bbb' }}>* {data.pricing.caution}</p>
      </div>

      {/* ── 섹션6: 번호 공개 (공통 컴포넌트) ── */}
      <ContactSection data={data} />
    </div>
  )
}
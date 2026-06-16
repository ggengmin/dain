// components/partners/SimyoungjaeDetail.jsx
// 구조: 설득카피+3원칙 → Before/After → 프로필 → 인사말 → 효과4가지 → 에어로젤 → 번호공개

import PartnerProfileSection from './PartnerProfileSection'
import ContactSection from './ContactSection'

const RED  = '#A8232A'
const BG   = '#F5F4F0'
const font = "'Pretendard', -apple-system, sans-serif"

export default function SimyoungjaeDetail({ data }) {
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

        {/* 3가지 원칙 */}
        {data.reason.principles && (
          <div style={{ marginTop: 28 }}>
            <p style={{ fontSize: '0.88rem', fontWeight: 800, color: '#111', marginBottom: 16 }}>
              {data.reason.highlight.title}
            </p>
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
        )}
      </div>

      {/* ── 섹션2: Before & After ── */}
      <div style={{ margin: '36px 0' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#222', marginBottom: 18 }}>
          📸 {data.owner} 전문가의 리얼 현장 기록
        </h3>
        {data.beforeAfter.map((set, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
            marginBottom: i < data.beforeAfter.length - 1 ? 20 : 0,
          }}>
            <BeforeAfterCard src={set.before} label="Before" labelColor="#777" desc={set.beforeDesc} />
            <BeforeAfterCard src={set.after}  label="After"  labelColor={RED}   desc={set.afterDesc} />
          </div>
        ))}
      </div>

      {/* ── 섹션3: 프로필 ── */}
      <PartnerProfileSection data={data} />

      {/* ── 섹션4: 인사말 ── */}
      <div style={{
        fontSize: '0.88rem', color: '#555', lineHeight: 1.95,
        whiteSpace: 'pre-line', background: '#FAFAFA',
        padding: '24px 28px', borderRadius: 16,
        border: '1px solid #EEE', marginBottom: 28,
      }}>
        <strong style={{ display: 'block', marginBottom: 14 }}>다인 공식 전문가 인사말</strong>
        {data.intro}
      </div>

      {/* ── 섹션5: 왜 탄성코트를 선택할까요? ── */}
      {data.effects && (
        <div style={{
          background: '#fff', borderRadius: 24, padding: '28px 24px',
          border: '1px solid rgba(34,34,34,0.06)', marginBottom: 28,
        }}>
          <p style={{ fontSize: '0.95rem', fontWeight: 800, color: '#111', marginBottom: 20 }}>
            {data.effects.title}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {data.effects.items.map((item) => (
              <div key={item.title} style={{
                background: BG, borderRadius: 12, padding: '18px 16px',
                border: '1px solid rgba(34,34,34,0.04)',
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 10 }}>{item.icon}</div>
                <p style={{ fontSize: '0.88rem', fontWeight: 800, color: '#111', marginBottom: 6 }}>{item.title}</p>
                <p style={{ fontSize: '0.8rem', color: '#666', lineHeight: 1.7, margin: 0, wordBreak: 'keep-all' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 섹션6: 에어로젤 코트 ── */}
      {data.aerogel && (
        <div style={{
          background: '#fff', borderRadius: 24, padding: '28px 24px',
          border: '1px solid rgba(34,34,34,0.06)', marginBottom: 28,
        }}>
          <p style={{ fontSize: '0.95rem', fontWeight: 800, color: '#111', marginBottom: 8 }}>
            {data.aerogel.title}
          </p>
          <p style={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.85, marginBottom: 18, wordBreak: 'keep-all' }}>
            {data.aerogel.desc}
          </p>

          {/* 특징 뱃지 */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: data.aerogel.image ? 20 : 0 }}>
            {data.aerogel.features.map((f) => (
              <span key={f} style={{
                fontSize: '0.8rem', fontWeight: 700,
                background: 'rgba(168,35,42,0.07)', color: RED,
                padding: '5px 12px', borderRadius: 20,
                border: '1px solid rgba(168,35,42,0.15)',
              }}>✔ {f}</span>
            ))}
          </div>

          {/* 에어로젤 이미지 */}
          {data.aerogel.image && (
            <div style={{ borderRadius: 12, overflow: 'hidden', marginTop: 8 }}>
              <img
                src={data.aerogel.image}
                alt="에어로젤 코트 설명"
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                onError={(e) => { e.target.style.display = 'none' }}
              />
            </div>
          )}
        </div>
      )}

      {/* ── 섹션7: 번호 공개 (공통) ── */}
      <ContactSection data={data} />
    </div>
  )
}

function BeforeAfterCard({ src, label, labelColor, desc }) {
  return (
    <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(34,34,34,0.08)' }}>
      <div style={{ position: 'relative', aspectRatio: '4/3', background: '#EAE8E2', overflow: 'hidden' }}>
        <img src={src} alt={label}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <span style={{
          position: 'absolute', top: 10, left: 10,
          background: labelColor, color: '#fff',
          padding: '3px 9px', fontSize: '0.68rem', fontWeight: 700, borderRadius: 6,
        }}>{label}</span>
      </div>
      <div style={{ padding: '12px 14px', fontSize: '0.82rem', fontWeight: 700, color: '#333' }}>
        {desc}
      </div>
    </div>
  )
}
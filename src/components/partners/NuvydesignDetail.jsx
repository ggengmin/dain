// components/partners/NuvydesignDetail.jsx
// 역할: 누비디자인(줄눈시공) 전용 상세 페이지 레이아웃
// 구조: 설득카피 → Before/After → 프로필 → 인사말 → 약품비교표 → 번호공개

import PartnerProfileSection from './PartnerProfileSection'
import ContactSection from './ContactSection'

const RED  = '#A8232A'
const BG   = '#F5F4F0'

export default function NuvydesignDetail({ data }) {
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

      {/* ── 섹션5: 약품 비교표 ── */}
      <div style={{
        background: '#fff', borderRadius: 24, padding: '28px 24px',
        border: '1px solid rgba(34,34,34,0.06)', marginBottom: 28, overflowX: 'auto',
      }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: 14 }}>
          {data.materialTable.title}
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', minWidth: 440, textAlign: 'center' }}>
          <thead>
            <tr>
              {data.materialTable.headers.map((h, i) => (
                <th key={h} style={{
                  padding: '10px 8px', fontWeight: 700, borderBottom: '2px solid #222',
                  color: i === data.materialTable.recommendCol + 1 ? RED : '#222',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.materialTable.rows.map((row) => (
              <tr key={row.label}>
                <td style={{ padding: '12px 8px', background: '#FAFAFA', color: '#666', fontWeight: 500, borderBottom: '1px solid #EEE' }}>
                  {row.label}
                </td>
                {row.values.map((v, i) => (
                  <td key={i} style={{
                    padding: '12px 8px', borderBottom: '1px solid #EEE', fontWeight: 600,
                    color: i === data.materialTable.recommendCol ? RED : '#333',
                  }}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── 섹션6: 번호 공개 (공통 컴포넌트) ── */}
      <ContactSection data={data} />
    </div>
  )
}

// Before/After 카드 서브컴포넌트
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
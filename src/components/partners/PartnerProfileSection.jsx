// components/partners/PartnerProfileSection.jsx
// 모바일: 상단 이름+사진 가로 배치 → 하단 stats/링크
// 데스크탑(640px+): 기존 좌측 텍스트 + 우측 사진 레이아웃

const RED  = '#A8232A'
const BG   = '#F5F4F0'
const font = "'Pretendard', -apple-system, sans-serif"

export default function PartnerProfileSection({ data }) {
  return (
    <>
      <style>{`
        .profile-wrap {
          background: #fff;
          border-radius: 24px;
          padding: 28px 24px;
          border: 1px solid rgba(34,34,34,0.06);
          margin-bottom: 24px;
        }

        /* ── 모바일 기본 ── */
        .profile-inner {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* 모바일: 이름+사진 가로 */
        .profile-top-row {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          margin-bottom: 18px;
        }
        .profile-photo-mobile {
          width: 80px;
          height: 100px;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid #DDD;
          background: #2C2C2A;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .profile-photo-desktop { display: none; }

        /* ── 데스크탑(640px+) ── */
        @media (min-width: 640px) {
          .profile-inner {
            flex-direction: row;
            gap: 28px;
            align-items: flex-start;
          }
          .profile-left { flex: 1; min-width: 240px; }
          .profile-top-row { margin-bottom: 16px; }
          .profile-photo-mobile { display: none; }
          .profile-photo-desktop {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          .profile-photo-desktop-inner {
            width: 160px;
            height: 200px;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid #DDD;
            background: #2C2C2A;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>

      <div className="profile-wrap">
        <div className="profile-inner">

          {/* 왼쪽 영역 */}
          <div className="profile-left">

            {/* 모바일: 이름+사진 가로 */}
            <div className="profile-top-row">
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.72rem', color: RED, fontWeight: 800, marginBottom: 4 }}>
                  다인 공식 {data.category} 전문가
                </div>
                <h2 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 900, margin: '2px 0 4px' }}>
                  {data.name}
                </h2>
                <p style={{ fontSize: '0.82rem', color: '#666', fontWeight: 600, margin: 0 }}>
                  {data.owner} 대표{data.career ? ` (경력 ${data.career})` : ''}
                </p>
              </div>
              {/* 모바일에서만 보이는 사진 */}
              <div className="profile-photo-mobile">
                <img
                  src={data.profileImage}
                  alt={`${data.name} 프로필`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentNode.innerHTML = `<span style="font-size:1.8rem;font-weight:800;color:#E4C187">${data.owner?.[0] ?? '?'}</span>`
                  }}
                />
              </div>
            </div>

            {/* 통계 배지 */}
            <div style={{
              display: 'flex',
              background: BG, borderRadius: 12, padding: '10px 0',
              border: '1px solid rgba(34,34,34,0.04)', marginBottom: 16, textAlign: 'center',
            }}>
              {data.stats.map((s, i) => (
                <div key={s.label} style={{
                  flex: 1,
                  borderRight: i < data.stats.length - 1 ? '1px solid rgba(34,34,34,0.1)' : 'none',
                  padding: '0 8px',
                }}>
                  <div style={{ fontSize: '0.62rem', color: '#888', fontWeight: 600 }}>{s.label}</div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: i === 1 ? RED : '#222', marginTop: 2 }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>

            {/* 자격증 배지 */}
            {data.certifications?.length > 0 && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                {data.certifications.map((cert) => (
                  <span key={cert} style={{
                    fontSize: '0.68rem', fontWeight: 700,
                    background: 'rgba(168,35,42,0.07)', color: RED,
                    padding: '4px 10px', borderRadius: 20,
                    border: '1px solid rgba(168,35,42,0.15)',
                  }}>{cert}</span>
                ))}
              </div>
            )}

            {/* SNS 링크 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
              {data.links.map((link) => (
                <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 14px', border: '1px solid #E5E5E5', borderRadius: 10,
                    textDecoration: 'none', color: '#222',
                    fontSize: '0.78rem', fontWeight: 700,
                    background: '#fff', fontFamily: font,
                    transition: 'border-color 0.15s, color 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = RED; e.currentTarget.style.color = RED }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E5E5'; e.currentTarget.style.color = '#222' }}
                >
                  <span>{link.label}</span>
                  <span>➔</span>
                </a>
              ))}
            </div>

            <p style={{ fontSize: '0.68rem', color: RED, fontWeight: 600, paddingLeft: 2 }}>
              🎁 다인을 통해 연결된 고객분들을 위한 특별 혜택도 준비되어 있습니다.
(아래에서 확인하세요 ↓)
            </p>
          </div>

          {/* 데스크탑에서만 보이는 우측 사진 */}
          <div className="profile-photo-desktop">
            <div className="profile-photo-desktop-inner">
              <img
                src={data.profileImage}
                alt={`${data.name} 프로필`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentNode.innerHTML = `<span style="font-size:2rem;font-weight:800;color:#E4C187">${data.owner?.[0] ?? '?'}</span>`
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
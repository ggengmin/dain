import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { partnerList } from '../data/partnerList'

const RED   = '#A8232A'
const BG    = '#F5F4F0'
const WHITE = '#FFFFFF'
const font  = "'Pretendard', -apple-system, sans-serif"

// 태진전기만 실내/실외 두 개로 분리, 나머지는 partnerList 그대로
const taejinIndoor = {
  id: 'taejin-indoor',
  name: '태진전기', owner: '엄남동',
  category: '실내 전기', career: '인테리어·조명 전문',
  quote: '공간의 품격은 조명에서 시작됩니다',
  path: '/partners/taejin',
  image: 'taejin_indoor_after.jpg', available: true,
}
const taejinOutdoor = {
  id: 'taejin-outdoor',
  name: '태진전기', owner: '홍태경',
  category: '실외·증설 전기', career: '시공기록 420건+',
  quote: '차단기 다운 없는 안전한 전기 공사',
  path: '/partners/taejin',
  image: 'taejin_outdoor_after.jpg', available: true,
}

// partnerList에서 taejin 제외 후 실내/실외 두 개로 끼워넣기
// 새 전문가는 partnerList.js만 수정하면 자동 반영
const homeExperts = partnerList.reduce((acc, p) => {
  if (p.id === 'taejin') {
    acc.push(taejinIndoor, taejinOutdoor)
  } else {
    acc.push(p)
  }
  return acc
}, [])

const problems = [
  {
    emoji: '✨',
    area: '화장실·베란다 타일',
    text: '락스칠해도 타일 사이 곰팡이가 뿌리까지 안 없어지고, 닦을수록 더 번질 때',
    solution: '지긋지긋한 곰팡이로부터 해방, 줄눈 시공',
    path: '/partners/nuvydesign',
    expert: '누비디자인 홍성빈',
  },
  {
    emoji: '🧱',
    area: '베란다·다용도실 벽면',
    text: '곰팡이가 많고 눅눅한 베란다, 괜찮으신가요?',
    solution: '결로·곰팡이 없는 쾌적한 베란다로, 탄성코트',
    path: '/partners/simyoungjae',
    expert: '심영재 하우징 심영재',
  },
  {
    emoji: '🏠',
    area: '이사 전 새 집 입주 준비',
    text: '청소 다 됐다고 해서 가보니 창틀 구석, 서랍장 안쪽은 그대로였을 때',
    solution: '첫날부터 기분 좋은 새 집으로, 입주청소',
    path: '/partners/specterclean',
    expert: '스펙터클린 공민재',
  },
  {
    emoji: '💡',
    area: '실내 조명·인테리어 전기',
    text: '비싼 리모델링 대신, 투박한 거실등을 요즘 유행하는 매립등으로 바꿔서 집안 분위기를 확 바꾸고 싶을 때',
    solution: '공간의 품격을 바꾸는 조명으로, 인테리어 전기',
    path: '/partners/taejin',
    expert: '태진전기 엄남동',
  },
  {
    emoji: '⚡',
    area: '상가·산업시설 전기 증설',
    text: '전력이 부족해 차단기가 자꾸 내려가거나, 한전 증설 공사가 필요할 때',
    solution: '차단기 걱정 없는 안전한 전기로, 증설 공사',
    path: '/partners/taejin',
    expert: '태진전기 홍태경',
  },
  {
    emoji: '🪟',
    area: '타일 교체·욕실 리모델링',
    text: '울퉁불퉁한 바닥 타일이나 오래된 욕실 타일을 새것처럼 바꾸고 싶을 때',
    solution: '14년 경력의 정밀 시공, 타일 교체',
    path: '/partners/daesung',
    expert: '대성타일 범권후',
  },
  {
    emoji: '❄️',
    area: '에어컨 신규·이전 설치',
    text: '신규 에어컨 설치, 이전 설치, 배관 연장이 필요할 때',
    solution: '처음부터 제대로, 에어컨 설치',
    path: '/partners/artair',
    expert: '아트에어 문병국',
  },
]

const benefits = [
  {
    num: '01',
    title: '대표 직접 시공 · 직접 책임',
    desc: '상담부터 시공, 사후관리(AS)까지. 하청이나 대리 작업자 없이 각 분야 전문가가 직접 책임집니다.',
  },
  {
    num: '02',
    title: '현장 경력 최소 500집 이상 · 검증된 전문가',
    desc: '수많은 현장에서 수만 가지 변수를 해결하며 실력을 다져온 베테랑들입니다. 개인 블로그와 SNS를 통해 실제 시공 사례와 현장 기록을 직접 확인해보세요.',
  },
  {
    num: '03',
    title: '다인 고객 전용 · 무상 특전 서비스',
    desc: '다인을 통해 전문가와 연결된 고객분들께 공종별 특별 서비스를 제공합니다. 실리콘 코팅, 항균 케어, 추가 할인 등 전문가별 혜택을 만나보세요.',
  },
]

// ── 자동 슬라이드 ──────────────────────────────────────────────
function AutoSlider({ items }) {
  const [current, setCurrent] = useState(0)
  const [order, setOrder]     = useState(() => [...Array(items.length).keys()])
  const timer = useRef(null)

  useEffect(() => {
    const shuffled = [...Array(items.length).keys()].sort(() => Math.random() - 0.5)
    setOrder(shuffled)
  }, [items.length])

  useEffect(() => {
    timer.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % items.length)
    }, 3200)
    return () => clearInterval(timer.current)
  }, [items.length])

  const item = items[order[current]]

  return (
    <div style={{ position: 'relative' }}>
      <div key={current} style={{
        background: BG, borderRadius: 16,
        border: '1px solid rgba(34,34,34,0.05)',
        padding: '28px 24px',
        animation: 'fadeSlide 0.5s ease',
        minHeight: 190,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>{item.emoji}</div>
          <p style={{ fontSize: '0.72rem', color: '#aaa', fontWeight: 600, marginBottom: 8 }}>{item.area}</p>
          <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#222', lineHeight: 1.7, wordBreak: 'keep-all' }}>
            "{item.text}"
          </p>
        </div>
        <div style={{ borderTop: '1px solid rgba(34,34,34,0.07)', paddingTop: 14, marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: RED }}>→ {item.solution}</span>
            {item.path
              ? <Link to={item.path} style={{ fontSize: '0.85rem', color: '#aaa', textDecoration: 'underline' }}>전문가 보기</Link>
              : <span style={{ fontSize: '0.72rem', color: '#ccc' }}>준비중</span>
            }
          </div>
          {item.expert && (
            <p style={{ fontSize: '0.68rem', color: '#bbb', marginTop: 6, fontWeight: 500 }}>
              담당 전문가 · {item.expert}
            </p>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 14 }}>
        {items.map((_, i) => (
          <div key={i} onClick={() => setCurrent(i)} style={{
            width: i === current ? 20 : 6, height: 6,
            borderRadius: 3, cursor: 'pointer',
            background: i === current ? RED : 'rgba(34,34,34,0.15)',
            transition: 'all 0.3s',
          }} />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main style={{ fontFamily: font, background: BG, color: '#222' }}>
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .problems-grid  { display: none; }
        .problems-slider{ display: block; }
        .experts-grid   { display: none; }
        .experts-scroll {
          display: flex; gap: 14px;
          overflow-x: auto; padding: 4px 20px 16px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; -ms-overflow-style: none;
        }
        .experts-scroll::-webkit-scrollbar { display: none; }
        .swipe-hint { display: block; }

        @media (min-width: 768px) {
          .problems-grid  { display: grid !important; }
          .problems-slider{ display: none !important; }
          .experts-grid   { display: grid !important; }
          .experts-scroll { display: none !important; }
          .swipe-hint     { display: none !important; }
        }
      `}</style>

      {/* ── 1. HERO ── */}
      <section style={{
        position: 'relative', minHeight: '90vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '60px 20px 80px', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.35,
          backgroundImage: `radial-gradient(${RED} 0.5px, transparent 0.5px)`,
          backgroundSize: '16px 16px', pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src="/logo.png" alt="다인" style={{ height: 100, objectFit: 'contain', marginBottom: 28 }} />
          <p style={{ color: RED, fontWeight: 700, letterSpacing: '0.2em', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: 14 }}>
            Verified Experts
          </p>
          <h1 style={{
            fontSize: 'clamp(1.8rem, 6vw, 2.8rem)', fontWeight: 800,
            lineHeight: 1.5, color: '#111', marginBottom: 20,
            letterSpacing: '-0.02em',
          }}>
            좋은 시공은<br />
            <span style={{ color: RED }}>좋은 사람에게서</span> 시작됩니다.
          </h1>
          <p style={{
            fontSize: '0.93rem', color: 'rgba(34,34,34,0.65)',
            lineHeight: 1.95, marginBottom: 12, fontWeight: 500,
            wordBreak: 'keep-all', maxWidth: 480,
          }}>
            부울경에서 오랜 시간 고객의 선택을 받아온 전문가들을 한 곳에 모았습니다.
          </p>
          <p style={{
            fontSize: '0.93rem', color: 'rgba(34,34,34,0.65)',
            lineHeight: 1.95, marginBottom: 36, fontWeight: 500,
            wordBreak: 'keep-all', maxWidth: 480,
          }}>
            대표가 직접 상담하고, 직접 시공하며, 끝까지 책임집니다.<br />
            <span style={{ color: '#111', fontWeight: 700, fontSize: '1.1rem' }}>광고보다 실력, 말보다 결과</span>를 중요하게 생각합니다.
          </p>
          <a href="#experts" style={{
            background: RED, color: WHITE,
            padding: '15px 38px', borderRadius: 6,
            fontWeight: 700, fontSize: '0.95rem',
            textDecoration: 'none',
            boxShadow: `0 4px 20px rgba(168,35,42,0.3)`,
          }}>
            다인의 검증된 전문가 보러가기 ➔
          </a>
        </div>
      </section>

      {/* ── 2. STORY ── */}
      <section style={{ background: '#1C1C1A', padding: '72px 20px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, color: RED, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
            Our Story
          </p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', fontWeight: 800, color: '#fff', marginBottom: 32, letterSpacing: '-0.02em' }}>
            우리의 존재 이유
          </h2>
          <div style={{ fontSize: '0.93rem', color: 'rgba(255,255,255,0.62)', lineHeight: 2.1, fontWeight: 500, wordBreak: 'keep-all' }}>
            <p style={{ marginBottom: 20 }}>
              좋은 시공은 시공이 끝난 후에야 차이가 드러납니다. 몇 달, 몇 년이 지나도 문제없는 시공이 있는가 하면, 얼마 지나지 않아 하자와 불편이 생기는 경우도 있습니다.
            </p>
            <p style={{ marginBottom: 20 }}>
              하지만 소비자가 시공 전부터 그 차이를 알아보기는 쉽지 않습니다. 인터넷에는 수많은 업체와 광고가 넘쳐나지만, 누가 직접 시공하는지, 누가 끝까지 책임지는지 알기 어렵기 때문입니다.
            </p>
            <blockquote style={{
              borderLeft: `4px solid ${RED}`, paddingLeft: 20,
              color: 'rgba(255,255,255,0.9)', fontWeight: 700,
              fontSize: '1rem', lineHeight: 1.85, marginBottom: 20,
            }}>
              결국 좋은 시공은 눈에 보이지 않는 곳에서 결정됩니다.
            </blockquote>
            <p style={{ marginBottom: 32 }}>
              보이지 않는 구석까지 정석대로 묵묵히 시공하는 사람이 있는가 하면, 눈에 띄는 부분만 빠르게 마무리하고 돌아서는 사람도 있습니다.
            </p>
            {/* 강조 마무리 문구 */}
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: 28,
            }}>
            <p style={{ marginBottom: 32 }}>
              그래서 다인은 부울경 곳곳에서 한 집 한 집 자신의 이름을 걸고 현장을 책임져 온 전문가들을 고객과 직접 연결하기 위해 만들어졌습니다.
            </p>
              
              <p style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                color: WHITE, fontWeight: 800,
                lineHeight: 1.75, marginBottom: 10,
                letterSpacing: '-0.01em',
              }}>
                고객에게는 믿을 수 있는 선택을,<br />
                전문가에게는 정당한 가치를.
              </p>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
                그것이 다인이 존재하는 이유입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PROBLEMS ── */}
      <section style={{ background: WHITE, borderTop: '1px solid rgba(34,34,34,0.05)', padding: '64px 20px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: RED, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>
              Find Your Expert
            </p>
            <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em', marginBottom: 10 }}>
              우리 집에 필요한 전문가를 찾아보세요
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#999' }}>
              생활 속 작은 불편부터 시공이 필요한 문제까지, 검증된 전문가와 함께 해결해 보세요.
            </p>
          </div>

          <div className="problems-slider" style={{ maxWidth: 480, margin: '0 auto' }}>
            <AutoSlider items={problems} />
          </div>

          <div className="problems-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {problems.map((p) => (
              <div key={p.area} style={{
                background: BG, borderRadius: 14,
                border: '1px solid rgba(34,34,34,0.05)',
                padding: '22px 20px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontSize: '1.6rem', marginBottom: 10 }}>{p.emoji}</div>
                  <p style={{ fontSize: '0.82rem', color: '#aaa', fontWeight: 600, marginBottom: 8 }}>{p.area}</p>
                  <p style={{ fontSize: '1rem', fontWeight: 700, color: '#222', lineHeight: 1.65, wordBreak: 'keep-all' }}>"{p.text}"</p>
                </div>
                <div style={{ borderTop: '1px solid rgba(34,34,34,0.07)', paddingTop: 12, marginTop: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: RED }}>→ {p.solution}</span>
                    {p.path
                      ? <Link to={p.path} style={{ fontSize: '0.85rem', color: '#aaa', textDecoration: 'underline' }}>전문가 보기</Link>
                      : <span style={{ fontSize: '0.72rem', color: '#ccc' }}>준비중</span>
                    }
                  </div>
                  {p.expert && (
                    <p style={{ fontSize: '0.78rem', color: '#bbb', marginTop: 6, fontWeight: 500 }}>
                      담당 전문가 · {p.expert}
                    </p>
                  )}
                </div>
              </div>
            ))}
            <div style={{
              background: 'rgba(245,244,240,0.3)', border: `1px dashed rgba(168,35,42,0.25)`,
              borderRadius: 14, padding: '22px 20px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: '1.6rem', marginBottom: 10 }}>🤝</div>
                <p style={{ fontSize: '0.7rem', color: 'rgba(168,35,42,0.5)', fontWeight: 600, marginBottom: 6 }}>Coming Soon</p>
                <p style={{ fontSize: '0.88rem', color: '#999', lineHeight: 1.7, wordBreak: 'keep-all' }}>
                  지금도 부울경 곳곳의 검증된 전문가들을 만나고 있습니다.<br />
                  더 다양한 분야의 전문가들이 곧 추가될 예정입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. BENEFITS ── */}
      <section style={{ background: BG, padding: '64px 20px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: RED, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>
              Why DAIN
            </p>
            <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em' }}>
              왜 다인의 전문가일까요?
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {benefits.map((b) => (
              <div key={b.num} style={{
                background: WHITE, borderRadius: 14,
                border: '1px solid rgba(34,34,34,0.05)',
                padding: '24px 22px',
              }}>
                <div style={{
                  width: 36, height: 36, background: BG, borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.78rem', fontWeight: 800, color: RED, marginBottom: 14,
                }}>{b.num}</div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#111', marginBottom: 10, lineHeight: 1.5 }}>{b.title}</h3>
                <p style={{ fontSize: '0.82rem', color: '#666', lineHeight: 1.85, wordBreak: 'keep-all' }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. EXPERTS ── */}
      <section id="experts" style={{ background: WHITE, borderTop: '1px solid rgba(34,34,34,0.05)', padding: '64px 0' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: RED, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>
              Our Experts
            </p>
            <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', fontWeight: 800, color: '#111', marginBottom: 10, letterSpacing: '-0.02em' }}>
              다인의 전문가들을 소개합니다
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#999', lineHeight: 1.7, wordBreak: 'keep-all', maxWidth: 400, margin: '0 auto' }}>
              좋은 시공은 결국 사람에게서 시작됩니다.<br />오랜 시간 현장을 지켜온 전문가들을 만나보세요.
            </p>
          </div>
        </div>

        <div className="experts-scroll">
          {homeExperts.map((p) => <ExpertCard key={p.id} p={p} />)}
        </div>
        <p className="swipe-hint" style={{ textAlign: 'center', fontSize: '0.7rem', color: '#ccc', marginTop: 4 }}>
          ← 옆으로 밀어보세요 →
        </p>

        <div className="experts-grid" style={{
          maxWidth: 1000, margin: '0 auto', padding: '0 20px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24,
        }}>
          {homeExperts.map((p) => <ExpertCard key={p.id} p={p} />)}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40, padding: '0 20px' }}>
          <Link to="/partners" style={{
            display: 'inline-block',
            border: `1px solid ${RED}`, color: RED,
            padding: '12px 32px', borderRadius: 6,
            fontWeight: 700, fontSize: '0.88rem',
            textDecoration: 'none', fontFamily: font,
          }}>
            전문가 상세 보기 →
          </Link>
        </div>
      </section>

      {/* ── 6. BENEFIT EVENT ── */}
      <section style={{ padding: '48px 20px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{
            background: RED, borderRadius: 20,
            padding: '44px 36px', color: WHITE,
            position: 'relative', overflow: 'hidden',
            boxShadow: `0 8px 40px rgba(168,35,42,0.28)`,
          }}>
            {/* 큰 따옴표 배경 장식 */}
            <div style={{
              position: 'absolute', top: 16, right: 28,
              fontSize: '10rem', lineHeight: 1,
              color: 'rgba(255,255,255,0.06)',
              fontFamily: 'Georgia, serif',
              fontWeight: 900, pointerEvents: 'none',
              userSelect: 'none',
            }}>"</div>

            <span style={{
              display: 'inline-block', background: 'rgba(255,255,255,0.18)',
              fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em',
              padding: '4px 12px', borderRadius: 20, marginBottom: 20,
            }}>DAIN SPECIAL BENEFIT</span>
            <h2 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.6rem)', fontWeight: 800, lineHeight: 1.55, marginBottom: 16, letterSpacing: '-0.02em' }}>
              좋은 경험은<br />또 다른 좋은 선택이 됩니다.
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.95, marginBottom: 24, wordBreak: 'keep-all' }}>
              다인을 통해 전문가와 함께하셨다면, 후기를 통해 경험을 들려주세요. 고객님의 이야기는 다른 고객에게는 믿을 수 있는 기준이 되고, 전문가에게는 가장 큰 응원이 됩니다.
            </p>

            {/* 특전 안내 - 테두리 박스 */}
            <div style={{
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 12, padding: '18px 20px', marginBottom: 20,
            }}>
              <p style={{ fontSize: '0.82rem', fontWeight: 800, color: WHITE, marginBottom: 10 }}>
                🎁 다인 고객 전용 특전
              </p>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.85 }}>
                다인을 통해 전문가와 연결되셨다면{' '}
                <span style={{ textDecoration: 'underline', fontWeight: 700 }}>"다인 홈페이지 보고 연락드렸습니다"</span>
                라고 말씀해 주세요. 실리콘 코팅, 피톤치드 케어 등 공종별 특별 서비스를 제공해 드립니다.
              </p>
            </div>

            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>
              ※ 제공 혜택은 전문가별로 상이할 수 있습니다.
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: '#222', color: 'rgba(255,255,255,0.4)',
        fontSize: '0.75rem', padding: '36px 20px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <img src="/logo.png" alt="다인" style={{ height: 28, objectFit: 'contain', opacity: 0.6 }} />
            <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 700, letterSpacing: '0.1em' }}>다인 (DAIN)</span>
          </div>
          <p style={{ lineHeight: 1.9, marginBottom: 6 }}>
            좋은 시공은 좋은 사람에게서 시작됩니다.<br />
            다인은 믿을 수 있는 전문가와 고객을 연결합니다.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.25)' }}>© 2026 DAIN. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

function ExpertCard({ p }) {
  const font  = "'Pretendard', -apple-system, sans-serif"
  const RED   = '#A8232A'
  const BG    = '#F5F4F0'
  const WHITE = '#FFFFFF'

  return (
    <div style={{
      flex: '0 0 78vw', maxWidth: 280,
      scrollSnapAlign: 'start',
      background: BG, borderRadius: 16,
      border: '1px solid rgba(34,34,34,0.06)',
      overflow: 'hidden', opacity: p.available ? 1 : 0.5,
      display: 'flex', flexDirection: 'column',
      fontFamily: font,
    }}>
      <div style={{ height: 170, position: 'relative', overflow: 'hidden', background: '#EAE8E2', flexShrink: 0 }}>
        {p.image ? (
          <img src={p.image} alt={p.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={(e) => { e.target.style.display = 'none' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: '0.82rem' }}>
            {p.available ? '시공 현장 사진' : '준비중'}
          </div>
        )}
        <span style={{
          position: 'absolute', top: 12, left: 12,
          background: RED, color: WHITE,
          fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: 4,
        }}>{p.category}</span>
      </div>

      <div style={{ padding: '18px 18px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111' }}>
            {p.owner ? `${p.owner} 대표` : '준비중'}
          </h3>
          {p.career && (
            <span style={{ fontSize: '0.7rem', color: '#888', background: WHITE, padding: '3px 8px', borderRadius: 4, border: '1px solid rgba(0,0,0,0.07)' }}>
              {p.career}
            </span>
          )}
        </div>
        {p.quote
          ? <p style={{ fontSize: '0.88rem', color: RED, fontWeight: 700, lineHeight: 1.65, wordBreak: 'keep-all' }}>"{p.quote}"</p>
          : <p style={{ fontSize: '0.88rem', color: '#bbb' }}>곧 소개됩니다.</p>
        }
      </div>

      <div style={{
        borderTop: '1px solid rgba(34,34,34,0.06)', background: WHITE,
        padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        {/* <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 28, height: 28, background: '#f0f0f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem' }}>📸</span>
          <span style={{ width: 28, height: 28, background: '#f0f0f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem' }}>📝</span>
        </div> */}
        {p.path
          ? <Link to={p.path} style={{ fontSize: '0.8rem', fontWeight: 700, color: RED, textDecoration: 'none' }}>자세히 보기 ➔</Link>
          : <span style={{ fontSize: '0.78rem', color: '#ccc' }}>준비중</span>
        }
      </div>
    </div>
  )
}
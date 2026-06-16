// pages/Partners.jsx
// 역할: 공종 탭 UI + 어떤 Detail 컴포넌트를 보여줄지 결정
// 새 전문가 추가 시 → import 1줄 + partnerMap 1줄만 추가하면 끝

import { useState, useEffect  } from 'react'
import { useParams, useNavigate  } from 'react-router-dom'
import { partnerList } from '../data/partnerList'

import NuvydesignDetail   from '../components/partners/NuvydesignDetail'
import SpectercleanDetail from '../components/partners/SpectercleanDetail'
import SimyoungjaeDetail  from '../components/partners/SimyoungjaeDetail'
import TaejinDetail       from '../components/partners/TaejinDetail'
import ArtairDetail       from '../components/partners/ArtairDetail'
import DaesungDetail      from '../components/partners/DaesungDetail'

import { nuvydesign }   from '../data/partners/nuvydesign'
import { specterclean } from '../data/partners/specterclean'
import { simyoungjae }  from '../data/partners/simyoungjae'
import { taejin }       from '../data/partners/taejin'
import { artair }       from '../data/partners/artair'
import { daesung }      from '../data/partners/daesung'

const partnerMap = {
  nuvydesign:   { Detail: NuvydesignDetail,   data: nuvydesign },
  specterclean: { Detail: SpectercleanDetail, data: specterclean },
  simyoungjae:  { Detail: SimyoungjaeDetail,  data: simyoungjae },
  taejin:       { Detail: TaejinDetail,       data: taejin },
  artair:       { Detail: ArtairDetail,       data: artair },
  daesung:      { Detail: DaesungDetail,      data: daesung },
}

const RED  = '#A8232A'
const BG   = '#F5F4F0'
const font = "'Pretendard', -apple-system, sans-serif"

export default function Partners() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeId, setActiveId] = useState(() => {
    if (id && partnerMap[id]) return id
    return 'nuvydesign'
  })
    // 새로고침/URL 직접 접근 시 동기화
  useEffect(() => {
    if (id && partnerMap[id]) {
      setActiveId(id)
    }
  }, [id])

  const current = partnerMap[activeId]

  return (
    <main style={{ fontFamily: font, background: BG, color: '#222', minHeight: '100vh' }}>

      {/* 헤더 */}
      <section style={{
        background: '#fff', padding: '56px 24px 36px',
        textAlign: 'center', borderBottom: '1px solid rgba(34,34,34,0.06)',
      }}>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: 10 }}>
          다인 전문가
        </h1>
        <p style={{ color: '#888', fontSize: '0.9rem' }}>
          각 분야 전문가가 직접 상담하고 책임집니다
        </p>
      </section>

      {/* 공종 탭 */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 8,
        padding: '20px 16px', background: '#fff',
        borderBottom: '1px solid rgba(34,34,34,0.06)',
        flexWrap: 'wrap',
      }}>
        {partnerList.map((p) => (
          <button
            key={p.id}
            onClick={() => p.available && navigate(`/partners/${p.id}`)}
            style={{
              padding: '10px 20px', borderRadius: 6,
              border: activeId === p.id ? `1px solid ${RED}` : '1px solid #E0E0E0',
              background: activeId === p.id ? RED : '#fff',
              color: activeId === p.id ? '#fff' : p.available ? '#444' : '#BBB',
              fontSize: '0.88rem', fontWeight: activeId === p.id ? 700 : 500,
              cursor: p.available ? 'pointer' : 'default',
              fontFamily: font, transition: 'all 0.18s',
              opacity: p.available ? 1 : 0.55,
            }}
          >
            {p.category}
            {!p.available && (
              <span style={{ fontSize: '0.62rem', marginLeft: 4, fontWeight: 400 }}>준비중</span>
            )}
          </button>
        ))}
      </div>

      {/* 상세 콘텐츠 */}
      <div style={{ padding: '40px 20px' }}>
        {current ? (
          <current.Detail data={current.data} />
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 20px', color: '#AAA' }}>
            곧 소개됩니다.
          </div>
        )}
      </div>

    </main>
  )
}
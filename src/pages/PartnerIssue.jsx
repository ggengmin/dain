import { useState, useRef } from 'react'
import { db, storage } from '../firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { careConfig } from '../data/careConfig'

const RED  = '#A8232A'
const BG   = '#F5F4F0'
const font = "'Pretendard', -apple-system, sans-serif"

// 고유 ID 생성 (예: FX503)
function generateId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export default function PartnerIssue() {
  const [category, setCategory]   = useState('')
  const [photos, setPhotos]       = useState([])   // File 객체 배열
  const [previews, setPreviews]   = useState([])   // 미리보기 URL
  const [status, setStatus]       = useState('idle') // idle | uploading | done | error
  const [resultUrl, setResultUrl] = useState('')
  const fileInputRef = useRef()

  const categories = Object.keys(careConfig)

  // 사진 선택
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5) // 최대 5장
    setPhotos(files)
    setPreviews(files.map((f) => URL.createObjectURL(f)))
  }

  // 발급
  const handleIssue = async () => {
    if (!category)        return alert('공종을 선택해주세요.')
    if (photos.length < 1) return alert('시공 사진을 최소 1장 첨부해주세요.')

    setStatus('uploading')

    try {
      const id         = generateId()
      const certNo     = `DAIN-${new Date().getFullYear()}-${id}`
      const config     = careConfig[category]
      const partnerName = config.partner || ''

      // 1. Storage에 사진 업로드
      const photoUrls = await Promise.all(
        photos.map(async (file, i) => {
          const storageRef = ref(storage, `care/${certNo}/photo_${i + 1}`)
          await uploadBytes(storageRef, file)
          return getDownloadURL(storageRef)
        })
      )

      // 2. Firestore에 문서 저장
      await addDoc(collection(db, 'care'), {
        id:           certNo,
        category,
        partnerName,
        ownerName: config.ownerName ?? '',
        carePeriod:   config.carePeriod,
        careType:     config.careType,
        photos:       photoUrls,
        date:         Timestamp.now(),
        isActivated:  false,  // 고객이 리뷰 작성 시 true로 변경
        review:       null,
      })

      const url = `${window.location.origin}/care/${certNo}`
      setResultUrl(url)
      setStatus('done')

    } catch (err) {
      console.error('[발급 오류]', err)
      setStatus('error')
    }
  }

  return (
    <main style={{ fontFamily: font, background: BG, minHeight: '100vh', paddingBottom: 80 }}>
      <div style={{ maxWidth: 540, margin: '0 auto', padding: '60px 20px 0' }}>

        {/* 헤더 */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <img src="/logo.png" alt="다인" style={{ height: 56, marginBottom: 16 }} />
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 6 }}>
            안심케어 인증서 발급
          </h1>
          <p style={{ fontSize: '0.82rem', color: '#888' }}>
            사장님 전용 페이지입니다. 외부 공유 금지.
          </p>
        </div>

        {status !== 'done' ? (
          <div style={{
            background: '#fff', borderRadius: 24,
            padding: '36px 28px',
            border: '1px solid rgba(34,34,34,0.06)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
          }}>

            {/* 공종 선택 */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 12 }}>
                공종 선택
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {categories.map((cat) => (
                  <div
                    key={cat}
                    onClick={() => setCategory(cat)}
                    style={{
                      border: `1px solid ${category === cat ? RED : '#E5E5E5'}`,
                      background: category === cat ? '#FFF9F3' : '#fff',
                      color: category === cat ? RED : '#555',
                      padding: '12px 8px', borderRadius: 10,
                      textAlign: 'center', fontSize: '0.82rem', fontWeight: 700,
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </div>

            {/* 시공 일자 - 자동 */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 8 }}>
                시공 일자
              </label>
              <div style={{
                padding: '13px 16px', borderRadius: 10,
                border: '1px solid #E5E5E5', background: '#F5F4F0',
                fontSize: '0.88rem', fontWeight: 600, color: '#666',
              }}>
                {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })} (오늘 자동 지정)
              </div>
            </div>

            {/* 사진 첨부 */}
            <div style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 4 }}>
                시공 완료 사진 <span style={{ color: RED }}>*</span>
              </label>
              <p style={{ fontSize: '0.75rem', color: '#aaa', marginBottom: 10, fontFamily: font }}>
                여러 장 선택 시 최대 5장까지 한번에 첨부할 수 있어요.
              </p>

              <div
                onClick={() => fileInputRef.current.click()}
                style={{
                  border: `2px dashed ${previews.length > 0 ? RED : '#D0D0D0'}`,
                  borderRadius: 12, padding: '24px',
                  textAlign: 'center', cursor: 'pointer',
                  background: previews.length > 0 ? '#FFF9F3' : '#FAFAFA',
                  transition: 'all 0.2s',
                }}
              >
                {previews.length > 0 ? (
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    {previews.map((src, i) => (
                      <img key={i} src={src} alt={`미리보기 ${i+1}`} style={{
                        width: 110, height: 110, objectFit: 'cover', borderRadius: 8,
                      }} />
                    ))}
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '2rem', marginBottom: 8 }}>📸</div>
                    <p style={{ fontSize: '0.82rem', color: '#888', fontWeight: 600 }}>
                      탭하여 시공 완료 사진 첨부
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={handlePhotoChange}
              />
              {previews.length > 0 && (
                <button
                  onClick={() => { setPhotos([]); setPreviews([]) }}
                  style={{
                    marginTop: 8, fontSize: '0.75rem', color: '#aaa',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: font,
                  }}
                >
                  다시 선택
                </button>
              )}
            </div>

            {/* 발급 버튼 */}
            <button
              onClick={handleIssue}
              disabled={status === 'uploading'}
              style={{
                width: '100%', background: status === 'uploading' ? '#ccc' : RED,
                color: '#fff', fontWeight: 800, padding: '16px',
                borderRadius: 12, border: 'none', fontSize: '1rem',
                cursor: status === 'uploading' ? 'not-allowed' : 'pointer',
                boxShadow: `0 4px 16px rgba(168,35,42,0.2)`,
                fontFamily: font,
              }}
            >
              {status === 'uploading' ? '업로드 중...' : '🔖 안심케어 링크 생성'}
            </button>

            {status === 'error' && (
              <p style={{ textAlign: 'center', color: RED, fontSize: '0.82rem', marginTop: 12 }}>
                오류가 발생했습니다. 다시 시도해주세요.
              </p>
            )}
          </div>

        ) : (
          /* 발급 완료 */
          <div style={{
            background: '#fff', borderRadius: 24, padding: '40px 28px',
            border: `2px solid ${RED}`, textAlign: 'center',
            boxShadow: '0 4px 20px rgba(168,35,42,0.08)',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>✅</div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 6 }}>
              안심케어 링크 생성 완료
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#888', marginBottom: 28 }}>
              아래 링크를 복사해서 고객님께 전달해주세요.
            </p>

            {/* 링크 박스 */}
            <div style={{
              background: BG, borderRadius: 10, padding: '14px 16px',
              fontSize: '0.82rem', fontWeight: 700, color: '#333',
              wordBreak: 'break-all', marginBottom: 16, textAlign: 'left',
            }}>
              {resultUrl}
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(resultUrl)
                alert('링크가 복사되었습니다!')
              }}
              style={{
                width: '100%', background: RED, color: '#fff',
                fontWeight: 800, padding: '14px', borderRadius: 12,
                border: 'none', fontSize: '0.95rem', cursor: 'pointer',
                fontFamily: font, marginBottom: 12,
              }}
            >
              🔗 링크 복사하기
            </button>

            <button
              onClick={() => {
                setCategory(''); setPhotos([]); setPreviews([])
                setStatus('idle'); setResultUrl('')
              }}
              style={{
                width: '100%', background: '#fff', color: '#888',
                fontWeight: 600, padding: '12px', borderRadius: 12,
                border: '1px solid #E5E5E5', fontSize: '0.85rem',
                cursor: 'pointer', fontFamily: font,
              }}
            >
              새 링크 발급하기
            </button>

            <p style={{ fontSize: '0.7rem', color: '#bbb', marginTop: 20 }}>
              ⚠️ 고객이 리뷰를 작성해야 인증서가 활성화됩니다.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
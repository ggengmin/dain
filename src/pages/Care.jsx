import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'
import {
  collection, query, where, getDocs,
  doc, updateDoc
} from 'firebase/firestore'
import CareCertificate from '../components/CareCertificate'

const RED  = '#A8232A'
const BG   = '#F5F4F0'
const font = "'Pretendard', -apple-system, sans-serif"

export default function Care() {
  const { id } = useParams()

  const [careData, setCareData]   = useState(null)
  const [docId, setDocId]         = useState(null)
  const [loading, setLoading]     = useState(true)
  const [notFound, setNotFound]   = useState(false)

  // 리뷰 폼 상태
  const [reviewText, setReviewText] = useState('')
  const [password, setPassword]     = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)

  // Firestore에서 care 문서 불러오기
  useEffect(() => {
    const fetchCare = async () => {
      try {
        const q = query(collection(db, 'care'), where('id', '==', id))
        const snap = await getDocs(q)

        if (snap.empty) {
          setNotFound(true)
          setLoading(false)
          return
        }

        const docSnap = snap.docs[0]
        setCareData(docSnap.data())
        setDocId(docSnap.id)

        // 이미 리뷰 작성된 경우
        if (docSnap.data().isActivated) {
          setSubmitted(true)
        }
      } catch (err) {
        console.error('[Care 불러오기 오류]', err)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    fetchCare()
  }, [id])

  // 리뷰 제출
  const handleSubmit = async () => {
    if (!reviewText.trim()) return alert('후기를 작성해주세요.')
    if (password.length !== 4 || !/^\d{4}$/.test(password)) {
      return alert('비밀번호는 숫자 4자리로 입력해주세요.')
    }

    setSubmitting(true)

    try {
      await updateDoc(doc(db, 'care', docId), {
        isActivated: true,
        review: {
          text:      reviewText.trim(),
          password,
          createdAt: new Date(),
        },
      })
      setSubmitted(true)
      setCareData((prev) => ({
        ...prev,
        isActivated: true,
        review: { text: reviewText.trim() },
      }))
    } catch (err) {
      console.error('[리뷰 제출 오류]', err)
      alert('오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── 로딩 ──
  if (loading) return (
    <div style={{ fontFamily: font, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: BG }}>
      <p style={{ color: '#aaa', fontSize: '0.9rem' }}>인증서를 불러오는 중...</p>
    </div>
  )

  // ── 없는 링크 ──
  if (notFound) return (
    <div style={{ fontFamily: font, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: BG, textAlign: 'center', padding: 24 }}>
      <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>🔍</div>
      <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 8 }}>유효하지 않은 링크입니다.</p>
      <p style={{ fontSize: '0.85rem', color: '#aaa' }}>시공 담당 사장님께 링크를 다시 요청해주세요.</p>
    </div>
  )

  return (
    <main style={{ fontFamily: font, background: BG, minHeight: '100vh', paddingBottom: 80 }}>
      <div style={{ maxWidth: 580, margin: '0 auto', padding: '40px 16px 0' }}>

        {/* ── 인증서 ── */}
        <CareCertificate data={careData} />

        {/* ── 구분 ── */}
        <div style={{ margin: '28px 0 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: '#E8E2D8' }} />
          <span style={{ fontSize: '0.78rem', color: '#BBB', fontWeight: 600, whiteSpace: 'nowrap' }}>
            시공 사진 · 안심케어 후기
          </span>
          <div style={{ flex: 1, height: 1, background: '#E8E2D8' }} />
        </div>

        {/* ── 시공 사진 (작게) ── */}
        {careData.photos?.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: '0.72rem', color: '#BBB', fontWeight: 600, marginBottom: 8, fontFamily: font }}>
              시공 완료 사진
            </p>
            <div style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
            }}>
              {careData.photos.map((url, i) => (
                <div key={i} style={{
                  width: 90, height: 90,
                  borderRadius: 10, overflow: 'hidden',
                  background: '#EAE8E2', flexShrink: 0,
                }}>
                  <img src={url} alt={`시공사진 ${i + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 리뷰 작성 or 완료 ── */}
        {!submitted ? (
          <div style={{
            background: '#fff', borderRadius: 20,
            padding: '28px 24px',
            border: '1px solid rgba(34,34,34,0.06)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
          }}>
            {/* 안내 문구 */}
            <div style={{
              background: '#FFF9F3', border: `1px solid rgba(168,35,42,0.15)`,
              borderRadius: 10, padding: '12px 14px', marginBottom: 20,
            }}>
              <p style={{ fontSize: '0.8rem', color: '#A8232A', fontWeight: 700, lineHeight: 1.7, margin: 0 }}>
                ✍️ 후기를 등록하셔야 인증서가 활성화됩니다.
              </p>
              <p style={{ fontSize: '0.75rem', color: '#888', lineHeight: 1.7, margin: '6px 0 0', fontFamily: font }}>
                작성해 주신 후기는 사장님이 등록하신 시공 완료 사진과 함께 다인 공식 리뷰 게시판에 포토리뷰로 자동 등록됩니다.
              </p>
            </div>

            {/* 후기 입력 */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 8, color: '#222' }}>
                정성 어린 후기
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="다인을 통해 전문가와 함께하셨다면,후기로 경험을 나눠주세요. 고객님의 이야기는 다음 고객의 기준이 되고, 전문가에게는 가장 큰 응원이 됩니다."
                rows={4}
                style={{
                  width: '100%', padding: '13px 14px',
                  borderRadius: 10, border: '1px solid #E5E5E5',
                  fontSize: '0.88rem', fontFamily: font,
                  background: '#FAFAFA', resize: 'vertical',
                  outline: 'none', lineHeight: 1.7,
                  boxSizing: 'border-box',
                }}
                onFocus={e => e.target.style.borderColor = RED}
                onBlur={e => e.target.style.borderColor = '#E5E5E5'}
              />
            </div>

            {/* 비밀번호 */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 8, color: '#222' }}>
                수정용 비밀번호 <span style={{ color: '#aaa', fontWeight: 500 }}>(숫자 4자리)</span>
              </label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={password}
                onChange={(e) => setPassword(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="0000"
                style={{
                  width: '100%', padding: '13px 14px',
                  borderRadius: 10, border: '1px solid #E5E5E5',
                  fontSize: '1rem', fontFamily: font,
                  background: '#FAFAFA', outline: 'none',
                  letterSpacing: '0.3em', textAlign: 'center',
                  boxSizing: 'border-box',
                }}
                onFocus={e => e.target.style.borderColor = RED}
                onBlur={e => e.target.style.borderColor = '#E5E5E5'}
              />
              <p style={{ fontSize: '0.72rem', color: '#bbb', marginTop: 6, fontFamily: font }}>
                * 비밀번호는 후기 수정 시 사용됩니다. 삭제는 관리자만 가능합니다.
              </p>
            </div>

            {/* 제출 버튼 */}
            <button
              onClick={handleSubmit}
              disabled={submitting}
              style={{
                width: '100%', background: submitting ? '#ccc' : RED,
                color: '#fff', fontWeight: 800, padding: '16px',
                borderRadius: 12, border: 'none', fontSize: '0.95rem',
                cursor: submitting ? 'not-allowed' : 'pointer',
                boxShadow: `0 4px 16px rgba(168,35,42,0.2)`,
                fontFamily: font, transition: 'background 0.2s',
              }}
            >
              {submitting ? '등록 중...' : '✅ 안심케어 활성화 및 후기 등록'}
            </button>
          </div>

        ) : (
          /* ── 등록 완료 ── */
          <div style={{
            background: '#fff', borderRadius: 20,
            padding: '32px 24px', textAlign: 'center',
            border: `2px solid ${RED}`,
            boxShadow: '0 4px 20px rgba(168,35,42,0.08)',
          }}>
            <div style={{ fontSize: '2.2rem', marginBottom: 12 }}>🎉</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 8 }}>
              인증서가 활성화되었습니다!
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.8, marginBottom: 24 }}>
              안심케어를 받으세요.<br />
              소중한 후기 감사합니다 😊
            </p>

            {/* 작성된 리뷰 미리보기 */}
            {careData.review?.text && (
              <div style={{
                background: BG, borderRadius: 10,
                padding: '14px 16px', marginBottom: 20,
                textAlign: 'left',
              }}>
                <p style={{ fontSize: '0.75rem', color: '#aaa', marginBottom: 4, fontFamily: font }}>
                  내가 남긴 후기
                </p>
                <p style={{ fontSize: '0.9rem', color: '#333', lineHeight: 1.7 }}>
                  {careData.review.text}
                </p>
              </div>
            )}

            <a href="/review" style={{
              display: 'inline-block',
              border: `1px solid ${RED}`, color: RED,
              padding: '10px 28px', borderRadius: 10,
              fontSize: '0.85rem', fontWeight: 700,
              textDecoration: 'none', fontFamily: font,
            }}>
              전체 리뷰 보러가기 →
            </a>
          </div>
        )}
      </div>
    </main>
  )
}
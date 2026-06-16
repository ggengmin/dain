import { useState, useRef } from 'react'

// 📌 나중에 EmailJS 연동 시 여기에 추가
// import emailjs from '@emailjs/browser'
// const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
// const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
// const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

const RED  = '#A8232A'
const BG   = '#F5F4F0'
const font = "'Pretendard', -apple-system, sans-serif"

export default function Contact() {
  const formRef = useRef()
  const [contactType, setContactType] = useState('기술자 파트너 입점 제안')
  const [status, setStatus] = useState('idle') // idle | sending | done

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')

    // 📌 나중에 EmailJS 연동 시 아래 console.log 대신 emailjs.sendForm() 호출
    const formData = new FormData(formRef.current)
    console.log('[다인 문의 접수]', {
      contact_type: contactType,
      name: formData.get('name'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    })

    setTimeout(() => {
      setStatus('done')
      formRef.current.reset()
      setContactType('기술자 파트너 입점 제안')
    }, 600)
  }

  return (
    <main style={{ fontFamily: font, background: BG, minHeight: '100vh', paddingBottom: 80 }}>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '60px 20px 0' }}>

        {/* 헤더 */}
        <header style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 1.8rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 10 }}>
            비즈니스 제휴 및 제안
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#666', fontWeight: 500, wordBreak: 'keep-all' }}>
            현장에서 실력을 증명하고 책임감을 다하는 전문 사장님들과 다인의 동행을 기다립니다
          </p>
        </header>

        {/* 일반 고객 안내 배너 */}
        <div style={{
          background: '#fff', border: '1px solid rgba(34,34,34,0.06)',
          borderRadius: 16, padding: '16px 18px',
          marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>💡</span>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#444', lineHeight: 1.7 }}>
            본 페이지는 기업 제휴 및 기술자 파트너 입점 전용입니다. <br/>일반 고객님의 시공 문의는 
            <a href="/partners" style={{ color: RED, fontWeight: 800, borderBottom: `1px solid ${RED}`, textDecoration: 'none' }}>
               [다인 전문가] 
            </a>
             에서 사장님과 직접 소통하시는 것이 가장 빠르고 정확합니다.
          </p>
        </div>

        {/* 완료 메시지 */}
        {status === 'done' && (
          <div style={{
            background: '#fff', border: `2px solid #10B981`,
            borderRadius: 16, padding: '24px', marginBottom: 24,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>✅</div>
            <p style={{ fontWeight: 800, fontSize: '1rem', marginBottom: 4 }}>정상 접수되었습니다!</p>
            <p style={{ fontSize: '0.82rem', color: '#666' }}>입력하신 연락처로 신속히 답변드리겠습니다.</p>
          </div>
        )}

        {/* 폼 */}
        <form ref={formRef} onSubmit={handleSubmit} style={{
          background: '#fff',
          border: '1px solid rgba(34,34,34,0.06)',
          borderRadius: 24, padding: '36px 32px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.01)',
        }}>

          {/* 문의 목적 */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 10 }}>
              문의 목적 선택
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {['기술자 파트너 입점 제안', 'B2B / 공동구매 / 대형 의뢰'].map((type) => (
                <div
                  key={type}
                  onClick={() => setContactType(type)}
                  style={{
                    border: `1px solid ${contactType === type ? RED : '#E5E5E5'}`,
                    background: contactType === type ? '#FFF9F3' : '#fff',
                    color: contactType === type ? RED : '#555',
                    padding: '14px 10px', borderRadius: 12,
                    textAlign: 'center', fontSize: '0.82rem', fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.18s',
                    lineHeight: 1.5,
                  }}
                >
                  {type}
                </div>
              ))}
            </div>
            <input type="hidden" name="contact_type" value={contactType} />
          </div>

          {/* 업체명 / 성함 */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 8 }}>
              업체명 / 제안자 성함
            </label>
            <input
              type="text"
              name="name"
              placeholder="예: 다인도배 / 홍길동 대표"
              required
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = RED}
              onBlur={e => e.target.style.borderColor = '#E5E5E5'}
            />
          </div>

          {/* 연락처 */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 8 }}>
              연락처
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="010-0000-0000"
              required
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = RED}
              onBlur={e => e.target.style.borderColor = '#E5E5E5'}
            />
          </div>

          {/* 문의 내용 */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 8 }}>
              제안 및 문의 내용
            </label>
            <textarea
              name="message"
              placeholder="파트너 입점 희망 시 [주요 활동 지역 / 경력 / 주력 시공 분야]를 적어주시면 검토 후 운영진이 개별 연락을 드립니다."
              required
              style={{ ...inputStyle, minHeight: 160, resize: 'vertical' }}
              onFocus={e => e.target.style.borderColor = RED}
              onBlur={e => e.target.style.borderColor = '#E5E5E5'}
            />
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={status === 'sending'}
            style={{
              width: '100%',
              background: status === 'sending' ? '#ccc' : RED,
              color: '#fff', fontWeight: 700, padding: '16px',
              borderRadius: 12, border: 'none', fontSize: '0.95rem',
              cursor: status === 'sending' ? 'not-allowed' : 'pointer',
              boxShadow: `0 4px 12px rgba(168,35,42,0.15)`,
              transition: 'background 0.2s', fontFamily: font,
            }}
          >
            {status === 'sending' ? '접수 중...' : '접수하기'}
          </button>

        </form>
      </div>
    </main>
  )
}

const inputStyle = {
  width: '100%', padding: '13px 16px',
  borderRadius: 10, border: '1px solid #E5E5E5',
  fontSize: '0.88rem', fontWeight: 500,
  background: '#FAFAFA', outline: 'none',
  transition: 'border-color 0.2s',
  fontFamily: "'Pretendard', -apple-system, sans-serif",
}
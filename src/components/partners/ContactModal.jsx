// components/partners/ContactModal.jsx
// 역할: 번호 공개 전 "다인 홈페이지 보고 연락드렸습니다" 안내 모달
// 모든 파트너 공통으로 사용

const RED  = '#A8232A'
const BG   = '#F5F4F0'
const font = "'Pretendard', -apple-system, sans-serif"

export default function ContactModal({ onClose, onConfirm }) {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(3px)',
      zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }}>
      <div style={{
        background: BG, borderRadius: 20,
        maxWidth: 340, width: '100%',
        padding: '28px 24px', textAlign: 'center',
        fontFamily: font,
      }}>
        <div style={{ fontSize: '1.6rem', marginBottom: 10 }}>🔔</div>
        <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: 8 }}>다인 특전 안내</h4>
        <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.8 }}>
          전문가 직통 연락 시<br />
          <span style={{ color: RED, fontWeight: 800 }}>"다인 홈페이지 보고 연락드렸습니다"</span><br />
          라고 꼭 말씀해 주셔야<br />
          무상 특전 서비스가 정상 적용됩니다.
        </p>
        <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '10px', borderRadius: 8,
            border: '1px solid #CCC', background: '#fff',
            fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
            fontFamily: font,
          }}>돌아가기</button>
          <button onClick={onConfirm} style={{
            flex: 2, padding: '10px', borderRadius: 8,
            border: 'none', background: RED, color: '#fff',
            fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
            fontFamily: font,
          }}>확인 후 번호 보기</button>
        </div>
      </div>
    </div>
  )
}
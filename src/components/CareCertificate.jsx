// CareCertificate.jsx
// 사용법: <CareCertificate data={careData} />

export default function CareCertificate({ data }) {
  const {
    id,
    category    = '',
    partnerName = '',
    ownerName   = '',
    carePeriod  = '시공 완료일로부터 1년',
    date,
  } = data

  const dateStr = date?.toDate
    ? date.toDate().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
    : typeof date === 'string'
    ? date
    : new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })

  const disclaimerName = partnerName || '해당 업체'

  return (
    <svg
      viewBox="0 0 560 580"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ width: '100%', maxWidth: 560, fontFamily: "'Noto Serif KR', Georgia, serif" }}
      role="img"
      aria-label="다인 안심케어 인증서"
    >
      {/* 배경 */}
      <rect width="560" height="580" fill="#FDFCF8" rx="14"/>
      {/* 이중 테두리 */}
      <rect x="12" y="12" width="536" height="556" fill="none" stroke="#A8232A" strokeWidth="2" rx="10"/>
      <rect x="19" y="19" width="522" height="542" fill="none" stroke="#A8232A" strokeWidth="0.6" rx="7"/>

      {/* 제목 - DAIN PARTNERS 제거, 상단 여백 줄임 */}
      <text x="280" y="76" fontSize="26" fill="#111" fontWeight="700"
        textAnchor="middle" letterSpacing="6">
        안심케어 인증서
      </text>
      <text x="280" y="98" fontSize="10" fill="#A8232A" textAnchor="middle"
        letterSpacing="3" fontFamily="'Pretendard',sans-serif">
        DAIN CARE CERTIFICATE
      </text>

      {/* 장식선 */}
      <line x1="160" y1="113" x2="400" y2="113" stroke="#A8232A" strokeWidth="0.6" opacity="0.3"/>
      <circle cx="280" cy="113" r="3" fill="#A8232A" opacity="0.3"/>

      {/* 인증 문구 */}
      <text x="280" y="148" fontSize="12.5" fill="#444" textAnchor="middle">
        귀하의 소중한 공간은 다인의 검증된 전문가에 의해
      </text>
      <text x="280" y="168" fontSize="12.5" fill="#444" textAnchor="middle">
        성실하고 책임감 있게 시공되었음을 인증합니다.
      </text>

      {/* 구분선 */}
      <line x1="42" y1="190" x2="518" y2="190" stroke="#E8E2D8" strokeWidth="1"/>

      {/* 인증번호 */}
      <text x="62" y="222" fontSize="10.5" fill="#AAA"
        fontFamily="'Pretendard',sans-serif" letterSpacing="1">인 증 번 호</text>
      <text x="498" y="222" fontSize="12" fill="#111" fontWeight="700"
        textAnchor="end" fontFamily="'Pretendard',sans-serif">{id}</text>
      <line x1="42" y1="234" x2="518" y2="234" stroke="#F0EAE0" strokeWidth="0.8"/>

      {/* 업체명 */}
      <text x="62" y="266" fontSize="10.5" fill="#AAA"
        fontFamily="'Pretendard',sans-serif" letterSpacing="1">업 체 명</text>
      <text x="498" y="266" fontSize="12.5" fill="#111" fontWeight="700"
        textAnchor="end">{partnerName}</text>
      <line x1="42" y1="278" x2="518" y2="278" stroke="#F0EAE0" strokeWidth="0.8"/>

      {/* 대표자 */}
      <text x="62" y="310" fontSize="10.5" fill="#AAA"
        fontFamily="'Pretendard',sans-serif" letterSpacing="1">대 표 자</text>
      <text x="498" y="310" fontSize="12.5" fill="#111" fontWeight="700"
        textAnchor="end">{ownerName}</text>
      <line x1="42" y1="322" x2="518" y2="322" stroke="#F0EAE0" strokeWidth="0.8"/>

      {/* 시공공종 */}
      <text x="62" y="354" fontSize="10.5" fill="#AAA"
        fontFamily="'Pretendard',sans-serif" letterSpacing="1">시 공 공 종</text>
      <text x="498" y="354" fontSize="12.5" fill="#111" fontWeight="700"
        textAnchor="end">{category}</text>
      <line x1="42" y1="366" x2="518" y2="366" stroke="#F0EAE0" strokeWidth="0.8"/>

      {/* 시공일자 */}
      <text x="62" y="398" fontSize="10.5" fill="#AAA"
        fontFamily="'Pretendard',sans-serif" letterSpacing="1">시 공 일 자</text>
      <text x="498" y="398" fontSize="12.5" fill="#111" fontWeight="700"
        textAnchor="end" fontFamily="'Pretendard',sans-serif">{dateStr}</text>
      <line x1="42" y1="410" x2="518" y2="410" stroke="#F0EAE0" strokeWidth="0.8"/>

      {/* 안심케어기간 */}
      <text x="62" y="442" fontSize="10.5" fill="#AAA"
        fontFamily="'Pretendard',sans-serif" letterSpacing="1">안심케어기간</text>
      <text x="498" y="442" fontSize="12.5" fill="#A8232A" fontWeight="700"
        textAnchor="end">{carePeriod}</text>

      {/* 굵은 구분선 */}
      <line x1="42" y1="462" x2="518" y2="462" stroke="#E8E2D8" strokeWidth="1"/>

      {/* 발급기관 텍스트 */}
      <text x="62" y="494" fontSize="13" fill="#111" fontWeight="700">다인 파트너스</text>
      <text x="62" y="512" fontSize="10" fill="#999"
        fontFamily="'Pretendard',sans-serif">부울경 홈케어 전문가 협동 연대</text>

      {/* 직인 - 로고 이미지 */}
      <image
        href="/logo.png"
        x="418"
        y="458"
        width="82"
        height="82"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* 면책 문구 */}
      <line x1="42" y1="530" x2="518" y2="530" stroke="#EEE8DF" strokeWidth="0.8"/>
      <text x="280" y="548" fontSize="8.5" fill="#C8C0B4" textAnchor="middle"
        fontFamily="'Pretendard',sans-serif">
        본 인증서는 다인 파트너스의 검증 시스템에 의거하여 발행되었으며, 실질적인 시공 책임 및 안심케어 서비스는
      </text>
      <text x="280" y="563" fontSize="8.5" fill="#C8C0B4" textAnchor="middle"
        fontFamily="'Pretendard',sans-serif">
        {disclaimerName}에서 전담하여 정성껏 이행합니다.
      </text>
    </svg>
  )
}
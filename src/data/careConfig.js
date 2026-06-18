// 공종별 안심케어 설정
// careDescription: 특이사항 있는 업체만 추가, 없으면 생략

export const careConfig = {
  '줄눈시공': {
    category:   '줄눈시공',
    partner:    '누비디자인',
    ownerName:  '홍성빈',
    carePeriod: '시공 완료일로부터 1년',
    careType:   'period',
    // 특이사항 없음
  },
  '탄성시공': {
    category:        '탄성시공',
    partner:         '심영재 하우징',
    ownerName:       '심영재',
    carePeriod:      '시공 완료일로부터 2년',
    careType:        'period',
    careDescription: '소비자 부주의로 인한 하자는 입주 후 출장비가 발생합니다.',
  },
  '전기공사': {
    category:   '전기공사',
    partner:    '태진전기',
    ownerName:  '홍태경·엄남동',
    carePeriod: '시공 완료일로부터 1년',
    careType:   'period',
    // 특이사항 없음
  },
  '에어컨설치': {
    category:        '에어컨설치',
    partner:         '아트에어',
    ownerName:       '문병국',
    carePeriod:      '시공 완료일로부터 2년',
    careType:        'period',
    careDescription: '제품(기기) 관련 하자는 제조사 AS 규정을 따릅니다.',
  },
  '타일시공': {
    category:        '타일시공',
    partner:         '대성타일',
    ownerName:       '범권후',
    carePeriod:      '시공 완료일로부터 1년',
    careType:        'period',
    careDescription: '소비자 부주의로 인한 타일 파손 시 추가금이 발생합니다.',
  },
  '입주청소': {
    category:   '입주청소',
    partner:    '스펙터클린',
    ownerName:  '공민재',
    carePeriod: '시공 완료일로부터 3일',
    careType:   'service',
    careDescription: '안지워지는 부분에 대해서는 AS 불가',
  },
}


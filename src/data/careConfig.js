// 공종별 안심케어 설정
// 사장님 확정 후 careDescription 수정하면 됨

export const careConfig = {
  '줄눈시공': {
    category:        '줄눈시공',
    partner:         '', // 나중에 업체명 추가
    carePeriod:      '시공 완료일로부터 1년',
    careDescription: '시공 완료일로부터 1년간 안심케어 서비스를 제공합니다.',
    careType:        'period', // period | service
  },
  '탄성시공': {
    category:        '탄성시공',
    partner:         '',
    carePeriod:      '시공 완료일로부터 2년',
    careDescription: '곰팡이, 페인트에 대한 하자는 시공 완료일로부터 2년간 안심케어 서비스를 제공합니다. 소비자 부주의로 인한 하자는 입주 후부터는 출장비 발생합니다.',
    careType:        'period',
  },
  '실내전기': {
    category:        '실내전기',
    partner:         '',
    carePeriod:      '시공 완료일로부터 1년',
    careDescription: '시공 완료일로부터 1년간 안심케어 서비스를 제공합니다.',
    careType:        'period',
  },
  '실외전기': {
    category:        '실외전기',
    partner:         '',
    carePeriod:      '시공 완료일로부터 1년',
    careDescription: '시공 완료일로부터 1년간 안심케어 서비스를 제공합니다.',
    careType:        'period',
  },
  '에어컨설치': {
    category:        '에어컨설치',
    partner:         '',
    carePeriod:      '시공 완료일로부터 2년',
    careDescription: '설치 하자에 대해 시공 완료일로부터 2년간 무상 AS를 제공합니다. 단, 제품(기기) 관련 하자는 제조사 AS 규정을 따릅니다.',
    careType:        'period',
  },
  '타일': {
    category:        '타일',
    partner:         '',
    carePeriod:      '시공 완료일로부터 1년',
    careDescription: '시공 완료일로부터 1년간 안심케어 서비스를 제공합니다. 소비자 부주의로 타일도기 파손시 추가금 발생',
    careType:        'period',
  },
  '입주청소': {
    category:        '입주청소',
    partner:         '',
    carePeriod:      '불만족 시 재서비스 보장',
    careDescription: '서비스 완료 후 불만족 시 재서비스를 보장합니다.',
    careType:        'service',
  },
}

// 파트너별 업체명 매핑 (나중에 추가)
export const partnerNames = {
  '줄눈시공':  '누비디자인',
  '탄성시공':  '심영재하우징',
  '실내전기':  '태진전기',
  '실외전기':  '태진전기',
  '에어컨설치':'아트에어',
  '타일':'대성타일',
  '입주청소':  '스펙터클린',
}
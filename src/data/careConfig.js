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
    carePeriod:      '시공 완료일로부터 1년',
    careDescription: '시공 완료일로부터 1년간 안심케어 서비스를 제공합니다.',
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
    carePeriod:      '시공 완료일로부터 1년',
    careDescription: '시공 완료일로부터 1년간 안심케어 서비스를 제공합니다.',
    careType:        'period',
  },
  '에어컨청소': {
    category:        '에어컨청소',
    partner:         '',
    carePeriod:      '불만족 시 재서비스 보장',
    careDescription: '서비스 완료 후 불만족 시 재서비스를 보장합니다.',
    careType:        'service',
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
  '탄성시공':  '',
  '실내전기':  '',
  '실외전기':  '',
  '에어컨설치':'',
  '에어컨청소':'',
  '입주청소':  '',
}
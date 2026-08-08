// 지금인테리어필름 파트너 상세 페이지 전용 데이터

export const present = {
  id: 'present',
  category: '인테리어 필름',
  categoryLabel: '다인 필름 전문가',
  name: '지금인테리어필름',
  owner: '이현재',
  career: '10년',
  area: '부산',

  profileImage: '/profile_image_present.jpg',

  stats: [
    { label: '시공 기준',   value: '교체 없이 공간 변화' },
    { label: '시공 경력',   value: '10년' },
    { label: '거점 구역',   value: '부산' },
  ],

  links: [
    { label: '📸 인스타그램 시공 기록', url: 'https://www.instagram.com/preznt91' },
  ],

  contact: '010-7466-1076',

  benefit: `다인을 통해 지금인테리어필름과 연결되신 고객분들께 시공 금액의 3~5% 할인 혜택을 제공해드립니다.`,

  // ── [섹션1] 설득 카피 ─────────────────────────────
  reason: {
    title: '비싸게 교체하지 마세요.\n필름 하나로 집 전체의 분위기가 바뀝니다.',
    body: [
      '낡은 문, 붙박이장, 싱크대, 방화문. 모두 새것으로 교체하지 않아도 됩니다. 인테리어 필름은 기존 자재를 그대로 활용하면서, 공간의 분위기를 새롭게 바꾸는 가장 합리적인 방법입니다.',
      '불필요한 철거와 교체 비용은 줄이고, 새것 같은 공간으로 완성해드립니다.',
    ],
    highlight: {
      title: '💡 지금인테리어필름의 시공 기준',
      body: '"교체 없이도, 새것 같은 공간을 만드는 것이 목표입니다."',
    },
    principles: [
      {
        icon: '🚪',
        title: '교체보다, 공간을 살리는 시공',
        desc: '아직 사용할 수 있는 문, 방화문, 붙박이장, 싱크대. 버리고 새로 만드는 대신 기존 자재를 살려 새로운 공간으로 변화시킵니다.',
      },
      {
        icon: '✨',
        title: '작은 마감이 완성도를 결정합니다',
        desc: '필름은 모서리와 이음새 같은 작은 디테일에서 차이가 드러납니다. 눈에 잘 보이지 않는 부분까지 꼼꼼하게 마감하여 깔끔한 결과를 완성합니다.',
      },
    ],
  },

  // ── [섹션2] Before & After 3세트 ─────────────────
  beforeAfter: [
    {
      before:     '/present_before_1.jpg',
      after:      '/present_after_1.jpg',
      beforeDesc: 'Before',
      afterDesc:  'After',
    },
    {
      before:     '/present_before_2.jpg',
      after:      '/present_after_2.jpg',
      beforeDesc: 'Before',
      afterDesc:  'After',
    },
    {
      before:     '/present_before_3.jpg',
      after:      '/present_after_3.jpg',
      beforeDesc: 'Before',
      afterDesc:  'After',
    },
  ],

  // ── [섹션3] 인사말 ────────────────────────────────
  intro: `안녕하세요. 지금인테리어필름 대표 이현재입니다.

인테리어 필름은 단순히 색을 바꾸는 작업이 아닙니다. 기존 공간을 최대한 살리면서 새로운 분위기를 만드는 시공이라고 생각합니다.

그래서 저는 "교체할 수 있지만, 굳이 교체하지 않아도 되는 방법"을 먼저 고민합니다. 아직 충분히 사용할 수 있는 문과 가구, 방화문을 새것처럼 바꾸어 고객님의 부담은 줄이고 공간의 가치는 높이는 것이 제 역할이라고 생각합니다.

필름 시공은 작은 마감 하나가 전체 완성도를 결정합니다. 보이지 않는 부분까지 꼼꼼하게 작업하고, 시간이 지나도 만족할 수 있는 결과를 만들기 위해 한 현장 한 현장 정성을 다하고 있습니다.

믿고 맡겨주신 만큼 결과로 보답하겠습니다. 감사합니다.`,
}
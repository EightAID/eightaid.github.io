export type Member = {
  id: string
  name: string
  role: string
  bio: string
  skills: string[]
}

export const members: Member[] = [
  {
    id: 'yui',
    name: '結衣',
    role: 'シナリオ / ディレクター',
    bio: '企画、シナリオ、演出設計を担当。ゲーム全体の世界観と物語体験を設計しています。',
    skills: ['Scenario', 'Direction', 'Worldbuilding'],
  },
  {
    id: 'kai',
    name: 'カイ',
    role: 'プログラム / グラフィック',
    bio: 'Unity実装、UI、エフェクト、デバッグを担当。遊びの手触りと没入感の最適化を進めています。',
    skills: ['Unity', 'Gameplay', 'UI/UX'],
  },
]

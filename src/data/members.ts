export type Member = {
  id: string
  name: string
  role: string
  bio: string
  image: string
  xUrl: string
  skills: string[]
}

export const members: Member[] = [
  {
    id: 'eightaid',
    name: 'えいとえいど',
    role: '企画 / プログラム',
    bio: '代償少女の企画とプログラムを担当。カードバトルとADVの遊びをつなぐ体験設計を進めています。',
    image: '/assets/member-eightaid.png',
    xUrl: 'https://x.com/AIDunity',
    skills: ['Planning', 'Programming', 'Game Design'],
  },
  {
    id: 'beniimo',
    name: '紅芋けんぴ',
    role: 'イラスト / シナリオ',
    bio: '代償少女のイラストとシナリオを担当。プレイヤーの選択が心に残る物語体験を設計しています。',
    image: '/assets/member-beniimo.png',
    xUrl: 'https://x.com/beniimo_game',
    skills: ['Illustration', 'Scenario', 'Art Direction'],
  },
]

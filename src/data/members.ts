export type PastWork = {
  title: string
  year: string
  link?: string
  image?: string
  coverTone?: 'crimson' | 'amber' | 'violet' | 'emerald' | 'sky' | 'rose'
}

export type Member = {
  id: string
  name: string
  role: string
  bio: string
  image: string
  imagePosition?: string
  xUrl: string
  portfolioUrl?: string
  profile: string
  currentFocus: string
  pastWorks: PastWork[]
}

export const members: Member[] = [
  {
    id: 'eightaid',
    name: 'えいとえいど',
    role: '企画・プログラム',
    bio: '代償少女の企画とプログラムを担当。カードバトルとADVの遊びをつなぐ体験設計を進めています。',
    image: '/assets/member-eightaid.png',
    imagePosition: 'center 28%',
    xUrl: 'https://x.com/AIDunity',
    portfolioUrl: 'https://unityroom.com/users/aidunity',
    profile:
      'ゲーム全体の設計と実装を担当。遊びのループと物語の流れが途切れずつながるよう、企画段階から演出やUIの粒度まで一貫して組み立てています。',
    currentFocus:
      'Steam版に向けたゲームテンポの調整、カードごとの手触りの差分、演出面の磨き込みを進めています。',
    pastWorks: [
      {
        title: '代償少女',
        year: '2025',
        link: 'https://unityroom.com/games/lostedai',
        image: '/icons/代償少女.png',
        coverTone: 'crimson',
      },
      {
        title: 'シロワ様の寿命遊戯',
        year: '2024',
        link: 'https://unityroom.com/games/sirowasamaage',
        image: '/icons/シロワ様.png',
        coverTone: 'violet',
      },
      {
        title: '嘘がニガテな暮多さん',
        year: '2024',
        link: 'https://unityroom.com/games/kuretasan',
        image: '/icons/嘘がニガテな暮多さん.png',
        coverTone: 'rose',
      },
      {
        title: 'フェルと化け物の森',
        year: '2024',
        link: 'https://unityroom.com/games/rydie',
        image: '/icons/フェルと化け物の森.png',
        coverTone: 'emerald',
      },
      {
        title: 'ぴよぴよ-卵を"かえす"落ち物パズル-',
        year: '2024',
        link: 'https://unityroom.com/games/hiyocome',
        image: '/icons/ぴよぴよ.png',
        coverTone: 'amber',
      },
      {
        title: 'それいけっ!!メンダコ',
        year: '2024',
        link: 'https://unityroom.com/games/tako',
        image: '/icons/メンダコ.png',
        coverTone: 'sky',
      },
      {
        title: 'やさぐれ性格診断',
        year: '2026',
        link: 'https://unityroom.com/games/zettaisou',
        image: '/icons/やさぐれ性格診断.png',
        coverTone: 'violet',
      },
      {
        title: 'すくって救え！人魚すくい',
        year: '2026',
        link: 'https://unityroom.com/games/sukuttesukue',
        image: '/icons/人魚すくい.png',
        coverTone: 'emerald',
      },
      {
        title: 'Hide for Cat -all for the best-',
        year: '2023',
        link: 'https://store.steampowered.com/app/2607760/Hide_for_Cat__all_for_the_best/?l=japanese',
        image: '/icons/垂直カプセル.png',
        coverTone: 'sky',
      },
    ],
  },
  {
    id: 'beniimo',
    name: '紅芋けんぴ',
    role: 'イラスト・シナリオ',
    bio: '代償少女のイラストとシナリオを担当。プレイヤーの選択が心に残る物語体験を設計しています。',
    image: '/assets/member-beniimo.png',
    xUrl: 'https://x.com/beniimo_game',
    portfolioUrl: 'https://unityroom.com/users/beniimokenpi',
    profile:
      'キャラクターデザイン、イベントCG、シナリオを横断して担当。感情の揺れが画面と文章の両方から伝わる構成を重視しています。',
    currentFocus:
      '代償によって変化する少女たちの表情差分や、選択後の余韻が残る文章表現を強化しています。',
    pastWorks: [
      {
        title: '代償少女',
        year: '2025',
        link: 'https://unityroom.com/games/lostedai',
        image: '/icons/代償少女.png',
        coverTone: 'crimson',
      },
      {
        title: 'シロワ様の寿命遊戯',
        year: '2025',
        link: 'https://unityroom.com/games/sirowasamaage',
        image: '/icons/シロワ様.png',
        coverTone: 'violet',
      },
      {
        title: '悪魔の心臓のつくりかた',
        year: '2025',
        link: 'https://unityroom.com/games/how_to_make_devils_heart',
        image: '/icons/悪魔の心臓の作り方.png',
        coverTone: 'rose',
      },
      {
        title: 'ミオソティスに祝福を',
        year: '2025',
        link: 'https://unityroom.com/games/myosotis',
        image: '/icons/ミオソティス.png',
        coverTone: 'sky',
      },
      {
        title: 'カスロット',
        year: '2025',
        link: 'https://unityroom.com/games/shitslot',
        image: '/icons/カスロット.png',
        coverTone: 'amber',
      },
      {
        title: 'トコ夢マヨイ',
        year: '2025',
        link: 'https://unityroom.com/games/tokoyume',
        image: '/icons/トコ夢マヨイ.png',
        coverTone: 'violet',
      },
      {
        title: 'イオネムイズゴッド',
        year: '2025',
        link: 'https://unityroom.com/games/ionemuizugoddo',
        image: '/icons/イオネム.png',
        coverTone: 'emerald',
      },
      {
        title: 'ラジアータの愛染罪',
        year: '2021',
        link: 'https://www.freem.ne.jp/win/game/26247',
        image: '/assets/ラジアータの愛染罪.png',
        coverTone: 'rose',
      },
    ],
  },
]

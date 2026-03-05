export type Member = {
  id: string
  name: string
  role: string
  grade: string
  bio: string
  skills: string[]
  links: {
    label: string
    url: string
  }[]
}

export const members: Member[] = [
  {
    id: 'haruka',
    name: 'Haruka Sato',
    role: 'Circle Leader',
    grade: '4th Year',
    bio: 'Coordinates events, sponsorship, and project planning for the circle.',
    skills: ['Planning', 'UI Design', 'Presentation'],
    links: [
      { label: 'GitHub', url: 'https://github.com/' },
      { label: 'X', url: 'https://x.com/' },
    ],
  },
  {
    id: 'ren',
    name: 'Ren Tanaka',
    role: 'Frontend Engineer',
    grade: '3rd Year',
    bio: 'Builds web apps with React and improves the circle site every week.',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    links: [
      { label: 'GitHub', url: 'https://github.com/' },
      { label: 'Portfolio', url: 'https://example.com/' },
    ],
  },
  {
    id: 'mei',
    name: 'Mei Kondo',
    role: 'Designer',
    grade: '2nd Year',
    bio: 'Designs posters and social assets and supports product visuals.',
    skills: ['Figma', 'Illustration', 'Branding'],
    links: [
      { label: 'Behance', url: 'https://www.behance.net/' },
      { label: 'Instagram', url: 'https://www.instagram.com/' },
    ],
  },
]

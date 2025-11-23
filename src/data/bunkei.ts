export interface BunkeiItem {
  id: string;
  pattern: string;
  meaning: string;
  explanation: string;
  examples: { jp: string; romaji: string; en: string }[];
  chapter: number;
}

export const bunkeiData: BunkeiItem[] = [
  // Chapter 1
  {
    id: 'c1-1',
    pattern: 'N1 wa N2 desu',
    meaning: 'N1 is N2',
    explanation: 'Indicates that the topic N1 is equivalent to N2.',
    examples: [
      { jp: '私はマイク・ミラーです。', romaji: 'Watashi wa Maiku Miraa desu.', en: 'I am Mike Miller.' },
    ],
    chapter: 1,
  },
  {
    id: 'c1-2',
    pattern: 'N1 wa N2 ja arimasen',
    meaning: 'N1 is not N2',
    explanation: 'Negative form of "desu".',
    examples: [
      { jp: 'サントスさんは学生じゃありません。', romaji: 'Santosu-san wa gakusei ja arimasen.', en: 'Mr. Santos is not a student.' },
    ],
    chapter: 1,
  },
  
  // Chapter 7
  {
    id: 'c7-1',
    pattern: 'N (tool/means) de V',
    meaning: 'Do V using N',
    explanation: 'Indicates the tool or means used to perform an action.',
    examples: [
      { jp: 'はしで食べます。', romaji: 'Hashi de tabemasu.', en: 'I eat with chopsticks.' },
      { jp: '日本語でレポートを書きます。', romaji: 'Nihongo de repooto o kakimasu.', en: 'I write the report in Japanese.' },
    ],
    chapter: 7,
  },
  {
    id: 'c7-2',
    pattern: '"Word/Sentence" wa ~go de nan desu ka',
    meaning: 'What is "..." in [Language]?',
    explanation: 'Used to ask how to say something in a specific language.',
    examples: [
      { jp: '「ありがとう」は英語でなんですか。', romaji: '"Arigatou" wa Eigo de nan desu ka.', en: 'What is "Arigatou" in English?' },
    ],
    chapter: 7,
  },
  {
    id: 'c7-3',
    pattern: 'N (person) ni agemasu, etc.',
    meaning: 'Give to N',
    explanation: 'Verbs like agemasu (give), kashimasu (lend), oshiemasu (teach) take the particle "ni" for the receiver.',
    examples: [
      { jp: '山田さんは木村さんに花をあげました。', romaji: 'Yamada-san wa Kimura-san ni hana o agemashita.', en: 'Mr. Yamada gave flowers to Ms. Kimura.' },
    ],
    chapter: 7,
  },
];

export const getBunkeiByChapter = (chapter: number) => {
  return bunkeiData.filter((b) => b.chapter === chapter);
};

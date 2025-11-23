export interface VocabItem {
  id: string;
  jp: string;
  romaji: string;
  meaning: string;
  chapter: number;
}

// Sample data for Chapter 1 & 7 (matching our mock/default)
export const vocabData: VocabItem[] = [
  // Chapter 1
  { id: 'watashi', jp: '私', romaji: 'watashi', meaning: 'I', chapter: 1 },
  { id: 'anata', jp: 'あなた', romaji: 'anata', meaning: 'you', chapter: 1 },
  { id: 'sensei', jp: '先生', romaji: 'sensei', meaning: 'teacher, instructor', chapter: 1 },
  { id: 'gakusei', jp: '学生', romaji: 'gakusei', meaning: 'student', chapter: 1 },
  
  // Chapter 7
  { id: 'kirimasu', jp: '切ります', romaji: 'kirimasu', meaning: 'cut', chapter: 7 },
  { id: 'okurimasu', jp: '送ります', romaji: 'okurimasu', meaning: 'send', chapter: 7 },
  { id: 'agemasu', jp: 'あげます', romaji: 'agemasu', meaning: 'give', chapter: 7 },
  { id: 'moraimasu', jp: 'もらいます', romaji: 'moraimasu', meaning: 'receive', chapter: 7 },
  { id: 'te', jp: '手', romaji: 'te', meaning: 'hand, arm', chapter: 7 },
  { id: 'hashi', jp: '箸', romaji: 'hashi', meaning: 'chopsticks', chapter: 7 },
  { id: 'supuun', jp: 'スプーン', romaji: 'supuun', meaning: 'spoon', chapter: 7 },
  { id: 'naifu', jp: 'ナイフ', romaji: 'naifu', meaning: 'knife', chapter: 7 },
  { id: 'fo-ku', jp: 'フォーク', romaji: 'fo-ku', meaning: 'fork', chapter: 7 },
  { id: 'hasami', jp: 'はさみ', romaji: 'hasami', meaning: 'scissors', chapter: 7 },
];

export const getVocabByChapter = (chapter: number) => {
  return vocabData.filter((v) => v.chapter === chapter);
};

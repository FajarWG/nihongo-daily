import React from 'react';
import { getVocabByChapter } from '@/data/vocab';
import { getVocabularyProgress } from '@/app/actions/vocab';
import ChapterContent from './ChapterContent';

export default async function ChapterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const chapterId = Number(id);
  const vocabList = getVocabByChapter(chapterId);
  const progress = await getVocabularyProgress(chapterId);

  return (
    <ChapterContent 
      chapterId={chapterId} 
      vocabList={vocabList} 
      initialProgress={progress} 
    />
  );
}

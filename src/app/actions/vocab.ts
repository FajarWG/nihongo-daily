'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getVocabularyProgress(chapter: number) {
  const progress = await prisma.vocabularyProgress.findMany({
    where: { chapter },
  });
  return progress;
}

export async function toggleVocabStatus(chapter: number, vocabJp: string, currentStatus: number) {
  const newStatus = currentStatus === 0 ? 1 : 0;

  await prisma.vocabularyProgress.upsert({
    where: {
      chapter_vocabJp: {
        chapter,
        vocabJp,
      },
    },
    update: {
      status: newStatus,
    },
    create: {
      chapter,
      vocabJp,
      vocabId: vocabJp, // Using vocabJp as ID for now
      status: newStatus,
    },
  });

  revalidatePath(`/chapter/${chapter}`);
}

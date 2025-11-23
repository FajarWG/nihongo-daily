'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getDailyLog(date: Date) {
  // Normalize date to start of day
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const log = await prisma.dailyStudyLog.findFirst({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  return log;
}

export async function updateDuolingoXP(date: Date, xp: number) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  // Upsert logic manually since we are matching by date range
  const existingLog = await prisma.dailyStudyLog.findFirst({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  if (existingLog) {
    await prisma.dailyStudyLog.update({
      where: { id: existingLog.id },
      data: { taskDuolingoXP: xp },
    });
  } else {
    // Create new log if not exists (assuming chapter 1 for now, logic needs to be smarter about chapter)
    // For now, we'll just create it. The chapter logic should be handled by the schedule generator or passed in.
    // We'll default to 1 if creating from scratch here, but ideally we pass the chapter.
    await prisma.dailyStudyLog.create({
      data: {
        date: new Date(),
        chapterNumber: 1, // Default, should be dynamic
        taskDuolingoXP: xp,
      },
    });
  }

  revalidatePath('/');
}

export async function toggleDailyTask(date: Date, taskField: string, completed: boolean) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const existingLog = await prisma.dailyStudyLog.findFirst({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  // Map taskField string to actual schema column
  // taskVocab, taskBunkei, taskListening, taskExercise
  const validFields = ['taskVocab', 'taskBunkei', 'taskListening', 'taskExercise'];
  if (!validFields.includes(taskField)) {
    throw new Error('Invalid task field');
  }

  if (existingLog) {
    await prisma.dailyStudyLog.update({
      where: { id: existingLog.id },
      data: { [taskField]: completed },
    });
  } else {
    await prisma.dailyStudyLog.create({
      data: {
        date: new Date(),
        chapterNumber: 1,
        [taskField]: completed,
      },
    });
  }

  revalidatePath('/');
}

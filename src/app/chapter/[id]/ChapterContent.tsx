'use client';

import React, { useState } from 'react';
import QuizModule from '@/components/Quiz/QuizModule';
import VocabList from '@/components/Chapter/VocabList';
import BunkeiList from '@/components/Chapter/BunkeiList';
import { VocabItem } from '@/data/vocab';
import { BunkeiItem } from '@/data/bunkei';

interface ChapterContentProps {
  chapterId: number;
  vocabList: VocabItem[];
  bunkeiList: BunkeiItem[];
  initialProgress: { vocabJp: string; status: number }[];
}

export default function ChapterContent({
  chapterId,
  vocabList,
  bunkeiList,
  initialProgress,
}: ChapterContentProps) {
  const [activeTab, setActiveTab] = useState('vocab');

  return (
    <main className="min-h-screen p-5 md:p-10 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Chapter {chapterId}</h1>
        </header>

        <div className="flex justify-center gap-4 mb-8">
          <button
            className={`px-4 py-2 rounded-full font-semibold transition-all ${
              activeTab === 'vocab'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('vocab')}
          >
            Vocabulary
          </button>
          <button
            className={`px-4 py-2 rounded-full font-semibold transition-all ${
              activeTab === 'bunkei'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('bunkei')}
          >
            Bunkei
          </button>
          <button
            className={`px-4 py-2 rounded-full font-semibold transition-all ${
              activeTab === 'quiz'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('quiz')}
          >
            Quiz
          </button>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm min-h-[400px]">
          {activeTab === 'vocab' && (
            <VocabList
              chapter={chapterId}
              vocabList={vocabList}
              initialProgress={initialProgress}
            />
          )}
          {activeTab === 'quiz' && <QuizModule chapter={chapterId} />}
          {activeTab === 'bunkei' && (
            <BunkeiList bunkeiList={bunkeiList} />
          )}
        </div>
      </div>
    </main>
  );
}

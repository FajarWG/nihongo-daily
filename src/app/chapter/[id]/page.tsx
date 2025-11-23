'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import QuizModule from '@/components/Quiz/QuizModule';

export default function ChapterPage() {
  const params = useParams();
  const chapterId = Number(params.id);
  const [activeTab, setActiveTab] = useState('quiz');

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
          {activeTab === 'quiz' && <QuizModule chapter={chapterId} />}
          {activeTab === 'vocab' && <div className="text-center text-gray-500">Vocabulary list coming soon...</div>}
          {activeTab === 'bunkei' && <div className="text-center text-gray-500">Bunkei explanation coming soon...</div>}
        </div>
      </div>
    </main>
  );
}

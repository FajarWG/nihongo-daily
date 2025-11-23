'use client';

import React, { useState } from 'react';
import { VocabItem } from '@/data/vocab';
import { toggleVocabStatus } from '@/app/actions/vocab';

interface VocabListProps {
  chapter: number;
  vocabList: VocabItem[];
  initialProgress: { vocabJp: string; status: number }[];
}

const VocabList: React.FC<VocabListProps> = ({
  chapter,
  vocabList,
  initialProgress,
}) => {
  // Map progress to a set for easier lookup
  const [progressMap, setProgressMap] = useState<Record<string, number>>(
    initialProgress.reduce((acc, curr) => {
      acc[curr.vocabJp] = curr.status;
      return acc;
    }, {} as Record<string, number>)
  );

  const handleToggle = async (vocab: VocabItem) => {
    const currentStatus = progressMap[vocab.jp] || 0;
    const newStatus = currentStatus === 0 ? 1 : 0;

    // Optimistic update
    setProgressMap((prev) => ({
      ...prev,
      [vocab.jp]: newStatus,
    }));

    try {
      await toggleVocabStatus(chapter, vocab.jp, currentStatus);
    } catch (error) {
      console.error('Failed to toggle status', error);
      // Revert
      setProgressMap((prev) => ({
        ...prev,
        [vocab.jp]: currentStatus,
      }));
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {vocabList.map((vocab) => {
        const isMemorized = (progressMap[vocab.jp] || 0) === 1;
        return (
          <div
            key={vocab.id}
            className={`p-4 rounded-xl border transition-all duration-200 flex justify-between items-center cursor-pointer hover:shadow-md ${
              isMemorized
                ? 'bg-green-50 border-green-200'
                : 'bg-white border-gray-100 hover:border-blue-200'
            }`}
            onClick={() => handleToggle(vocab)}
          >
            <div>
              <div className="text-lg font-bold text-gray-900">{vocab.jp}</div>
              <div className="text-sm text-gray-500">{vocab.romaji}</div>
              <div className="text-sm text-gray-700 mt-1">{vocab.meaning}</div>
            </div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isMemorized ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
              }`}
            >
              {isMemorized ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <div className="w-3 h-3 bg-white rounded-full" />
              )}
            </div>
          </div>
        );
      })}
      {vocabList.length === 0 && (
        <div className="col-span-full text-center text-gray-500 py-10">
          No vocabulary data found for this chapter yet.
        </div>
      )}
    </div>
  );
};

export default VocabList;

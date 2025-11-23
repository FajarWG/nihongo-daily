'use client';

import React from 'react';
import { BunkeiItem } from '@/data/bunkei';

interface BunkeiListProps {
  bunkeiList: BunkeiItem[];
}

const BunkeiList: React.FC<BunkeiListProps> = ({ bunkeiList }) => {
  return (
    <div className="flex flex-col gap-6">
      {bunkeiList.map((item) => (
        <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-blue-600 mb-1">{item.pattern}</h3>
            <p className="text-gray-600 font-medium">{item.meaning}</p>
          </div>
          
          <p className="text-gray-700 mb-4 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg">
            {item.explanation}
          </p>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Examples</h4>
            {item.examples.map((ex, idx) => (
              <div key={idx} className="pl-4 border-l-2 border-blue-200">
                <p className="text-lg font-medium text-gray-800">{ex.jp}</p>
                <p className="text-sm text-gray-500">{ex.romaji}</p>
                <p className="text-sm text-gray-600 italic">{ex.en}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      {bunkeiList.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No grammar patterns found for this chapter yet.
        </div>
      )}
    </div>
  );
};

export default BunkeiList;

import React from 'react';

interface ProgressTrackerProps {
  currentChapter: number;
  totalChapters: number;
  targetDate: Date;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  currentChapter,
  totalChapters,
  targetDate,
}) => {
  const progress = (currentChapter / totalChapters) * 100;
  const daysLeft = Math.ceil(
    (targetDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="glass rounded-2xl p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Progress</h2>
        <span className="text-sm text-gray-500">{daysLeft} days left</span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-pink-500 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <span>
          Chapter {currentChapter} of {totalChapters}
        </span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
    </div>
  );
};

export default ProgressTracker;

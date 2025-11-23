import React from 'react';
import styles from './ProgressTracker.module.css';

interface ProgressTrackerProps {
  currentChapter: number;
  totalChapters: number;
  startDate: Date;
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
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Progress</h2>
        <span>{daysLeft} days left</span>
      </div>
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className={styles.stats}>
        <span>
          Chapter {currentChapter} of {totalChapters}
        </span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
    </div>
  );
};

export default ProgressTracker;

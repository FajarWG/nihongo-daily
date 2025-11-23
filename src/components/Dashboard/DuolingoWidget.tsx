'use client';

import React, { useState, useEffect } from 'react';
import styles from './DuolingoWidget.module.css';

interface DuolingoWidgetProps {
  dailyGoalXP: number;
  currentXP: number;
}

const DuolingoWidget: React.FC<DuolingoWidgetProps> = ({
  dailyGoalXP,
  currentXP,
}) => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval!);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>🦉</div>
        <h3>Duolingo Goal</h3>
      </div>
      
      <div className={styles.content}>
        <div className={styles.xpStat}>
          <span className={styles.xpValue}>{currentXP}</span>
          <span className={styles.xpLabel}>/ {dailyGoalXP} XP</span>
        </div>
        
        <div className={styles.timer}>
          <div className={styles.timeDisplay}>{formatTime(time)}</div>
          <button
            className={`${styles.button} ${isActive ? styles.active : ''}`}
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? 'Pause' : 'Start Timer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DuolingoWidget;

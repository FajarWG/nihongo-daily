import React from 'react';
import styles from './page.module.css';
import { generateSchedule } from '@/lib/schedule';

export default function SchedulePage() {
  // Assuming start date is today for demo purposes
  const startDate = new Date();
  const schedule = generateSchedule(startDate);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>50-Day Study Schedule</h1>
        </header>

        <div className={styles.grid}>
          {schedule.map((day) => (
            <div key={day.dayNumber} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.dayTitle}>Day {day.dayNumber}</span>
                <span className={styles.chapterTag}>
                  Ch {day.chapter} - {day.isDayA ? 'A' : 'B'}
                </span>
              </div>
              <ul className={styles.taskList}>
                {day.tasks.map((task) => (
                  <li key={task.id}>{task.label}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

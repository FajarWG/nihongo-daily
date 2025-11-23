import styles from './page.module.css';
import ProgressTracker from '@/components/Dashboard/ProgressTracker';
import DailyChecklist from '@/components/Dashboard/DailyChecklist';
import DuolingoWidget from '@/components/Dashboard/DuolingoWidget';

export default function Home() {
  // Mock data for now
  const mockData = {
    currentChapter: 7,
    totalChapters: 25,
    startDate: new Date('2023-11-01'),
    targetDate: new Date('2023-12-20'),
    day: 13,
    isDayA: true,
    tasks: [
      { id: '1', label: 'Read Chapter 7 (JP)', completed: true },
      { id: '2', label: 'Read Chapter 7 (Indo)', completed: true },
      { id: '3', label: 'Memorize 35 Vocab', completed: false },
      { id: '4', label: 'Study Bunkei', completed: false },
      { id: '5', label: 'Exercises A-C', completed: false },
    ],
    duolingoGoal: 30,
    currentXP: 15,
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Nihongo Daily</h1>
          <p className={styles.subtitle}>Ganbatte! 50 Days to Mastery</p>
        </header>

        <ProgressTracker
          currentChapter={mockData.currentChapter}
          totalChapters={mockData.totalChapters}
          startDate={mockData.startDate}
          targetDate={mockData.targetDate}
        />

        <div className={styles.grid}>
          <div className={styles.column}>
            <DailyChecklist
              day={mockData.day}
              chapter={mockData.currentChapter}
              isDayA={mockData.isDayA}
              tasks={mockData.tasks}
            />
          </div>
          <div className={styles.column}>
            <DuolingoWidget
              dailyGoalXP={mockData.duolingoGoal}
              currentXP={mockData.currentXP}
            />
            {/* Placeholder for Streak or other widgets */}
          </div>
        </div>
      </div>
    </main>
  );
}

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
    <main className="min-h-screen p-5 md:p-10 bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
            Nihongo Daily
          </h1>
          <p className="text-gray-500 text-lg">Ganbatte! 50 Days to Mastery</p>
        </header>

        <ProgressTracker
          currentChapter={mockData.currentChapter}
          totalChapters={mockData.totalChapters}
          targetDate={mockData.targetDate}
        />

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
          <div className="flex flex-col gap-6">
            <DailyChecklist
              day={mockData.day}
              chapter={mockData.currentChapter}
              isDayA={mockData.isDayA}
              tasks={mockData.tasks}
            />
          </div>
          <div className="flex flex-col gap-6">
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

import ProgressTracker from '@/components/Dashboard/ProgressTracker';
import DailyChecklist from '@/components/Dashboard/DailyChecklist';
import DuolingoWidget from '@/components/Dashboard/DuolingoWidget';
import { getDailyLog } from '@/app/actions/dailyLog';
import { generateSchedule } from '@/lib/schedule';

export default async function Home() {
  const today = new Date();
  const dailyLog = await getDailyLog(today);
  
  // Calculate current progress based on schedule
  // In a real app, we might store the start date in DB or config
  // For now, let's assume start date was 13 days ago to match the mock data feel, 
  // or just use today as day 1 if no logic exists.
  // Let's try to derive "current day" from the log if it exists, or default to Day 1.
  
  // BETTER LOGIC:
  // We should probably have a "ProjectSettings" table for startDate.
  // For this MVP, let's hardcode a start date or calculate it.
  const startDate = new Date('2023-11-01'); // Fixed start date for consistency with previous mock
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const dayNumber = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  // Generate schedule to get today's tasks structure
  const fullSchedule = generateSchedule(startDate);
  const todaySchedule = fullSchedule.find(d => d.dayNumber === dayNumber) || fullSchedule[0];

  const currentChapter = todaySchedule.chapter;
  const isDayA = todaySchedule.isDayA;
  
  // Map DB status to tasks
  const tasks = todaySchedule.tasks.map(t => {
    let completed = false;
    let field = '';

    // Simple mapping based on label keywords (fragile but works for MVP without changing schedule structure too much)
    if (t.label.includes('Vocab')) { completed = dailyLog?.taskVocab ?? false; field = 'taskVocab'; }
    else if (t.label.includes('Bunkei')) { completed = dailyLog?.taskBunkei ?? false; field = 'taskBunkei'; }
    else if (t.label.includes('Listening')) { completed = dailyLog?.taskListening ?? false; field = 'taskListening'; }
    else if (t.label.includes('Exercises')) { completed = dailyLog?.taskExercise ?? false; field = 'taskExercise'; }
    else { 
      // Fallback for reading tasks which might not have direct DB columns in the simplified schema
      // We can map them to 'taskVocab' or similar for now, or just leave them local.
      // The user schema had: task_vocab, task_bunkei, task_listening, task_exercise.
      // Let's map Reading to taskVocab for now to avoid errors, or ignore.
      field = 'taskVocab'; 
    }
    
    return { ...t, completed, field };
  });

  const currentXP = dailyLog?.taskDuolingoXP ?? 0;

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
          currentChapter={currentChapter}
          totalChapters={25}
          targetDate={new Date(startDate.getTime() + 50 * 24 * 60 * 60 * 1000)}
        />

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
          <div className="flex flex-col gap-6">
            <DailyChecklist
              day={dayNumber}
              chapter={currentChapter}
              isDayA={isDayA}
              tasks={tasks}
            />
          </div>
          <div className="flex flex-col gap-6">
            <DuolingoWidget
              dailyGoalXP={30}
              currentXP={currentXP}
            />
            {/* Placeholder for Streak or other widgets */}
          </div>
        </div>
      </div>
    </main>
  );
}

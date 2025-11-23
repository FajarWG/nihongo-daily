export interface DailyTask {
  id: string;
  label: string;
  completed: boolean;
}

export interface DaySchedule {
  dayNumber: number;
  date: Date;
  chapter: number;
  isDayA: boolean;
  tasks: DailyTask[];
}

export const generateSchedule = (startDate: Date): DaySchedule[] => {
  const schedule: DaySchedule[] = [];
  const totalChapters = 25;
  let currentDay = 1;
  const currentDate = new Date(startDate);

  for (let chapter = 1; chapter <= totalChapters; chapter++) {
    // Day A
    schedule.push({
      dayNumber: currentDay,
      date: new Date(currentDate),
      chapter: chapter,
      isDayA: true,
      tasks: [
        { id: `d${currentDay}-t1`, label: `Read Chapter ${chapter} (JP)`, completed: false },
        { id: `d${currentDay}-t2`, label: `Read Chapter ${chapter} (Indo)`, completed: false },
        { id: `d${currentDay}-t3`, label: `Memorize 25-35 Vocab`, completed: false },
        { id: `d${currentDay}-t4`, label: `Study Bunkei (Sentence Patterns)`, completed: false },
        { id: `d${currentDay}-t5`, label: `Exercises A-C`, completed: false },
        { id: `d${currentDay}-t6`, label: `Duolingo 30 XP`, completed: false },
      ],
    });
    currentDay++;
    currentDate.setDate(currentDate.getDate() + 1);

    // Day B
    schedule.push({
      dayNumber: currentDay,
      date: new Date(currentDate),
      chapter: chapter,
      isDayA: false,
      tasks: [
        { id: `d${currentDay}-t1`, label: `Review Vocabulary`, completed: false },
        { id: `d${currentDay}-t2`, label: `Write 5 Example Sentences`, completed: false },
        { id: `d${currentDay}-t3`, label: `Listening Practice`, completed: false },
        { id: `d${currentDay}-t4`, label: `Exercises D-F`, completed: false },
        { id: `d${currentDay}-t5`, label: `Mini Test (Website)`, completed: false },
        { id: `d${currentDay}-t6`, label: `Duolingo 30 XP`, completed: false },
      ],
    });
    currentDay++;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedule;
};

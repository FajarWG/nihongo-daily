import React from 'react';
import { generateSchedule } from '@/lib/schedule';

export default function SchedulePage() {
  // Assuming start date is today for demo purposes
  const startDate = new Date();
  const schedule = generateSchedule(startDate);

  return (
    <main className="min-h-screen p-5 md:p-10 bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900">50-Day Study Schedule</h1>
        </header>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
          {schedule.map((day) => (
            <div key={day.dayNumber} className="glass rounded-xl p-5 transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
                <span className="font-bold text-lg">Day {day.dayNumber}</span>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded-full font-semibold text-gray-600">
                  Ch {day.chapter} - {day.isDayA ? 'A' : 'B'}
                </span>
              </div>
              <ul className="text-sm text-gray-600 space-y-1.5">
                {day.tasks.map((task) => (
                  <li key={task.id} className="flex items-start">
                    <span className="text-blue-500 font-bold mr-2">•</span>
                    {task.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

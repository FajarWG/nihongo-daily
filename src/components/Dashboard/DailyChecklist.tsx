'use client';

import React, { useState } from 'react';

interface Task {
  id: string;
  label: string;
  completed: boolean;
}

interface DailyChecklistProps {
  day: number;
  chapter: number;
  isDayA: boolean;
  tasks: Task[];
}

const DailyChecklist: React.FC<DailyChecklistProps> = ({
  day,
  chapter,
  isDayA,
  tasks: initialTasks,
}) => {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    // TODO: Sync with DB
  };

  return (
    <div className="glass rounded-2xl p-6 mb-6">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-900">
          Day {day} — Chapter {chapter} ({isDayA ? 'Day A' : 'Day B'})
        </h3>
      </div>
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <label
            key={task.id}
            className={`flex items-center cursor-pointer p-3 rounded-lg transition-all duration-200 select-none group ${
              task.completed ? 'bg-white/80' : 'bg-white/50 hover:bg-white/80'
            }`}
          >
            <div className="relative mr-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="peer sr-only"
              />
              <div className="h-5 w-5 bg-gray-200 rounded transition-colors peer-checked:bg-blue-500"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <span
              className={`text-base transition-colors ${
                task.completed ? 'line-through text-gray-400' : 'text-gray-900'
              }`}
            >
              {task.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DailyChecklist;

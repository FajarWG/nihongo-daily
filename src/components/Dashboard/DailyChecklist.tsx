'use client';

import React, { useState } from 'react';
import styles from './DailyChecklist.module.css';

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
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>
          Day {day} — Chapter {chapter} ({isDayA ? 'Day A' : 'Day B'})
        </h3>
      </div>
      <div className={styles.taskList}>
        {tasks.map((task) => (
          <label
            key={task.id}
            className={`${styles.taskItem} ${
              task.completed ? styles.completed : ''
            }`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span className={styles.checkmark}></span>
            <span className={styles.label}>{task.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DailyChecklist;

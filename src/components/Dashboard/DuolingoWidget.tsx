'use client';

import React, { useState, useEffect } from 'react';
import { updateDuolingoXP } from '@/app/actions/dailyLog';

interface DuolingoWidgetProps {
  dailyGoalXP: number;
  currentXP: number;
}

const DuolingoWidget: React.FC<DuolingoWidgetProps> = ({
  dailyGoalXP,
  currentXP: initialXP,
}) => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [xp, setXp] = useState(initialXP);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleXpChange = async (newXp: number) => {
    setXp(newXp);
    await updateDuolingoXP(new Date(), newXp);
  };

  return (
    <div className="bg-gradient-to-br from-[#58cc02] to-[#46a302] rounded-2xl p-6 text-white shadow-[0_4px_15px_rgba(88,204,2,0.3)]">
      <div className="flex items-center gap-3 mb-5">
        <div className="text-3xl">🦉</div>
        <h3 className="text-xl font-bold">Duolingo Goal</h3>
      </div>
      
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          {isEditing ? (
            <input
              type="number"
              className="text-4xl font-extrabold leading-none bg-white/20 rounded px-2 w-24 text-white focus:outline-none focus:ring-2 focus:ring-white"
              value={xp}
              onChange={(e) => setXp(Number(e.target.value))}
              onBlur={() => {
                setIsEditing(false);
                handleXpChange(xp);
              }}
              autoFocus
            />
          ) : (
            <span 
              className="text-4xl font-extrabold leading-none cursor-pointer hover:opacity-80"
              onClick={() => setIsEditing(true)}
              title="Click to edit XP"
            >
              {xp}
            </span>
          )}
          <span className="text-sm opacity-90 mt-1">/ {dailyGoalXP} XP</span>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className="font-mono text-2xl font-semibold">{formatTime(time)}</div>
          <button
            className={`px-4 py-2 rounded-full font-semibold transition-transform active:scale-95 ${
              isActive 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-[#58cc02]'
            }`}
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

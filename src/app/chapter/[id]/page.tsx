'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import QuizModule from '@/components/Quiz/QuizModule';

export default function ChapterPage() {
  const params = useParams();
  const chapterId = Number(params.id);
  const [activeTab, setActiveTab] = useState('quiz');

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Chapter {chapterId}</h1>
        </header>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'vocab' ? styles.active : ''}`}
            onClick={() => setActiveTab('vocab')}
          >
            Vocabulary
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'bunkei' ? styles.active : ''}`}
            onClick={() => setActiveTab('bunkei')}
          >
            Bunkei
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'quiz' ? styles.active : ''}`}
            onClick={() => setActiveTab('quiz')}
          >
            Quiz
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === 'quiz' && <QuizModule chapter={chapterId} />}
          {activeTab === 'vocab' && <p>Vocabulary list coming soon...</p>}
          {activeTab === 'bunkei' && <p>Bunkei explanation coming soon...</p>}
        </div>
      </div>
    </main>
  );
}

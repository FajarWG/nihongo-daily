'use client';

import React, { useState } from 'react';
import styles from './QuizModule.module.css';

interface Question {
  question: string;
  choices: string[];
  correct_answer: string;
  rationale: string;
}

interface QuizModuleProps {
  chapter: number;
}

const QuizModule: React.FC<QuizModuleProps> = ({ chapter }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const startQuiz = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chapter }),
      });
      const data = await res.json();
      if (data.questions) {
        setQuestions(data.questions);
        setStarted(true);
      }
    } catch (error) {
      console.error('Failed to load quiz', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (choice: string) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(choice);
  };

  const checkAnswer = () => {
    if (!selectedAnswer) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore((prev) => prev + 1);
    }
    setIsAnswerChecked(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    } else {
      setShowResult(true);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Generating Quiz with AI...</div>;
  }

  if (!started) {
    return (
      <div className={styles.container}>
        <h3>Chapter {chapter} Mini Test</h3>
        <p>Test your knowledge of vocabulary and grammar.</p>
        <button className={styles.startButton} onClick={startQuiz}>
          Start Quiz
        </button>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className={styles.container}>
        <h3>Quiz Complete!</h3>
        <div className={styles.score}>
          {score} / {questions.length}
        </div>
        <p>{score >= 8 ? 'Sugoi! 🎉' : 'Ganbatte! Keep practicing.'}</p>
        <button
          className={styles.startButton}
          onClick={() => {
            setStarted(false);
            setShowResult(false);
            setScore(0);
            setCurrentQuestionIndex(0);
            setQuestions([]);
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        Question {currentQuestionIndex + 1} / {questions.length}
      </div>
      <h4 className={styles.question}>{currentQuestion.question}</h4>
      <div className={styles.choices}>
        {currentQuestion.choices.map((choice, index) => (
          <button
            key={index}
            className={`${styles.choiceButton} ${
              selectedAnswer === choice ? styles.selected : ''
            } ${
              isAnswerChecked && choice === currentQuestion.correct_answer
                ? styles.correct
                : ''
            } ${
              isAnswerChecked &&
              selectedAnswer === choice &&
              choice !== currentQuestion.correct_answer
                ? styles.wrong
                : ''
            }`}
            onClick={() => handleAnswer(choice)}
            disabled={isAnswerChecked}
          >
            {choice}
          </button>
        ))}
      </div>
      
      {isAnswerChecked && (
        <div className={styles.rationale}>
          <strong>Explanation:</strong> {currentQuestion.rationale}
        </div>
      )}

      <div className={styles.footer}>
        {!isAnswerChecked ? (
          <button
            className={styles.actionButton}
            onClick={checkAnswer}
            disabled={!selectedAnswer}
          >
            Check Answer
          </button>
        ) : (
          <button className={styles.actionButton} onClick={nextQuestion}>
            {currentQuestionIndex === questions.length - 1
              ? 'Finish'
              : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizModule;

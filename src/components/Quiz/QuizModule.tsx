'use client';

import React, { useState } from 'react';

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
    return <div className="text-center p-10 text-gray-500 italic">Generating Quiz with AI...</div>;
  }

  if (!started) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-4">Chapter {chapter} Mini Test</h3>
        <p className="text-gray-600 mb-6">Test your knowledge of vocabulary and grammar.</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors" onClick={startQuiz}>
          Start Quiz
        </button>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-6">Quiz Complete!</h3>
        <div className="text-5xl font-extrabold text-blue-600 mb-6">
          {score} / {questions.length}
        </div>
        <p className="text-lg text-gray-700 mb-8">{score >= 8 ? 'Sugoi! 🎉' : 'Ganbatte! Keep practicing.'}</p>
        <button
          className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
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
    <div className="bg-white rounded-2xl p-8 shadow-sm max-w-2xl mx-auto">
      <div className="text-sm text-gray-500 mb-4">
        Question {currentQuestionIndex + 1} / {questions.length}
      </div>
      <h4 className="text-xl font-semibold text-gray-900 mb-6">{currentQuestion.question}</h4>
      <div className="flex flex-col gap-3 mb-6">
        {currentQuestion.choices.map((choice, index) => (
          <button
            key={index}
            className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
              selectedAnswer === choice 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-100 bg-white hover:border-blue-200 hover:bg-blue-50/50'
            } ${
              isAnswerChecked && choice === currentQuestion.correct_answer
                ? '!border-green-500 !bg-green-50 !text-green-700'
                : ''
            } ${
              isAnswerChecked &&
              selectedAnswer === choice &&
              choice !== currentQuestion.correct_answer
                ? '!border-red-500 !bg-red-50 !text-red-700'
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
        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-gray-700 text-sm">
          <strong>Explanation:</strong> {currentQuestion.rationale}
        </div>
      )}

      <div className="flex justify-end">
        {!isAnswerChecked ? (
          <button
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={checkAnswer}
            disabled={!selectedAnswer}
          >
            Check Answer
          </button>
        ) : (
          <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors" onClick={nextQuestion}>
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

"use client"
import React, { useState, useEffect, useRef } from 'react';

// --- CONFIGURATION ---
// API key is now handled server-side in app/api/generate-quiz/route.js

// --- DEMO PROMPTS DATA ---
const demoPrompts = [
  "Simple grammar/maths test for kids.",
  "I am a computer science student learning web dev. Ask me questions related to web technologies.",
  "I am preparing for NEET/UPSC/JEE, ask me questions based on it's syllabus and previous year question papers.",
  "I am a student of economics and my syllabus is bank, finance etc. Prepare a test for me."
];

// =======================================================================
// CORE HELPERS & UTILITIES
// =======================================================================

// Custom M3-style Switch component
const M3Switch = ({ checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={checked}
      onChange={onChange}
    />
    {/* Switch Track (M3 large track) */}
    <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-violet-600 transition-colors duration-300"></div>
    {/* Switch Thumb (M3 smaller thumb) */}
    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5 shadow-sm"></div>
  </label>
);

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};


// =======================================================================
// VIEW COMPONENTS: HOME, ABOUT, INPUT (SETUP)
// =======================================================================

const HomeView = ({ setGameState }) => (

  <div className="flex flex-col items-center text-center space-y-8 py-10">

    <div className="w-24 h-24 bg-violet-100 rounded-3xl flex items-center justify-center mb-4 shadow-xl shadow-violet-100">
      <i className="fa-solid fa-layer-group text-5xl text-violet-700"></i>
    </div>

    {/* Title size adjusted for mobile: text-5xl on small screens */}
    <h1 id='title' className="text-5xl sm:text-7xl font-extrabold text-gray-900 tracking-tight">
      Test<span className="text-violet-700">Tile</span>
    </h1>

    {/* Paragraph size adjusted for mobile: text-lg on small screens */}
    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed font-medium">
      Transform any topic into an interactive quiz instantly.
      Configure your test with timers and custom scoring rules.
    </p>

    <div className="flex flex-col items-center sm:flex-row gap-4 mt-8 w-full sm:w-auto">
      <button
        onClick={() => setGameState('input')}
        className="px-8 py-4 bg-violet-700 hover:bg-violet-800 text-white w-fit rounded-full font-bold text-lg shadow-xl shadow-violet-300/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 uppercase tracking-wide flex items-center justify-center gap-2"
      >
        Start New Test <i className="fa-solid fa-arrow-right text-sm"></i>
      </button>

      <button
        onClick={() => setGameState('about')}
        className="px-8 py-4 bg-white hover:bg-gray-100 text-violet-700 w-fit rounded-full font-medium text-lg shadow-xl transition-all uppercase tracking-wide flex items-center justify-center gap-2"
      >
        <i className="fa-solid fa-circle-info text-sm"></i> About
      </button>
    </div>
  </div>
);

const AboutView = ({ setGameState }) => (
  <div className="max-w-2xl mx-auto text-center space-y-8 py-10">
    {/* Heading size adjusted for mobile: text-3xl on small screens */}
    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">About TestTile</h2>
    <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-gray-200 border-gray-100 text-left space-y-4">
      <p className="text-lg text-gray-700 leading-relaxed">
        A educational platform that uses Google Gemini to generate MCQ on a given topic. Designed as a fun learning app with features like negative marking and time limit for more challenging and high level test experience.
      </p>

    </div>
    <button
      onClick={() => setGameState('home')}
      className="text-violet-700 hover:text-violet-900 font-bold flex items-center gap-2 mx-auto transition-colors p-3 rounded-xl hover:bg-violet-50"
    >
      <i className="fa-solid fa-arrow-left"></i> Back to Home
    </button>
  </div>
);

const InputView = ({ topic, setTopic, config, setConfig, generateQuiz, error }) => (
  <div className="flex flex-col items-center justify-center space-y-10 py-6 w-full">
    <div className="text-center space-y-3">
      {/* Heading size adjusted for mobile: text-3xl on small screens */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Setup Your Quiz</h2>
      {/* Paragraph size adjusted for mobile: text-base on small screens */}
      <p className="text-base sm:text-lg text-gray-500">Customize the topic and rules for your test.</p>
    </div>

    {/* --- NEW: DEMO PROMPT SECTION --- */}
    <div className="w-full max-w-2xl -mt-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
        Demo/Example Prompts
      </label>

      {/* Horizontal Scrollable Container */}
      <div className="flex space-x-3 overflow-x-auto pb-4">
        {demoPrompts.map((prompt, index) => (
          <div
            key={index}
            onClick={() => setTopic(prompt)}
            className="shrink-0 w-64 p-4 border-gray-200 border-2 rounded-xl cursor-pointer hover:bg-violet-50 transition duration-200 ease-in-out text-sm"
          >
            <p className="text-gray-700 leading-snug">{prompt}</p>
          </div>
        ))}
      </div>
    </div>
    {/* --- END DEMO PROMPT SECTION --- */}


    {/* Main Prompt Area (M3 Filled Text Area) */}
    <div className="w-full max-w-2xl">
      <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
        Topic Description or Prompt
      </label>
      <div className="relative group">
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="E.g., 'Advanced Javascript Promises and Async/Await', 'History of Roman Empire', 'Business and finance', 'Medical science and Bio..."
          className="w-full p-4 h-36 text-base sm:text-lg bg-gray-200/50 rounded-3xl focus:outline-none focus:border-violet-700 focus:bg-white transition-all hover:bg-gray-100 resize-none"
        />
        <div className="absolute bottom-4 right-6 text-gray-400 pointer-events-none">
          <i className="fa-solid fa-scroll"></i>
        </div>
      </div>
    </div>

    {/* Settings Grid (M3 Surface Cards) */}
    <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Timer Settings */}
      <div className="bg-white p-6 rounded-3xl shadow-2xl shadow-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 text-orange-700 w-10 h-10 rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-stopwatch text-lg"></i>
            </div>
            <span className="font-extrabold text-lg text-gray-800">Timer</span>
          </div>
          <M3Switch
            checked={config.timerEnabled}
            onChange={(e) => setConfig({ ...config, timerEnabled: e.target.checked })}
          />
        </div>

        {config.timerEnabled ? (
          <div className="animate-in fade-in slide-in-from-top-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Seconds per Question</label>
            <input
              type="number"
              min="5"
              max="300"
              value={config.timePerQuestion}
              onChange={(e) => setConfig({ ...config, timePerQuestion: parseInt(e.target.value) || 10 })}
              className="w-full p-3 border border-gray-300 rounded-xl focus:border-violet-600 focus:ring-1 focus:ring-violet-600 outline-none font-mono bg-gray-50 hover:bg-white"
            />
          </div>
        ) : (
          <p className="text-sm text-gray-400 pt-2">Set time limit per questions.</p>
        )}
      </div>

      {/* Question Count */}
      <div className="bg-white p-6 rounded-3xl shadow-2xl shadow-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-violet-100 text-violet-700 w-10 h-10 rounded-xl flex items-center justify-center">
            <i className="fa-solid fa-list-ol text-lg"></i>
          </div>
          <span className="font-extrabold text-lg text-gray-800">Questions</span>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Total Questions</label>
          <input
            type="number"
            min="1"
            max="20"
            value={config.questionCount}
            onChange={(e) => setConfig({ ...config, questionCount: parseInt(e.target.value) || 5 })}
            className="w-full p-3 border border-gray-300 rounded-xl focus:border-violet-600 focus:ring-1 focus:ring-violet-600 outline-none font-mono bg-gray-50 hover:bg-white"
          />
          <p className="text-xs text-gray-400 mt-2">Recommended maximum: 20.</p>
        </div>
      </div>

      {/* Negative Marking (M3 Large Component Area) */}
      <div className="md:col-span-2 bg-white p-6 rounded-3xl shadow-2xl shadow-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 text-red-700 w-10 h-10 rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-circle-minus text-lg"></i>
            </div>
            <span className="font-extrabold text-lg text-gray-800">Negative Marking</span>
          </div>
          <M3Switch
            checked={config.negativeMarking}
            onChange={(e) => setConfig({ ...config, negativeMarking: e.target.checked })}
          />
        </div>

        {config.negativeMarking ? (
          <div className="grid grid-cols-2 gap-4 pt-2 animate-in fade-in slide-in-from-top-2">
            <div>
              <label className="text-xs font-bold text-green-700 uppercase tracking-wider block mb-1">Score (Correct)</label>
              <input
                type="number"
                min="1"
                value={config.scoreCorrect}
                onChange={(e) => setConfig({ ...config, scoreCorrect: parseFloat(e.target.value) || 1 })}
                className="w-full p-3 border border-green-300 bg-green-50 rounded-xl focus:border-green-600 outline-none font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-red-700 uppercase tracking-wider block mb-1">Deduction (Wrong)</label>
              <input
                type="number"
                min="0"
                step="0.25"
                value={config.scoreWrong}
                onChange={(e) => setConfig({ ...config, scoreWrong: parseFloat(e.target.value) || 0 })}
                className="w-full p-3 border border-red-300 bg-red-50 rounded-xl focus:border-red-600 outline-none font-mono"
              />
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400 pt-2">Standard scoring: 1 point per correct answer, 0 penalty.</p>
        )}
      </div>

    </div>

    {/* Generate Button (M3 Extended FAB style) */}
    <button
      onClick={generateQuiz}
      disabled={!topic.trim()}
      className="w-full max-w-2xl py-4 bg-violet-700 text-white rounded-2xl font-extrabold text-xl shadow-2xl shadow-violet-400/50 hover:bg-violet-800 hover:shadow-violet-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.99] flex items-center justify-center gap-3 tracking-wide"
    >
      <i className="fa-solid fa-wand-magic-sparkles text-lg"></i>
      <span>Generate Quiz</span>
    </button>

    {error && (
      <div className="w-full max-w-2xl p-4 bg-red-100 text-red-700 rounded-xl flex items-center gap-3 border border-red-300">
        <i className="fa-solid fa-circle-exclamation"></i>
        {error}
      </div>
    )}
  </div>
);


// =======================================================================
// VIEW COMPONENTS: QUIZ & RESULTS
// =======================================================================

const QuizView = ({ config, questions, currentQuestionIndex, timeLeft, userAnswers, handleAnswerSelect, handleNextQuestion, questionRef }) => {
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="w-full max-w-3xl mx-auto">

      {/* Header: Progress & Timer */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-sm font-extrabold text-gray-500 uppercase tracking-wider mb-1">Question</h2>
          {/* Question count size adjusted */}
          <div className="text-2xl sm:text-3xl font-black text-violet-900">
            {currentQuestionIndex + 1} <span className="text-gray-400 text-xl">/ {questions.length}</span>
          </div>
        </div>

        {config.timerEnabled && (
          // Timer size adjusted
          <div className={`flex items-center gap-2 px-4 py-1 sm:px-5 sm:py-2 rounded-2xl font-mono font-bold text-xl sm:text-2xl shadow-md transition-colors ${timeLeft <= 5 ? 'bg-red-500 text-white animate-pulse shadow-red-300/50' : 'bg-violet-500 text-white shadow-violet-300/50'}`}>
            <i className="fa-regular fa-clock text-lg sm:text-xl"></i>
            {formatTime(timeLeft)}
          </div>
        )}
      </div>

      {/* Progress Bar (M3 style - thicker, prominent) */}
      <div className="w-full bg-gray-200 h-3 rounded-full mb-10 overflow-hidden">
        <div
          className="bg-violet-600 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Card (Padding adjusted for mobile: p-6 on small screens) */}
      <div ref={questionRef} className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl shadow-gray-200 min-h-[450px] flex flex-col justify-between">
        <div>
          {/* Question text size adjusted */}
          <h3 className="text-lg sm:text-3xl font-extrabold text-gray-800 mb-5 sm:mb-5 leading-normal">
            {currentQuestion.question}
          </h3>

          <div className="space-y-4">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = userAnswers[currentQuestion.id] === option;
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(option)}
                  className={`
                    w-full p-3 text-left rounded-xl border-2 transition-all duration-200 flex items-center justify-between group text-base sm:text-lg font-medium
                    ${isSelected
                      ? 'border-violet-700 bg-violet-100 text-violet-900 shadow-md'
                      : 'border-gray-200 hover:border-violet-400 bg-gray-50 hover:bg-white text-gray-700'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sm sm:text-base font-bold border-2 shrink-0 ${isSelected ? 'bg-violet-700 text-white border-violet-700 shadow-inner' : 'bg-white text-gray-500 border-gray-300'}`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                  {isSelected && <i className="fa-solid fa-check text-violet-700"></i>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
          <button
            onClick={handleNextQuestion}
            className="bg-violet-700 hover:bg-violet-800 text-white px-6 py-3 sm:px-8 rounded-2xl font-bold text-base sm:text-lg shadow-xl shadow-violet-300/50 transition-all flex items-center gap-2 tracking-wide active:scale-[0.99]"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

const ResultsView = ({ score, config, questions, userAnswers, tryAgain, setGameState }) => (
  <div className="max-w-2xl mx-auto space-y-8">
    <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200 overflow-hidden">
      {/* Padding adjusted for mobile: p-8 on small screens */}
      <div className={`p-8 sm:p-10 text-center text-white relative overflow-hidden ${score >= 50 ? 'bg-violet-600' : 'bg-red-600'}`}>
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-y-6 scale-150 origin-bottom-left"></div>
        <i className="fa-solid fa-trophy text-5xl sm:text-6xl mb-4 text-yellow-300 relative z-10"></i>
        {/* Heading size adjusted */}
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 relative z-10">Quiz Completed!</h2>

        {/* Score now displays percentage: text-6xl on small screens */}
        <div className="text-6xl sm:text-8xl font-black my-4 relative z-10">
          {score.toFixed(0)}%
        </div>
        <p className="text-violet-100 font-medium relative z-10 text-lg">
          Final Percentage Score
          {config.negativeMarking && <span className="block text-sm mt-1 opacity-80">(Negative marking applied)</span>}
        </p>
      </div>

      <div className="p-6 bg-gray-50 grid grid-cols-2 gap-4">
        <button onClick={tryAgain} className="py-3 bg-white text-gray-700 font-bold rounded-xl hover:bg-gray-100 hover:border-gray-400 transition-all border-2 border-gray-200 flex items-center justify-center gap-2">
          <i className="fa-solid fa-rotate-left"></i> Try Again
        </button>
        <button onClick={() => setGameState('home')} className="py-3 bg-violet-700 text-white font-bold rounded-xl hover:bg-violet-800 transition-all flex items-center justify-center gap-2">
          <i className="fa-solid fa-house"></i> Home
        </button>
      </div>
    </div>

    <div className="space-y-6">
      {/* Analysis heading size adjusted */}
      <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-800 border-b border-gray-200 pb-3">Detailed Analysis</h3>
      {questions.map((q, qIdx) => {
        const userAnswer = userAnswers[q.id];
        const isCorrect = userAnswer === q.answer;
        const isUnanswered = !userAnswer;

        return (
          <div key={q.id} className="bg-white p-6 rounded-2xl shadow-2xl shadow-gray-200 relative overflow-hidden">
            {/* Status indicator bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isCorrect ? 'bg-green-600' : isUnanswered ? 'bg-orange-500' : 'bg-red-600'}`}></div>

            <div className="flex gap-4 pl-2">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0 ${isCorrect ? 'bg-green-100 text-green-700' : isUnanswered ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-700'}`}>
                <i className={`fa-solid ${isCorrect ? 'fa-check' : isUnanswered ? 'fa-hourglass-half' : 'fa-xmark'} text-lg`}></i>
              </div>
              <div className="w-full">
                {/* Question text size adjusted */}
                <h4 className="font-extrabold text-gray-900 text-lg sm:text-xl mb-4 leading-snug">{q.question}</h4>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-100 border border-gray-200">
                    <span className="text-gray-600 font-medium">Your Selection</span>
                    <span className={`font-extrabold ${isCorrect ? 'text-green-800' : isUnanswered ? 'text-orange-700' : 'text-red-800'}`}>
                      {userAnswer || 'Skipped / Timed Out'}
                    </span>
                  </div>

                  {(!isCorrect || isUnanswered) && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-green-100 border border-green-200">
                      <span className="text-green-800 font-medium">Correct Answer</span>
                      <span className="text-green-900 font-extrabold">
                        {q.answer}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);


// =======================================================================
// MAIN APPLICATION COMPONENT (App)
// =======================================================================

export default function App() {
  // Input State
  const [topic, setTopic] = useState('');

  // Quiz Configuration State
  const [config, setConfig] = useState({
    timerEnabled: false,
    timePerQuestion: 15, // default seconds
    questionCount: 10,
    negativeMarking: false,
    scoreCorrect: 4, // standard competitive exam score
    scoreWrong: 1    // standard deduction
  });

  // Game Data State
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Game Play State
  // States: 'home', 'about', 'input', 'loading', 'quiz', 'results'
  const [gameState, setGameState] = useState('home');
  const [userAnswers, setUserAnswers] = useState({});
  // score now holds the final percentage score
  const [score, setScore] = useState(0);

  // Single Question View State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  // Animation State & Refs
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const containerRef = useRef(null);
  const questionRef = useRef(null);

  // --- RESOURCE LOADING (GSAP & FontAwesome) ---
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.async = true;
    script.onload = () => setGsapLoaded(true);
    document.body.appendChild(script);

    return () => {
      // Cleanup is necessary but removing injected scripts/links can be complex in some environments
      // We'll rely on the runtime environment cleaning up on its own.
    };
  }, []);

  // --- ANIMATIONS ---
  useEffect(() => {
    if (gsapLoaded && containerRef.current && window.gsap) {
      // General view transition
      window.gsap.killTweensOf(containerRef.current.children);
      window.gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [gameState, gsapLoaded]);

  // Question transition animation
  useEffect(() => {
    if (gameState === 'quiz' && gsapLoaded && questionRef.current && window.gsap) {
      window.gsap.fromTo(
        questionRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'back.out(1.2)' }
      );
    }
  }, [currentQuestionIndex, gameState, gsapLoaded]);

  // --- TIMER LOGIC ---
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      submitQuiz();
    }
  };

  useEffect(() => {
    let timerId;
    if (gameState === 'quiz' && config.timerEnabled && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleNextQuestion(); // Auto advance
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [gameState, config.timerEnabled, timeLeft, currentQuestionIndex, questions.length]);

  // Handle timer restart/initialization when question changes or quiz starts
  useEffect(() => {
    if (gameState === 'quiz' && config.timerEnabled) {
      setTimeLeft(config.timePerQuestion);
    }
  }, [currentQuestionIndex, gameState, config.timerEnabled, config.timePerQuestion]);


  // --- API INTERACTION ---
  const generateQuiz = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setGameState('loading');
    setError(null);

    try {
      // Dynamically request the number of questions based on config
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, config }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate quiz');
      }

      const limitedQuestions = await response.json();

      setQuestions(limitedQuestions);
      setGameState('quiz');
      setUserAnswers({});
      setCurrentQuestionIndex(0);

      // Timer useEffect will handle initialization of timeLeft
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to generate questions. Try reducing the number of questions or picking a simpler topic. Error details: " + err.message);
      setGameState('input');
    } finally {
      setLoading(false);
    }
  };

  // --- GAME LOGIC HANDLERS ---
  const handleAnswerSelect = (option) => {
    const currentQ = questions[currentQuestionIndex];
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: option }));
  };

  const submitQuiz = () => {
    let rawScore = 0;
    let correctCount = 0;

    questions.forEach(q => {
      const userAnswer = userAnswers[q.id];

      if (userAnswer === q.answer) {
        correctCount++;
        // Use custom score or 1 point if no negative marking
        rawScore += Number(config.negativeMarking ? config.scoreCorrect : 1);
      } else if (userAnswer) {
        // Apply deduction only if negative marking is enabled and the answer was wrong
        if (config.negativeMarking) {
          rawScore -= Number(config.scoreWrong);
        }
      }
      // If unanswered, rawScore change is 0.
    });

    let finalPercentage;
    const totalQuestions = questions.length;

    if (config.negativeMarking) {
      // Calculate max score based on custom correct score for percentage base
      const maxPossibleScore = totalQuestions * config.scoreCorrect;

      // Calculate percentage, ensuring it doesn't go below 0%
      finalPercentage = Math.max(0, (rawScore / maxPossibleScore) * 100);
    } else {
      // Percentage based purely on correct count
      finalPercentage = (correctCount / totalQuestions) * 100;
    }

    setScore(finalPercentage); // Score is now the final percentage
    setGameState('results');
  };

  const tryAgain = () => {
    setQuestions([]);
    setUserAnswers({});
    setScore(0);
    setCurrentQuestionIndex(0);
    setGameState('input');
  };

  // --- MAIN RENDER LOGIC ---
  const renderView = () => {
    switch (gameState) {
      case 'home':
        return <HomeView setGameState={setGameState} />;
      case 'about':
        return <AboutView setGameState={setGameState} />;
      case 'input':
        return (
          <InputView
            topic={topic}
            setTopic={setTopic}
            config={config}
            setConfig={setConfig}
            generateQuiz={generateQuiz}
            error={error}
          />
        );
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center py-20 space-y-8">
            <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-700 rounded-full animate-spin"></div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800">Generating {config.questionCount} Questions</h3>
              <p className="text-gray-500 mt-2">Consulting Gemini API...</p>
            </div>
          </div>
        );
      case 'quiz':
        return (
          <QuizView
            config={config}
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            timeLeft={timeLeft}
            userAnswers={userAnswers}
            handleAnswerSelect={handleAnswerSelect}
            handleNextQuestion={handleNextQuestion}
            questionRef={questionRef}
          />
        );
      case 'results':
        return (
          <ResultsView
            score={score}
            config={config}
            questions={questions}
            userAnswers={userAnswers}
            tryAgain={tryAgain}
            setGameState={setGameState}
          />
        );
      default:
        return <HomeView setGameState={setGameState} />;
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans selection:bg-violet-200 selection:text-violet-900">

      {/* Navigation Bar (M3 Surface Elevation) */}
      <nav className="fixed top-0 w-full bg-violet-50 backdrop-blur-md z-50 border-b border-gray-100 ">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setGameState('home')}
          >
            <div className="w-9 h-9 bg-violet-600 rounded-lg flex items-center justify-center text-white shadow-md group-hover:bg-violet-700 transition-colors">
              <i className="fa-solid fa-layer-group"></i>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-violet-900">TestTile</span>
          </div>

          {gameState !== 'home' && gameState !== 'about' && (
            <button onClick={() => setGameState('home')} className="text-violet-500 hover:text-violet-700 transition-colors p-2 rounded-full hover:bg-gray-100">
              <i className="fa-solid fa-house text-lg"></i>
            </button>
          )}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-24 pb-12 flex flex-col items-center justify-center min-h-screen">
        <div ref={containerRef} className="w-full">
          {renderView()}
        </div>
      </main>
    </div>
  );
}

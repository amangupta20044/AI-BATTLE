import { useState, useRef, useEffect } from 'react';
import './App.css';

import Sidebar from './components/Sidebar';
import SolutionCard from './components/SolutionCard';
import JudgePanel from './components/JudgePanel';
import ChatInput from './components/ChatInput';
import LoadingSkeleton from './components/LoadingSkeleton';
import { sendMessage } from './services/api';

const SUGGESTIONS = [
  { icon: '💡', text: 'Write a binary search in Python' },
  { icon: '⚡', text: 'Implement a linked list in JavaScript' },
  { icon: '🔥', text: 'Sort an array using quicksort in Java' },
  { icon: '🚀', text: 'Create a REST API endpoint in Node.js' },
];

function WelcomeScreen({ onSuggestion }) {
  return (
    <div className="welcome-screen">
      <div className="welcome-icon">⚔️</div>
      <h1 className="welcome-title">AI Battle Arena</h1>
      <p className="welcome-subtitle">
        Ask any coding question. Two AI models compete to give you the best solution.
        A judge scores them both and declares a winner.
      </p>
      <div className="welcome-suggestions">
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            className="suggestion-chip"
            onClick={() => onSuggestion(s.text)}
            id={`suggestion-${i}`}
          >
            <span className="suggestion-chip-icon">{s.icon}</span>
            {s.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]); // { type: 'user'|'battle', content }
  const [isLoading, setIsLoading] = useState(false);
  const [currentJudge, setCurrentJudge] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (prompt) => {
    if (!prompt.trim() || isLoading) return;

    // Add user message
    setMessages((prev) => [...prev, { type: 'user', content: prompt }]);
    setIsLoading(true);
    setCurrentJudge(null);

    try {
      const result = await sendMessage(prompt);
      setMessages((prev) => [
        ...prev,
        {
          type: 'battle',
          content: result,
        },
      ]);
      setCurrentJudge(result.judge);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          type: 'error',
          content: 'Something went wrong. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentJudge(null);
    setActiveChatId(null);
  };

  const handleSelectChat = (id) => {
    setActiveChatId(id);
  };

  const isEmpty = messages.length === 0 && !isLoading;

  // Determine the latest battle result for judge panel
  const latestBattle = [...messages].reverse().find((m) => m.type === 'battle');
  const judgeData = latestBattle ? latestBattle.content.judge : null;

  return (
    <div className="app-layout">
      {/* ===== SIDEBAR ===== */}
      <Sidebar
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
      />

      {/* ===== MAIN CONTENT ===== */}
      <div className="main-content">
        {/* Header */}
        <div className="main-header">
          <span className="main-header-title">Battle Arena</span>
          <div className="battle-badge">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--tertiary)', display: 'inline-block', boxShadow: '0 0 6px var(--tertiary)' }} />
            Live
          </div>
        </div>

        {/* Messages / Welcome */}
        <div className="chat-messages" id="chat-messages">
          {isEmpty ? (
            <WelcomeScreen onSuggestion={handleSend} />
          ) : (
            <>
              {messages.map((msg, idx) => {
                if (msg.type === 'user') {
                  return (
                    <div key={idx} className="message-user">
                      <div className="message-bubble-user">{msg.content}</div>
                    </div>
                  );
                }

                if (msg.type === 'battle') {
                  const { solution_1, solution_2, judge } = msg.content;
                  const sol1Wins = judge.solution_1_score >= judge.solution_2_score;

                  return (
                    <div key={idx} className="battle-result">
                      <div className="battle-header-row">
                        <span className="vs-badge">VS</span>
                        <span style={{ fontSize: 12, color: 'var(--on-surface-variant)' }}>
                          Two models responded — judge has scored them
                        </span>
                      </div>
                      <div className="solutions-grid">
                        <SolutionCard
                          solution={solution_1}
                          modelLabel="Solution 1"
                          score={judge.solution_1_score}
                          maxScore={10}
                          isWinner={sol1Wins}
                          delay={0}
                        />
                        <SolutionCard
                          solution={solution_2}
                          modelLabel="Solution 2"
                          score={judge.solution_2_score}
                          maxScore={10}
                          isWinner={!sol1Wins}
                          delay={150}
                        />
                      </div>
                    </div>
                  );
                }

                if (msg.type === 'error') {
                  return (
                    <div key={idx} style={{
                      padding: 'var(--space-3) var(--space-5)',
                      background: 'rgba(215, 51, 87, 0.12)',
                      border: '1px solid rgba(215, 51, 87, 0.3)',
                      borderRadius: 'var(--radius-lg)',
                      color: 'var(--error)',
                      fontSize: 13,
                    }}>
                      ⚠️ {msg.content}
                    </div>
                  );
                }

                return null;
              })}

              {isLoading && <LoadingSkeleton />}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </div>

      {/* ===== JUDGE PANEL ===== */}
      <JudgePanel judge={judgeData} />
    </div>
  );
}

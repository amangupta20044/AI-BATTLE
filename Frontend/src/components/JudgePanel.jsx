export default function JudgePanel({ judge, solution1Score, solution2Score }) {
  const hasResult = judge !== null;

  const winner = hasResult
    ? judge.solution_1_score >= judge.solution_2_score
      ? { label: 'Solution 1', score: judge.solution_1_score, reasoning: judge.solution_1_reasoning, key: 1 }
      : { label: 'Solution 2', score: judge.solution_2_score, reasoning: judge.solution_2_reasoning, key: 2 }
    : null;

  const loser = hasResult
    ? judge.solution_1_score >= judge.solution_2_score
      ? { label: 'Solution 2', score: judge.solution_2_score, reasoning: judge.solution_2_reasoning, key: 2 }
      : { label: 'Solution 1', score: judge.solution_1_score, reasoning: judge.solution_1_reasoning, key: 1 }
    : null;

  return (
    <div className="judge-panel" id="judge-panel">
      {/* Panel Header */}
      <div className="judge-header">
        <div className="judge-icon">⚖️</div>
        <div>
          <div className="judge-title">Judge's Verdict</div>
          <div className="judge-subtitle">AI Evaluation Engine</div>
        </div>
      </div>

      {/* Panel Body */}
      <div className="judge-body">
        {!hasResult ? (
          <div className="judge-empty">
            <div className="judge-empty-icon">⚖️</div>
            <p className="judge-empty-text">
              Send a message to start a battle. The judge will analyze both AI solutions and declare a winner.
            </p>
          </div>
        ) : (
          <>
            {/* Winner Verdict */}
            <div className="winner-verdict" id="winner-verdict">
              <div className="winner-verdict-label">🏆 Victory</div>
              <div className="winner-verdict-name">{winner.label}</div>
              <div className="winner-verdict-score">
                {winner.score}
                <span> / 10</span>
              </div>
            </div>

            {/* Score Comparison */}
            <div className="score-comparison">
              <div className="score-comparison-title">Score Breakdown</div>
              <div className="score-bar-row">
                {/* Winner bar */}
                <div className="score-bar-item">
                  <div className="score-bar-meta">
                    <span className="score-bar-label">
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: 'var(--tertiary)',
                          display: 'inline-block',
                          boxShadow: '0 0 6px var(--tertiary)',
                          flexShrink: 0,
                        }}
                      />
                      {winner.label}
                    </span>
                    <span className="score-bar-value winner">{winner.score}/10</span>
                  </div>
                  <div className="score-track">
                    <div
                      className="score-fill winner-fill"
                      style={{ width: `${(winner.score / 10) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Loser bar */}
                <div className="score-bar-item">
                  <div className="score-bar-meta">
                    <span className="score-bar-label">
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: 'var(--outline)',
                          display: 'inline-block',
                          flexShrink: 0,
                        }}
                      />
                      {loser.label}
                    </span>
                    <span className="score-bar-value loser">{loser.score}/10</span>
                  </div>
                  <div className="score-track">
                    <div
                      className="score-fill loser-fill"
                      style={{ width: `${(loser.score / 10) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Reasoning Section */}
            <div className="reasoning-section">
              <div className="reasoning-title">Analysis</div>

              {/* Winner Reasoning */}
              <div className="reasoning-card">
                <div className="reasoning-card-header">
                  <span className="reasoning-model-label winner-label">
                    🏆 {winner.label}
                  </span>
                  <span className="reasoning-score-chip winner-chip">{winner.score}/10</span>
                </div>
                <p className="reasoning-text">{winner.reasoning}</p>
              </div>

              {/* Loser Reasoning */}
              <div className="reasoning-card">
                <div className="reasoning-card-header">
                  <span className="reasoning-model-label loser-label">
                    ⚡ {loser.label}
                  </span>
                  <span className="reasoning-score-chip loser-chip">{loser.score}/10</span>
                </div>
                <p className="reasoning-text">{loser.reasoning}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

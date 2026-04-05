import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      className={`copy-btn ${copied ? 'copied' : ''}`}
      onClick={handleCopy}
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}

function CodeBlock({ language, children }) {
  const code = String(children).trim();
  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-lang-label">{language || 'code'}</span>
        <CopyButton text={code} />
      </div>
      <SyntaxHighlighter
        language={language || 'text'}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: '12px',
          background: '#000',
          padding: '16px',
        }}
        showLineNumbers={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

function MarkdownContent({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <CodeBlock language={match[1]}>{children}</CodeBlock>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        pre({ children }) {
          return <>{children}</>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export default function SolutionCard({ solution, modelLabel, score, maxScore, isWinner, delay = 0 }) {
  const animStyle = {
    animationDelay: `${delay}ms`,
    animationFillMode: 'both',
  };

  return (
    <div
      className={`solution-card ${isWinner ? 'winner' : ''}`}
      style={animStyle}
      id={`solution-card-${modelLabel.toLowerCase().replace(' ', '-')}`}
    >
      {isWinner && <div className="winner-crown">🏆 Winner</div>}

      {/* Card Header */}
      <div className="solution-card-header">
        <div className="solution-model-info">
          <div className={`model-avatar ${isWinner ? 'model-a' : 'model-b'}`}>
            {isWinner ? 'A' : 'B'}
          </div>
          <div>
            <div className="model-name">{modelLabel}</div>
            <div className="model-label">AI Model {isWinner ? 'Alpha' : 'Beta'}</div>
          </div>
        </div>

        <div className={`score-badge ${isWinner ? 'winner-score' : 'loser-score'}`}>
          <span>{score}</span>
          <span className="score-max">/ {maxScore}</span>
        </div>
      </div>

      {/* Card Body with Markdown */}
      <div className="solution-card-body">
        <MarkdownContent content={solution} />
      </div>
    </div>
  );
}

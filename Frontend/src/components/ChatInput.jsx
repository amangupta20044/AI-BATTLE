import { useRef, useEffect } from 'react';

export default function ChatInput({ onSend, isLoading }) {
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = '24px';
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const submit = () => {
    const value = textareaRef.current?.value?.trim();
    if (!value || isLoading) return;
    onSend(value);
    textareaRef.current.value = '';
    textareaRef.current.style.height = '24px';
  };

  return (
    <div className="chat-input-area">
      <div className="chat-input-wrapper">
        <textarea
          ref={textareaRef}
          id="chat-textarea"
          className="chat-textarea"
          placeholder="Ask any coding question to battle two AIs…"
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={isLoading}
        />
        <button
          id="chat-send-btn"
          className={`chat-send-btn ${isLoading ? 'loading' : ''}`}
          onClick={submit}
          disabled={isLoading}
          title="Send message (Enter)"
        >
          {isLoading ? '⟳' : '➤'}
        </button>
      </div>
      <div className="chat-input-hint">
        Press <kbd>Enter</kbd> to send · <kbd>Shift+Enter</kbd> for newline
      </div>
    </div>
  );
}

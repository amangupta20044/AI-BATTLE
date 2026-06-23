function deriveTitle(prompt) {
  const trimmed = prompt.trim();
  if (trimmed.length <= 40) return trimmed;
  return `${trimmed.slice(0, 40)}…`;
}

export function createChatEntry(id, prompt) {
  const trimmed = prompt.trim();
  return {
    id,
    title: deriveTitle(trimmed),
    preview: trimmed,
    time: 'Just now',
    createdAt: Date.now(),
  };
}

export function updateChatEntry(chat, prompt) {
  const trimmed = prompt.trim();
  return {
    ...chat,
    preview: trimmed,
    time: 'Just now',
    createdAt: Date.now(),
  };
}

export default function Sidebar({ history = [], activeChatId, onNewChat, onSelectChat }) {

  return (
    <div className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="brand">
          <div className="brand-icon">⚔️</div>
          <span className="brand-name">AI BATTLE</span>
        </div>
        <button
          id="new-chat-btn"
          className="new-chat-btn"
          onClick={onNewChat}
        >
          <span className="btn-icon">＋</span>
          New Battle
        </button>
      </div>

      {/* Chat History */}
      <div className="sidebar-section-label">Recent Battles</div>
      <div className="sidebar-chats">
        {history.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item ${activeChatId === chat.id ? 'active' : ''}`}
            onClick={() => onSelectChat(chat.id)}
            id={`chat-item-${chat.id}`}
          >
            <div className="chat-item-title">{chat.title}</div>
            <div className="chat-item-preview">{chat.preview}</div>
            <div className="chat-item-time">{chat.time}</div>
          </div>
        ))}
      </div>

      {/* Footer Status */}
      <div className="sidebar-footer">
        <div className="sidebar-status">
          <div className="status-dot" />
          <span>2 models connected</span>
        </div>
      </div>
    </div>
  );
}

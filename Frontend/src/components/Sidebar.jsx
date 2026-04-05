import { useState } from 'react';

const MOCK_HISTORY = [
  {
    id: 1,
    title: "Factorial in C++",
    preview: "write the factorial of n in c++ code",
    time: "2m ago",
  },
  {
    id: 2,
    title: "Binary Search Tree",
    preview: "implement BST with insert and search",
    time: "1h ago",
  },
  {
    id: 3,
    title: "Quick Sort Algorithm",
    preview: "write quicksort in Python with comments",
    time: "3h ago",
  },
  {
    id: 4,
    title: "React Custom Hook",
    preview: "create a useLocalStorage custom hook",
    time: "Yesterday",
  },
  {
    id: 5,
    title: "REST API Design",
    preview: "design a RESTful API for a todo app",
    time: "2 days ago",
  },
];

export default function Sidebar({ activeChatId, onNewChat, onSelectChat }) {
  const [history] = useState(MOCK_HISTORY);

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

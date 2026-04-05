export default function LoadingSkeleton() {
  return (
    <div className="loading-battle">
      {/* Loading header */}
      <div className="loading-header">
        <div className="loading-dots">
          <div className="loading-dot" />
          <div className="loading-dot" />
          <div className="loading-dot" />
        </div>
        <span>Two AI models are battling…</span>
      </div>

      {/* Skeleton cards */}
      <div className="loading-skeletons">
        <div className="skeleton-card">
          <div className="skeleton-line skeleton-header" />
          <div className="skeleton-line skeleton-block" />
          <div className="skeleton-lines">
            <div className="skeleton-line skeleton-text" />
            <div className="skeleton-line skeleton-text" />
            <div className="skeleton-line skeleton-text" style={{ width: '80%' }} />
          </div>
        </div>
        <div className="skeleton-card">
          <div className="skeleton-line skeleton-header" />
          <div className="skeleton-line skeleton-block" />
          <div className="skeleton-lines">
            <div className="skeleton-line skeleton-text" />
            <div className="skeleton-line skeleton-text" />
            <div className="skeleton-line skeleton-text" style={{ width: '60%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

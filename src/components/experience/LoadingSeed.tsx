export default function LoadingSeed() {
  return (
    <div
      className="loader"
      data-loader
      role="progressbar"
      aria-label="Loading"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
    >
      <div className="loader__veil" data-loader-veil />
      <svg className="loader__seed" aria-hidden="true">
        <defs>
          <radialGradient id="loader-glow">
            <stop offset="0" stopColor="#ffb35c" stopOpacity="0.5" />
            <stop offset="0.4" stopColor="#ffb35c" stopOpacity="0.12" />
            <stop offset="1" stopColor="#ffb35c" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g className="loader__breath">
          <ellipse
            data-loader-glow
            fill="url(#loader-glow)"
            cx="50%"
            cy="50%"
            rx="22%"
            ry="50%"
            style={{ opacity: 0.18 }}
          />
        </g>
        <path className="loader__outline" data-loader-outline />
        <path className="loader__line" data-loader-line pathLength={1} />
        <path className="loader__line" data-loader-line pathLength={1} />
      </svg>
    </div>
  );
}

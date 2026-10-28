export default function ChapterInterface() {
  return (
    <div className="overlay">
      <section className="chapters" data-chapters aria-live="polite" />

      <nav className="rail" data-rail aria-label="Chapters">
        <div className="rail__cursor" aria-hidden="true">
          <span data-rail-index>01</span>
        </div>
        <div className="cue" data-cue aria-hidden="true">
          <div className="cue__stem">
            <svg className="cue__root" viewBox="0 0 24 96">
              <path
                className="cue__line"
                pathLength={1}
                d="M12 0 C12 14 10.6 24 11.6 36 C12.6 48 13.4 58 12.2 70 C11.4 78 11.2 86 11.6 94"
              />
              <path
                className="cue__line cue__line--side"
                pathLength={1}
                d="M11.7 40 C13.8 45 16.6 48 19.5 55"
              />
              <path
                className="cue__line cue__line--side"
                pathLength={1}
                d="M12.6 62 C10.6 66 8.2 69 5.4 74"
              />
            </svg>
            <i className="cue__tip" />
          </div>
          <span className="cue__label">Scroll</span>
        </div>
      </nav>

      <p className="calendar" data-calendar aria-hidden="true">
        <span className="calendar__day">
          Day <b data-calendar-day>000</b>
        </span>
        <span className="calendar__season" data-calendar-season>
          Spring
        </span>
        <span className="calendar__year" data-calendar-year hidden />
      </p>

      <div className="hud">
        <button className="sound" type="button" data-sound aria-pressed="false">
          <span className="sound__bars" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span data-sound-label>Sound off</span>
        </button>
      </div>

      <div className="fallback" data-fallback hidden>
        <p>This experience needs WebGL 2.</p>
        <p>Try a recent version of Chrome, Safari, Firefox or Edge.</p>
      </div>
    </div>
  );
}

function SoundBars() {
  return (
    <span className="sound__bars" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

export default function EntryGate() {
  return (
    <>
      <div className="gate" data-gate hidden>
        <div className="gate__enter">
          <p className="gate__cta">
            <SoundBars />
            <span data-gate-label>Press and hold the seed</span>
          </p>
          <p className="gate__hint">Sound on · best with headphones</p>
        </div>
        <button className="gate__silent" type="button" data-gate-silent>
          Continue in silence
        </button>
      </div>
      <div className="debug" data-debug hidden />
    </>
  );
}

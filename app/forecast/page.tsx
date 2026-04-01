import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "2026–27 Northeast Snowboard Season Outlook",
  description:
    "Probability forecast for NYC-driveable snowboard regions. El Niño–leaning setup, south-skewed risk.",
};

export default function ForecastPage() {
  return (
    <>
      <style>{`
        .forecast-root {
          --snow: #f0f4f8;
          --ice: #d6e4f0;
          --slate: #1a2332;
          --deep: #0d1520;
          --vt-green: #2ecc71;
          --vt-green-dim: rgba(46,204,113,0.15);
          --ny-amber: #f39c12;
          --ny-amber-dim: rgba(243,156,18,0.15);
          --pa-red: #e74c3c;
          --pa-red-dim: rgba(231,76,60,0.15);
          --blue-accent: #3498db;
          --muted: #7f8c9b;
          --card-bg: rgba(255,255,255,0.04);
          --card-border: rgba(255,255,255,0.08);
          background: var(--deep);
          color: var(--snow);
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
        }
        .forecast-root * { box-sizing: border-box; }
        .forecast-root .infographic { max-width: 1100px; margin: 0 auto; padding: 60px 32px 80px; }
        .forecast-root .back-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'JetBrains Mono', monospace; font-size: 12px;
          letter-spacing: 1px; text-transform: uppercase;
          color: var(--blue-accent); text-decoration: none;
          border: 1px solid rgba(52,152,219,0.3); padding: 8px 20px;
          border-radius: 100px; margin-bottom: 32px;
          transition: background 0.2s;
        }
        .forecast-root .back-link:hover { background: rgba(52,152,219,0.1); }
        .forecast-root .hero { text-align: center; margin-bottom: 64px; position: relative; }
        .forecast-root .hero::before {
          content: ''; position: absolute; top: -120px; left: 50%; transform: translateX(-50%);
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(52,152,219,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .forecast-root .badge {
          display: inline-block; font-family: 'JetBrains Mono', monospace;
          font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--blue-accent); border: 1px solid rgba(52,152,219,0.3);
          padding: 6px 18px; border-radius: 100px; margin-bottom: 28px;
        }
        .forecast-root .hero h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(56px, 8vw, 96px); letter-spacing: 3px;
          line-height: 0.95; margin-bottom: 18px;
        }
        .forecast-root .hero h1 span { color: var(--blue-accent); }
        .forecast-root .hero .subtitle {
          font-size: 17px; color: var(--muted); max-width: 640px;
          margin: 0 auto; line-height: 1.65;
        }
        .forecast-root .verdict-strip {
          display: flex; gap: 2px; border-radius: 14px;
          overflow: hidden; margin-bottom: 64px;
        }
        .forecast-root .verdict-card { flex: 1; padding: 28px 24px; text-align: center; }
        .forecast-root .verdict-card.vt { background: var(--vt-green-dim); }
        .forecast-root .verdict-card.ny { background: var(--ny-amber-dim); }
        .forecast-root .verdict-card.pa { background: var(--pa-red-dim); }
        .forecast-root .verdict-label {
          font-family: 'JetBrains Mono', monospace; font-size: 10px;
          letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 8px;
        }
        .forecast-root .verdict-region {
          font-family: 'Bebas Neue', sans-serif; font-size: 26px;
          letter-spacing: 1px; margin-bottom: 4px;
        }
        .forecast-root .verdict-call { font-size: 13px; font-weight: 500; }
        .forecast-root .verdict-card.vt .verdict-call { color: var(--vt-green); }
        .forecast-root .verdict-card.ny .verdict-call { color: var(--ny-amber); }
        .forecast-root .verdict-card.pa .verdict-call { color: var(--pa-red); }
        .forecast-root .enso-strip {
          display: flex; align-items: center; gap: 20px;
          background: var(--card-bg); border: 1px solid var(--card-border);
          border-radius: 14px; padding: 24px 28px; margin-bottom: 48px;
        }
        .forecast-root .enso-gauge { width: 100px; height: 100px; flex-shrink: 0; }
        .forecast-root .enso-info h3 {
          font-family: 'Bebas Neue', sans-serif; font-size: 22px;
          letter-spacing: 1px; margin-bottom: 4px;
        }
        .forecast-root .enso-info p { font-size: 13px; color: var(--muted); line-height: 1.6; }
        .forecast-root .enso-pct {
          font-family: 'JetBrains Mono', monospace; font-size: 13px;
          color: var(--pa-red); font-weight: 600;
        }
        .forecast-root .section-header {
          display: flex; align-items: center; gap: 16px;
          margin-bottom: 28px; margin-top: 56px;
        }
        .forecast-root .section-header .line { flex: 1; height: 1px; background: var(--card-border); }
        .forecast-root .section-header h2 {
          font-family: 'Bebas Neue', sans-serif; font-size: 28px;
          letter-spacing: 2px; color: var(--snow); white-space: nowrap;
        }
        .forecast-root .prob-table {
          width: 100%; border-collapse: separate; border-spacing: 0 6px; margin-bottom: 12px;
        }
        .forecast-root .prob-table th {
          font-family: 'JetBrains Mono', monospace; font-size: 10px;
          letter-spacing: 2px; text-transform: uppercase; color: var(--muted);
          padding: 8px 16px; text-align: right;
        }
        .forecast-root .prob-table th:first-child { text-align: left; }
        .forecast-root .prob-table td {
          padding: 16px; background: var(--card-bg);
          font-family: 'JetBrains Mono', monospace; font-size: 15px; text-align: right;
        }
        .forecast-root .prob-table td:first-child {
          text-align: left; font-family: 'DM Sans', sans-serif;
          font-weight: 600; font-size: 15px; border-radius: 10px 0 0 10px;
        }
        .forecast-root .prob-table td:last-child { border-radius: 0 10px 10px 0; }
        .forecast-root .prob-table tr.vt td:first-child { border-left: 3px solid var(--vt-green); }
        .forecast-root .prob-table tr.ny td:first-child { border-left: 3px solid var(--ny-amber); }
        .forecast-root .prob-table tr.pa td:first-child { border-left: 3px solid var(--pa-red); }
        .forecast-root .highlight-above { color: var(--vt-green); font-weight: 600; }
        .forecast-root .highlight-below { color: var(--pa-red); font-weight: 600; }
        .forecast-root .bar-section { margin-bottom: 48px; }
        .forecast-root .bar-group {
          background: var(--card-bg); border: 1px solid var(--card-border);
          border-radius: 14px; padding: 28px 28px 20px; margin-bottom: 16px;
        }
        .forecast-root .bar-group-title { font-weight: 600; font-size: 14px; margin-bottom: 18px; }
        .forecast-root .bar-row { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }
        .forecast-root .bar-label {
          width: 110px; font-size: 12px; color: var(--muted); flex-shrink: 0; text-align: right;
        }
        .forecast-root .bar-track {
          flex: 1; height: 28px; background: rgba(255,255,255,0.04);
          border-radius: 6px; position: relative; overflow: hidden;
        }
        .forecast-root .bar-fill {
          height: 100%; border-radius: 6px; display: flex; align-items: center;
          justify-content: flex-end; padding-right: 10px;
          font-family: 'JetBrains Mono', monospace; font-size: 11px;
          font-weight: 600; color: var(--deep);
        }
        .forecast-root .bar-fill.green { background: var(--vt-green); }
        .forecast-root .bar-fill.amber { background: var(--ny-amber); }
        .forecast-root .bar-fill.red { background: var(--pa-red); }
        .forecast-root .bar-ref {
          position: absolute; left: 66.6%; top: 0; bottom: 0;
          width: 1px; border-left: 1.5px dashed rgba(255,255,255,0.2);
        }
        .forecast-root .bar-ref-label {
          position: absolute; right: 0; top: -16px;
          font-family: 'JetBrains Mono', monospace; font-size: 9px;
          color: var(--muted); letter-spacing: 1px;
        }
        .forecast-root .drivers-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 14px; margin-bottom: 48px;
        }
        .forecast-root .driver-card {
          background: var(--card-bg); border: 1px solid var(--card-border);
          border-radius: 14px; padding: 24px; position: relative; overflow: hidden;
        }
        .forecast-root .driver-card::before {
          content: attr(data-num); position: absolute; top: -8px; right: 12px;
          font-family: 'Bebas Neue', sans-serif; font-size: 72px;
          color: rgba(255,255,255,0.03); line-height: 1;
        }
        .forecast-root .driver-num {
          font-family: 'JetBrains Mono', monospace; font-size: 10px;
          color: var(--blue-accent); letter-spacing: 2px; margin-bottom: 8px;
        }
        .forecast-root .driver-title { font-weight: 700; font-size: 15px; margin-bottom: 8px; }
        .forecast-root .driver-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }
        .forecast-root .spark-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 14px; margin-bottom: 48px;
        }
        @media (max-width: 700px) { .forecast-root .spark-grid { grid-template-columns: 1fr; } }
        .forecast-root .spark-card {
          background: var(--card-bg); border: 1px solid var(--card-border);
          border-radius: 14px; padding: 24px;
        }
        .forecast-root .spark-resort { font-weight: 700; font-size: 14px; margin-bottom: 2px; }
        .forecast-root .spark-avg {
          font-family: 'JetBrains Mono', monospace; font-size: 11px;
          color: var(--muted); margin-bottom: 16px;
        }
        .forecast-root .spark-bars {
          display: flex; align-items: flex-end; gap: 6px; height: 80px; margin-bottom: 6px;
        }
        .forecast-root .spark-bar {
          flex: 1; border-radius: 4px 4px 0 0; position: relative; min-height: 4px;
        }
        .forecast-root .spark-bar-label {
          position: absolute; bottom: -16px; left: 50%; transform: translateX(-50%);
          font-family: 'JetBrains Mono', monospace; font-size: 8px;
          color: var(--muted); white-space: nowrap;
        }
        .forecast-root .spark-bar-val {
          position: absolute; top: -16px; left: 50%; transform: translateX(-50%);
          font-family: 'JetBrains Mono', monospace; font-size: 9px;
          color: var(--snow); white-space: nowrap;
        }
        .forecast-root .risk-cards {
          display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 48px;
        }
        @media (max-width: 600px) { .forecast-root .risk-cards { grid-template-columns: 1fr; } }
        .forecast-root .risk-card { border-radius: 14px; padding: 28px; position: relative; }
        .forecast-root .risk-card.upside {
          background: linear-gradient(135deg, rgba(46,204,113,0.08), rgba(46,204,113,0.02));
          border: 1px solid rgba(46,204,113,0.15);
        }
        .forecast-root .risk-card.downside {
          background: linear-gradient(135deg, rgba(231,76,60,0.08), rgba(231,76,60,0.02));
          border: 1px solid rgba(231,76,60,0.15);
        }
        .forecast-root .risk-tag {
          font-family: 'JetBrains Mono', monospace; font-size: 10px;
          letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px;
        }
        .forecast-root .risk-card.upside .risk-tag { color: var(--vt-green); }
        .forecast-root .risk-card.downside .risk-tag { color: var(--pa-red); }
        .forecast-root .risk-title { font-weight: 700; font-size: 16px; margin-bottom: 8px; }
        .forecast-root .risk-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }
        .forecast-root .playbook-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 14px; margin-bottom: 48px;
        }
        @media (max-width: 700px) { .forecast-root .playbook-grid { grid-template-columns: 1fr; } }
        .forecast-root .playbook-card {
          border-radius: 14px; padding: 28px; border: 1px solid var(--card-border);
        }
        .forecast-root .playbook-card.vt { border-top: 3px solid var(--vt-green); background: var(--vt-green-dim); }
        .forecast-root .playbook-card.ny { border-top: 3px solid var(--ny-amber); background: var(--ny-amber-dim); }
        .forecast-root .playbook-card.pa { border-top: 3px solid var(--pa-red); background: var(--pa-red-dim); }
        .forecast-root .playbook-region {
          font-family: 'Bebas Neue', sans-serif; font-size: 22px;
          letter-spacing: 1px; margin-bottom: 4px;
        }
        .forecast-root .playbook-strat {
          font-family: 'JetBrains Mono', monospace; font-size: 10px;
          letter-spacing: 2px; text-transform: uppercase; margin-bottom: 14px;
        }
        .forecast-root .playbook-card.vt .playbook-strat { color: var(--vt-green); }
        .forecast-root .playbook-card.ny .playbook-strat { color: var(--ny-amber); }
        .forecast-root .playbook-card.pa .playbook-strat { color: var(--pa-red); }
        .forecast-root .playbook-text { font-size: 13px; color: var(--muted); line-height: 1.65; }
        .forecast-root .footer { text-align: center; padding-top: 40px; border-top: 1px solid var(--card-border); }
        .forecast-root .footer p {
          font-size: 11px; color: var(--muted); line-height: 1.7; max-width: 600px; margin: 0 auto;
        }
        .forecast-root .footer .note {
          font-family: 'JetBrains Mono', monospace; font-size: 9px;
          letter-spacing: 1px; color: rgba(255,255,255,0.2); margin-top: 16px;
        }
      `}</style>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&family=JetBrains+Mono:wght@400;600&display=swap"
        rel="stylesheet"
      />
      <div className="forecast-root">
        <div className="infographic">
          <Link href="/" className="back-link">
            &larr; Resort Availability
          </Link>

          {/* HERO */}
          <div className="hero">
            <div className="badge">Preseason Institutional View &middot; April 2026</div>
            <h1>
              NORTHEAST <span>SNOWBOARD</span>
              <br />
              SEASON OUTLOOK
            </h1>
            <p className="subtitle">
              2026&ndash;27 probability forecast for NYC-driveable snowboard regions. El
              Ni&ntilde;o&ndash;leaning setup, south-skewed risk. Vermont resilient, Pennsylvania
              fragile.
            </p>
          </div>

          {/* VERDICT */}
          <div className="verdict-strip">
            <div className="verdict-card vt">
              <div className="verdict-label">Vermont</div>
              <div className="verdict-region">BALANCED</div>
              <div className="verdict-call">Slightly positive tail</div>
            </div>
            <div className="verdict-card ny">
              <div className="verdict-label">Upstate NY</div>
              <div className="verdict-region">MIXED</div>
              <div className="verdict-call">Below-avg skew</div>
            </div>
            <div className="verdict-card pa">
              <div className="verdict-label">PA / Poconos</div>
              <div className="verdict-region">BEARISH</div>
              <div className="verdict-call">63% below-avg odds</div>
            </div>
          </div>

          {/* ENSO */}
          <div className="enso-strip">
            <svg className="enso-gauge" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="42" fill="none" stroke="#e74c3c" strokeWidth="8"
                strokeDasharray="211" strokeDashoffset="42" strokeLinecap="round"
                transform="rotate(-90 50 50)" opacity="0.8"
              />
              <text x="50" y="46" textAnchor="middle" fill="#e74c3c" fontFamily="'Bebas Neue',sans-serif" fontSize="26">80%</text>
              <text x="50" y="60" textAnchor="middle" fill="#7f8c9b" fontFamily="'JetBrains Mono',monospace" fontSize="7" letterSpacing="1">EL NIÑO</text>
            </svg>
            <div className="enso-info">
              <h3>El Ni&ntilde;o Likely by Winter 2026&ndash;27</h3>
              <p>
                CPC puts Oct&ndash;Dec 2026 El Ni&ntilde;o odds near{" "}
                <span className="enso-pct">~80%</span>. For the Northeast, this raises the
                probability of warm intrusions, mixed precipitation, and rain-on-snow events
                &mdash; especially at lower elevations. Large model spread persists due to the
                spring predictability barrier.
              </p>
            </div>
          </div>

          {/* PROBABILITY TABLE */}
          <div className="section-header">
            <div className="line"></div>
            <h2>Probability Forecast</h2>
            <div className="line"></div>
          </div>
          <table className="prob-table">
            <thead>
              <tr><th>Region</th><th>Above-Avg</th><th>Average</th><th>Below-Avg</th></tr>
            </thead>
            <tbody>
              <tr className="vt"><td>Vermont</td><td className="highlight-above">37%</td><td>33%</td><td>30%</td></tr>
              <tr className="ny"><td>Upstate New York</td><td>26%</td><td>32%</td><td>42%</td></tr>
              <tr className="pa"><td>Pennsylvania / Poconos</td><td>11%</td><td>26%</td><td className="highlight-below">63%</td></tr>
            </tbody>
          </table>

          {/* MEDIAN CONDITION BARS */}
          <div className="bar-section">
            <div className="bar-group">
              <div className="bar-group-title">Natural Snowfall vs. Recent Normal</div>
              <div className="bar-row">
                <div className="bar-label">Vermont</div>
                <div className="bar-track">
                  <div className="bar-fill green" style={{ width: "72%" }}>90&ndash;105%</div>
                  <div className="bar-ref"><span className="bar-ref-label">100%</span></div>
                </div>
              </div>
              <div className="bar-row">
                <div className="bar-label">Upstate NY</div>
                <div className="bar-track">
                  <div className="bar-fill amber" style={{ width: "58%" }}>80&ndash;95%</div>
                  <div className="bar-ref"></div>
                </div>
              </div>
              <div className="bar-row">
                <div className="bar-label">PA / Poconos</div>
                <div className="bar-track">
                  <div className="bar-fill red" style={{ width: "46%" }}>60&ndash;80%</div>
                  <div className="bar-ref"></div>
                </div>
              </div>
            </div>
            <div className="bar-group">
              <div className="bar-group-title">Thaw/Freeze Burden vs. 2010s Baseline</div>
              <div className="bar-row">
                <div className="bar-label">Vermont</div>
                <div className="bar-track">
                  <div className="bar-fill green" style={{ width: "22%" }}>+5&ndash;15%</div>
                </div>
              </div>
              <div className="bar-row">
                <div className="bar-label">Upstate NY</div>
                <div className="bar-track">
                  <div className="bar-fill amber" style={{ width: "36%" }}>+10&ndash;20%</div>
                </div>
              </div>
              <div className="bar-row">
                <div className="bar-label">PA / Poconos</div>
                <div className="bar-track">
                  <div className="bar-fill red" style={{ width: "55%" }}>+20&ndash;35%</div>
                </div>
              </div>
            </div>
          </div>

          {/* KEY DRIVERS */}
          <div className="section-header">
            <div className="line"></div>
            <h2>Key Drivers</h2>
            <div className="line"></div>
          </div>
          <div className="drivers-grid">
            <div className="driver-card" data-num="01">
              <div className="driver-num">01</div>
              <div className="driver-title">ENSO Path</div>
              <div className="driver-desc">
                Emerging El Ni&ntilde;o is the dominant macro signal. Raises odds of warm
                intrusions and rain-on-snow, especially away from the highest elevations.
              </div>
            </div>
            <div className="driver-card" data-num="02">
              <div className="driver-num">02</div>
              <div className="driver-title">NAO/AO Regime</div>
              <div className="driver-desc">
                Negative NAO favors cold eastern conditions; positive NAO brings warmth. Forecast
                skill is limited &mdash; NAO widens the distribution more than it sharpens it.
              </div>
            </div>
            <div className="driver-card" data-num="03">
              <div className="driver-num">03</div>
              <div className="driver-title">Elevation &amp; Snowmaking</div>
              <div className="driver-desc">
                Killington: ~250&quot; natural + 600 acres snowmaking. Blue Mountain: ~38&quot;
                natural, 100% snowmaking-dependent. Infrastructure keeps lifts spinning but
                can&apos;t fix surface quality.
              </div>
            </div>
            <div className="driver-card" data-num="04">
              <div className="driver-num">04</div>
              <div className="driver-title">Structural Warming</div>
              <div className="driver-desc">
                Northeast winter precipitation falling as snow has declined ~23% since 1949. More
                weather near 32&deg;F means more rain, crusts, and freeze-thaw cycles.
              </div>
            </div>
          </div>

          {/* ANALOG SNOWFALL SPARKLINES */}
          <div className="section-header">
            <div className="line"></div>
            <h2>El Ni&ntilde;o Analog Snowfall (inches)</h2>
            <div className="line"></div>
          </div>
          <div className="spark-grid">
            <div className="spark-card">
              <div className="spark-resort">Killington, VT</div>
              <div className="spark-avg">Avg ~250&quot;</div>
              <div className="spark-bars">
                <div className="spark-bar" style={{ height: "93%", background: "var(--vt-green)", opacity: 0.7 }}>
                  <span className="spark-bar-val">291</span><span className="spark-bar-label">&apos;02</span>
                </div>
                <div className="spark-bar" style={{ height: "94%", background: "var(--vt-green)", opacity: 0.75 }}>
                  <span className="spark-bar-val">294</span><span className="spark-bar-label">&apos;06</span>
                </div>
                <div className="spark-bar" style={{ height: "65%", background: "var(--vt-green)", opacity: 0.65 }}>
                  <span className="spark-bar-val">203</span><span className="spark-bar-label">&apos;09</span>
                </div>
                <div className="spark-bar" style={{ height: "26%", background: "var(--pa-red)", opacity: 0.7 }}>
                  <span className="spark-bar-val">81</span><span className="spark-bar-label">&apos;15</span>
                </div>
                <div className="spark-bar" style={{ height: "75%", background: "var(--vt-green)", opacity: 0.7 }}>
                  <span className="spark-bar-val">233</span><span className="spark-bar-label">&apos;18</span>
                </div>
                <div className="spark-bar" style={{ height: "77%", background: "var(--vt-green)", opacity: 0.75 }}>
                  <span className="spark-bar-val">239</span><span className="spark-bar-label">&apos;23</span>
                </div>
              </div>
            </div>
            <div className="spark-card">
              <div className="spark-resort">Whiteface, NY</div>
              <div className="spark-avg">10yr Avg ~181&quot;</div>
              <div className="spark-bars">
                <div className="spark-bar" style={{ height: "51%", background: "var(--ny-amber)", opacity: 0.6 }}>
                  <span className="spark-bar-val">109</span><span className="spark-bar-label">&apos;15</span>
                </div>
                <div className="spark-bar" style={{ height: "100%", background: "var(--vt-green)", opacity: 0.7 }}>
                  <span className="spark-bar-val">213</span><span className="spark-bar-label">&apos;18</span>
                </div>
                <div className="spark-bar" style={{ height: "65%", background: "var(--ny-amber)", opacity: 0.65 }}>
                  <span className="spark-bar-val">138</span><span className="spark-bar-label">&apos;23</span>
                </div>
              </div>
            </div>
            <div className="spark-card">
              <div className="spark-resort">Blue Mountain, PA</div>
              <div className="spark-avg">Avg ~38&quot;</div>
              <div className="spark-bars">
                <div className="spark-bar" style={{ height: "79%", background: "var(--ny-amber)", opacity: 0.6 }}>
                  <span className="spark-bar-val">30</span><span className="spark-bar-label">&apos;15</span>
                </div>
                <div className="spark-bar" style={{ height: "68%", background: "var(--ny-amber)", opacity: 0.55 }}>
                  <span className="spark-bar-val">26</span><span className="spark-bar-label">&apos;18</span>
                </div>
                <div className="spark-bar" style={{ height: "32%", background: "var(--pa-red)", opacity: 0.7 }}>
                  <span className="spark-bar-val">12</span><span className="spark-bar-label">&apos;23</span>
                </div>
              </div>
            </div>
          </div>

          {/* RISKS */}
          <div className="section-header">
            <div className="line"></div>
            <h2>Risk Scenarios</h2>
            <div className="line"></div>
          </div>
          <div className="risk-cards">
            <div className="risk-card upside">
              <div className="risk-tag">&#9650; Upside Invalidator</div>
              <div className="risk-title">Sustained Negative NAO</div>
              <div className="risk-desc">
                A persistent negative NAO in Jan&ndash;Feb 2027 could support major Mid-Atlantic
                snowstorms even within an El Ni&ntilde;o base. Biggest absolute lift in Upstate NY;
                biggest relative lift in Pennsylvania.
              </div>
            </div>
            <div className="risk-card downside">
              <div className="risk-tag">&#9660; Downside Invalidator</div>
              <div className="risk-title">Strong El Ni&ntilde;o + Positive NAO</div>
              <div className="risk-desc">
                A stronger-than-expected El Ni&ntilde;o paired with persistent positive NAO would
                maximize rain/mix events, snowpack loss, and refreeze cycles across all three
                regions.
              </div>
            </div>
          </div>

          {/* PLAYBOOK */}
          <div className="section-header">
            <div className="line"></div>
            <h2>Snowboarder Playbook</h2>
            <div className="line"></div>
          </div>
          <div className="playbook-grid">
            <div className="playbook-card vt">
              <div className="playbook-region">Vermont</div>
              <div className="playbook-strat">Commit Early</div>
              <div className="playbook-text">
                Best risk-adjusted allocation. Lock in destination days and passes. Even in poor
                natural-snow years, Killington sustains 150+ day seasons. Carries the only true
                spring upside tail in the market.
              </div>
            </div>
            <div className="playbook-card ny">
              <div className="playbook-region">Upstate NY</div>
              <div className="playbook-strat">Stay Flexible</div>
              <div className="playbook-text">
                Adirondack trips remain defensible; Catskill commitments should be flexible. Favor
                weather windows over fixed weekends. Whiteface&apos;s 99% snowmaking gives it more
                resilience than its natural-snow profile suggests.
              </div>
            </div>
            <div className="playbook-card pa">
              <div className="playbook-region">PA / Poconos</div>
              <div className="playbook-strat">Opportunistic Only</div>
              <div className="playbook-text">
                Buy for convenience and price, not powder probability. Expect a serviceable groomer
                season with elevated refreeze risk. &ldquo;Open&rdquo; and &ldquo;good&rdquo;
                diverge the most here &mdash; don&apos;t underwrite as average.
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="footer">
            <p>
              Ensemble model: 25% climate signals &middot; 25% analog analysis &middot; 20%
              seasonal models &middot; 15% regional differentiation &middot; 15% structural
              factors. Analog set: 2002/03, 2006/07, 2009/10, 2015/16, 2018/19, 2023/24 (El
              Ni&ntilde;o winters per CPC ONI table). Backtested classification accuracy: ~60&ndash;65%
              VT, ~55&ndash;60% NY, ~65&ndash;70% PA.
            </p>
            <div className="note">
              Author estimates &middot; Not official NOAA probabilities &middot; April 2026 base
              case
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

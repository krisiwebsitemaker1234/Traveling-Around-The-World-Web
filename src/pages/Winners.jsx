import { Link } from "react-router-dom";
import { PAST_WINNERS } from "../data.js";

export default function Winners() {
  return (
    <>
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-inner">
          <div className="page-eyebrow reveal">2020 – 2025</div>
          <div className="page-h reveal d1">PAST<br />WINNERS.</div>
          <p className="page-sub reveal d2">
            Six years. Six groups. Thirty people whose lives changed forever the moment their name came out of the Wheel.
          </p>
        </div>
      </div>

      {/* ── Winners Timeline ── */}
      <div className="winners-section">
        <div className="winners-inner">
          {PAST_WINNERS.map((w, i) => (
            <div key={w.year} className="winner-block reveal">
              <div className="winner-year-ghost">THE WORLDBOUND FIVE {w.year}</div>
              <div className="winner-block-inner">

                {/* Image */}
                <div className="winner-img-col">
                  <img src={w.img} alt={`Worldbound Five ${w.year}`} />
                  <div className="winner-img-over" />
                  <div className="winner-img-year">{w.year}</div>
                </div>

                {/* Info card */}
                <div className="winner-info">
                  <div className="winner-group-name">THE WORLDBOUND FIVE · {w.year}</div>

                  <div className="winner-members">
                    {w.members.map(m => (
                      <div key={m.name} className="winner-member">
                        <span>{m.name}</span>
                        <span className="winner-member-country">{m.country}</span>
                      </div>
                    ))}
                  </div>

                  <p className="winner-highlight">"{w.highlight}"</p>

                  <div className="winner-stats">
                    <div>
                      <div className="wstat-label">Top Destination</div>
                      <div className="wstat-val">{w.topDest}</div>
                    </div>
                    <div>
                      <div className="wstat-label">Budget Used</div>
                      <div className="wstat-val">{w.budgetUsed}</div>
                    </div>
                  </div>

                  <div className="winner-wm">{w.year}</div>
                </div>

              </div>
            </div>
          ))}

          {/* 2026 teaser */}
          <div className="winner-block reveal">
            <div className="winner-year-ghost">THE WORLDBOUND FIVE 2026</div>
            <div style={{
              background: "rgba(123,94,167,.08)", border: "2px dashed rgba(123,94,167,.3)",
              borderRadius: "14px", padding: "3.5rem", textAlign: "center",
            }}>
              <div style={{ fontFamily: "var(--display)", fontSize: "clamp(2rem,5vw,4rem)", letterSpacing: ".05em", color: "rgba(255,255,255,.15)", marginBottom: "1rem" }}>
                2026
              </div>
              <div style={{ fontFamily: "var(--display)", fontSize: "1.5rem", letterSpacing: ".06em", color: "var(--purple)", marginBottom: ".8rem" }}>
                THE WORLDBOUND FIVE · 2026
              </div>
              <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.35)", lineHeight: "1.7", maxWidth: "480px", margin: "0 auto 1.8rem" }}>
                Applications open January 1st, 2026. The draw takes place on March 1st. Five names.
                One wheel. Could yours be among them?
              </p>
              <Link to="/apply" style={{
                display: "inline-block", fontFamily: "var(--display)", fontSize: "1rem",
                letterSpacing: ".1em", background: "var(--purple)", color: "#fff",
                padding: ".7rem 2rem", borderRadius: "4px",
              }}>ENTER THE DRAW</Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

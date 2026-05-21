import { useState } from "react";
import { DESTINATIONS } from "../data.js";

const TAGS = ["All", "Asia", "Europe", "Americas", "Africa", "Middle East"];

export default function Destinations() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? DESTINATIONS : DESTINATIONS.filter(d => d.tag === filter);

  return (
    <>
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-inner">
          <div className="page-eyebrow reveal">The World Awaits</div>
          <div className="page-h reveal d1">DESTINATIONS.</div>
          <p className="page-sub reveal d2">
            Every country on earth is on the table. Below is a few of the places the Worldbound Five have explored and can explore.
          </p>
        </div>
      </div>

      {/* ── Filter + Grid ── */}
      <div className="dest-section">
        <div className="dest-hdr reveal">
          <div className="sec-display-h">EXPLORE THE WORLD.</div>
          <p className="sec-sub">Hover any destination to learn more. Filter by region below.</p>

          {/* Filter tabs */}
          <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginTop: "1.4rem" }}>
            {TAGS.map(tag => (
              <button key={tag} onClick={() => setFilter(tag)} style={{
                fontFamily: "var(--display)", fontSize: ".85rem", letterSpacing: ".1em",
                background: filter === tag ? "var(--purple)" : "rgba(255,255,255,.06)",
                color: filter === tag ? "#fff" : "rgba(255,255,255,.5)",
                border: `1.5px solid ${filter === tag ? "var(--purple)" : "rgba(255,255,255,.12)"}`,
                padding: ".4rem 1.1rem", borderRadius: "4px", cursor: "pointer",
                transition: "all .25s",
              }}>
                {tag.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="dest-grid reveal d1">
          {filtered.map((d, i) => (
            <div key={d.city + i} className="dcard">
              <img src={d.img} alt={d.city} />
              <div className="dcard-over" />
              <div className="dcard-body">
                <div className="dcard-ctry">{d.country}</div>
                <div className="dcard-city">{d.city}</div>
                <div className="dcard-desc">{d.desc}</div>
                <span className="dcard-tag">{d.tag}</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ maxWidth: "1160px", margin: "2rem auto", textAlign: "center", color: "rgba(255,255,255,.3)", fontFamily: "var(--display)", fontSize: "1.5rem", letterSpacing: ".05em" }}>
            NO DESTINATIONS IN THIS REGION YET.
          </div>
        )}

        {/* Note */}
        <div className="reveal d2" style={{
          maxWidth: "1160px", margin: "2.5rem auto 0",
          background: "rgba(123,94,167,.08)", border: "1.5px solid rgba(123,94,167,.25)",
          borderRadius: "10px", padding: "1.4rem 1.8rem",
        }}>
          <div style={{ fontFamily: "var(--display)", fontSize: "1rem", letterSpacing: ".06em", color: "var(--purple)", marginBottom: ".4rem" }}>
            ALL COUNTRIES ARE AVAILABLE
          </div>
          <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.45)", lineHeight: "1.7" }}>
            The destinations shown are a curated sample. Every country on earth is accessible to the Worldbound Five —
            the full list is discussed and finalised during the 10-day planning phase after selection.
          </p>
        </div>
      </div>
    </>
  );
}

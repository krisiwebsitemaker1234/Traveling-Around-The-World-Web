import { useState } from "react";
import { Link } from "react-router-dom";

function makeRef() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let r = "TATW-2026-";
  for (let i = 0; i < 8; i++) r += chars[Math.floor(Math.random() * chars.length)];
  return r;
}

export default function Apply() {
  const [email, setEmail] = useState("");
  const [done,  setDone]  = useState(false);
  const [ref]             = useState(makeRef);

  const submit = () => { if (email.includes("@")) setDone(true); };

  return (
    <>
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-inner">
          <div className="page-eyebrow reveal">2026 Applications</div>
          <div className="page-h reveal d1">APPLY<br />NOW.</div>
          <p className="page-sub reveal d2">
            Free. Worldwide. Open to everyone. Five spots. One draw. Applications open January 1st, 2026.
          </p>
        </div>
      </div>

      {done ? (
        /* ── Confirmation ── */
        <div className="apply-conf-section">
          <div className="apply-conf">

            <div className="apply-check-ring">
              <span className="material-icons-round" style={{ fontSize: "2.2rem", color: "var(--purple)" }}>check</span>
            </div>

            <div className="apply-conf-eyebrow">Application Confirmed</div>
            <div className="apply-conf-h">YOU'RE IN<br />THE WHEEL.</div>
            <div className="apply-conf-ref">{ref}</div>

            <p className="apply-conf-p">
              Your entry has been registered under{" "}
              <strong style={{ color: "rgba(255,255,255,.7)", fontWeight: 500 }}>{email}</strong>.
              If your name is drawn, we will contact you within 24 hours of the live broadcast.
              Keep an eye on your inbox on March 1st.
            </p>

            <div className="apply-conf-draw">
              <div className="apply-conf-draw-label">Live Draw Date</div>
              <div className="apply-conf-draw-date">MARCH 1, 2026</div>
            </div>

            <div className="apply-conf-steps">
              {[
                ["01", "Wait for\nMarch 1st"],
                ["02", "Watch the\nlive draw"],
                ["03", "Hear your\nname"],
              ].map(([n, t]) => (
                <div key={n} className="apply-conf-step">
                  <div className="apply-conf-step-n">{n}</div>
                  <div className="apply-conf-step-t">{t}</div>
                </div>
              ))}
            </div>

            <Link to="/" className="apply-conf-back">← Back to Home</Link>
          </div>
        </div>

      ) : (
        /* ── Form ── */
        <div className="apply-section reveal">
          <div className="apply-inner">
            <div className="apply-eyebrow">Enter the 2026 Draw</div>
            <div className="apply-h">
              THE WHEEL<br />OF <span>FATE</span><br />AWAITS.
            </div>
            <p className="apply-p">
              Get notified the moment 2026 applications open. Free to enter, open to anyone anywhere in the world.
            </p>
            <div className="apply-form">
              <input
                className="apply-input" type="email" placeholder="your@email.com"
                value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") submit(); }}
              />
              <button className="apply-btn" onClick={submit}>NOTIFY ME</button>
            </div>
          </div>
        </div>
      )}

      {/* ── What Happens Next — only visible before confirming ── */}
      {!done && (
        <>
          <div className="cream-section" style={{ paddingTop: 0, paddingBottom: "5rem" }}>
            <div className="reveal" style={{ maxWidth: "1100px", margin: "0 auto 2rem" }}>
              <div className="page-eyebrow">What Happens If You Win</div>
              <div style={{ fontFamily: "var(--display)", fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: ".04em", color: "#fff", lineHeight: 1 }}>
                AFTER YOUR NAME IS DRAWN.
              </div>
            </div>
            <div className="cream-card reveal d1">
              <div className="apply-steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem", padding: "3rem" }}>
                {[
                  { step:"01", title:"You're Contacted", desc:"TATW reaches out within 24 hours of the draw. You'll be briefed on everything that comes next." },
                  { step:"02", title:"Meet Your Five",   desc:"You'll be introduced to the other four winners. Your group — the Worldbound Five — begins." },
                  { step:"03", title:"Plan Together",    desc:"10 days to agree on your route. Every country is on the table. Dream big." },
                  { step:"04", title:"40-Day Prep",      desc:"TATW handles all logistics. You handle yourself — pack, prepare, and get ready to leave." },
                  { step:"05", title:"The Journey",      desc:"Security, film crew, $1,000,000 budget, and daily challenges. The adventure of a lifetime." },
                  { step:"06", title:"Come Home Changed",desc:"Return as someone who has seen the world. Your story becomes part of TATW forever." },
                ].map(s => (
                  <div key={s.step} style={{ borderTop: "2px solid var(--purple)", paddingTop: "1.2rem" }}>
                    <div style={{ fontFamily: "var(--display)", fontSize: "2.5rem", letterSpacing: ".05em", color: "var(--purple)", opacity: .3, lineHeight: 1, marginBottom: ".5rem" }}>{s.step}</div>
                    <div style={{ fontFamily: "var(--display)", fontSize: "1.2rem", letterSpacing: ".04em", color: "var(--ink)", marginBottom: ".5rem" }}>{s.title}</div>
                    <div style={{ fontSize: ".85rem", color: "var(--muted)", lineHeight: 1.7 }}>{s.desc}</div>
                  </div>
                ))}
              </div>
              <div className="wm" style={{ bottom: "-12px", right: "24px" }}>WIN</div>
            </div>
          </div>

          <div className="reveal" style={{ background: "var(--darker)", padding: "3rem 3.5rem", textAlign: "center", borderTop: "1px solid rgba(255,255,255,.06)" }}>
            <div style={{ fontFamily: "var(--display)", fontSize: "1rem", letterSpacing: ".12em", color: "rgba(255,255,255,.35)", marginBottom: "1.2rem" }}>
              WANT TO KNOW MORE BEFORE YOU ENTER?
            </div>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              {[["/how-it-works","How It Works"],["/rules","Full Rules"],["/destinations","Destinations"],["/winners","Past Winners"]].map(([to,l]) => (
                <Link key={to} to={to} style={{
                  fontFamily: "var(--display)", fontSize: ".9rem", letterSpacing: ".1em",
                  color: "rgba(255,255,255,.5)", border: "1px solid rgba(255,255,255,.12)",
                  padding: ".5rem 1.3rem", borderRadius: "4px", transition: "all .25s",
                }}>{l.toUpperCase()}</Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

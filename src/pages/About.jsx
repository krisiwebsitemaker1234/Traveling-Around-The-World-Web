import { IMAGES } from "../data.js";

export default function About() {
  return (
    <>
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-inner">
          <div className="page-eyebrow reveal">Who We Are</div>
          <div className="page-h reveal d1">ABOUT<br />TATW.</div>
          <p className="page-sub reveal d2">
            A company built on one belief — that everyone deserves to see the world.
          </p>
        </div>
      </div>

      {/* ── Mission Card ── */}
      <div className="cream-section">
        <div className="cream-card reveal">
          <div className="about-grid">
            <div className="about-text">
              <div className="card-eyebrow">Our Mission</div>
              <h2 className="card-h2">SENDING<br />THE WORLD<br />TO THE WORLD.</h2>
              <p className="card-p">
                Traveling Around The World is a company with a mission — sending as many lucky
                people as possible to discover and explore the earth we live in, start to end.
              </p>
              <p className="card-p">
                Established in 2019, we aim to send as many people as we can to explore this planet
                and make the best out of every trip. We believe that travel is not a privilege
                reserved for the few. It is a right.
              </p>
              <p className="card-p">
                Every single year, five ordinary people from anywhere in the world are handed an
                extraordinary gift: the planet, fully funded, fully supported, and fully theirs
                to explore.
              </p>
            </div>
            <div className="about-img-side">
              <img src={IMAGES.about} alt="Travelers exploring the world" />
            </div>
          </div>
          <div className="wm" style={{ bottom: "-12px", right: "24px" }}>TATW</div>
        </div>
      </div>

      {/* ── Values ── */}
      <div className="cream-section" style={{ paddingTop: 0 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="reveal" style={{ marginBottom: "1.8rem" }}>
            <div className="page-eyebrow">What We Stand For</div>
            <div style={{ fontFamily: "var(--display)", fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: ".04em", color: "#fff", lineHeight: 1 }}>
              OUR CORE VALUES.
            </div>
          </div>
        </div>
        <div className="values-grid reveal d1">
          {[
            { n:"01", title:"ACCESS FOR ALL",   desc:"No entry fee. No essays. No qualifications. If you're a person on this planet, you're eligible to enter the Wheel of Fate." },
            { n:"02", title:"FULL TRANSPARENCY", desc:"Every draw is broadcast live to the world. Every entry is publicly logged. No strings, no favourites, no backroom deals." },
            { n:"03", title:"COMPLETE SUPPORT",  desc:"From the moment you're selected to the moment you return home, our team handles every detail so you can focus on the adventure." },
            { n:"04", title:"REAL CHALLENGE",    desc:"This isn't a holiday package. Daily challenges, budget management, and group decisions make the journey truly earned." },
            { n:"05", title:"DOCUMENTED LEGACY", desc:"Every trip is filmed, streamed, and archived — so your journey becomes part of the global TATW story forever." },
            { n:"06", title:"FLEXIBILITY",       desc:"Destinations can be traded, extra stops can be won, and the plan evolves. The journey is yours to shape." },
          ].map(v => (
            <div key={v.n} className="value-card">
              <div className="value-num">{v.n}</div>
              <div className="value-title">{v.title}</div>
              <div className="value-desc">{v.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Founded Section ── */}
      <div className="cream-section" style={{ paddingTop: 0 }}>
        <div className="cream-card reveal">
          <div style={{ padding: "3.5rem", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "2rem", alignItems: "center" }}>
            <div style={{ gridColumn: "span 2" }}>
              <div className="card-eyebrow">Our History</div>
              <h2 className="card-h2" style={{ fontSize: "clamp(2rem,3.5vw,3rem)", marginBottom: "1rem" }}>
                SIX YEARS.<br />THIRTY LIVES<br />CHANGED.
              </h2>
              <p className="card-p">
                Since our first draw in 2020, thirty people from across the globe have lived a
                year of fully-funded exploration. Thirty people who entered on a whim, and left
                with a story that will last a lifetime.
              </p>
              <p className="card-p" style={{ marginTop: "1rem" }}>
                The Worldbound Five of 2026 will be number thirty-one through thirty-five.
                Could one of them be you?
              </p>
            </div>
            {[["2019","Year Founded"],["30","Lives Changed"],["6","Years Running"],["195+","Countries Available"]].map(([n,l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--display)", fontSize: "3.5rem", color: "var(--purple)", lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--muted)", marginTop: ".4rem" }}>{l}</div>
              </div>
            ))}
          </div>
          <div className="wm" style={{ top: "20px", right: "30px" }}>2026</div>
        </div>
      </div>
    </>
  );
}

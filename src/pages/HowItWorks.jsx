import { IMAGES } from "../data.js";

const STEPS = [
  { n:"01", title:"Enter the Draw",       desc:"Register for free, any time before January 31st. Open worldwide, no qualifications, no fees. Your name goes into the Wheel of Fate." },
  { n:"02", title:"The Wheel of Fate",    desc:"On March 1st, the draw goes live globally. Five names are drawn at random from all registered entries. Everything is broadcast and audited." },
  { n:"03", title:"Plan Your Journey",    desc:"The Worldbound Five have 10 days to agree on their travel plan — which countries, in what order. All destinations on earth are on the table." },
  { n:"04", title:"The 40-Day Window",    desc:"Once the plan is locked, TATW has 40 days to arrange all flights, accommodations, visas, and logistics. The group uses this time to prepare." },
  { n:"05", title:"The Journey Begins",   desc:"The Worldbound Five set off with their budget, their security team, and the filming crew. The world awaits." },
  { n:"06", title:"Return Home",          desc:"When the journey ends, the group returns as a changed people — and their story lives on through the TATW archive, streamed forever." },
];

export default function HowItWorks() {
  return (
    <>
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-inner">
          <div className="page-eyebrow reveal">The Process</div>
          <div className="page-h reveal d1">HOW IT<br />WORKS.</div>
          <p className="page-sub reveal d2">
            Six steps from your name to the airport. Here is exactly how the Worldbound Five are chosen and sent on their way.
          </p>
        </div>
      </div>

      {/* ── Wheel of Fate Card ── */}
      <div className="cream-section">
        <div className="cream-card reveal">
          <div className="how-grid">
            <div className="how-text">
              <div className="card-eyebrow">The Selection</div>
              <h2 className="card-h2">THE WHEEL<br />OF FATE.</h2>
              <p className="card-p">
                The way this works is simple. Each year a group of 5 people called{" "}
                <strong>"The Worldbound Five"</strong> are selected randomly from a{" "}
                <strong>"Wheel of Fate"</strong>. After the selection is over, the 5 people get
                paired up and pack their bags, because they are going on the biggest vacation of
                their lives.
              </p>
              <div className="wheel-box">
                <div className="wheel-box-title">MARCH 1ST — LIVE DRAW</div>
                <p className="wheel-box-p">
                  The draw is broadcast worldwide. Fully audited. Every registered entry has an
                  equal chance. Five names. One spin. That's all it takes.
                </p>
              </div>
            </div>
            <div className="how-img-side">
              <img src={IMAGES.howItWorks} alt="The Journey" className="circle-img" />
            </div>
          </div>
          <div className="wm" style={{ bottom: "-12px", right: "24px" }}>FATE</div>
        </div>
      </div>

      {/* ── Steps ── */}
      <div className="steps-section">
        <div className="steps-inner">
          <div className="reveal" style={{ marginBottom: ".5rem" }}>
            <div className="page-eyebrow">Step by Step</div>
            <div style={{ fontFamily: "var(--display)", fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: ".04em", color: "#fff", lineHeight: 1 }}>
              FROM ENTRY TO ADVENTURE.
            </div>
          </div>
          <div className="steps-grid reveal d1">
            {STEPS.map(s => (
              <div key={s.n} className="step-card">
                <div className="step-num">{s.n}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Planning Your Trip ── */}
      <div className="cream-section" style={{ paddingTop: 0 }}>
        <div className="cream-card reveal">
          <div style={{ padding: "3.5rem" }}>
            <div className="card-eyebrow">The Planning Phase</div>
            <h2 className="card-h2">10 DAYS TO DECIDE.</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
              <div>
                <p className="card-p">
                  The travel plan is completely customizable by the group. The Worldbound Five
                  decide together — which countries, which cities, in what order. The only rule
                  is that they must reach a conclusion within <strong>10 days</strong> of being selected.
                </p>
                <p className="card-p">
                  After the travel plan is selected, a <strong>40-day window</strong> is required
                  by the company to get everything ready in order for the perfect experience —
                  and for the Worldbound Five to prepare themselves.
                </p>
              </div>
              <div>
                <p className="card-p">
                  Traveling Around The World provides access to <strong>every available country
                  in the world</strong>. This includes destinations like Paris, Rome, Dubai,
                  and so much more. A full list is available on the Destinations page.
                </p>
                <p className="card-p">
                  All accommodations around the trip are of course paid by us. However, they
                  come out of the total budget — so the group must be <strong>strategic</strong> in
                  choosing where they stay.
                </p>
              </div>
            </div>
          </div>
          <div className="wm" style={{ top: "20px", right: "30px" }}>PLAN</div>
        </div>
      </div>

      {/* ── Daily Challenges ── */}
      <div className="cream-section" style={{ paddingTop: 0 }}>
        <div className="reveal" style={{ maxWidth: "1100px", margin: "0 auto 2rem" }}>
          <div className="page-eyebrow">Every Single Day</div>
          <div style={{ fontFamily: "var(--display)", fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: ".04em", color: "#fff", lineHeight: 1 }}>
            THE DAILY CHALLENGE.
          </div>
        </div>
        <div className="challenges-card reveal d1">
          <div className="challenges-grid">
            <div className="challenge-half">
              <div className="ch-badge win">WIN</div>
              <div className="ch-title">EARN A REWARD</div>
              <p className="ch-text">
                Complete the daily challenge and the Worldbound Five earn a reward. This might be
                an <strong>extra destination</strong> added to their journey, a <strong>cash bonus</strong>{" "}
                injected directly into their budget, or something entirely <strong>of their choosing</strong>.
                Challenges completed build momentum — the more you win, the more the journey grows.
              </p>
            </div>
            <div className="challenge-half">
              <div className="ch-badge lose">LOSE</div>
              <div className="ch-title">FACE A FORFEIT</div>
              <p className="ch-text">
                Fail the challenge and there will be a forfeit. The exact nature of the forfeit
                is kept classified — all we can say is that it won't be fun. The group will be
                warned, but the consequences are real. Every day is a new opportunity, but every
                day also carries a risk.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Flexibility ── */}
      <div className="cream-section" style={{ paddingTop: 0 }}>
        <div className="cream-card reveal">
          <div style={{ padding: "3.5rem" }}>
            <div className="card-eyebrow">Destination Flexibility</div>
            <h2 className="card-h2">THE PLAN<br />CAN CHANGE.</h2>
            <p className="card-p" style={{ maxWidth: "700px" }}>
              Even after the journey has started, the travel plan remains flexible. The group can
              trade destinations — for example, sacrificing a trip to a city in Sweden for two
              trips in England (one in London, one in Manchester). Extra destinations can be won
              through daily challenges. The journey evolves as it goes.
            </p>
          </div>
          <div className="wm" style={{ bottom: "-12px", right: "24px" }}>FLEX</div>
        </div>
      </div>
    </>
  );
}

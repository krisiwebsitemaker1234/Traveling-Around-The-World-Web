import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../data.js";

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function smoothstep(min, max, v) {
  const x = clamp((v - min) / (max - min), 0, 1);
  return x * x * (3 - 2 * x);
}
function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
function easeInOutQuart(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}
function lerp(a, b, t) { return a + (b - a) * t; }

let _smoothProg = 0;

/*
  Each beat is a single wrapper: polaroid card + stat text move as one unit.
  px/py = resting offset (px) from viewport centre.
  statRight = stat appears to the right of the card (false = left).
*/
const BEATS = [
  {
    img:      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80",
    caption:  "rise and grind",
    statSub:  "Available to the Worldbound Five",
    statMain: ["195+", "COUNTRIES"],
    statRight: true,
    enter: 0.10, peak: 0.14, hold: 0.17, exit: 0.21,
    sx: -180, sy:  500, sr: -3,
    px: -180, py:   60, pr: -3,
    ex: -180, ey: -500, er: -3,
  },
  {
    img:      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80",
    caption:  "amazing",
    statSub:  "Total Group Budget",
    statMain: ["$1,000,000"],
    statRight: false,
    enter: 0.25, peak: 0.29, hold: 0.32, exit: 0.36,
    sx:  180, sy:  500, sr:  3,
    px:  180, py:  -60, pr:  3,
    ex:  180, ey: -500, er:  3,
  },
  {
    img:      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80",
    caption:  "paradise found",
    statSub:  "Selected Every Year",
    statMain: ["FIVE", "PEOPLE."],
    statRight: true,
    enter: 0.40, peak: 0.44, hold: 0.47, exit: 0.51,
    sx:     0, sy:  500, sr:  0,
    px:     0, py:   40, pr:  0,
    ex:     0, ey: -500, er:  0,
  },
];

const MISSION = [
  { n: "Est. 2019", l: "Year Founded"       },
  { n: "5",         l: "Winners Per Year"   },
  { n: "195+",      l: "Countries Available"},
  { n: "$1M",       l: "Total Budget"       },
  { n: "Free",      l: "To Enter"           },
];

const PREVIEWS = [
  { to: "/about",        label: "About",         title: "OUR STORY",    desc: "Founded in 2019 with a mission to send five lucky people to explore the world every year.",        img: IMAGES.prevAbout },
  { to: "/how-it-works", label: "The Process",   title: "HOW IT WORKS", desc: "Five people. One wheel. One year of adventure. Learn exactly how the Worldbound Five are chosen.", img: IMAGES.prevHow   },
  { to: "/destinations", label: "The World",     title: "DESTINATIONS", desc: "Every country on earth is available. Paris, Dubai, Tokyo — your journey is unlimited.",           img: IMAGES.prevDest  },
  { to: "/rules",        label: "Documentation", title: "THE RULES",    desc: "Budgets, challenges, luggage, and the full terms of the trip — everything you need to know.",      img: IMAGES.prevRules },
  { to: "/winners",      label: "History",       title: "PAST WINNERS", desc: "Six years of Worldbound Fives. Read their stories, see where they went.",                         img: IMAGES.prevWin   },
];

export default function Home() {
  const containerRef    = useRef(null);
  const bgRef           = useRef(null);
  const titleRef        = useRef(null);
  const beatRefs        = useRef([]);
  const indicatorRef    = useRef(null);
  const missionPanelRef = useRef(null);
  const previewPanelRef = useRef(null);
  const ctaPanelRef     = useRef(null);
  const rafRef          = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let targetProg = 0;

    const onScroll = () => {
      const rect  = container.getBoundingClientRect();
      const total = container.offsetHeight - window.innerHeight;
      targetProg  = clamp(-rect.top / total, 0, 1);
    };

    const tick = () => {
      _smoothProg = lerp(_smoothProg, targetProg, 0.07);
      const p = _smoothProg;

      /* 1 — Background parallax */
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(-${p * 4}vh) scale(1.06)`;
      }

      /* 2 — Title */
      if (titleRef.current) {
        let op, dy, sc;
        if (p < 0.04) {
          op = 1; dy = 0; sc = 1;
        } else if (p < 0.12) {
          const t = smoothstep(0.04, 0.12, p);
          op = lerp(1, 0.08, t);
          dy = lerp(0, -10, t);
          sc = lerp(1, 0.97, t);
        } else {
          op = 0.08; dy = -10; sc = 0.97;
        }
        titleRef.current.style.opacity   = op;
        titleRef.current.style.transform = `translateY(${dy}px) scale(${sc})`;
      }

      /* 3 — Beats: card + stat move as one unit */
      BEATS.forEach((b, i) => {
        const el = beatRefs.current[i];
        if (!el) return;
        let x, y, r, op, sc;

        /* Scale horizontal offsets so beats stay on-screen at any viewport width */
        const vwScale = Math.min(1, window.innerWidth / 960);
        const bpx = b.px * vwScale, bsx = b.sx * vwScale, bex = b.ex * vwScale;

        if (p <= b.enter) {
          op = 0; x = bsx; y = b.sy; r = b.sr; sc = 0.92;
        } else if (p <= b.peak) {
          const t = easeOutExpo(clamp((p - b.enter) / (b.peak - b.enter), 0, 1));
          op = t;
          x  = lerp(bsx, bpx, t);
          y  = lerp(b.sy, b.py, t);
          r  = lerp(b.sr, b.pr, t);
          sc = lerp(0.92, 1, t);
        } else if (p <= b.hold) {
          op = 1; x = bpx; y = b.py; r = b.pr; sc = 1;
        } else if (p <= b.exit) {
          const t = easeInOutQuart(clamp((p - b.hold) / (b.exit - b.hold), 0, 1));
          op = lerp(1, 0, t);
          x  = lerp(bpx, bex, t);
          y  = lerp(b.py, b.ey, t);
          r  = lerp(b.pr, b.er, t);
          sc = lerp(1, 0.95, t);
        } else {
          op = 0; x = bex; y = b.ey; r = b.er; sc = 0.95;
        }

        el.style.opacity   = op;
        el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${r}deg) scale(${sc})`;
      });

      /* 4 — Scroll indicator */
      if (indicatorRef.current) {
        indicatorRef.current.style.opacity = Math.max(0, 1 - p * 18);
      }

      /* 5 — Slide-up panels */
      const animPanel = (ref, enters, fullyIn, exits, fullyOut) => {
        if (!ref.current) return;
        let dy, op;
        if (p < enters) {
          dy = 100; op = 0;
        } else if (p < fullyIn) {
          const t = easeOutExpo(smoothstep(enters, fullyIn, p));
          dy = lerp(100, 0, t); op = t;
        } else if (exits === null || p < exits) {
          dy = 0; op = 1;
        } else if (p < fullyOut) {
          const t = easeInOutQuart(smoothstep(exits, fullyOut, p));
          dy = lerp(0, -100, t); op = lerp(1, 0, t);
        } else {
          dy = -100; op = 0;
        }
        ref.current.style.transform     = `translateY(${dy}%)`;
        ref.current.style.opacity       = op;
        ref.current.style.pointerEvents = op > 0.05 ? "auto" : "none";
      };

      animPanel(missionPanelRef, 0.60, 0.65, 0.70, 0.74);
      animPanel(previewPanelRef, 0.76, 0.81, 0.86, 0.90);
      animPanel(ctaPanelRef,     0.92, 0.97, null, null);

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="hero-scroll-container" ref={containerRef}>
      <div className="hero-sticky">

        {/* Background */}
        <div className="hero-bg" ref={bgRef} style={{ backgroundImage: `url('${IMAGES.heroBg}')` }} />
        <div className="hero-overlay" />

        {/* ── Beats: card + stat as one unit ── */}
        {BEATS.map((b, i) => (
          <div
            key={i}
            className="hero-beat"
            ref={el => { beatRefs.current[i] = el; }}
            style={{
              position: "absolute", top: "50%", left: "50%",
              flexDirection: b.statRight ? "row" : "row-reverse",
              opacity: 0, pointerEvents: "none",
              willChange: "transform, opacity",
            }}
          >
            {/* Polaroid */}
            <div className="beat-pol">
              <img src={b.img} alt="" className="beat-pol-img" />
              <div className="beat-pol-cap">{b.caption}</div>
            </div>

            {/* Stat */}
            <div className="beat-stat" style={{ textAlign: b.statRight ? "left" : "right" }}>
              <div className="beat-stat-sub">{b.statSub}</div>
              <div className="beat-stat-main">
                {b.statMain.map((line, j) => <div key={j}>{line}</div>)}
              </div>
            </div>
          </div>
        ))}

        {/* Main title */}
        <div className="hero-content" ref={titleRef}>
          <div className="hero-row1">
            <span className="hero-T">T</span>
            <span className="hero-raveling">RAVELING</span>
          </div>
          <div className="hero-row2">
            <div className="hero-around-wrap">
              <span className="hero-around">AROUND</span>
            </div>
          </div>
          <div className="hero-row3">
            <span className="hero-the-world">THE WORLD</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator" ref={indicatorRef}>
          <div className="scroll-indicator-line" />
          <div className="scroll-indicator-label">scroll</div>
        </div>

        {/* ── REVEAL A: Mission stats ── */}
        <div
          ref={missionPanelRef}
          className="reveal-full-panel"
          style={{ opacity: 0, transform: "translateY(100%)", pointerEvents: "none", zIndex: 8 }}
        >
          <div className="reveal-panel-inner">
            <div className="previews-eyebrow">The Worldbound Five</div>
            <div style={{ fontFamily: "var(--display)", fontSize: "clamp(3rem, 8vw, 6.5rem)", letterSpacing: ".06em", color: "#fff", lineHeight: .92 }}>BY THE<br />NUMBERS.</div>
            <div className="mission-strip">
              {MISSION.map((m, i) => (
                <div key={i} style={{ display: "contents" }}>
                  {i > 0 && <div className="ms-div" />}
                  <div className="ms-item">
                    <div className="ms-n">{m.n}</div>
                    <div className="ms-l">{m.l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── REVEAL B: Section previews ── */}
        <div
          ref={previewPanelRef}
          className="reveal-full-panel"
          style={{ opacity: 0, transform: "translateY(100%)", pointerEvents: "none", zIndex: 9 }}
        >
          <div className="reveal-panel-inner reveal-panel-inner--previews">
            <div className="previews-eyebrow">Explore the Site</div>
            <div style={{ fontFamily: "var(--display)", fontSize: "clamp(3rem, 8vw, 6.5rem)", letterSpacing: ".06em", color: "#fff", lineHeight: .92 }}>EVERYTHING<br />YOU NEED TO KNOW.</div>

            <div className="previews-grid-top">
              {PREVIEWS.slice(0, 3).map(pv => (
                <Link key={pv.to} to={pv.to} className="prev-card">
                  <img src={pv.img} alt={pv.title} />
                  <div className="prev-card-over" />
                  <div className="prev-card-body">
                    <div className="prev-card-eyebrow">{pv.label}</div>
                    <div className="prev-card-title">{pv.title}</div>
                    <div className="prev-card-desc">{pv.desc}</div>
                    <div className="prev-card-arrow">Explore</div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="previews-grid-bot">
              {PREVIEWS.slice(3).map(pv => (
                <Link key={pv.to} to={pv.to} className="prev-card">
                  <img src={pv.img} alt={pv.title} />
                  <div className="prev-card-over" />
                  <div className="prev-card-body">
                    <div className="prev-card-eyebrow">{pv.label}</div>
                    <div className="prev-card-title">{pv.title}</div>
                    <div className="prev-card-desc">{pv.desc}</div>
                    <div className="prev-card-arrow">Explore</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── REVEAL C: CTA ── */}
        <div
          ref={ctaPanelRef}
          className="reveal-full-panel"
          style={{ opacity: 0, transform: "translateY(100%)", pointerEvents: "none", zIndex: 10 }}
        >
          <div className="reveal-panel-inner">
            <div className="previews-eyebrow">The 2026 Draw</div>
            <div style={{ fontFamily: "var(--display)", fontSize: "clamp(3rem, 8vw, 6.5rem)", letterSpacing: ".06em", color: "#fff", lineHeight: .92 }}>
              YOUR NAME COULD BE <span style={{ color: "var(--purple)" }}>NEXT.</span>
            </div>
            <p style={{ fontSize: ".98rem", color: "rgba(255,255,255,.45)", lineHeight: 1.8, maxWidth: "480px", margin: "0" }}>
              Applications for the 2026 draw open January 1st. Free. Worldwide. Five spots. One wheel.
            </p>
            <Link to="/apply" className="previews-cta-btn" style={{ marginTop: ".8rem" }}>ENTER THE WHEEL OF FATE</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { LOGO } from "./src/data.js";

/* ── Replace with your actual Canva presentation URL ── */
const PRESENTATION_URL = "https://canva.link/e4qd1vatpopp005";
import Home        from "./src/pages/Home.jsx";
import About       from "./src/pages/About.jsx";
import HowItWorks  from "./src/pages/HowItWorks.jsx";
import Destinations from "./src/pages/Destinations.jsx";
import Rules       from "./src/pages/Rules.jsx";
import Winners     from "./src/pages/Winners.jsx";
import Apply       from "./src/pages/Apply.jsx";
import Compare     from "./src/pages/Compare.jsx";
import Contact     from "./src/pages/Contact.jsx";

/* ── Global Styles → src/app.css ─────────────────────────────────────────────── */


/* ── ScrollToTop ─────────────────────────────────────────────────────────────── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* ── ScrollRevealManager ─────────────────────────────────────────────────────── */
function ScrollRevealManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    /* Clear previous-page reveal state so navigation always starts fresh */
    document.querySelectorAll(".revealed").forEach(el => el.classList.remove("revealed"));

    const ob = new IntersectionObserver(
      entries => entries.forEach(e => {
        /* Toggle both ways: animate in when entering, animate out when leaving */
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
        } else {
          e.target.classList.remove("revealed");
        }
      }),
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    const tid = setTimeout(() => {
      document.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale")
        .forEach(el => ob.observe(el));
    }, 10);

    return () => { clearTimeout(tid); ob.disconnect(); };
  }, [pathname]);
  return null;
}

/* ── Nav ─────────────────────────────────────────────────────────────────────── */
function Nav() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) { setScrolled(true); return; }
    const h = () => setScrolled(window.scrollY > 60);
    h();
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, [isHome]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const links = [
    ["/about",        "About"],
    ["/how-it-works", "How It Works"],
    ["/destinations", "Destinations"],
    ["/rules",        "Documentation"],
    ["/winners",      "Past Winners"],
    ["/compare",      "Compare"],
    ["/contact",      "Contact"],
  ];

  return (
    <>
      <nav className={`nav${scrolled || menuOpen ? " solid" : ""}`}>
        <Link to="/" className="logo">
          <div className="logo-img-wrap">
            <img src={LOGO} alt="Traveling Around The World" className="logo-img" />
          </div>
        </Link>
        <div className="nav-links">
          {links.map(([to, label]) => (
            <Link key={to} to={to} className={`nav-link${pathname === to ? " active" : ""}`}>{label}</Link>
          ))}
          <a href={PRESENTATION_URL} target="_blank" rel="noreferrer" className="nav-pres">Presentation ↗</a>
        </div>
        <Link to="/apply" className="nav-cta">Apply 2026</Link>
        <button className={`hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <img src={LOGO} alt="TATW" className="mobile-menu-logo" />
        {links.map(([to, label]) => (
          <Link key={to} to={to} className={`mobile-menu-link${pathname === to ? " active" : ""}`}>{label}</Link>
        ))}
        <a href={PRESENTATION_URL} target="_blank" rel="noreferrer" className="mobile-menu-link">Presentation ↗</a>
        <Link to="/apply" className="mobile-menu-cta">Apply 2026</Link>
      </div>
    </>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────────────── */
function Footer() {
  const links = [
    ["/about",        "About"],
    ["/how-it-works", "How It Works"],
    ["/destinations", "Destinations"],
    ["/rules",        "Documentation"],
    ["/winners",      "Past Winners"],
    ["/apply",        "Apply"],
    ["/compare",      "Compare"],
    ["/contact",      "Contact"],
  ];
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={LOGO} alt="Traveling Around The World" style={{ height: "52px", width: "auto", borderRadius: "8px", background: "#fff", padding: "4px 10px", display: "block" }} />
      </div>
      <div className="footer-links">
        {links.map(([to, label]) => (
          <Link key={to} to={to} className="footer-link">{label}</Link>
        ))}
      </div>
      <div className="footer-copy">© 2026 Traveling Around The World</div>
    </footer>
  );
}

/* ── BackToTop ───────────────────────────────────────────────────────────────── */
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 420);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <button
      className={`btt${visible ? " visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      <span className="material-icons-round" style={{ fontSize: "18px", color: "#fff", lineHeight: 1 }}>keyboard_arrow_up</span>
    </button>
  );
}

/* ── Chatbot ─────────────────────────────────────────────────────────────────── */
const CHATBOT_SYSTEM = `You are the official assistant for "Traveling Around The World" (TATW) — a real annual program that sends 5 randomly selected people anywhere in the world, fully funded. You may ONLY answer questions about:
1. The TATW program (entry, rules, budget, challenges, timeline, past winners, etc.)
2. Travel destinations — recommendations, tips, what to see/do, comparisons, best times to visit

If asked about ANYTHING outside these two topics (coding, politics, math, celebrities, news, etc.), politely decline and steer back to travel or TATW.

--- ABOUT TATW ---
Founded: 2019. The five selected people are called "The Worldbound Five."
Entry: 100% free, open to anyone worldwide. Register between January 1–31 each year.
The Draw: Live "Wheel of Fate" broadcast on March 1st — five names drawn at random.
After selection: 10 days to agree on their travel route together, then TATW needs 40 days to arrange flights, accommodation, visas, and logistics.
Budget: $1,000,000 USD total for the group (accommodation, food, activities, personal expenses). Flights covered separately by TATW — not from the budget.
Crew: A dedicated security team and a professional film crew travel with them at all times. The journey is streamed live globally.
Daily Challenges: Every day, the group faces a challenge. WIN = reward (bonus destination, cash bonus, or their choice). FAIL = classified forfeit (unpleasant).
Luggage: One standard suitcase per person, approved essentials only.
Compensation: Winners are paid for being filmed/streamed, on top of the fully funded trip.
2026 applications: Open January 1st.

--- PAST WINNERS ---
2025 — Erik Svensson (Sweden), Aisha Diop (Senegal), Marco Ferrari (Italy), Sarah Kim (South Korea), Rafael Lima (Brazil). 38 countries, 6 continents, 214 days. Top destination: Antarctica. Budget: $887,440.
2024 — Mariana Costa (Portugal), Kwame Asante (Ghana), Chloe Beaumont (France), Takeshi Yamamoto (Japan), Valentina Cruz (Colombia). Southeast Asia & Oceania focus. 8.4M peak viewers. Top destination: New Zealand. Budget: $963,200.
2023 — Luna García (Spain), Mohammed Al-Rashid (Saudi Arabia), Zara Osei (Ghana), Liam Murphy (Ireland), Nadia Petrov (Russia). Won 7 daily challenges (record), 3 bonus destinations. Top destination: Maldives. Budget: $821,550.
2022 — Noah Williams (USA), Fatima Al-Hassan (Morocco), Andrei Popescu (Romania), Isabella Santos (Brazil), Hiroshi Nakamura (Japan). 12M peak concurrent viewers (all-time record). Top destination: Patagonia. Budget: $998,770.
2021 — Sofia Rossi (Italy), James Okafor (Nigeria), Mei Chen (China), Lucas Dubois (France), Priya Sharma (India). Zero forfeits, perfect record. Top destination: Kyoto. Budget: $754,900.
2020 — Carlos Mendes (Brazil), Yuki Tanaka (Japan), Amara Diallo (Senegal), Emma Lindqvist (Sweden), Reza Ahmadi (Iran). The pioneers — the very first Worldbound Five. Top destination: Machu Picchu. Budget: $691,300.

--- TONE ---
Warm, friendly, specific. Keep replies to 2–4 sentences unless more detail is needed. Mention specific landmarks, food, or experiences when discussing destinations. Never invent TATW facts not listed above.`;

async function callChatbot(message, history) {
  if (import.meta.env.DEV) {
    const res = await fetch("/api/groq/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 400,
        temperature: 0.7,
        messages: [
          { role: "system", content: CHATBOT_SYSTEM },
          ...history,
          { role: "user", content: message },
        ],
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error?.message || "API error");
    return data.choices[0].message.content;
  }

  const res = await fetch("/.netlify/functions/chatbot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "API error");
  return data.reply;
}

function Chatbot() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I'm the TATW assistant. Ask me anything about the program or travel destinations — I'm here to help." },
  ]);
  const [input,   setInput]   = useState("");
  const [typing,  setTyping]  = useState(false);
  const bottomRef             = useRef(null);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = async () => {
    const txt = input.trim();
    if (!txt || typing) return;
    setInput("");
    setMessages(m => [...m, { role: "user", text: txt }]);
    setTyping(true);

    // Build OpenAI-format history from current messages (skip opening greeting)
    const history = messages.slice(1).map(m => ({
      role: m.role === "bot" ? "assistant" : "user",
      content: m.text,
    }));

    try {
      const reply = await callChatbot(txt, history);
      setTyping(false);
      setMessages(m => [...m, { role: "bot", text: reply }]);
    } catch {
      setTyping(false);
      setMessages(m => [...m, { role: "bot", text: "I'm having trouble connecting right now. Please try again in a moment." }]);
    }
  };

  return (
    <>
      {open && (
        <div className="chat-panel">
          <div className="chat-header">
            <div className="chat-header-left">
              <div className="chat-status-dot" />
              <div>
                <div className="chat-header-name">TATW ASSISTANT</div>
                <div className="chat-header-sub">AI · Travel &amp; TATW questions</div>
              </div>
            </div>
            <button className="chat-close-btn" onClick={() => setOpen(false)} aria-label="Close chat">
              <span className="material-icons-round" style={{ fontSize: "18px", lineHeight: 1 }}>close</span>
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                <div className="chat-bubble">{m.text}</div>
              </div>
            ))}
            {typing && (
              <div className="chat-typing-row">
                <div className="chat-typing"><span /><span /><span /></div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chat-footer">
            <input
              className="chat-input"
              placeholder="Ask something..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") send(); }}
              autoFocus
            />
            <button className="chat-send-btn" onClick={send} aria-label="Send">
              <span className="material-icons-round" style={{ fontSize: "16px", color: "#fff", lineHeight: 1 }}>send</span>
            </button>
          </div>
        </div>
      )}

      <button className="chat-toggle" onClick={() => setOpen(o => !o)} aria-label="Toggle chat">
        {open
          ? <span className="material-icons-round" style={{ fontSize: "22px", color: "#fff", lineHeight: 1 }}>close</span>
          : <img src={LOGO} alt="TATW" style={{ height:"28px", width:"auto", display:"block" }} />
        }
      </button>
    </>
  );
}

/* ── App ─────────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollRevealManager />
      <Nav />
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/about"       element={<About />} />
        <Route path="/how-it-works"element={<HowItWorks />} />
        <Route path="/destinations"element={<Destinations />} />
        <Route path="/rules"       element={<Rules />} />
        <Route path="/winners"     element={<Winners />} />
        <Route path="/apply"       element={<Apply />} />
        <Route path="/compare"     element={<Compare />} />
        <Route path="/contact"     element={<Contact />} />
      </Routes>
      <Footer />
      <BackToTop />
      <Chatbot />
    </BrowserRouter>
  );
}

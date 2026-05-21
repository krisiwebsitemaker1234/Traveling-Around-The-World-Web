import { useState, useEffect } from "react";
import { LOGO } from "../data.js";

/* ── AI Prompt ──────────────────────────────────────────────────────────────── */
const makePrompt = (d1, d2) =>
  `You are a friendly, knowledgeable travel expert. Compare "${d1}" and "${d2}".

IMPORTANT: Respond with ONLY a raw JSON object. No markdown, no code fences, no text before or after the JSON. Use only plain ASCII characters inside all string values.

Use exactly this structure:
{
  "dest1": "full official name of destination 1",
  "dest2": "full official name of destination 2",
  "shared": ["One warm sentence about a quality both destinations share", "...", "...", "...", "..."],
  "unique1": ["One specific sentence about something only dest1 offers", "...", "...", "..."],
  "unique2": ["One specific sentence about something only dest2 offers", "...", "...", "..."],
  "pros1": ["A specific compelling reason to visit dest1 — mention a landmark or experience", "...", "...", "..."],
  "cons1": ["An honest drawback of dest1", "...", "..."],
  "pros2": ["A specific compelling reason to visit dest2 — mention a landmark or experience", "...", "...", "..."],
  "cons2": ["An honest drawback of dest2", "...", "..."],
  "verdict": "2-3 warm, specific sentences on which destination suits most travellers better and why — mention specific landmarks, food, or experiences."
}

Write like a knowledgeable friend giving travel advice — warm, specific, and honest. Avoid vague phrases like 'rich cultural heritage'; instead say things like 'the Colosseum', 'street ramen stalls', or 'the Inca Trail'. Each item must be one clear, punchy sentence.`;

/* ── API call ───────────────────────────────────────────────────────────────── */
async function fetchComparison(dest1, dest2) {
  if (!import.meta.env.DEV) {
    const res = await fetch("/.netlify/functions/compare", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dest1, dest2 }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || `API error ${res.status}`);
    }
    return res.json();
  }

  const res = await fetch("/api/groq/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1600,
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: makePrompt(dest1, dest2) }],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${res.status}`);
  }

  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}

/* ── Destination image lookup ───────────────────────────────────────────────── */
const DEST_IMG = {
  "tokyo":          "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&q=80",
  "paris":          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=80",
  "bali":           "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=80",
  "santorini":      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=900&q=80",
  "machu picchu":   "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=900&q=80",
  "cape town":      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=900&q=80",
  "kyoto":          "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=900&q=80",
  "new york":       "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=900&q=80",
  "dubai":          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80",
  "rome":           "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=900&q=80",
  "reykjavik":      "https://images.unsplash.com/photo-1474690455603-a369ec1293a4?w=900&q=80",
  "reykjavík":      "https://images.unsplash.com/photo-1474690455603-a369ec1293a4?w=900&q=80",
  "iceland":        "https://images.unsplash.com/photo-1474690455603-a369ec1293a4?w=900&q=80",
  "marrakech":      "https://images.unsplash.com/photo-1548018560-c7196548f839?w=900&q=80",
  "morocco":        "https://images.unsplash.com/photo-1548018560-c7196548f839?w=900&q=80",
  "antarctica":     "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80",
  "new zealand":    "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=900&q=80",
  "maldives":       "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80",
  "venice":         "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=900&q=80",
  "italy":          "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=900&q=80",
  "japan":          "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=900&q=80",
  "greece":         "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=900&q=80",
  "peru":           "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=900&q=80",
  "indonesia":      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=80",
  "france":         "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=80",
};

const FALLBACK_IMG = "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=900&q=80";

function getDestImage(name) {
  if (!name) return FALLBACK_IMG;
  const norm = name.toLowerCase().replace(/,.*/,"").trim();
  for (const [k, url] of Object.entries(DEST_IMG)) {
    if (norm === k || norm.includes(k) || k.includes(norm)) return url;
  }
  return FALLBACK_IMG;
}

/* Fetch the Wikipedia main photo for any destination.
   Uses the action=query API with origin=* — the correct CORS-safe endpoint. */
async function fetchDestImage(destName) {
  // Title-case the city name (strip country suffix, capitalise words)
  const title = destName
    .split(",")[0].trim()
    .replace(/\b\w/g, c => c.toUpperCase());

  const query = async (t) => {
    const url =
      `https://en.wikipedia.org/w/api.php?action=query` +
      `&titles=${encodeURIComponent(t)}` +
      `&prop=pageimages&pithumbsize=900` +
      `&format=json&origin=*`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const pages = data?.query?.pages ?? {};
    const page  = Object.values(pages)[0];
    return page?.thumbnail?.source ?? null;
  };

  try {
    return await query(title);
  } catch {
    return null;
  }
}

/* ── PDF download ───────────────────────────────────────────────────────────── */
function downloadPDF(result, logoUrl, img1, img2) {
  const absLogo = logoUrl
    ? (logoUrl.startsWith("http") ? logoUrl : `${window.location.origin}${logoUrl}`)
    : null;

  const dotItem = (text, color) =>
    `<div style="display:flex;align-items:flex-start;gap:9px;margin-bottom:8px;">
      <span style="width:7px;height:7px;min-width:7px;border-radius:50%;background:${color};margin-top:4px;"></span>
      <span style="font-size:10pt;color:#2a1a08;line-height:1.65;">${text}</span>
    </div>`;

  const colItem = (text) =>
    `<div style="font-size:9.5pt;color:#2a1a08;padding:5px 0 5px 12px;border-bottom:1px solid rgba(0,0,0,.07);line-height:1.55;position:relative;">
      <span style="position:absolute;left:0;top:5px;color:#aaa;">·</span>${text}
    </div>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${result.dest1} vs ${result.dest2}</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0;}
    @page{margin:1.8cm 2.2cm;size:A4 portrait;}
    body{font-family:Georgia,'Times New Roman',serif;color:#1a1208;background:#fff;font-size:11pt;line-height:1.6;}
    h2{font-family:Arial,sans-serif;font-size:12pt;letter-spacing:.06em;text-transform:uppercase;color:#1a1208;margin:0 0 10pt;padding-bottom:6pt;border-bottom:2pt solid #7b5ea7;}
    .section{margin-bottom:20pt;page-break-inside:avoid;}
    .header{display:flex;align-items:center;justify-content:space-between;padding-bottom:14pt;margin-bottom:18pt;border-bottom:1pt solid #ddd;}
    .header-logo{height:38pt;width:auto;background:#fff;padding:3pt 7pt;border-radius:5pt;display:block;}
    .names{display:flex;align-items:center;gap:14pt;}
    .dname{font-family:Arial,sans-serif;font-size:20pt;letter-spacing:.03em;font-weight:bold;}
    .dname.d1{color:#7b5ea7;}.dname.d2{color:#c9a86c;}
    .vs{font-family:Arial,sans-serif;font-size:12pt;color:#ccc;}
    .date-label{font-family:Arial,sans-serif;font-size:7pt;color:#bbb;text-align:right;}
    .img-pair{display:grid;grid-template-columns:1fr 1fr;gap:8pt;margin-bottom:16pt;}
    .img-pair img{width:100%;height:100pt;object-fit:cover;border-radius:5pt;display:block;}
    .img-pair .cap{font-family:Arial,sans-serif;font-size:7pt;letter-spacing:.1em;text-transform:uppercase;font-weight:bold;padding:3pt 0 0;}
    .img-pair .cap.d1{color:#7b5ea7;}.img-pair .cap.d2{color:#c9a86c;}
    .three{display:grid;grid-template-columns:1fr 1fr 1fr;gap:9pt;}
    .col{border-radius:5pt;padding:10pt 11pt;}
    .col.d1{background:#f1ecfa;border-left:3pt solid #7b5ea7;}
    .col.mid{background:#f6f4f0;border-left:3pt solid #bbb;}
    .col.d2{background:#fdf6e8;border-left:3pt solid #c9a86c;}
    .col-lbl{font-family:Arial,sans-serif;font-size:6.5pt;letter-spacing:.22em;text-transform:uppercase;font-weight:bold;margin-bottom:8pt;}
    .col-lbl.d1{color:#7b5ea7;}.col-lbl.mid{color:#888;}.col-lbl.d2{color:#c9a86c;}
    .two{display:grid;grid-template-columns:1fr 1fr;gap:10pt;}
    .pc{border-radius:5pt;padding:12pt;}
    .pc.d1{background:#f1ecfa;}.pc.d2{background:#fdf6e8;}
    .pc-name{font-family:Arial,sans-serif;font-size:11pt;font-weight:bold;margin-bottom:10pt;}
    .pc-name.d1{color:#7b5ea7;}.pc-name.d2{color:#c9a86c;}
    .sec-lbl{font-family:Arial,sans-serif;font-size:6.5pt;letter-spacing:.2em;text-transform:uppercase;font-weight:bold;margin:8pt 0 5pt;}
    .sec-lbl.pro{color:#27ae60;}.sec-lbl.con{color:#c0392b;}
    .vbox{background:#f1ecfa;border:1.5pt solid #7b5ea7;border-radius:6pt;padding:14pt 16pt;}
    .vbox-lbl{font-family:Arial,sans-serif;font-size:7pt;letter-spacing:.22em;text-transform:uppercase;color:#7b5ea7;font-weight:bold;margin-bottom:8pt;}
    .vbox-txt{font-size:10.5pt;color:#2a1a08;line-height:1.85;font-style:italic;}
    .footer{margin-top:18pt;text-align:center;font-family:Arial,sans-serif;font-size:7.5pt;color:#bbb;padding-top:10pt;border-top:1pt solid #eee;}
    /* Hide raw page behind print dialog — only content rendered to paper matters */
    @media screen {
      html,body{background:#0d0a07!important;margin:0;}
      body>*{opacity:0!important;pointer-events:none;}
      body::before{
        content:'Opening print dialog…';
        position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
        font-family:Arial,sans-serif;font-size:12px;letter-spacing:.18em;
        text-transform:uppercase;color:rgba(255,255,255,.28);
        opacity:1!important;
      }
    }
  </style>
  <script>
    window.onload = function() {
      window.focus();
      window.print();
      // Close on both afterprint event and matchMedia change (cross-browser)
      window.addEventListener('afterprint', function() { window.close(); });
      var mq = window.matchMedia('print');
      if (mq.addEventListener) {
        mq.addEventListener('change', function(e) { if (!e.matches) setTimeout(window.close, 120); });
      }
    };
  <\/script>
</head>
<body>
  <div class="header">
    ${absLogo ? `<img src="${absLogo}" class="header-logo" alt="Logo" />` : ""}
    <div class="names">
      <div class="dname d1">${result.dest1}</div>
      <div class="vs">vs</div>
      <div class="dname d2">${result.dest2}</div>
    </div>
    <div class="date-label">Destination Compare<br/>${new Date().toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" })}</div>
  </div>

  ${(img1 || img2) ? `<div class="img-pair">
    <div>${img1 ? `<img src="${img1}" alt="${result.dest1}" />` : ""}<div class="cap d1">${result.dest1}</div></div>
    <div>${img2 ? `<img src="${img2}" alt="${result.dest2}" />` : ""}<div class="cap d2">${result.dest2}</div></div>
  </div>` : ""}

  <div class="section">
    <h2>Similarities &amp; Differences</h2>
    <div class="three">
      <div class="col d1">
        <div class="col-lbl d1">Only ${result.dest1}</div>
        ${result.unique1.map(colItem).join("")}
      </div>
      <div class="col mid">
        <div class="col-lbl mid">Both Have</div>
        ${result.shared.map(colItem).join("")}
      </div>
      <div class="col d2">
        <div class="col-lbl d2">Only ${result.dest2}</div>
        ${result.unique2.map(colItem).join("")}
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Pros &amp; Cons</h2>
    <div class="two">
      <div class="pc d1">
        <div class="pc-name d1">${result.dest1}</div>
        <div class="sec-lbl pro">Pros</div>
        ${result.pros1.map(p => dotItem(p, "#27ae60")).join("")}
        <div class="sec-lbl con">Cons</div>
        ${result.cons1.map(c => dotItem(c, "#c0392b")).join("")}
      </div>
      <div class="pc d2">
        <div class="pc-name d2">${result.dest2}</div>
        <div class="sec-lbl pro">Pros</div>
        ${result.pros2.map(p => dotItem(p, "#27ae60")).join("")}
        <div class="sec-lbl con">Cons</div>
        ${result.cons2.map(c => dotItem(c, "#c0392b")).join("")}
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Verdict</h2>
    <div class="vbox">
      <div class="vbox-lbl">AI Travel Expert</div>
      <div class="vbox-txt">"${result.verdict}"</div>
    </div>
  </div>

  <div class="footer">Destination Compare Report</div>
</body>
</html>`;

  const win = window.open("", "_blank");
  if (!win) { alert("Please allow popups to download the PDF."); return; }
  win.document.write(html);
  win.document.close();
}

/* ── Styles ─────────────────────────────────────────────────────────────────── */
const S = `
  .cmp { background: var(--dark); min-height: 100vh; padding: 9rem 3.5rem 6rem; }
  .cmp-inner { max-width: 1100px; margin: 0 auto; }

  .cmp-h { font-family: var(--display); font-size: clamp(3rem,7vw,7rem); letter-spacing:.04em; color:#fff; line-height:.92; margin-bottom:1.2rem; }
  .cmp-sub { font-size:.95rem; color:rgba(255,255,255,.38); max-width:520px; line-height:1.8; margin-bottom:3.5rem; }

  .cmp-row { display:grid; grid-template-columns:1fr auto 1fr; gap:1.2rem; align-items:end; margin-bottom:1.2rem; }
  .cmp-vs-label { font-family:var(--display); font-size:3rem; letter-spacing:.1em; color:rgba(255,255,255,.1); text-align:center; line-height:1; padding-bottom:.6rem; }
  .cmp-group { display:flex; flex-direction:column; gap:.5rem; }
  .cmp-lbl { font-size:.6rem; font-weight:700; letter-spacing:.22em; text-transform:uppercase; color:rgba(255,255,255,.28); }
  .cmp-input {
    background:rgba(255,255,255,.04); border:1.5px solid rgba(123,94,167,.28);
    border-radius:8px; padding:1rem 1.3rem; font-size:1.05rem;
    font-family:var(--sans); color:#fff; outline:none;
    transition:border-color .3s, background .3s; width:100%;
  }
  .cmp-input:focus { border-color:var(--purple); background:rgba(123,94,167,.06); }
  .cmp-input::placeholder { color:rgba(255,255,255,.16); }
  .cmp-btn {
    font-family:var(--display); font-size:1.1rem; letter-spacing:.1em;
    background:var(--purple); color:#fff; border:none;
    padding:1rem 3.2rem; border-radius:6px; cursor:pointer; transition:all .3s;
  }
  .cmp-btn:hover:not(:disabled) { background:var(--purple2); transform:translateY(-2px); box-shadow:0 8px 28px rgba(123,94,167,.45); }
  .cmp-btn:disabled { opacity:.35; cursor:not-allowed; }
  .cmp-error { background:rgba(231,76,60,.1); border:1px solid rgba(231,76,60,.28); border-radius:8px; padding:.9rem 1.3rem; color:#e74c3c; font-size:.85rem; margin-bottom:1.5rem; }

  /* loading */
  .cmp-loading { text-align:center; padding:6rem 0; }
  .cmp-dots { display:flex; gap:.55rem; justify-content:center; margin-bottom:1.4rem; }
  .cmp-dots span { width:10px; height:10px; border-radius:50%; background:var(--purple); animation:cmpDot .9s ease-in-out infinite; }
  .cmp-dots span:nth-child(2) { animation-delay:.15s; }
  .cmp-dots span:nth-child(3) { animation-delay:.3s; }
  @keyframes cmpDot { 0%,100%{transform:scale(.45);opacity:.25} 50%{transform:scale(1);opacity:1} }
  .cmp-loading-txt { font-size:.7rem; letter-spacing:.24em; text-transform:uppercase; color:rgba(255,255,255,.22); }

  /* confirm */
  .cmp-confirm { text-align:center; padding:4rem 0; }
  .cmp-confirm-pair { display:flex; align-items:center; justify-content:center; gap:2.5rem; margin:2.2rem 0 1.5rem; flex-wrap:wrap; }
  .cmp-confirm-name { font-family:var(--display); font-size:clamp(2rem,4vw,3.8rem); letter-spacing:.05em; }
  .cmp-confirm-vs { font-family:var(--display); font-size:1.6rem; color:rgba(255,255,255,.18); }
  .cmp-confirm-hint { font-size:.88rem; color:rgba(255,255,255,.35); margin-bottom:2rem; }
  .cmp-confirm-btns { display:flex; gap:1rem; justify-content:center; }
  .cmp-yes { font-family:var(--display); font-size:1rem; letter-spacing:.1em; background:var(--purple); color:#fff; border:none; padding:.8rem 2.8rem; border-radius:5px; cursor:pointer; transition:all .3s; }
  .cmp-yes:hover { background:var(--purple2); transform:translateY(-2px); }
  .cmp-no { font-family:var(--display); font-size:1rem; letter-spacing:.1em; background:transparent; color:rgba(255,255,255,.35); border:1px solid rgba(255,255,255,.12); padding:.8rem 2.4rem; border-radius:5px; cursor:pointer; transition:all .3s; }
  .cmp-no:hover { color:#fff; border-color:rgba(255,255,255,.35); }

  /* ── image shimmer ── */
  @keyframes cmp-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
  .cmp-dest-card-loading {
    background:linear-gradient(90deg,rgba(255,255,255,.04) 25%,rgba(255,255,255,.09) 50%,rgba(255,255,255,.04) 75%);
    background-size:200% 100%;
    animation:cmp-shimmer 1.4s ease-in-out infinite;
  }
  .cmp-dest-card-loading .cmp-dest-over { display:none; }

  /* ── destination hero cards ── */
  .cmp-dest-cards {
    display:grid; grid-template-columns:1fr auto 1fr;
    gap:1.4rem; align-items:center; margin-bottom:3rem;
  }
  .cmp-dest-card {
    position:relative; border-radius:14px; overflow:hidden; height:260px; display:block;
  }
  .cmp-dest-card img {
    width:100%; height:100%; object-fit:cover; display:block;
    transition:transform .5s ease;
  }
  .cmp-dest-card:hover img { transform:scale(1.04); }
  .cmp-dest-over {
    position:absolute; inset:0;
    background:linear-gradient(180deg, rgba(0,0,0,.08) 0%, rgba(0,0,0,.78) 100%);
  }
  .cmp-dest-card.d1 .cmp-dest-over {
    background:linear-gradient(160deg, rgba(123,94,167,.18) 0%, rgba(50,30,80,.82) 100%);
  }
  .cmp-dest-card.d2 .cmp-dest-over {
    background:linear-gradient(160deg, rgba(201,168,108,.12) 0%, rgba(80,55,20,.82) 100%);
  }
  .cmp-dest-name-over {
    position:absolute; bottom:0; left:0; right:0; padding:1.4rem 1.6rem;
  }
  .cmp-dest-label {
    font-size:.58rem; font-weight:700; letter-spacing:.22em; text-transform:uppercase;
    color:rgba(255,255,255,.45); margin-bottom:.4rem;
  }
  .cmp-dest-title {
    font-family:var(--display); font-size:clamp(1.6rem,3vw,2.4rem);
    letter-spacing:.05em; color:#fff; line-height:1;
  }
  .cmp-dest-vs {
    display:flex; align-items:center; justify-content:center;
    font-family:var(--display); font-size:2.2rem; letter-spacing:.12em;
    color:rgba(255,255,255,.1); white-space:nowrap;
  }

  /* ── section header ── */
  .cmp-section-head { margin-bottom:1.6rem; }
  .cmp-section-eyebrow {
    font-size:.6rem; font-weight:700; letter-spacing:.22em; text-transform:uppercase;
    color:var(--purple); display:block; margin-bottom:.5rem;
  }
  .cmp-section-title {
    font-family:var(--display); font-size:clamp(1.4rem,3vw,2rem);
    letter-spacing:.04em; color:#fff; line-height:1;
  }

  /* ── venn decorative circles ── */
  .cmp-venn-decor {
    display:flex; align-items:center; justify-content:center;
    margin:0 0 2rem; gap:0;
  }
  .cmp-venn-ring {
    width:64px; height:64px; border-radius:50%;
  }
  .cmp-venn-ring.v1 {
    background:rgba(123,94,167,.22);
    border:2px solid rgba(123,94,167,.55);
    margin-right:-26px; z-index:1; position:relative;
  }
  .cmp-venn-ring.v2 {
    background:rgba(201,168,108,.18);
    border:2px solid rgba(201,168,108,.5);
  }

  /* ── traits grid ── */
  .cmp-traits-grid {
    display:grid; grid-template-columns:1fr 1fr 1fr;
    border:1px solid rgba(255,255,255,.07);
    border-radius:14px; overflow:hidden; margin-bottom:2.5rem;
  }
  .cmp-trait-col { padding:1.6rem 1.4rem; }
  .cmp-trait-col.d1 {
    background:rgba(123,94,167,.1);
    border-right:1px solid rgba(255,255,255,.06);
  }
  .cmp-trait-col.mid {
    background:rgba(255,255,255,.03);
    border-right:1px solid rgba(255,255,255,.06);
  }
  .cmp-trait-col.d2 { background:rgba(201,168,108,.07); }
  .cmp-trait-col-title {
    font-size:.58rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase;
    margin-bottom:1.1rem; display:block;
  }
  .cmp-trait-col-title.v1 { color:rgba(123,94,167,.95); }
  .cmp-trait-col-title.vx { color:rgba(255,255,255,.3); }
  .cmp-trait-col-title.v2 { color:rgba(201,168,108,.95); }
  .cmp-trait-item {
    display:flex; align-items:flex-start; gap:.6rem;
    font-size:.84rem; color:rgba(255,255,255,.65); line-height:1.62;
    margin-bottom:.75rem;
  }
  .cmp-trait-item:last-child { margin-bottom:0; }
  .cmp-trait-bullet {
    width:5px; height:5px; border-radius:50%;
    margin-top:.55rem; flex-shrink:0;
  }
  .cmp-trait-bullet.v1 { background:rgba(123,94,167,.8); }
  .cmp-trait-bullet.vx { background:rgba(255,255,255,.25); }
  .cmp-trait-bullet.v2 { background:rgba(201,168,108,.8); }

  /* ── pros / cons ── */
  .cmp-pc-grid { display:grid; grid-template-columns:1fr 1fr; gap:1.2rem; margin-bottom:2.5rem; }
  .cmp-pc-card {
    background:rgba(255,255,255,.03);
    border-radius:14px; overflow:hidden;
    display:flex; flex-direction:column;
  }
  .cmp-pc-card.d1 { border:1px solid rgba(123,94,167,.35); }
  .cmp-pc-card.d2 { border:1px solid rgba(201,168,108,.3); }
  .cmp-pc-head {
    padding:1.2rem 1.6rem;
    border-bottom:1px solid rgba(255,255,255,.06);
    display:flex; align-items:center; gap:.8rem;
  }
  .cmp-pc-stripe { width:4px; height:2.2rem; border-radius:2px; flex-shrink:0; }
  .cmp-pc-dest { font-family:var(--display); font-size:1.6rem; letter-spacing:.05em; line-height:1; }
  .cmp-pc-body { padding:1.4rem 1.6rem; display:flex; flex-direction:column; gap:1.4rem; flex:1; }
  .cmp-pc-section { display:flex; flex-direction:column; gap:.5rem; }
  .cmp-pc-sec-title {
    font-size:.58rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase;
    margin-bottom:.2rem; display:block;
  }
  .cmp-pc-sec-title.pro { color:#2ecc71; }
  .cmp-pc-sec-title.con { color:#e74c3c; }
  .cmp-pc-item {
    display:flex; align-items:flex-start; gap:.55rem;
    font-size:.85rem; color:rgba(255,255,255,.6); line-height:1.65;
  }
  .cmp-pc-dot { width:6px; height:6px; border-radius:50%; margin-top:.46rem; flex-shrink:0; }
  .cmp-pc-dot.pro { background:#2ecc71; }
  .cmp-pc-dot.con { background:#e74c3c; }

  /* ── verdict ── */
  .cmp-verdict {
    background:var(--cream); color:var(--ink);
    border:2px solid var(--purple); border-radius:14px;
    padding:2.4rem 2.8rem; margin-bottom:2.5rem;
    position:relative; overflow:hidden;
  }
  .cmp-verdict-eye { font-size:.62rem; font-weight:700; letter-spacing:.22em; text-transform:uppercase; color:var(--purple); margin-bottom:.8rem; }
  .cmp-verdict-txt { font-size:.97rem; color:var(--muted); line-height:1.9; font-style:italic; }
  .cmp-verdict-wm { position:absolute; font-family:var(--display); font-size:9rem; color:var(--purple); opacity:.05; right:-12px; bottom:-12px; pointer-events:none; line-height:1; }

  /* ── action row ── */
  .cmp-actions {
    display:flex; align-items:center; gap:1rem; flex-wrap:wrap;
  }
  .cmp-pdf-btn {
    display:inline-flex; align-items:center; gap:.55rem;
    font-family:var(--display); font-size:.9rem; letter-spacing:.1em;
    background:transparent; color:rgba(255,255,255,.7);
    border:1px solid rgba(255,255,255,.18); padding:.65rem 1.8rem;
    border-radius:5px; cursor:pointer; transition:all .3s;
  }
  .cmp-pdf-btn:hover { color:#fff; border-color:rgba(255,255,255,.45); background:rgba(255,255,255,.05); }
  .cmp-pdf-btn svg { flex-shrink:0; }
  .cmp-again {
    font-family:var(--display); font-size:.9rem; letter-spacing:.12em;
    color:rgba(255,255,255,.28); background:transparent;
    border:1px solid rgba(255,255,255,.1); padding:.65rem 2rem;
    border-radius:5px; cursor:pointer; transition:all .3s;
  }
  .cmp-again:hover { color:#fff; border-color:rgba(255,255,255,.3); }

  /* ── divider ── */
  .cmp-divider { border:none; border-top:1px solid rgba(123,94,167,.14); margin:2.5rem 0; }

  /* ── result header ── */
  .cmp-result-head { text-align:center; margin-bottom:2.5rem; }
  .cmp-result-eyebrow { font-size:.62rem; font-weight:700; letter-spacing:.22em; text-transform:uppercase; color:var(--purple); margin-bottom:.8rem; }
  .cmp-result-title { font-family:var(--display); font-size:clamp(2.2rem,4vw,3.8rem); letter-spacing:.04em; color:#fff; line-height:1; }

  @media (max-width:900px) {
    .cmp { padding:8rem 1.8rem 5rem; }
    .cmp-row { grid-template-columns:1fr; }
    .cmp-vs-label { display:none; }
    .cmp-dest-cards { grid-template-columns:1fr; }
    .cmp-dest-vs { display:none; }
    .cmp-traits-grid { grid-template-columns:1fr; }
    .cmp-trait-col.d1, .cmp-trait-col.mid { border-right:none; border-bottom:1px solid rgba(255,255,255,.06); }
    .cmp-pc-grid { grid-template-columns:1fr; }
    .cmp-verdict { padding:1.8rem 1.6rem; }
  }
  @media (max-width:600px) {
    .cmp-dest-card { height:200px; }
  }
`;

/* ── Component ──────────────────────────────────────────────────────────────── */
export default function Compare() {
  const [phase,  setPhase]  = useState("input");
  const [dest1,  setDest1]  = useState("");
  const [dest2,  setDest2]  = useState("");
  const [result, setResult] = useState(null);
  const [error,  setError]  = useState("");
  const [images, setImages] = useState({ img1: null, img2: null });

  // Fetch Wikipedia images whenever we enter results view
  useEffect(() => {
    if (phase !== "results" || !result) return;
    setImages({ img1: null, img2: null });
    Promise.all([
      fetchDestImage(result.dest1),
      fetchDestImage(result.dest2),
    ]).then(([img1, img2]) => {
      setImages({
        img1: img1 || getDestImage(result.dest1),
        img2: img2 || getDestImage(result.dest2),
      });
    });
  }, [phase, result]);

  const canCompare = dest1.trim() && dest2.trim();

  async function compare() {
    if (!canCompare) return;
    setError("");
    setPhase("loading");
    try {
      const data = await fetchComparison(dest1.trim(), dest2.trim());
      setResult(data);
      setPhase("confirm");
    } catch (e) {
      setError(e.message);
      setPhase("input");
    }
  }

  function reset() {
    setPhase("input");
    setResult(null);
    setError("");
    setDest1("");
    setDest2("");
    setImages({ img1: null, img2: null });
  }

  const shortName = str => str.split(",")[0];

  return (
    <>
      <style>{S}</style>
      <div className="cmp">
        <div className="cmp-inner">

          {/* ── Page Header ── */}
          <div className="page-eyebrow">The Tool</div>
          <h1 className="cmp-h">DESTINATION<br/>COMPARE</h1>
          <p className="cmp-sub">
            Enter two destinations. The AI breaks down what they share, what sets them apart,
            the pros and cons of each — and delivers a verdict.
          </p>

          {/* ── INPUT ── */}
          {phase === "input" && (
            <>
              {error && <div className="cmp-error">{error}</div>}
              <div className="cmp-row">
                <div className="cmp-group">
                  <span className="cmp-lbl">Destination 1</span>
                  <input
                    className="cmp-input"
                    placeholder="e.g. Tokyo"
                    value={dest1}
                    onChange={e => setDest1(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && compare()}
                  />
                </div>
                <div className="cmp-vs-label">VS</div>
                <div className="cmp-group">
                  <span className="cmp-lbl">Destination 2</span>
                  <input
                    className="cmp-input"
                    placeholder="e.g. Paris"
                    value={dest2}
                    onChange={e => setDest2(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && compare()}
                  />
                </div>
              </div>
              <button className="cmp-btn" disabled={!canCompare} onClick={compare}>
                Compare Now
              </button>
            </>
          )}

          {/* ── LOADING ── */}
          {phase === "loading" && (
            <div className="cmp-loading">
              <div className="cmp-dots"><span/><span/><span/></div>
              <div className="cmp-loading-txt">Analysing destinations…</div>
            </div>
          )}

          {/* ── CONFIRM ── */}
          {phase === "confirm" && result && (
            <div className="cmp-confirm">
              <div className="page-eyebrow">Confirm your destinations</div>
              <div className="cmp-confirm-pair">
                <div className="cmp-confirm-name" style={{ color: "var(--purple)" }}>{result.dest1}</div>
                <div className="cmp-confirm-vs">VS</div>
                <div className="cmp-confirm-name" style={{ color: "#c9a86c" }}>{result.dest2}</div>
              </div>
              <p className="cmp-confirm-hint">Is this what you meant?</p>
              <div className="cmp-confirm-btns">
                <button className="cmp-yes" onClick={() => setPhase("results")}>Yes — show comparison</button>
                <button className="cmp-no"  onClick={reset}>No — start over</button>
              </div>
            </div>
          )}

          {/* ── RESULTS ── */}
          {phase === "results" && result && (
            <>
              {/* Header */}
              <div className="cmp-result-head">
                <div className="cmp-result-eyebrow">Head-to-head</div>
                <div className="cmp-result-title">
                  <span style={{ color: "var(--purple)" }}>{result.dest1}</span>
                  <span style={{ color: "rgba(255,255,255,.18)", margin: "0 .5em" }}>vs</span>
                  <span style={{ color: "#c9a86c" }}>{result.dest2}</span>
                </div>
              </div>

              {/* Destination image cards */}
              <div className="cmp-dest-cards">
                <div className={`cmp-dest-card d1${!images.img1 ? " cmp-dest-card-loading" : ""}`}>
                  {images.img1 && (
                    <img
                      src={images.img1}
                      alt={result.dest1}
                      onError={e => { e.currentTarget.src = FALLBACK_IMG; }}
                    />
                  )}
                  <div className="cmp-dest-over" />
                  <div className="cmp-dest-name-over">
                    <div className="cmp-dest-label">Destination 1</div>
                    <div className="cmp-dest-title" style={{ color: "#c9b8e8" }}>{result.dest1}</div>
                  </div>
                </div>

                <div className="cmp-dest-vs">VS</div>

                <div className={`cmp-dest-card d2${!images.img2 ? " cmp-dest-card-loading" : ""}`}>
                  {images.img2 && (
                    <img
                      src={images.img2}
                      alt={result.dest2}
                      onError={e => { e.currentTarget.src = FALLBACK_IMG; }}
                    />
                  )}
                  <div className="cmp-dest-over" />
                  <div className="cmp-dest-name-over">
                    <div className="cmp-dest-label">Destination 2</div>
                    <div className="cmp-dest-title" style={{ color: "#e8d49a" }}>{result.dest2}</div>
                  </div>
                </div>
              </div>

              {/* Similarities & Differences */}
              <div className="cmp-section-head">
                <span className="cmp-section-eyebrow">Breakdown</span>
                <h2 className="cmp-section-title">Similarities &amp; Differences</h2>
              </div>

              {/* Decorative Venn circles */}
              <div className="cmp-venn-decor">
                <div className="cmp-venn-ring v1" />
                <div className="cmp-venn-ring v2" />
              </div>

              <div className="cmp-traits-grid">
                <div className="cmp-trait-col d1">
                  <span className="cmp-trait-col-title v1">Only in {shortName(result.dest1)}</span>
                  {result.unique1.map((t, i) => (
                    <div key={i} className="cmp-trait-item">
                      <span className="cmp-trait-bullet v1" />
                      {t}
                    </div>
                  ))}
                </div>
                <div className="cmp-trait-col mid">
                  <span className="cmp-trait-col-title vx">Both have</span>
                  {result.shared.map((t, i) => (
                    <div key={i} className="cmp-trait-item">
                      <span className="cmp-trait-bullet vx" />
                      {t}
                    </div>
                  ))}
                </div>
                <div className="cmp-trait-col d2">
                  <span className="cmp-trait-col-title v2">Only in {shortName(result.dest2)}</span>
                  {result.unique2.map((t, i) => (
                    <div key={i} className="cmp-trait-item">
                      <span className="cmp-trait-bullet v2" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              <hr className="cmp-divider"/>

              {/* Pros / Cons */}
              <div className="cmp-section-head">
                <span className="cmp-section-eyebrow">Weighing it up</span>
                <h2 className="cmp-section-title">Pros &amp; Cons</h2>
              </div>
              <div className="cmp-pc-grid">
                {[
                  { dest: result.dest1, pros: result.pros1, cons: result.cons1, col: "var(--purple)", stripe: "rgba(123,94,167,.7)", cls: "d1" },
                  { dest: result.dest2, pros: result.pros2, cons: result.cons2, col: "#c9a86c",       stripe: "rgba(201,168,108,.6)", cls: "d2" },
                ].map(({ dest, pros, cons, col, stripe, cls }) => (
                  <div key={dest} className={`cmp-pc-card ${cls}`}>
                    <div className="cmp-pc-head">
                      <div className="cmp-pc-stripe" style={{ background: stripe }}/>
                      <div className="cmp-pc-dest" style={{ color: col }}>{dest}</div>
                    </div>
                    <div className="cmp-pc-body">
                      <div className="cmp-pc-section">
                        <span className="cmp-pc-sec-title pro">Pros</span>
                        {pros.map((p, i) => (
                          <div key={i} className="cmp-pc-item">
                            <span className="cmp-pc-dot pro"/>
                            {p}
                          </div>
                        ))}
                      </div>
                      <div className="cmp-pc-section">
                        <span className="cmp-pc-sec-title con">Cons</span>
                        {cons.map((c, i) => (
                          <div key={i} className="cmp-pc-item">
                            <span className="cmp-pc-dot con"/>
                            {c}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <hr className="cmp-divider"/>

              {/* Verdict */}
              <div className="cmp-verdict">
                <div className="cmp-verdict-eye">The Verdict</div>
                <div className="cmp-verdict-txt">{result.verdict}</div>
                <div className="cmp-verdict-wm">✦</div>
              </div>

              {/* Actions */}
              <div className="cmp-actions">
                <button className="cmp-pdf-btn" onClick={() => downloadPDF(result, LOGO, images.img1, images.img2)}>
                  <span className="material-icons-round" style={{ fontSize: "16px", lineHeight: 1 }}>file_download</span>
                  Download PDF
                </button>
                <button className="cmp-again" onClick={reset}>Compare two more →</button>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}

const RULES = [
  {
    title: "ENTRY & SELECTION",
    text: "Traveling Around The World is open to anyone in the world. Entry is completely free — no fees, no essays, no qualifications of any kind. Each year, all registered entries are placed into the Wheel of Fate. On March 1st, the draw is broadcast live to a global audience and fully audited by an independent body. Five names are drawn at random. Those five people become the Worldbound Five.",
    callout: {
      title: "THE WHEEL OF FATE",
      text: "One draw. One spin. Five winners. Every registered entry has an exactly equal chance. The process is transparent, live, and publicly verifiable.",
    },
  },
  {
    title: "PLANNING YOUR JOURNEY",
    text: "Once selected, the Worldbound Five have exactly 10 days to agree on their travel plan. The group decides together — which countries to visit, in what order, and for how long. Every country on earth is available. The plan must be submitted to TATW within the 10-day window. No extensions are granted. Decisions must be collective — the group votes, and the majority rules.",
    callout: {
      title: "10-DAY DEADLINE",
      text: "The clock starts ticking the moment the names are drawn. After 10 days, whatever plan the group has agreed on becomes final — subject only to later flexibility rules.",
    },
  },
  {
    title: "THE 40-DAY PREPARATION WINDOW",
    text: "After the travel plan is submitted, TATW requires 40 days to arrange everything: flights, accommodation bookings, visa applications, travel insurance, security briefings, and crew coordination. During this window, the Worldbound Five are expected to prepare themselves — handle personal affairs, notify employers, and get ready to leave their lives behind for the duration of the trip.",
    callout: null,
  },
  {
    title: "THE $1,000,000 BUDGET",
    text: "The Worldbound Five are given a total budget of $1,000,000 USD. This budget covers all accommodation, food, activities, excursions, and personal expenses at every location visited. Don't be fooled by the large number — managing $1,000,000 across an extended global trip is a genuine financial challenge, and the group must be strategic. All flights and all transport between destinations are covered separately by TATW and do not come out of the budget.",
    callout: {
      title: "IMPORTANT",
      text: "Flights and inter-destination transport are TATW's responsibility and are not deducted from the $1,000,000. Everything else — hotel costs, meals, entry tickets, activities — is the group's responsibility to manage.",
    },
  },
  {
    title: "LUGGAGE RULES",
    text: "Each member of the Worldbound Five is permitted to bring one standard suitcase. You cannot simply pack everything you own — only a selected number of approved essentials are permitted. A full list of approved items will be provided to winners upon selection. Items outside the approved list may be confiscated before departure. Packing light is both a rule and a strategy.",
    callout: {
      title: "ESSENTIALS ONLY",
      text: "The full approved packing list is provided to winners upon selection. Bringing prohibited items may result in penalties or forfeiture of those items.",
    },
  },
  {
    title: "SECURITY & FILMING",
    text: "The Worldbound Five will not travel alone. A dedicated security team accompanies the group at all times for their safety and wellbeing. A professional filming crew will document everything — every destination, every challenge, every moment. All footage is streamed online and archived as part of the TATW series. The Worldbound Five are compensated for their participation in the filming and streaming, on top of the trip itself.",
    callout: {
      title: "COMPENSATION",
      text: "Winners receive compensation for being filmed and streamed. Details of this compensation are shared with the group during the post-selection briefing.",
    },
  },
  {
    title: "DAILY CHALLENGES",
    text: "Every single day of the journey, the Worldbound Five will be presented with a challenge to complete as a group. These challenges vary in nature — physical, mental, creative, or social. If the group completes the challenge, they earn a reward. Rewards can include an extra destination added to the journey, a cash injection into the budget, or something of the group's own choosing. If the challenge is failed, the group faces a forfeit. The specifics of forfeits are classified — the only guarantee is that they will not be enjoyable.",
    callout: {
      title: "WIN OR LOSE — EVERY DAY",
      text: "Challenges are non-optional. A new challenge is issued every morning. The group has until midnight local time to complete it.",
    },
  },
  {
    title: "DESTINATION FLEXIBILITY",
    text: "Even after the initial travel plan has been submitted and the journey has begun, the plan remains flexible. The Worldbound Five can trade destinations — sacrificing one location for one or more alternative locations. For example, the group could trade a trip to a single city in Sweden for two trips in England (London and Manchester). Additional destinations can also be won through daily challenges. The group may make destination changes at any point during the journey, subject to logistical feasibility.",
    callout: {
      title: "TRADING EXAMPLE",
      text: "1 city in Sweden → 2 cities in England (London + Manchester). The value and availability of trades are determined by TATW logistics at the time of the request.",
    },
  },
];

export default function Rules() {
  return (
    <>
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-inner">
          <div className="page-eyebrow reveal">Official Documentation</div>
          <div className="page-h reveal d1">THE<br />RULES.</div>
          <p className="page-sub reveal d2">
            Everything you need to know about how the Worldbound Five trip works — from entry to return.
          </p>
        </div>
      </div>

      {/* ── Rules List ── */}
      <div className="rules-section">
        <div className="rules-inner">
          <div className="rules-list">
            {RULES.map((r, i) => (
              <div key={i} className={`rule-card reveal d${Math.min(i + 1, 4)}`}>
                <div className="rule-num-col">
                  <div className="rule-num">0{i + 1}</div>
                </div>
                <div className="rule-body">
                  <div className="rule-title">{r.title}</div>
                  <p className="rule-text">{r.text}</p>
                  {r.callout && (
                    <div className="rule-callout">
                      <div className="rule-callout-title">{r.callout.title}</div>
                      <p className="rule-callout-text">{r.callout.text}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

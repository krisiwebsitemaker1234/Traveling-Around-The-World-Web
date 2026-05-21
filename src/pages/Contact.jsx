import { useState } from "react";

const CONTACT_STYLES = `
  .contact-body { background: var(--dark); padding: 4.5rem 3.5rem 6rem; }
  .contact-inner { max-width: 1100px; margin: 0 auto; }
  .contact-grid { display: grid; grid-template-columns: 1fr 380px; gap: 3rem; align-items: start; margin-top: 3rem; }

  /* Form */
  .contact-form-card {
    background: rgba(255,255,255,.025); border: 1px solid rgba(123,94,167,.22);
    border-radius: 14px; padding: 2.8rem 2.6rem;
  }
  .cform-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .cform-group { display: flex; flex-direction: column; gap: .45rem; margin-bottom: 1.1rem; }
  .cform-label {
    font-size: .62rem; font-weight: 700; letter-spacing: .18em; text-transform: uppercase;
    color: rgba(255,255,255,.38);
  }
  .cform-input, .cform-select, .cform-textarea {
    background: rgba(255,255,255,.04); border: 1.5px solid rgba(123,94,167,.25);
    border-radius: 6px; padding: .72rem 1rem; font-size: .88rem;
    font-family: var(--sans); color: #fff; outline: none; transition: border-color .25s;
    width: 100%;
  }
  .cform-input:focus, .cform-select:focus, .cform-textarea:focus { border-color: var(--purple); }
  .cform-input::placeholder, .cform-textarea::placeholder { color: rgba(255,255,255,.15); }
  .cform-select { cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2.5' stroke-linecap='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right .9rem center; padding-right: 2.4rem; }
  .cform-select option { background: #1a1208; color: #fff; }
  .cform-textarea { resize: vertical; min-height: 130px; line-height: 1.65; }
  .cform-submit {
    width: 100%; font-family: var(--display); font-size: 1.05rem; letter-spacing: .1em;
    background: var(--purple); color: #fff; border: none;
    padding: .9rem 1.8rem; border-radius: 6px; cursor: pointer;
    transition: all .3s; margin-top: .4rem;
  }
  .cform-submit:hover { background: var(--purple2); transform: translateY(-2px); }
  .cform-success {
    text-align: center; padding: 2.2rem 1.6rem;
  }
  .cform-success-ring {
    width: 68px; height: 68px; border-radius: 50%;
    border: 2px solid var(--purple); margin: 0 auto 1.4rem;
    display: flex; align-items: center; justify-content: center;
    animation: ring-pop .55s cubic-bezier(.34,1.56,.64,1) both;
  }
  .cform-success-check {
    width: 24px; height: 13px;
    border-left: 2.5px solid var(--purple); border-bottom: 2.5px solid var(--purple);
    transform: rotate(-45deg) translate(2px,-2px);
    animation: mark-in .35s .4s ease both;
  }
  .cform-success-h {
    font-family: var(--display); font-size: 1.9rem; letter-spacing: .06em;
    color: #fff; line-height: 1; margin-bottom: .6rem;
    animation: fade-up .5s .25s ease both;
  }
  .cform-success-p {
    font-size: .88rem; color: rgba(255,255,255,.38); line-height: 1.75;
    animation: fade-up .5s .35s ease both;
  }

  /* Info cards */
  .contact-info { display: flex; flex-direction: column; gap: 1rem; }
  .cinfo-card {
    background: rgba(255,255,255,.025); border: 1px solid rgba(123,94,167,.2);
    border-radius: 12px; padding: 1.6rem 1.8rem;
    transition: border-color .3s, transform .3s;
  }
  .cinfo-card:hover { border-color: rgba(123,94,167,.45); transform: translateY(-3px); }
  .cinfo-icon {
    width: 36px; height: 36px; border-radius: 8px;
    background: rgba(123,94,167,.15); border: 1px solid rgba(123,94,167,.3);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: .9rem;
  }
  .cinfo-icon svg { width: 16px; height: 16px; stroke: var(--purple); fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .cinfo-label {
    font-size: .58rem; font-weight: 700; letter-spacing: .18em; text-transform: uppercase;
    color: var(--purple); margin-bottom: .35rem;
  }
  .cinfo-value { font-size: .9rem; color: rgba(255,255,255,.7); line-height: 1.6; font-weight: 500; }
  .cinfo-sub { font-size: .78rem; color: rgba(255,255,255,.28); margin-top: .15rem; }

  /* Social row */
  .cinfo-socials { display: flex; gap: .65rem; margin-top: .8rem; flex-wrap: wrap; }
  .cinfo-social {
    display: inline-flex; align-items: center; gap: .4rem;
    font-size: .7rem; font-weight: 600; letter-spacing: .1em; text-transform: uppercase;
    color: rgba(255,255,255,.4); border: 1px solid rgba(255,255,255,.1);
    padding: .3rem .75rem; border-radius: 4px; transition: all .25s;
  }
  .cinfo-social:hover { color: #fff; border-color: rgba(123,94,167,.5); background: rgba(123,94,167,.08); }

  /* Notice banner */
  .contact-notice {
    margin-top: 3.5rem; padding: 1.2rem 1.6rem;
    background: rgba(123,94,167,.07); border: 1px solid rgba(123,94,167,.22);
    border-radius: 8px; font-size: .82rem; color: rgba(255,255,255,.35);
    line-height: 1.7; text-align: center; max-width: 600px; margin-left: auto; margin-right: auto;
  }

  @media (max-width: 1000px) {
    .contact-grid { grid-template-columns: 1fr; }
    .contact-info { display: grid; grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 800px) {
    .contact-body { padding: 3rem 1.5rem 5rem; }
    .cform-row { grid-template-columns: 1fr; }
    .contact-info { grid-template-columns: 1fr; }
    .contact-form-card { padding: 2rem 1.6rem; }
  }
`;

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "general", message: "" });

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = e => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSent(true);
  };

  return (
    <>
      <style>{CONTACT_STYLES}</style>

      <div className="page-header">
        <div className="page-header-inner">
          <p className="page-eyebrow reveal">Get In Touch</p>
          <h1 className="page-h reveal d1">Contact Us</h1>
          <p className="page-sub reveal d2">
            Questions about the program, media inquiries, or just curious about travel?
            We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="contact-body">
        <div className="contact-inner">
          <div className="contact-grid">

            {/* ── Form ── */}
            <div className="contact-form-card reveal">
              {sent ? (
                <div className="cform-success">
                  <div className="cform-success-ring">
                    <div className="cform-success-check" />
                  </div>
                  <div className="cform-success-h">Message Sent</div>
                  <p className="cform-success-p">
                    Thanks for reaching out! We typically respond within 2–3 business days.<br />
                    Keep an eye on your inbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div className="cform-row">
                    <div className="cform-group">
                      <label className="cform-label">Full Name</label>
                      <input className="cform-input" placeholder="Jane Smith" value={form.name} onChange={set("name")} required />
                    </div>
                    <div className="cform-group">
                      <label className="cform-label">Email Address</label>
                      <input className="cform-input" type="email" placeholder="jane@example.com" value={form.email} onChange={set("email")} required />
                    </div>
                  </div>
                  <div className="cform-group">
                    <label className="cform-label">Subject</label>
                    <select className="cform-select" value={form.subject} onChange={set("subject")}>
                      <option value="general">General Inquiry</option>
                      <option value="apply">Application Question</option>
                      <option value="media">Media &amp; Press</option>
                      <option value="partnership">Partnership / Sponsorship</option>
                      <option value="winners">Past Winners</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="cform-group">
                    <label className="cform-label">Message</label>
                    <textarea className="cform-textarea" placeholder="Tell us what's on your mind…" value={form.message} onChange={set("message")} required />
                  </div>
                  <button className="cform-submit" type="submit">Send Message</button>
                </form>
              )}
            </div>

            {/* ── Info cards ── */}
            <div className="contact-info">

              <div className="cinfo-card reveal d1">
                <div className="cinfo-icon">
                  <span className="material-icons-round" style={{ fontSize: "18px", color: "var(--purple)" }}>mail</span>
                </div>
                <div className="cinfo-label">Email</div>
                <div className="cinfo-value">hello@travelingtheworld.com</div>
                <div className="cinfo-sub">General inquiries &amp; support</div>
                <div className="cinfo-value" style={{ marginTop: ".45rem" }}>press@travelingtheworld.com</div>
                <div className="cinfo-sub">Media &amp; press requests</div>
              </div>

              <div className="cinfo-card reveal d2">
                <div className="cinfo-icon">
                  <span className="material-icons-round" style={{ fontSize: "18px", color: "var(--purple)" }}>location_on</span>
                </div>
                <div className="cinfo-label">Headquarters</div>
                <div className="cinfo-value">Geneva, Switzerland</div>
                <div className="cinfo-sub">Operationally based worldwide</div>
              </div>

              <div className="cinfo-card reveal d3">
                <div className="cinfo-icon">
                  <span className="material-icons-round" style={{ fontSize: "18px", color: "var(--purple)" }}>schedule</span>
                </div>
                <div className="cinfo-label">Response Time</div>
                <div className="cinfo-value">2–3 Business Days</div>
                <div className="cinfo-sub">During application season (Jan) response may take longer</div>
              </div>

              <div className="cinfo-card reveal d4">
                <div className="cinfo-icon">
                  <span className="material-icons-round" style={{ fontSize: "18px", color: "var(--purple)" }}>tag</span>
                </div>
                <div className="cinfo-label">Follow Us</div>
                <div className="cinfo-socials">
                  <span className="cinfo-social">Twitter / X</span>
                  <span className="cinfo-social">Instagram</span>
                  <span className="cinfo-social">YouTube</span>
                  <span className="cinfo-social">TikTok</span>
                </div>
                <div className="cinfo-sub" style={{ marginTop: ".7rem" }}>@TravelingAroundTheWorld</div>
              </div>

            </div>
          </div>

          <div className="contact-notice reveal">
            For urgent matters related to an active journey or a safety concern, please contact our 24/7 operations team directly via the secure link provided in your selection confirmation email.
          </div>
        </div>
      </div>
    </>
  );
}

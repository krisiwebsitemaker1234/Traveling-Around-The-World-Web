# Traveling Around The World

A multi-page React web application built as a school project. The site presents a fictional travel programme called **The Worldbound Five** — an annual draw in which five people are selected at random and sent on a fully funded, year-long journey around the world.

**Subject:** English — 10th Grade Yearly Project
**School:** Gjergj Canco

---

## Overview

The application covers every aspect of the fictional programme: its history and mission, how the selection process works, the official rules, past winners, available destinations, an application form, and an AI-powered destination comparison tool. The design is cinematic and scroll-driven, built entirely with custom CSS and no UI frameworks.

---

## Pages and Features

### Home
- Full-page scroll-driven hero animation with smooth interpolation and easing functions
- Three animated polaroid cards that enter and exit the viewport as the user scrolls, each paired with a programme statistic
- Parallax background effect tied to scroll position
- Three sequential reveal panels covering programme stats, site navigation previews, and a call to action
- All animations run on `requestAnimationFrame` for consistent performance

### About
- Company mission statement and background
- Six core value cards outlining the principles behind the programme
- Founding history section with key statistics: year established, number of lives changed, years running, and countries available

### How It Works
- Explanation of the Wheel of Fate selection mechanism
- Six-step process from registration through to returning home
- Dedicated sections covering the 10-day planning window, the 40-day preparation period, and destination flexibility rules
- Daily challenge breakdown showing the rewards for success and consequences for failure

### Destinations
- Filterable grid of featured destinations across five regions: Asia, Europe, the Americas, Africa, and the Middle East
- Region filter tabs that update the grid instantly without a page reload
- Hover overlays on each destination card showing the city name, country, region tag, and a short description
- Informational banner clarifying that all countries on earth are available to winners, not just those shown

### Rules
- Eight numbered rule sections covering every aspect of the programme: entry and selection, journey planning, the preparation window, the one million dollar budget, luggage restrictions, security and filming, daily challenges, and destination flexibility
- Each rule section includes a highlighted callout box for the most important detail within that rule

### Past Winners
- Timeline of six winning groups from 2020 to 2025
- Each entry shows the five members and their countries of origin, a standout highlight from their journey, their top destination, and total budget used
- A 2026 placeholder entry at the bottom of the timeline linking to the application page

### Apply
- Email registration form for the 2026 draw
- On submission, generates a unique application reference number in the format `TATW-2026-XXXXXXXX`
- Confirmation screen shows the registered email address, the reference number, the live draw date, and a three-step summary of what happens next
- Pre-confirmation section explaining the full post-selection process in six steps

### Contact
- Contact form with fields for name, email address, subject category, and message
- Subject categories include general inquiry, application question, media and press, partnership, past winners, and other
- Four information cards alongside the form: email addresses, headquarters location, typical response time, and social media handles
- Form success state with an animated confirmation indicator

### Destination Compare
- AI-powered tool that compares any two destinations entered by the user
- Calls a large language model (LLaMA 3.3 70B via the Groq API in development; a Netlify serverless function in production) to generate a structured comparison
- Results include shared qualities, what is unique to each destination, pros and cons for each, and an overall verdict
- Destination images are fetched dynamically from the Wikipedia API based on the names returned by the model
- A confirmation step between loading and results allows the user to verify the model interpreted their input correctly
- PDF export that opens a print-ready document in a new tab, including destination images, the full comparison breakdown, and the verdict

---

## Technology

| Area | Detail |
|---|---|
| Framework | React 18 (Vite) |
| Routing | React Router v6 |
| Styling | Custom CSS, no UI framework |
| AI Comparison | Groq API — LLaMA 3.3 70B Versatile |
| Production API | Netlify Serverless Functions |
| Destination Images | Wikipedia REST API (`pageimages`) |
| Icons | Google Material Icons (rounded) |
| Fonts | Custom display and sans-serif via CSS variables |

---

## Project Structure

```
src/
  data.js               Destination data and past winners data
  main.jsx              Application entry point and router setup
  app.css               Global styles and CSS variables
  pages/
    Home.jsx            Scroll-driven hero and reveal panels
    About.jsx           Mission, values, and history
    HowItWorks.jsx      Process steps and challenge rules
    Destinations.jsx    Filterable destination grid
    Rules.jsx           Official programme rules
    Winners.jsx         Past winners timeline
    Apply.jsx           Application registration form
    Contact.jsx         Contact form and information
    Compare.jsx         AI destination comparison tool
```

---

## Getting Started

**Prerequisites:** Node.js 18 or later.

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `[text](https://traveling-around-the-world.netlify.app/)`.

---

## Environment Variables

The Compare page requires a Groq API key in development. Create a `.env` file in the project root:

```
VITE_GROQ_API_KEY=private_api_key
```

In production (Netlify), the API key is handled server-side by the `/.netlify/functions/compare` function and is never exposed to the client.

---

## Deployment

The project is configured for deployment on Netlify. The AI comparison feature uses a Netlify serverless function in production so that the API key remains private. All other pages are static and require no server-side configuration.

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

type River =
  | "Religion & Culture"
  | "History"
  | "Economic Liberation"
  | "Technology Leap"
  | "Pan-African Governance";

const RIVER_DATA: { name: River; sym: string; color: string; short: string }[] = [
  { name: "Religion & Culture", sym: "🌀", color: "#7C3AED", short: "Aṣẹ · Ifá · Mbiti · the ancestral OS" },
  { name: "History",            sym: "📜", color: "#5B3080", short: "Erased events as keys to tomorrow" },
  { name: "Economic Liberation",sym: "🪙", color: "#CA8A04", short: "Wealth as bridge, not extractive engine" },
  { name: "Technology Leap",    sym: "⚡", color: "#C0470E", short: "Code sovereign — built for African minds" },
  { name: "Pan-African Governance", sym: "🌍", color: "#2A6B4F", short: "54 stools, no thrones" },
];

const CONCEPTS = [
  { id: "kolo-ai",          emoji: "🪙", name: "KoloAI",           tagline: "Teach money to serve community, not consume it",  river: "Economic Liberation" as River,      riverColor: "#CA8A04", desc: "Passive income flows that feed one orphan per stream. Wealth as bridge, not extractive engine. Sankara's 4-year discipline meets modern SaaS.",                                    status: "BUILDING", href: "/vibe-coders", waitlist: 47 },
  { id: "safe-ai",          emoji: "🛡️", name: "SAFE AI",           tagline: "Sovereignty shield for communities",               river: "Pan-African Governance" as River,   riverColor: "#2A6B4F", desc: "Community safety infrastructure built on local truth, not foreign architecture. Refuses the colonial mirror.",                                                                  status: "CONCEPT",  href: "#join",        waitlist: 0 },
  { id: "afrohustle-os",    emoji: "⚡", name: "AfroHustle OS",     tagline: "ADHD lightning meets ancestral code",              river: "Technology Leap" as River,          riverColor: "#C0470E", desc: "MVPs in 4–8 weeks. Code that outlives its builder. ADHD patterns see futures. Automate freedom, not chains.",                                                                   status: "CONCEPT",  href: "#join",        waitlist: 23 },
  { id: "naijagig-matcher", emoji: "🎭", name: "NaijaGig Matcher",  tagline: "Skill is sovereign. No CV.",                       river: "Economic Liberation" as River,      riverColor: "#CA8A04", desc: "The village square as marketplace. Talent visible on merit alone. DJ, tailor, coder — equal dignity.",                                                                           status: "CONCEPT",  href: "#join",        waitlist: 0 },
  { id: "borderless-remit", emoji: "🌍", name: "Borderless Remit",  tagline: "Berlin's lines cannot tax our love",               river: "Pan-African Governance" as River,   riverColor: "#2A6B4F", desc: "Cross-border value flows that honor the 54 stools. Remittance as reparation. Debt traps snapped with integrity.",                                                             status: "CONCEPT",  href: "#join",        waitlist: 31 },
  { id: "farmgate-direct",  emoji: "🌾", name: "FarmGate Direct",   tagline: "Refine raw. End the toothpick mockery.",            river: "Economic Liberation" as River,      riverColor: "#CA8A04", desc: "Farmer-to-market sovereign chains. Raw exports bleed us. Local processing heals. Cotton empires, local mills.",                                                                  status: "CONCEPT",  href: "#join",        waitlist: 0 },
  { id: "power-alert",      emoji: "💡", name: "PowerAlert NG",     tagline: "Infrastructure truth, community-owned",            river: "Technology Leap" as River,          riverColor: "#C0470E", desc: "Crowd-sourced power data. Knowledge is sovereignty. Literally. Community tool for community problems.",                                                                          status: "CONCEPT",  href: "#join",        waitlist: 12 },
  { id: "receipt-genius",   emoji: "🧾", name: "ReceiptGenius NG",  tagline: "Account to the village, transparently",            river: "Pan-African Governance" as River,   riverColor: "#2A6B4F", desc: "Financial transparency tools. Ubuntu demands we account to each other. No hidden hands in community funds.",                                                                    status: "CONCEPT",  href: "#join",        waitlist: 0 },
  { id: "skill2cash",       emoji: "💎", name: "Skill2Cash",        tagline: "Every Naija skill has a market",                   river: "Economic Liberation" as River,      riverColor: "#CA8A04", desc: "Monetization rails for underground talent. The market was always there — we build the rails to reach it.",                                                                       status: "CONCEPT",  href: "#join",        waitlist: 19 },
  { id: "afrocopy-ai",      emoji: "✍️", name: "AfroCopy AI",       tagline: "Words trained on our own proverbs",                river: "Technology Leap" as River,          riverColor: "#C0470E", desc: "AfriDataSovereign language model. Replace foreign mirrors with Naija-trained AI. Code and copy that sound like us.",                                                             status: "CONCEPT",  href: "#join",        waitlist: 0 },
  { id: "anontruth-mic",    emoji: "🎤", name: "AnonTruth Mic",     tagline: "Truth speaks even when it must whisper",           river: "History" as River,                  riverColor: "#5B3080", desc: "Lumumba refused to kneel in public. This gives truth a way to speak without martyrdom. Community confession without consequence.",                                              status: "CONCEPT",  href: "#join",        waitlist: 0 },
  { id: "vibe-coders",      emoji: "⚡", name: "Vibe Coders",       tagline: "Build what Nigeria needs",                         river: "Technology Leap" as River,          riverColor: "#C0470E", desc: "A 6-month AI-assisted coding mentorship program for Nigerian youth. Project-based. Psychology-informed. VillageCircle-rooted.",                                                 status: "BUILDING", href: "/vibe-coders", waitlist: 58 },
];

const DAILY_DROPS = [
  {
    river: "History", riverColor: "#5B3080",
    date: "May 2, 2026",
    title: "Awolowo freed minds in 1955. Whose children are still waiting?",
    preview: "The Western Region's free education program was not charity. It was an act of economic sovereignty — a declaration that our children's minds would not be raw materials for colonial extraction.",
    slug: "awolowo-free-education",
  },
  {
    river: "Economic Liberation", riverColor: "#CA8A04",
    date: "May 1, 2026",
    title: "Before the gun, we had the gong. The gong still calls.",
    preview: "Every community had its own broadcast infrastructure. The town crier was not primitive — he was sovereign. His signal was uninterrupted, unmonetized, unhijacked.",
    slug: "gong-sovereignty",
  },
  {
    river: "Technology Leap", riverColor: "#C0470E",
    date: "Apr 30, 2026",
    title: "Code that cannot feed your village has no roots.",
    preview: "We celebrate the Nigerian engineer who joins a Silicon Valley company. We should also celebrate — more loudly — the one who builds the tool that tracks NEPA outages in Oshodi.",
    slug: "code-with-roots",
  },
];

const DOCTRINE = [
  { icon: "🌀", title: "Aṣẹ Command",        body: "We speak things into existence. Every concept is a declaration before it is a product — word made flesh in the tradition of the griot." },
  { icon: "🌍", title: "Ubuntu Code",         body: "I am because we are. Products built for community sovereignty, not individual extraction. Every line of code asks: does this serve the village?" },
  { icon: "📜", title: "History as Weapon",   body: "Awolowo freed minds in 1955. Lumumba lived in refusal. We build what empire buried — and we name it correctly." },
  { icon: "⚡", title: "ADHD Lightning",      body: "Neurodivergent patterns see futures. We build tools that honor how African minds actually work — not how colonial schooling tried to reshape them." },
];

const SEATS_FILLED = 14;
const SEATS_TOTAL  = 30;

const NAV_LINKS: [string, string][] = [
  ["The Philosophy", "#philosophy"],
  ["Vibe Coders",    "/vibe-coders"],
  ["Concepts",       "#concepts"],
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function VillageCircleHome() {
  const [activeRiver, setActiveRiver]     = useState<River | null>(null);
  const [statusFilter, setStatusFilter]   = useState<"All" | "BUILDING" | "CONCEPT">("All");
  const [email, setEmail]                 = useState("");
  const [joined, setJoined]               = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [riverTick, setRiverTick]         = useState(0);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [visible, setVisible]             = useState(new Set<string>());
  const cardRefs                          = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setRiverTick(t => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting)
            setVisible(p => new Set([...p, (e.target as HTMLElement).dataset.id!]));
        }),
      { threshold: 0.08 }
    );
    cardRefs.current.forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, [activeRiver, statusFilter]);

  const pulseRiver   = RIVER_DATA[riverTick % RIVER_DATA.length].name;
  const filtered     = CONCEPTS.filter(c => {
    const rOk = !activeRiver || c.river === activeRiver;
    const sOk = statusFilter === "All" || c.status === statusFilter;
    return rOk && sOk;
  });

  // shared font stacks (css classes from globals.css also available)
  const DF = "'Playfair Display', Georgia, serif";
  const BF = "'Inter', system-ui, -apple-system, sans-serif";

  const sectionPad = "clamp(16px, 6vw, 80px)";

  return (
    <div style={{ background: "#FDFAF6", color: "#3B1F0A", fontFamily: BF, overflowX: "hidden" }}>

      {/* ── GRAIN LAYER (from globals .grain class, but light tint) ─────────── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 900, opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* ════════════════════════════════════════════════════════════════════════
          1. HEADER
      ═══════════════════════════════════════════════════════════════════════════ */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: `0 ${sectionPad}`,
        transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: `1px solid ${scrolled ? "#F0E6D3" : "transparent"}`,
        boxShadow: scrolled ? "0 1px 16px rgba(59,31,10,0.07)" : "none",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/logo.png" alt="VillageCircle" width={30} height={30} style={{ borderRadius: 6 }} />
          <span className="pf" style={{ fontWeight: 700, fontSize: 16, color: "#3B1F0A", letterSpacing: "-0.01em" }}>VillageCircle</span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {NAV_LINKS.map(([label, href]) => (
            <Link key={label} href={href} style={{ fontSize: 13, color: "rgba(59,31,10,0.65)", textDecoration: "none", letterSpacing: "0.01em", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#3B1F0A")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(59,31,10,0.65)")}>
              {label}
            </Link>
          ))}
          <a href="#join" style={{
            padding: "8px 18px", background: "#3B1F0A", color: "#FDFAF6",
            fontSize: 13, fontWeight: 600, textDecoration: "none", borderRadius: 7,
            letterSpacing: "0.02em", transition: "opacity 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
            Enter the Circle
          </a>
        </nav>
      </header>

      {/* ════════════════════════════════════════════════════════════════════════
          2. HERO
      ═══════════════════════════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: `120px ${sectionPad} 80px`, textAlign: "center", position: "relative",
        background: "linear-gradient(160deg, #FDFAF6 0%, #F8F1E7 100%)",
      }}>
        {/* Dot grid */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(59,31,10,0.06) 1px, transparent 0)",
          backgroundSize: "28px 28px" }} />

        {/* Amber glow orb */}
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
          width: 600, height: 400, background: "radial-gradient(ellipse, rgba(202,138,4,0.07) 0%, transparent 70%)",
          pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 820 }}>
          {/* Label */}
          <p style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
            color: "#CA8A04", marginBottom: 28, fontWeight: 500, fontFamily: BF }}>
            Daily drops · 8:30 AM Africa/Lagos
          </p>

          {/* H1 */}
          <h1 className="pf" style={{
            fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 700, lineHeight: 1.06,
            color: "#3B1F0A", marginBottom: 28, letterSpacing: "-0.025em",
          }}>
            Where Conviction<br />Becomes Code
          </h1>

          {/* Sub-tagline */}
          <p style={{ fontSize: "clamp(14px, 1.4vw, 16px)", color: "rgba(59,31,10,0.5)",
            marginBottom: 22, letterSpacing: "0.02em", fontFamily: BF }}>
            A venture studio and publishing imprint rooted in African sovereignty
          </p>

          {/* Divider line */}
          <div style={{ width: 80, height: 1, background: "linear-gradient(90deg, transparent, #CA8A04, transparent)",
            margin: "0 auto 28px" }} />

          {/* Achebe quote */}
          <blockquote className="lo" style={{
            maxWidth: 560, margin: "0 auto 40px", fontStyle: "italic",
            fontSize: "clamp(15px, 1.5vw, 18px)", color: "#5C3317", lineHeight: 1.75,
          }}>
            &ldquo;Until the lion learns to write, every story will glorify the hunter.&rdquo;
            <cite style={{ display: "block", marginTop: 8, fontStyle: "normal", fontSize: 11,
              letterSpacing: "0.16em", textTransform: "uppercase", color: "#CA8A04", fontFamily: BF }}>
              — Chinua Achebe · We build so the lion writes.
            </cite>
          </blockquote>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
            <Link href="/vibe-coders?utm_source=villagecircle&utm_medium=hero&utm_campaign=cohort1"
              style={{ padding: "14px 28px", background: "#3B1F0A", color: "#FDFAF6",
                fontSize: 14, fontWeight: 600, textDecoration: "none", borderRadius: 8,
                letterSpacing: "0.02em", transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Apply — Vibe Coders Cohort 1
            </Link>
            <a href="#join" style={{ padding: "14px 28px", border: "1.5px solid #3B1F0A",
              color: "#3B1F0A", fontSize: 14, fontWeight: 600, textDecoration: "none",
              borderRadius: 8, letterSpacing: "0.02em", background: "transparent",
              transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F0E6D3")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              Enter the Circle
            </a>
          </div>

          {/* Micro-label */}
          <p style={{ fontSize: 12, color: "rgba(59,31,10,0.35)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            12 concepts · 5 Rivers · No hustle theatre
          </p>
        </div>

        {/* Scroll cue */}
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 2 }}>
          <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(59,31,10,0.28)" }}>Enter the circle</span>
          <div style={{ width: 1, height: 38, background: "linear-gradient(to bottom, #CA8A04, transparent)" }} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          3. THE 5 RIVERS
      ═══════════════════════════════════════════════════════════════════════════ */}
      <section id="philosophy" style={{ padding: `64px ${sectionPad}`, borderTop: "1px solid #F0E6D3", background: "#FDFAF6" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
            color: "#CA8A04", marginBottom: 10, fontWeight: 500 }}>The Philosophy</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            flexWrap: "wrap", gap: 12, marginBottom: 36 }}>
            <h2 className="pf" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700,
              color: "#3B1F0A", letterSpacing: "-0.015em" }}>
              The 5 Rivers Cycle
            </h2>
            <p className="lo" style={{ fontSize: 14, color: "rgba(59,31,10,0.5)", fontStyle: "italic",
              maxWidth: 340, lineHeight: 1.7 }}>
              Daily drops at 8:30 AM. Not content. Medicine. Each concept flows from one of these currents.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10 }}>
            {RIVER_DATA.map(r => {
              const isActive = activeRiver === r.name;
              const isPulsing = !activeRiver && pulseRiver === r.name;
              return (
                <button key={r.name}
                  onClick={() => setActiveRiver(isActive ? null : r.name)}
                  style={{
                    padding: "20px 16px", borderRadius: 12, textAlign: "left", cursor: "pointer",
                    background: isActive ? `${r.color}0D` : "#FFFFFF",
                    border: `1px solid ${isActive ? r.color : "#F0E6D3"}`,
                    borderBottom: `3px solid ${isActive || isPulsing ? r.color : "#F0E6D3"}`,
                    transition: "all 0.25s", outline: "none",
                    boxShadow: isActive ? `0 4px 16px ${r.color}20` : "none",
                  }}>
                  <span style={{ fontSize: 22, display: "block", marginBottom: 10 }}>{r.sym}</span>
                  <span className="pf" style={{ fontSize: 13, fontWeight: 700,
                    color: isActive ? r.color : "#3B1F0A", display: "block",
                    marginBottom: 5, lineHeight: 1.3 }}>{r.name}</span>
                  <span style={{ fontSize: 11, color: "rgba(59,31,10,0.45)", lineHeight: 1.5, display: "block" }}>{r.short}</span>
                </button>
              );
            })}
          </div>

          {activeRiver && (
            <div style={{ marginTop: 10, padding: "7px 14px", background: "#F0E6D3", borderRadius: 8,
              display: "inline-flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 12, color: "#5C3317" }}>
                Showing <strong>{activeRiver}</strong> · {CONCEPTS.filter(c => c.river === activeRiver).length} concepts
              </span>
              <button onClick={() => setActiveRiver(null)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12,
                  color: "#CA8A04", padding: 0, fontFamily: BF }}>
                clear ×
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          4. VIBE CODERS FEATURE CARD
      ═══════════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: `0 ${sectionPad} 48px`, background: "#FDFAF6" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{
            borderRadius: 20, overflow: "hidden", position: "relative",
            background: "linear-gradient(135deg, #1D4ED8 0%, #6D28D9 55%, #7C3AED 100%)",
            padding: "clamp(32px, 5vw, 52px) clamp(24px, 5vw, 52px)",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40,
          }}>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse at 75% 50%, rgba(124,58,237,0.35) 0%, transparent 65%)" }} />

            {/* Left content */}
            <div style={{ position: "relative", zIndex: 1, flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.65)", marginBottom: 10 }}>⚡ Now Open</p>
              <h3 className="pf" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700,
                color: "#FFFFFF", marginBottom: 10, lineHeight: 1.12, letterSpacing: "-0.015em" }}>
                Vibe Coders — Cohort 1
              </h3>
              <p style={{ fontSize: "clamp(14px, 1.5vw, 17px)", color: "rgba(255,255,255,0.75)",
                marginBottom: 28, lineHeight: 1.65 }}>
                6 months. AI-first. Nigerian minds. Real products.
              </p>

              {SEATS_FILLED > 8 && (
                <div style={{ marginBottom: 28, maxWidth: 340 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                      {SEATS_FILLED} of {SEATS_TOTAL} seats filled
                    </span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
                      {SEATS_TOTAL - SEATS_FILLED} remaining
                    </span>
                  </div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.18)", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 4, background: "rgba(255,255,255,0.85)",
                      width: `${(SEATS_FILLED / SEATS_TOTAL) * 100}%`, transition: "width 1.2s ease" }} />
                  </div>
                </div>
              )}

              <Link href="/vibe-coders?utm_source=villagecircle&utm_medium=feature_card&utm_campaign=cohort1"
                style={{ display: "inline-block", padding: "12px 28px", background: "#FFFFFF",
                  color: "#1D4ED8", fontSize: 14, fontWeight: 700, textDecoration: "none",
                  borderRadius: 8, letterSpacing: "0.02em", transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                Apply Now →
              </Link>
            </div>

            {/* SVG illustration */}
            <svg width="170" height="150" viewBox="0 0 170 150" fill="none"
              style={{ flexShrink: 0, position: "relative", zIndex: 1, opacity: 0.85 }}>
              <circle cx="85" cy="75" r="65" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
              <circle cx="85" cy="75" r="45" stroke="rgba(255,255,255,0.2)"  strokeWidth="1.5" />
              <circle cx="85" cy="75" r="25" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
              <line x1="85" y1="10" x2="85" y2="140" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="20" y1="75" x2="150" y2="75" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <text x="57" y="65" fill="rgba(255,255,255,0.55)" fontSize="13" fontFamily="monospace">{"{"}</text>
              <text x="97" y="65" fill="rgba(255,255,255,0.55)" fontSize="13" fontFamily="monospace">{"}"}</text>
              <text x="75" y="88" fill="rgba(255,255,255,0.9)" fontSize="18">⚡</text>
              {([[85,10],[85,140],[20,75],[150,75]] as [number,number][]).map(([cx,cy],i) => (
                <circle key={i} cx={cx} cy={cy} r="3" fill="rgba(255,255,255,0.45)" />
              ))}
            </svg>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          5. CONCEPT CARDS GRID
      ═══════════════════════════════════════════════════════════════════════════ */}
      <section id="concepts" style={{ padding: `64px ${sectionPad}`, background: "#FDFAF6", borderTop: "1px solid #F0E6D3" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
            color: "#CA8A04", marginBottom: 10, fontWeight: 500 }}>The Pipeline</p>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
            <div>
              <h2 className="pf" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700,
                color: "#3B1F0A", marginBottom: 6, letterSpacing: "-0.015em" }}>
                What We Are Building Next
              </h2>
              <p className="lo" style={{ fontSize: 15, color: "rgba(59,31,10,0.5)", fontStyle: "italic" }}>
                Seeds in the ground — alive in concept, rooted in the 5 Rivers.
              </p>
            </div>

            {/* Status filter */}
            <div style={{ display: "flex", gap: 6 }}>
              {(["All", "BUILDING", "CONCEPT"] as const).map(f => (
                <button key={f} onClick={() => setStatusFilter(f)}
                  style={{
                    padding: "7px 16px", borderRadius: 20, fontSize: 11, cursor: "pointer",
                    fontWeight: statusFilter === f ? 700 : 400, letterSpacing: "0.08em",
                    background: statusFilter === f ? "#3B1F0A" : "#F0E6D3",
                    color: statusFilter === f ? "#FDFAF6" : "#3B1F0A",
                    border: "none", transition: "all 0.15s", fontFamily: BF,
                  }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
            {filtered.map((c, i) => (
              <div key={c.id}
                ref={el => { cardRefs.current[i] = el; }}
                data-id={c.id}
                className="card-enter"
                style={{ borderRadius: 16, padding: "24px 20px",
                  background: visible.has(c.id) ? "#FFFFFF" : "transparent",
                  border: "1px solid #F0E6D3", transition: "all 0.35s ease",
                  opacity: visible.has(c.id) ? 1 : 0,
                  transform: visible.has(c.id) ? "none" : "translateY(20px)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.background = "#F0E6D3";
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = "0 8px 28px rgba(59,31,10,0.09)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.background = "#FFFFFF";
                  el.style.transform = "none";
                  el.style.boxShadow = "none";
                }}>

                {/* River tag + status badge */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
                    color: c.riverColor, fontWeight: 600 }}>{c.river}</span>
                  <span style={{
                    fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase",
                    padding: "3px 9px", borderRadius: 20, fontWeight: 700,
                    background: c.status === "BUILDING" ? "#CA8A04" : "#F0E6D3",
                    color: c.status === "BUILDING" ? "#FDFAF6" : "#3B1F0A",
                  }}>{c.status}</span>
                </div>

                {/* Icon + name */}
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, fontSize: 22,
                    background: `${c.riverColor}10`, border: `1px solid ${c.riverColor}20`,
                    display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {c.emoji}
                  </div>
                  <div>
                    <h3 className="pf" style={{ fontSize: 17, fontWeight: 700, color: "#3B1F0A",
                      lineHeight: 1.2, marginBottom: 3 }}>{c.name}</h3>
                    <p className="lo" style={{ fontSize: 11, color: c.riverColor, fontStyle: "italic", lineHeight: 1.4 }}>
                      {c.tagline}
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: 13, color: "rgba(59,31,10,0.58)", lineHeight: 1.78, marginBottom: 16 }}>
                  {c.desc}
                </p>

                <div style={{ height: 1, background: `linear-gradient(90deg, ${c.riverColor}28, transparent)`, marginBottom: 14 }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Link href={`${c.href}?utm_source=villagecircle&utm_medium=concept_card&utm_content=${c.id}`}
                    style={{ fontSize: 11, color: c.riverColor, letterSpacing: "0.12em",
                      textTransform: "uppercase", textDecoration: "none", fontWeight: 600 }}>
                    Enter the circle →
                  </Link>
                  {c.waitlist > 8 && (
                    <span style={{ fontSize: 11, color: "rgba(59,31,10,0.38)", fontStyle: "italic" }}>
                      {c.waitlist} in the circle
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          6. DAILY DROP PREVIEW
      ═══════════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: `72px ${sectionPad}`, background: "#F0E6D3" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
            color: "#CA8A04", marginBottom: 10, fontWeight: 500 }}>Daily Drops</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            flexWrap: "wrap", gap: 16, marginBottom: 40 }}>
            <h2 className="pf" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700,
              color: "#3B1F0A", letterSpacing: "-0.015em" }}>
              From the Circle
            </h2>
            <p className="lo" style={{ fontSize: 14, color: "rgba(59,31,10,0.5)", fontStyle: "italic" }}>
              8:30 AM · No noise · Only medicine
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {DAILY_DROPS.map(d => (
              <article key={d.slug} style={{ background: "#FFFFFF", borderRadius: 16, padding: "28px 22px",
                border: "1px solid rgba(59,31,10,0.07)", transition: "box-shadow 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 6px 20px rgba(59,31,10,0.08)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em",
                    textTransform: "uppercase", color: d.riverColor }}>{d.river}</span>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(59,31,10,0.18)",
                    display: "inline-block" }} />
                  <span style={{ fontSize: 11, color: "rgba(59,31,10,0.4)" }}>{d.date}</span>
                </div>
                <h4 className="pf" style={{ fontSize: "clamp(15px, 2vw, 19px)", fontWeight: 700,
                  color: "#3B1F0A", marginBottom: 10, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
                  {d.title}
                </h4>
                <p style={{ fontSize: 13, color: "rgba(59,31,10,0.55)", lineHeight: 1.75, marginBottom: 20 }}>
                  {d.preview}
                </p>
                <a href="#join" style={{ fontSize: 12, color: "#CA8A04", fontWeight: 600,
                  textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Read in full →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          7. DOCTRINE BLOCK
      ═══════════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: `80px ${sectionPad}`, background: "#3B1F0A" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
            color: "#CA8A04", marginBottom: 10, fontWeight: 500 }}>The Doctrine</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            flexWrap: "wrap", gap: 16, marginBottom: 48 }}>
            <h2 className="pf" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700,
              color: "#FDFAF6", letterSpacing: "-0.015em" }}>
              Why We Build
            </h2>
            <p className="lo" style={{ fontSize: 14, color: "rgba(253,250,246,0.4)", fontStyle: "italic", maxWidth: 360, lineHeight: 1.7 }}>
              For partners and investors who need to understand the root before the fruit.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            border: "1px solid rgba(253,250,246,0.08)", borderRadius: 16, overflow: "hidden" }}>
            {DOCTRINE.map((d, i) => (
              <div key={d.title} style={{
                padding: "32px 24px", background: "rgba(253,250,246,0.03)",
                borderRight: i < DOCTRINE.length - 1 ? "1px solid rgba(253,250,246,0.07)" : "none",
              }}>
                <span style={{ fontSize: 28, display: "block", marginBottom: 14 }}>{d.icon}</span>
                <h4 className="pf" style={{ fontSize: 16, fontWeight: 700, color: "#FDFAF6",
                  marginBottom: 10, lineHeight: 1.3 }}>{d.title}</h4>
                <p className="lo" style={{ fontSize: 13, color: "rgba(253,250,246,0.45)",
                  lineHeight: 1.78, fontStyle: "italic" }}>{d.body}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 56, borderTop: "1px solid rgba(253,250,246,0.1)", paddingTop: 40, maxWidth: 680 }}>
            <blockquote style={{ borderLeft: "2px solid #CA8A04", paddingLeft: 24 }}>
              <p className="pf" style={{ fontSize: "clamp(16px, 2vw, 21px)", fontStyle: "italic",
                color: "rgba(253,250,246,0.75)", lineHeight: 1.7, marginBottom: 12 }}>
                &ldquo;No fluff, no begging. Only calm thunder to realign youth toward integrity, sovereignty, truth-to-power.&rdquo;
              </p>
              <cite style={{ fontSize: 11, color: "#CA8A04", letterSpacing: "0.16em",
                textTransform: "uppercase", fontStyle: "normal" }}>Village Circle Daily Drop Doctrine</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          8. ENTER THE CIRCLE — EMAIL CAPTURE
      ═══════════════════════════════════════════════════════════════════════════ */}
      <section id="join" style={{ padding: `80px ${sectionPad}`, background: "#FFFFFF" }}>
        <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: 32, display: "block", marginBottom: 14 }}>🌱</span>
          <h2 className="pf" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700,
            color: "#3B1F0A", marginBottom: 10, letterSpacing: "-0.02em", lineHeight: 1.08 }}>
            Enter the Circle
          </h2>
          <p className="lo" style={{ fontSize: 16, color: "rgba(59,31,10,0.5)", fontStyle: "italic",
            lineHeight: 1.75, marginBottom: 36 }}>
            One email. No noise. Only when the seed breaks ground.
          </p>

          {!joined ? (
            <>
              <form onSubmit={e => { e.preventDefault(); if (email) setJoined(true); }}
                style={{ display: "flex", borderRadius: 10, overflow: "hidden",
                  border: "1.5px solid #F0E6D3", maxWidth: 420, margin: "0 auto 12px", background: "#FFFFFF" }}>
                <input
                  type="email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" required
                  style={{ flex: 1, padding: "14px 16px", background: "transparent", border: "none",
                    color: "#3B1F0A", fontSize: 15, outline: "none", fontFamily: BF }}
                />
                <button type="submit"
                  style={{ padding: "14px 22px", background: "#3B1F0A", border: "none",
                    color: "#FDFAF6", fontWeight: 700, fontSize: 12, letterSpacing: "0.12em",
                    textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap", fontFamily: BF }}>
                  Join →
                </button>
              </form>
              <a href="https://wa.me/2349000000000" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-block", fontSize: 13, color: "#CA8A04",
                  textDecoration: "none", marginBottom: 16, fontWeight: 500 }}>
                Or join on WhatsApp →
              </a>
            </>
          ) : (
            <div style={{ padding: "24px 32px", border: "1px solid rgba(202,138,4,0.25)",
              borderRadius: 12, background: "rgba(202,138,4,0.04)", maxWidth: 420, margin: "0 auto 16px" }}>
              <span style={{ fontSize: 24, display: "block", marginBottom: 8 }}>🌱</span>
              <p className="lo" style={{ color: "#CA8A04", fontSize: 16, fontStyle: "italic" }}>
                You&apos;re in the circle. The seed knows your name.
              </p>
            </div>
          )}

          <p className="lo" style={{ fontSize: 12, color: "rgba(59,31,10,0.28)", fontStyle: "italic" }}>
            No spam. No hustle theatre. Only when something real is ready.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          9. FOOTER
      ═══════════════════════════════════════════════════════════════════════════ */}
      <footer style={{ borderTop: "1px solid #F0E6D3", background: "#FDFAF6" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: `40px ${sectionPad} 24px` }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 32,
            alignItems: "start", marginBottom: 32 }}>

            {/* Left */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span>🌱</span>
                <span className="pf" style={{ fontWeight: 700, fontSize: 15, color: "#3B1F0A" }}>VillageCircle</span>
              </div>
              <p className="lo" style={{ fontSize: 12, color: "rgba(59,31,10,0.42)", lineHeight: 1.65,
                maxWidth: 220, fontStyle: "italic" }}>
                Where Conviction Becomes Code. A venture studio and publishing imprint rooted in African sovereignty.
              </p>
            </div>

            {/* Center */}
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(59,31,10,0.3)", marginBottom: 10 }}>Navigate</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {[["The Philosophy", "#philosophy"], ["Vibe Coders", "/vibe-coders"], ["Concepts", "#concepts"], ["Enter the Circle", "#join"]].map(([label, href]) => (
                  <Link key={label} href={href}
                    style={{ fontSize: 13, color: "rgba(59,31,10,0.55)", textDecoration: "none",
                      transition: "color 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#3B1F0A")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(59,31,10,0.55)")}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right */}
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(59,31,10,0.3)", marginBottom: 10 }}>BoldMind Ecosystem</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {([["AmeboGist", "https://amebogist.ng"], ["EduCenter", "https://educenter.com.ng"], ["BoldMind", "https://boldmind.ng"]] as [string, string][]).map(([label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 13, color: "rgba(59,31,10,0.55)", textDecoration: "none",
                      transition: "color 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#3B1F0A")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(59,31,10,0.55)")}>
                    {label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #F0E6D3", paddingTop: 18,
            display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 11, color: "rgba(59,31,10,0.32)" }}>
              #ReturnToTheCircle · © {new Date().getFullYear()} VillageCircle · BoldMind Technology
            </span>
            <a href="/privacy" style={{ fontSize: 11, color: "rgba(59,31,10,0.32)", textDecoration: "none" }}>
              Privacy (NDPA)
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

const phoneDisplay = "0412 345 678";
const phoneLink = "tel:+61412345678";
const smsLink = "sms:+61412345678";
const email = "quote@outlinedcarpentry.com.au";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const services = [
  { title: "Decking & Pergolas", desc: "Outdoor builds that look clean and last in Aussie weather." },
  { title: "Custom Wardrobes", desc: "Storage that actually fits your space (and your life)." },
  { title: "Cabinetry", desc: "Kitchen, laundry, and built-ins — tight lines, solid finish." },
  { title: "Feature Walls & Shelving", desc: "Make the room pop without it looking try-hard." },
  { title: "Repairs & Renovations", desc: "Doors, frames, skirting, fixes — done properly." },
  { title: "Small Commercial Fitouts", desc: "Reception, shelving, partitions — fast turnaround." },
];

const projects = [
  { title: "Merbau Deck — Campbelltown", tag: "Decking", img: "/projects/deck.jpg" },
  { title: "Pergola + Privacy Screens — Liverpool", tag: "Outdoor", img: "/projects/pergola.jpg" },
  { title: "Built-in Wardrobe — Oran Park", tag: "Wardrobes", img: "/projects/wardrobe.jpg" },
  { title: "Laundry Cabinetry Refresh — Camden", tag: "Cabinetry", img: "/projects/laundry.jpg" },
  { title: "Feature Wall + Floating Shelves — Leppington", tag: "Interiors", img: "/projects/featurewall.jpeg" },
  { title: "Outdoor Bench Seating — Narellan", tag: "Outdoor", img: "/projects/bench.jpg" },
];

const faqs = [
  { q: "Do you do free quotes?", a: "Yep. Send photos + your suburb and we’ll give a fast ballpark. If it needs a visit, we’ll book one." },
  { q: "How soon can you start?", a: "Usually 7–14 days depending on job size and materials. If it’s urgent, ask — sometimes we can squeeze it in." },
  { q: "Are you licensed and insured?", a: "Yes — licensed carpenter and insured for residential work." },
  { q: "What areas do you service?", a: "Sydney & surrounds (Campbelltown, Liverpool, Camden, Oran Park, Narellan + nearby)." },
  { q: "How do payments work?", a: "Small deposit to lock in materials/dates, then progress payments for bigger jobs. Clear and simple." },
];

// ---------- Intersection helper ----------
function useInViewOnce<T extends HTMLElement>(opts?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (!ref.current || seen) return;

    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        const [e] = entries;
        if (e.isIntersecting) {
          setSeen(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px", ...opts }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [seen, opts]);

  return { ref, seen };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, seen } = useInViewOnce<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${seen ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function CountUp({
  to,
  duration = 900,
  suffix = "",
  decimals = 0,
  className = "",
}: {
  to: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const { ref, seen } = useInViewOnce<HTMLSpanElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!seen) return;

    let raf = 0;
    const start = performance.now();
    const from = 0;

    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      // smooth ease out
      const eased = 1 - Math.pow(1 - p, 3);
      const v = from + (to - from) * eased;
      setValue(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, duration]);

  const formatted = value.toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  );
}

// ---------- UI bits ----------
function SectionTitle({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="inline-flex items-center gap-2 rounded-full border border-stone-200/70 bg-white/60 px-3 py-1 text-xs font-semibold text-stone-700 shadow-sm backdrop-blur">
        {kicker}
        <span className="h-1 w-1 rounded-full bg-amber-500/80" />
        Premium finish
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
        {title}
      </h2>
      {desc ? <p className="mt-3 text-base text-stone-600">{desc}</p> : null}
    </div>
  );
}

function GradientCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-3xl p-[1px]">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/70 via-white/30 to-white/50 opacity-70" />
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-400/25 via-stone-400/15 to-amber-200/20 blur-xl opacity-40" />
      <div className="relative rounded-3xl border border-stone-200/70 bg-white/65 shadow-[0_10px_35px_-25px_rgba(0,0,0,0.35)] backdrop-blur">
        {children}
      </div>
    </div>
  );
}

function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-b from-stone-950 to-stone-800 px-5 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-stone-900/10 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-amber-400/70 sheen overflow-hidden active:scale-[0.99] transition"
    >
      {children}
    </a>
  );
}

function SecondaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-2xl border border-stone-300/70 bg-white/60 px-5 py-3 text-sm font-semibold text-stone-900 shadow-sm backdrop-blur hover:bg-white/80 active:scale-[0.99] transition"
    >
      {children}
    </a>
  );
}

function PillNavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={[
        "rounded-full px-3 py-1.5 font-semibold transition",
        active
          ? "bg-stone-950 text-white shadow-sm ring-1 ring-stone-900/10"
          : "border border-transparent text-stone-700 hover:border-stone-200/70 hover:bg-white/70 hover:text-stone-950",
      ].join(" ")}
    >
      {children}
    </a>
  );
}

export default function Home() {
  const year = useMemo(() => new Date().getFullYear(), []);

  // Scroll progress bar
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const d = document.documentElement;
      const h = d.scrollHeight - d.clientHeight;
      const p = h > 0 ? d.scrollTop / h : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section pill nav
  const [active, setActive] = useState("#services");

  useEffect(() => {
    const ids = navItems.map((n) => n.href.replace("#", ""));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // pick the most visible intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActive(`#${visible.target.id}`);
      },
      {
        threshold: [0.1, 0.2, 0.35],
        rootMargin: "-15% 0px -70% 0px",
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Lightbox
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % projects.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + projects.length) % projects.length));
    };

    window.addEventListener("keydown", onKey);
    // lock scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIndex]);

  const current = openIndex !== null ? projects[openIndex] : null;

  return (
    <div className="min-h-screen bg-grain text-stone-900 pb-24 sm:pb-0">
      {/* Progress bar */}
      <div className="fixed left-0 top-0 z-[70] h-[3px] w-full">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-stone-950 to-amber-200"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      {/* Sticky header */}
      <header className="sticky top-0 z-50 border-b border-stone-200/60 bg-white/55 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#hero" className="flex items-center gap-2">
            <div className="relative h-9 w-9 rounded-xl bg-gradient-to-b from-stone-950 to-stone-700 text-white grid place-items-center font-bold shadow-sm">
              OC
              <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-amber-400 ring-2 ring-white/80" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Outlined Carpentry</p>
              <p className="text-xs text-stone-600">Sydney & Surrounds</p>
            </div>
          </a>

          <nav className="hidden items-center gap-2 text-sm sm:flex">
            {navItems.map((n) => (
              <PillNavLink key={n.href} href={n.href} active={active === n.href}>
                {n.label}
              </PillNavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={phoneLink}
              className="hidden rounded-full border border-stone-300/70 bg-white/60 px-3 py-2 text-sm font-semibold text-stone-900 shadow-sm backdrop-blur hover:bg-white/80 sm:inline-flex"
            >
              Call
            </a>
            <PrimaryLink href="#contact">Get a free quote</PrimaryLink>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-amber-300/15 blur-3xl" />
          <div className="absolute top-20 right-[-8rem] h-72 w-72 rounded-full bg-stone-400/10 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-stone-200/70 bg-white/60 px-3 py-1 text-xs font-semibold text-stone-700 shadow-sm backdrop-blur">
                Licensed • Insured • Fixed-price quotes
              </p>

              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Custom carpentry built to last.
                <span className="block text-stone-600">Clean finishes. Clear quotes.</span>
              </h1>

              <p className="mt-4 text-base text-stone-600 sm:text-lg">
                Decks, pergolas, wardrobes, cabinetry & renovations across Sydney and surrounds.
                We show up, communicate, and leave the place tidy.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <PrimaryLink href="#contact">Get a free quote</PrimaryLink>
                <SecondaryLink href={smsLink}>Text us</SecondaryLink>
                <SecondaryLink href={phoneLink}>{phoneDisplay}</SecondaryLink>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
                <Reveal delay={120}>
                  <GradientCard>
                    <div className="p-4">
                      <p className="text-lg font-bold">
                        <CountUp to={300} suffix="+" className="tabular-nums" />
                      </p>
                      <p className="text-stone-600">Jobs completed</p>
                    </div>
                  </GradientCard>
                </Reveal>

                <Reveal delay={240}>
                  <GradientCard>
                    <div className="p-4">
                      <p className="text-lg font-bold">
                        <CountUp to={5.0} decimals={1} suffix="★" className="tabular-nums" />
                      </p>
                      <p className="text-stone-600">Local rating</p>
                    </div>
                  </GradientCard>
                </Reveal>

                <Reveal delay={360}>
                  <GradientCard>
                    <div className="p-4">
                      <p className="text-lg font-bold tabular-nums">7–14 days</p>
                      <p className="text-stone-600">Typical start</p>
                    </div>
                  </GradientCard>
                </Reveal>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative">
              <GradientCard>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src="/hero.jpeg"
                    alt="Custom carpentry work"
                    fill
                    priority
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/25 via-transparent to-white/10" />
                </div>
              </GradientCard>

              <div className="pointer-events-none absolute -bottom-6 -left-6 hidden sm:block">
                <GradientCard>
                  <div className="p-5">
                    <p className="text-sm font-semibold">“Quality work, no stress.”</p>
                    <p className="text-xs text-stone-600">— Alex, Campbelltown</p>
                  </div>
                </GradientCard>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-stone-200/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <Reveal>
            <SectionTitle
              kicker="SERVICES"
              title="What we build"
              desc="Pick one job or bundle a few — we’ll quote it clearly and build it clean."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={80 + i * 70}>
                <GradientCard>
                  <div className="p-6">
                    <h3 className="text-base font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-stone-600">{s.desc}</p>
                    <div className="mt-5 h-px w-full bg-gradient-to-r from-amber-300/40 via-stone-200/60 to-transparent" />
                    <p className="mt-3 text-xs font-semibold text-stone-700">
                      Done clean • Built solid • No fluff
                    </p>
                  </div>
                </GradientCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-10">
              <GradientCard>
                <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                  <div>
                    <p className="text-base font-semibold">Not sure what you need?</p>
                    <p className="mt-1 text-sm text-stone-600">
                      Send photos + suburb and we’ll tell you the best fix and a rough cost range.
                    </p>
                  </div>
                  <PrimaryLink href="#contact">Send details</PrimaryLink>
                </div>
              </GradientCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="border-t border-stone-200/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <Reveal>
            <SectionTitle
              kicker="PROJECTS"
              title="Recent builds"
              desc="Click any project to view it full-screen. Arrow keys work too."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={80 + i * 80}>
                <GradientCard>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    className="group w-full text-left overflow-hidden rounded-3xl focus:outline-none"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={p.img}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/45 via-transparent to-white/10 opacity-90" />
                      <div className="absolute left-4 top-4 rounded-full border border-white/50 bg-white/25 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                        {p.tag}
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-sm font-semibold">{p.title}</p>
                      <p className="mt-1 text-xs text-stone-600">
                        View <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                      </p>
                    </div>
                  </button>
                </GradientCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="border-t border-stone-200/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <Reveal>
            <SectionTitle
              kicker="REVIEWS"
              title="Homeowners rate us 5 stars"
              desc="Swap these for real Google reviews when it’s a real client."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {[
              { name: "Alex M.", area: "Campbelltown", text: "Turned up on time, quote was clear, and the finish is spotless. Zero drama." },
              { name: "Sarah L.", area: "Liverpool", text: "Pergola looks unreal. They cleaned up properly too — rare these days." },
              { name: "Nathan R.", area: "Camden", text: "Built-in wardrobes came out perfect. Good communication the whole way." },
            ].map((r, i) => (
              <Reveal key={r.name} delay={80 + i * 90}>
                <GradientCard>
                  <div className="p-6">
                    <p className="text-sm text-stone-700">“{r.text}”</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-sm font-semibold">{r.name}</p>
                      <p className="text-xs text-stone-600">{r.area}</p>
                    </div>
                  </div>
                </GradientCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-stone-200/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <Reveal>
            <SectionTitle kicker="FAQ" title="Common questions" />
          </Reveal>

          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={60 + i * 70}>
                <GradientCard>
                  <details className="group rounded-3xl p-5 open:bg-white/35">
                    <summary className="cursor-pointer list-none text-sm font-semibold">
                      {f.q}
                      <span className="float-right text-stone-500 transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm text-stone-600">{f.a}</p>
                  </details>
                </GradientCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-stone-200/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <Reveal>
            <SectionTitle
              kicker="CONTACT"
              title="Get a fast quote"
              desc="Tell us what you need. Add photos if you can. We’ll reply with next steps."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal delay={80}>
              <GradientCard>
                <div className="p-6 sm:p-8">
                  <h3 className="text-base font-semibold">Contact details</h3>
                  <p className="mt-2 text-sm text-stone-600">
                    Prefer quick? Call or text. Prefer organised? Use the form.
                  </p>

                  <div className="mt-6 space-y-3 text-sm">
                    <a className="block rounded-2xl border border-stone-200/70 bg-white/55 p-4 shadow-sm backdrop-blur hover:bg-white/80" href={phoneLink}>
                      <p className="text-xs text-stone-600">Phone</p>
                      <p className="font-semibold">{phoneDisplay}</p>
                    </a>
                    <a className="block rounded-2xl border border-stone-200/70 bg-white/55 p-4 shadow-sm backdrop-blur hover:bg-white/80" href={smsLink}>
                      <p className="text-xs text-stone-600">Text</p>
                      <p className="font-semibold">Send a message</p>
                    </a>
                    <a className="block rounded-2xl border border-stone-200/70 bg-white/55 p-4 shadow-sm backdrop-blur hover:bg-white/80" href={`mailto:${email}`}>
                      <p className="text-xs text-stone-600">Email</p>
                      <p className="font-semibold">{email}</p>
                    </a>
                  </div>

                  <div className="mt-6 overflow-hidden rounded-2xl border border-stone-200/70 bg-white/40 shadow-sm backdrop-blur">
                    <div className="relative h-56 w-full">
                      <iframe
                        title="Service area map"
                        src="https://www.google.com/maps?q=-34.058178,150.695887&z=16&output=embed"
                        className="h-full w-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      />
                    </div>
                    <div className="border-t border-stone-200/60 px-4 py-3 text-xs text-stone-600">
                      Demo location: Camden NSW • Swap this to the client’s address later.
                    </div>
                  </div>
                </div>
              </GradientCard>
            </Reveal>

            <Reveal delay={140}>
              <GradientCard>
                <div className="p-6 sm:p-8">
                  <h3 className="text-base font-semibold">Quote request</h3>

                  <form
                    className="mt-6 space-y-4"
                    action={`mailto:${email}`}
                    method="post"
                    encType="text/plain"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-xs font-semibold text-stone-700">Name</label>
                        <input
                          name="name"
                          required
                          className="mt-2 w-full rounded-2xl border border-stone-200/70 bg-white/55 px-4 py-3 text-sm outline-none shadow-sm backdrop-blur focus:ring-2 focus:ring-amber-400/70"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-stone-700">Phone</label>
                        <input
                          name="phone"
                          required
                          className="mt-2 w-full rounded-2xl border border-stone-200/70 bg-white/55 px-4 py-3 text-sm outline-none shadow-sm backdrop-blur focus:ring-2 focus:ring-amber-400/70"
                          placeholder="04xx xxx xxx"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-xs font-semibold text-stone-700">Suburb</label>
                        <input
                          name="suburb"
                          className="mt-2 w-full rounded-2xl border border-stone-200/70 bg-white/55 px-4 py-3 text-sm outline-none shadow-sm backdrop-blur focus:ring-2 focus:ring-amber-400/70"
                          placeholder="e.g. Camden"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-stone-700">Service</label>
                        <select
                          name="service"
                          className="mt-2 w-full rounded-2xl border border-stone-200/70 bg-white/55 px-4 py-3 text-sm outline-none shadow-sm backdrop-blur focus:ring-2 focus:ring-amber-400/70"
                          defaultValue="Decking"
                        >
                          <option>Decking</option>
                          <option>Pergola</option>
                          <option>Wardrobes</option>
                          <option>Cabinetry</option>
                          <option>Repairs</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-700">Details</label>
                      <textarea
                        name="details"
                        rows={5}
                        className="mt-2 w-full rounded-2xl border border-stone-200/70 bg-white/55 px-4 py-3 text-sm outline-none shadow-sm backdrop-blur focus:ring-2 focus:ring-amber-400/70"
                        placeholder="What do you want built? Approx size? Any deadlines?"
                      />
                    </div>

                    <button
                      type="submit"
                      className="relative w-full rounded-2xl bg-gradient-to-b from-stone-950 to-stone-800 px-5 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-stone-900/10 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-amber-400/70 sheen overflow-hidden active:scale-[0.99] transition"
                    >
                      Send quote request
                    </button>

                    <p className="text-xs text-stone-600">
                      ()
                    </p>
                  </form>
                </div>
              </GradientCard>
            </Reveal>
          </div>

          <footer className="mt-10 border-t border-stone-200/60 pt-8 text-center text-xs text-stone-600">
            © {year} Outlined Carpentry — Sydney & Surrounds.
          </footer>
        </div>
      </section>

      {/* Mobile floating CTA */}
      <div className="fixed bottom-4 left-1/2 z-[60] w-[min(92%,28rem)] -translate-x-1/2 sm:hidden">
        <div className="rounded-full border border-stone-200/70 bg-white/70 p-2 shadow-lg backdrop-blur">
          <div className="flex gap-2">
            <a
              href={phoneLink}
              className="flex-1 rounded-full border border-stone-200/70 bg-white/70 px-4 py-2 text-center text-sm font-semibold text-stone-900"
            >
              Call
            </a>
            <a
              href={smsLink}
              className="flex-1 rounded-full border border-stone-200/70 bg-white/70 px-4 py-2 text-center text-sm font-semibold text-stone-900"
            >
              Text
            </a>
            <a
              href="#contact"
              className="flex-[1.2] rounded-full bg-stone-950 px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Quote
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox modal */}
      {current && openIndex !== null && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={() => setOpenIndex(null)}
          />
          <div className="modal-pop relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-stone-950/35 shadow-2xl">
            <div className="relative aspect-[16/10] bg-black">
              <Image src={current.img} alt={current.title} fill className="object-contain" />
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 bg-white/10 px-5 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{current.title}</p>
                <p className="text-xs text-white/70">{current.tag} • Click outside to close • Esc works</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setOpenIndex((i) => (i === null ? i : (i - 1 + projects.length) % projects.length))}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15"
                >
                  Prev
                </button>
                <button
                  onClick={() => setOpenIndex((i) => (i === null ? i : (i + 1) % projects.length))}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15"
                >
                  Next
                </button>
                <button
                  onClick={() => setOpenIndex(null)}
                  className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-stone-950 hover:bg-white/90"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// src/app/page.tsx
import Image from "next/image";

const phoneDisplay = "0412 345 678";
const phoneLink = "tel:+61412345678";
const smsLink = "sms:+61412345678";
const email = "quote@outlinedcarpentry.com.au";

const services = [
  {
    title: "Decking & Pergolas",
    desc: "Outdoor builds that look clean and last in Aussie weather.",
  },
  {
    title: "Custom Wardrobes",
    desc: "Storage that actually fits your space (and your life).",
  },
  {
    title: "Cabinetry",
    desc: "Kitchen, laundry, and built-ins — tight lines, solid finish.",
  },
  {
    title: "Feature Walls & Shelving",
    desc: "Make the room pop without it looking try-hard.",
  },
  {
    title: "Repairs & Renovations",
    desc: "Doors, frames, skirting, fixes — done properly the first time.",
  },
  {
    title: "Small Commercial Fitouts",
    desc: "Reception, shelving, partitions — fast turnaround.",
  },
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
  {
    q: "Do you do free quotes?",
    a: "Yep. Send photos + your suburb, and we’ll give a ballpark fast. If it needs a site visit, we’ll book one.",
  },
  {
    q: "How soon can you start?",
    a: "Usually 7–14 days depending on job size and materials. If it’s urgent, ask — sometimes we can squeeze it in.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes — licensed carpenter and fully insured for residential work.",
  },
  {
    q: "What areas do you service?",
    a: "Sydney & surrounds (Campbelltown, Liverpool, Camden, Oran Park, Narellan + nearby).",
  },
  {
    q: "How do payments work?",
    a: "Small deposit to lock in materials/dates, then progress payments for bigger jobs. Simple and clear.",
  },
];

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
      <p className="text-sm font-semibold tracking-wide text-neutral-600">{kicker}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
        {title}
      </h2>
      {desc ? <p className="mt-3 text-base text-neutral-600">{desc}</p> : null}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#hero" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-neutral-900 text-white grid place-items-center font-bold">
              OC
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Outlined Carpentry</p>
              <p className="text-xs text-neutral-600">Sydney & Surrounds</p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-neutral-700 sm:flex">
            <a className="hover:text-neutral-950" href="#services">Services</a>
            <a className="hover:text-neutral-950" href="#projects">Projects</a>
            <a className="hover:text-neutral-950" href="#reviews">Reviews</a>
            <a className="hover:text-neutral-950" href="#faq">FAQ</a>
            <a className="hover:text-neutral-950" href="#contact">Contact</a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={phoneLink}
              className="hidden rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 sm:inline-flex"
            >
              Call
            </a>
            <a
              href="#contact"
              className="rounded-xl bg-neutral-900 px-3 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              Get a free quote
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700">
              Licensed • Insured • Fixed-price quotes
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Custom carpentry built to last.
              <span className="block text-neutral-600">Clean finishes. Clear quotes.</span>
            </h1>
            <p className="mt-4 text-base text-neutral-600 sm:text-lg">
              Decks, pergolas, wardrobes, cabinetry & renovations across Sydney and surrounds.
              We show up, communicate, and leave the place tidy.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
              >
                Get a free quote
              </a>
              <a
                href={smsLink}
                className="rounded-2xl border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
              >
                Text us
              </a>
              <a
                href={phoneLink}
                className="rounded-2xl border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
              >
                {phoneDisplay}
              </a>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-2xl border border-neutral-200 p-4">
                <p className="text-lg font-bold">300+</p>
                <p className="text-neutral-600">Jobs completed</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 p-4">
                <p className="text-lg font-bold">5.0★</p>
                <p className="text-neutral-600">Local rating</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 p-4">
                <p className="text-lg font-bold">7–14 days</p>
                <p className="text-neutral-600">Typical start</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100">
              <Image
                src="/hero.jpeg"
                alt="Custom carpentry work"
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="pointer-events-none absolute -bottom-6 -left-6 hidden rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:block">
              <p className="text-sm font-semibold">“Quality work, no stress.”</p>
              <p className="text-xs text-neutral-600">— Alex, Campbelltown</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionTitle
            kicker="SERVICES"
            title="What we build"
            desc="Pick one job or bundle a few — we’ll quote it clearly and build it clean."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="rounded-3xl border border-neutral-200 bg-white p-6">
                <h3 className="text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-base font-semibold">Not sure what you need?</p>
                <p className="mt-1 text-sm text-neutral-600">
                  Send photos + suburb and we’ll tell you the best fix and a rough cost range.
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex justify-center rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
              >
                Send details
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionTitle
            kicker="PROJECTS"
            title="Recent builds"
            desc="Swap these images later — the structure stays the same for every client."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <div key={p.title} className="overflow-hidden rounded-3xl border border-neutral-200">
                <div className="relative aspect-[4/3] bg-neutral-100">
                  <Image src={p.img} alt={p.title} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="text-sm font-semibold">{p.title}</p>
                  <p className="mt-1 text-xs text-neutral-600">View details →</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionTitle
            kicker="REVIEWS"
            title="Homeowners rate us 5 stars"
            desc="These are placeholders — we’ll swap to real Google reviews for real clients."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {[
              { name: "Alex M.", area: "Campbelltown", text: "Turned up on time, quote was clear, and the finish is spotless. Zero drama." },
              { name: "Sarah L.", area: "Liverpool", text: "Pergola looks unreal. They cleaned up properly too — rare these days." },
              { name: "Nathan R.", area: "Camden", text: "Built-in wardrobes came out perfect. Good communication the whole way." },
            ].map((r) => (
              <div key={r.name} className="rounded-3xl border border-neutral-200 bg-white p-6">
                <p className="text-sm text-neutral-700">“{r.text}”</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-neutral-600">{r.area}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionTitle kicker="FAQ" title="Common questions" />

          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-3xl border border-neutral-200 p-5 open:bg-neutral-50"
              >
                <summary className="cursor-pointer list-none text-sm font-semibold">
                  {f.q}
                  <span className="float-right text-neutral-500 group-open:rotate-45 transition">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-neutral-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionTitle
            kicker="CONTACT"
            title="Get a fast quote"
            desc="Tell us what you need. Add photos if you can. We’ll reply with next steps."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8">
              <h3 className="text-base font-semibold">Contact details</h3>
              <p className="mt-2 text-sm text-neutral-600">
                Prefer quick? Call or text. Prefer organised? Use the form.
              </p>

              <div className="mt-6 space-y-3 text-sm">
                <a className="block rounded-2xl border border-neutral-200 p-4 hover:bg-neutral-50" href={phoneLink}>
                  <p className="text-xs text-neutral-600">Phone</p>
                  <p className="font-semibold">{phoneDisplay}</p>
                </a>
                <a className="block rounded-2xl border border-neutral-200 p-4 hover:bg-neutral-50" href={smsLink}>
                  <p className="text-xs text-neutral-600">Text</p>
                  <p className="font-semibold">Send a message</p>
                </a>
                <a className="block rounded-2xl border border-neutral-200 p-4 hover:bg-neutral-50" href={`mailto:${email}`}>
                  <p className="text-xs text-neutral-600">Email</p>
                  <p className="font-semibold">{email}</p>
                </a>
              </div>

              <div className="mt-6 rounded-2xl bg-neutral-50 p-4 text-xs text-neutral-600">
                Tip: for real clients, add a Google Map embed + service suburbs here.
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8">
              <h3 className="text-base font-semibold">Quote request</h3>

              {/* Simple mailto form (works instantly, no backend needed) */}
              <form
                className="mt-6 space-y-4"
                action={`mailto:${email}`}
                method="post"
                encType="text/plain"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-neutral-700">Name</label>
                    <input
                      name="name"
                      required
                      className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-neutral-900"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-700">Phone</label>
                    <input
                      name="phone"
                      required
                      className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-neutral-900"
                      placeholder="04xx xxx xxx"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-neutral-700">Suburb</label>
                    <input
                      name="suburb"
                      className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-neutral-900"
                      placeholder="e.g. Camden"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-700">Service</label>
                    <select
                      name="service"
                      className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-neutral-900"
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
                  <label className="text-xs font-semibold text-neutral-700">Details</label>
                  <textarea
                    name="details"
                    rows={5}
                    className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-neutral-900"
                    placeholder="What do you want built? Approx size? Any deadlines?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
                >
                  Send quote request
                </button>

                <p className="text-xs text-neutral-600">
                  (This uses your email app. For real clients we’ll upgrade to a proper form endpoint.)
                </p>
              </form>
            </div>
          </div>

          <footer className="mt-10 border-t border-neutral-200 pt-8 text-center text-xs text-neutral-600">
            © {new Date().getFullYear()} Outlined Carpentry — Sydney & Surrounds.
          </footer>
        </div>
      </section>
    </div>
  );
}

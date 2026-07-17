/*
 * STYLE: Blueprint Studio wireframe kit, Hitachi-branded (ideas.md)
 * Brand rules applied: HITACHI logo leads in red #b1000e; "Global Air Power"
 * wordmark subordinate, black/grey, NEVER red. CTAs use Hitachi Red.
 * Nav labels + phone mirror the live site. Mobile-first: hamburger < lg,
 * persistent CONTACT US, 44px tap targets.
 */
import { createContext, useContext, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Menu, MapPin, Phone, Search } from "lucide-react";

/* ---------------- Annotation system ---------------- */

const NotesCtx = createContext<{ show: boolean }>({ show: true });

export function Note({ n, className = "" }: { n: number; className?: string }) {
  const { show } = useContext(NotesCtx);
  if (!show) return null;
  return (
    <span
      className={`wf-note absolute -top-2.5 -left-2.5 z-20 ${className}`}
      title={`Annotation ${n}`}
    >
      {n}
    </span>
  );
}

export interface NoteDef {
  n: number;
  title: string;
  body: string;
}

/* ---------------- Kit shell ---------------- */

export function KitShell({
  page,
  notes,
  children,
}: {
  page: "list" | "product" | "cover" | "home" | "brand" | "category" | "industries" | "industry";
  notes?: NoteDef[];
  children: ReactNode;
}) {
  const [showNotes, setShowNotes] = useState(true);
  const [location] = useLocation();

  const tabs = [
    { path: "/", label: "00 Cover" },
    { path: "/product-list", label: "01 Product List" },
    { path: "/product-page", label: "02 Product Page" },
    { path: "/homepage", label: "03 Homepage" },
    { path: "/brand-page", label: "04 Brand" },
    { path: "/category-page", label: "05 Category" },
    { path: "/industry-archive", label: "06 Industries" },
    { path: "/industry-page", label: "07 Industry" },
  ];

  return (
    <NotesCtx.Provider value={{ show: showNotes }}>
      <div className="min-h-screen blueprint-bg">
        {/* Kit toolbar */}
        <div className="sticky top-0 z-50 bg-[oklch(0.22_0.005_90)] text-[oklch(0.9_0.002_90)]">
          <div className="flex items-center gap-0 h-11 px-4">
            <span className="font-mono text-[11px] font-semibold tracking-[0.14em] uppercase whitespace-nowrap">
              HGAP / Wireframe Kit v2.0 · Branded
            </span>
            <span className="mx-4 h-5 w-px bg-white/20 hidden sm:block" />
            <nav className="flex items-center gap-1 overflow-x-auto">
              {tabs.map((t) => (
                <Link
                  key={t.path}
                  href={t.path}
                  className={`font-mono text-[11px] tracking-wide uppercase px-3 py-1.5 whitespace-nowrap transition-colors duration-150 ${
                    location === t.path
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-white/10"
                  }`}
                >
                  {t.label}
                </Link>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-3">
              {page !== "cover" && (
                <button
                  onClick={() => setShowNotes((s) => !s)}
                  className={`font-mono text-[11px] uppercase tracking-wide px-3 py-1.5 border transition-colors duration-150 ${
                    showNotes
                      ? "border-primary text-primary-foreground bg-primary"
                      : "border-white/30 text-white/70 hover:bg-white/10"
                  }`}
                >
                  Annotations {showNotes ? "ON" : "OFF"}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
          {children}

          {/* Rationale panel */}
          {notes && notes.length > 0 && (
            <section className="mt-10 wf-sheet p-6 lg:p-8">
              <p className="wf-kicker mb-1">Annotation index</p>
              <h2 className="font-sans font-bold text-xl mb-5">
                Why each section exists
              </h2>
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-5">
                {notes.map((d) => (
                  <div key={d.n} className="flex gap-3">
                    <span className="wf-note relative !-top-0 !-left-0">{d.n}</span>
                    <div>
                      <p className="font-sans font-semibold text-sm leading-tight">
                        {d.title}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {d.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground mt-8 text-center">
            Wireframe — structure &amp; functionality only. Not visual design. ·
            Hitachi Global Air Power Australia rebuild · Prepared{" "}
            {new Date().toLocaleDateString("en-AU", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </NotesCtx.Provider>
  );
}

/* ---------------- Wireframed HGAP site chrome ---------------- */

export function WfUtilityBar() {
  return (
    <div className="flex items-center justify-between px-4 lg:px-8 h-9 bg-[#2d2d2d] text-white/80 text-[11px]">
      <span className="flex items-center gap-1.5">
        <span className="hitachi-mark text-[12px] !text-white">HITACHI</span>
        <span className="text-white/50">Inspire the Next · Group corporate strip</span>
      </span>
      <div className="flex items-center gap-5">
        <a className="flex items-center gap-1 font-semibold text-white">
          <Phone className="w-3 h-3" /> 1300 266 773
        </a>
        <span className="hidden md:flex items-center gap-1">
          <MapPin className="w-3 h-3" /> Branch Locations (6 AU)
        </span>
      </div>
    </div>
  );
}

export function WfHeader({ active }: { active?: "products" | "industries" }) {
  // Live-site nav labels + new Industries entry (approved IA change)
  const nav = [
    "Products",
    "Industries",
    "Solutions",
    "Services and Parts",
    "Branch Locations",
    "Insights",
  ];
  const activeLabel =
    active === "products" ? "Products" : active === "industries" ? "Industries" : null;
  return (
    <header className="relative border-b bg-card sticky top-11 z-40">
      <div className="flex items-center gap-4 px-4 lg:px-8 h-16 min-h-[64px]">
        {/* Brand lockup: HITACHI mark leads (red), wordmark subordinate (never red) */}
        <div className="flex flex-col justify-center flex-none leading-none">
          <span className="hitachi-mark text-[19px]">HITACHI</span>
          <span className="hitachi-wordmark text-[9.5px] mt-0.5">
            GLOBAL AIR POWER
          </span>
        </div>
        <nav className="hidden lg:flex items-center gap-0.5 ml-4">
          {nav.map((item) => (
            <span
              key={item}
              className={`flex items-center gap-1 text-[13px] font-medium px-2.5 py-2 whitespace-nowrap ${
                item === activeLabel
                  ? "text-primary border-b-2 border-primary font-bold"
                  : "text-foreground/80"
              }`}
            >
              {item}
              <ChevronDown className="w-3 h-3 opacity-50" />
            </span>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2.5">
          <span className="hidden md:flex items-center justify-center w-11 h-11 border">
            <Search className="w-4 h-4 text-muted-foreground" />
          </span>
          {/* Live-site CTA label, kept identical (uppercase) */}
          <span className="bg-primary text-primary-foreground text-[13px] font-bold tracking-wide px-4 py-3 min-h-[44px] flex items-center">
            CONTACT US
          </span>
          {/* Mobile-first: hamburger ≥44px tap target below lg */}
          <span className="lg:hidden flex items-center justify-center w-11 h-11 border">
            <Menu className="w-5 h-5" />
          </span>
        </div>
      </div>
    </header>
  );
}

export function WfFooter() {
  const cols: Array<[string, string[]]> = [
    ["Products", ["All Products", "Stationary Air Compressors", "Portable Air Compressors", "Oil Flooded", "Oil Free Air Compressors", "Air Compressor Accessories"]],
    ["Company", ["About Us", "Branch Locations", "Careers", "Insights"]],
    ["Support", ["Services and Parts", "Industries", "Airlinx™ Remote Monitoring", "Contact Us"]],
  ];
  return (
    <footer className="bg-[#111] text-background/85 px-4 lg:px-8 py-10">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          {/* Reversed lockup: HITACHI red mark holds; wordmark white (never red) */}
          <div className="mb-4 leading-none">
            <span className="hitachi-mark text-[17px]">HITACHI</span>
            <br />
            <span className="hitachi-wordmark text-[9px] !text-white/80">
              GLOBAL AIR POWER
            </span>
          </div>
          <p className="text-xs leading-relaxed text-background/60">
            Part of Hitachi Industrial Equipment Systems. Compressed air
            solutions sold &amp; serviced across Australia.
          </p>
        </div>
        {cols.map(([title, items]) => (
          <div key={title}>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-background/50 mb-3">
              {title}
            </p>
            <ul className="space-y-2 text-[13px]">
              {items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/15 mt-8 pt-4 flex flex-wrap gap-4 justify-between font-mono text-[10px] uppercase tracking-wide text-background/50">
        <span>© Hitachi Global Air Power Australia</span>
        <span>Privacy · Terms · Sitemap · Hitachi Group links</span>
      </div>
    </footer>
  );
}

/* ---------------- Small wireframe primitives ---------------- */

export function ImgPh({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={`wf-img ${className}`}>
      <span className="wf-img-label">{label}</span>
    </div>
  );
}

export function SheetTitle({
  code,
  title,
  desc,
}: {
  code: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="wf-kicker mb-1">{code}</p>
        <h1 className="font-sans font-bold text-2xl lg:text-3xl">{title}</h1>
      </div>
      <p className="text-sm text-muted-foreground max-w-md">{desc}</p>
    </div>
  );
}

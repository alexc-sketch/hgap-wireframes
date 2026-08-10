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
        {/* Kit toolbar - navigation chrome, kept in English in lorem mode */}
        <div data-no-lorem className="sticky top-0 z-50 bg-[oklch(0.22_0.005_90)] text-[oklch(0.9_0.002_90)]">
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
            Wireframe - structure &amp; functionality only. Not visual design. ·
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

/* GLOBAL HEADER. The bespoke WfUtilityBar / WfHeader pair has been retired: it
   mixed brand, utility and navigation in ways the Hitachi group standard does not
   permit (dark utility strip, red CONTACT US button inside the nav row, no
   region selector). Both names now re-export the single compliant global header
   from WfGlobalHeader so every template renders identical chrome.
   Spec: /home/ubuntu/sitecheck/global_header_spec.md */
export { WfGlobalHeader } from "./WfMegaMenu";
import { WfGlobalHeader as GlobalHeader } from "./WfMegaMenu";

/** Retired: the global header now owns the utility row. Renders nothing so
 *  templates that still call it do not double up the brand row. */
export function WfUtilityBar() {
  return null;
}

/** Back-compat wrapper: maps the old active values onto global nav labels. */
export function WfHeader({ active }: { active?: "products" | "industries" }) {
  const label =
    active === "products" ? "All Products" : active === "industries" ? "Industries" : undefined;
  return <GlobalHeader active={label} />;
}

/* Minimal global newsletter strip: rendered above the footer on every template.
   One row: label + email field + SUBSCRIBE. GUTENBERG: build once inside the
   footer template part (or as a synced pattern) so it is global with no plugin,
   wired to the email platform with double opt-in. */
export function WfNewsletter() {
  return (
    <section className="border-t bg-secondary/60 px-4 lg:px-8 py-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <div className="flex-none">
          <p className="font-semibold text-[15px]">Subscribe to our mailing list</p>
          <p className="text-[12px] text-muted-foreground">Product news and service offers. Unsubscribe any time.</p>
        </div>
        <form
          className="flex flex-1 gap-2"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Mailing list signup"
        >
          <input
            type="email"
            placeholder="Email address"
            className="border bg-card px-4 py-3 text-sm min-h-[44px] flex-1 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground font-bold text-sm px-6 min-h-[44px] hover:opacity-90 active:scale-[0.97] transition duration-150"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
}

export function WfFooter() {
  const cols: Array<[string, string[]]> = [
    ["Products", ["All Products", "Stationary Air Compressors", "Portable Air Compressors", "Oil Flooded", "Oil Free Air Compressors", "Air Compressor Accessories"]],
    ["Company", ["About Us", "Branch Locations", "Careers", "Insights"]],
    ["Support", ["Services and Parts", "Industries", "Airlinx™ Remote Monitoring", "Contact Us"]],
  ];
  return (
    <>
    <WfNewsletter />
    <footer data-no-lorem className="bg-[#111] text-background/85 px-4 lg:px-8 py-10">
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
    </>
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

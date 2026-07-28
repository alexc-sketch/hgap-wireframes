/*
 * STYLE: Blueprint Studio wireframe kit, Hitachi-branded (ideas.md)
 * Functioning mega menu modelled on The Plus Addons for Elementor mega menu:
 * full-width panel under the header, multi-column link lists, a featured
 * promo card, hover + click + keyboard open, mobile accordion fallback.
 * Structure driven by the client's WIP sitemap (pasted_content_3.txt):
 *   All Products / Solutions / Services & Parts / Industries / About Us / Careers
 * Sharp geometry (radius 0), Hitachi Red active states only, no gradients.
 * NOTE: keep data-no-lorem so navigation stays English in lorem mode.
 */
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Box,
  ChevronDown,
  Factory,
  Menu,
  Phone,
  Search,
  Wifi,
  X,
} from "lucide-react";

interface MegaColumn {
  heading: string;
  links: { label: string; meta?: string }[];
}

interface NavEntry {
  label: string;
  columns?: MegaColumn[];
  promo?: { kicker: string; title: string; copy: string; cta: string };
  simple?: string[];
}

/* Sitemap-driven nav model (client WIP sitemap, typos corrected) */
const NAV: NavEntry[] = [
  {
    label: "All Products",
    columns: [
      {
        heading: "By configuration",
        links: [
          { label: "Stationary Air Compressors", meta: "217 SKUs" },
          { label: "Portable Air Compressors", meta: "33 SKUs" },
          { label: "Air Compressor Accessories", meta: "Dryers, filtration, receivers" },
        ],
      },
      {
        heading: "By air type",
        links: [
          { label: "Oil Flooded", meta: "165 SKUs (re-title of Oil Injected)" },
          { label: "Oil Free Air Compressors", meta: "85 SKUs" },
        ],
      },
      {
        heading: "Our Brands",
        links: [
          { label: "Sullair", meta: "Industrial and portable" },
          { label: "Champion", meta: "Workshop and trade" },
          { label: "Hitachi", meta: "Oil free technology" },
        ],
      },
    ],
    promo: {
      kicker: "Featured",
      title: "Browse the full catalogue",
      copy: "150 models across 44 series, filterable by pressure, power and flow.",
      cta: "View all products",
    },
  },
  {
    label: "Solutions",
    columns: [
      {
        heading: "Solutions",
        links: [
          { label: "Managed Air Power Service", meta: "Compressed air as a utility" },
          { label: "AirLinx Remote Monitoring", meta: "IoT platform, 112 ready SKUs" },
          { label: "Rental Fleet Solutions", meta: "For rental companies" },
        ],
      },
    ],
    promo: {
      kicker: "AirLinx",
      title: "See your whole fleet in one dashboard",
      copy: "Live performance, fault alerts and energy reporting on every connected compressor.",
      cta: "Explore AirLinx",
    },
  },
  { label: "Services & Parts", simple: [] },
  {
    label: "Industries",
    columns: [
      {
        heading: "Industries",
        links: [
          { label: "Agriculture" },
          { label: "Construction" },
          { label: "Food & Beverage" },
        ],
      },
      {
        heading: "\u00a0",
        links: [
          { label: "Manufacturing" },
          { label: "Mining" },
          { label: "Pharmaceutical" },
        ],
      },
    ],
    promo: {
      kicker: "Industry expertise",
      title: "Compressed air engineered for your sector",
      copy: "Application guides and case studies for six core Australian industries.",
      cta: "View all industries",
    },
  },
  {
    label: "About Us",
    columns: [
      {
        heading: "About Us",
        links: [
          { label: "Branch Locations", meta: "6 across Australia" },
          { label: "Insights", meta: "Articles and guides" },
          { label: "Case Studies", meta: "31 in the library" },
        ],
      },
    ],
  },
  { label: "Careers", simple: [] },
];

function MegaPanel({ entry, onClose }: { entry: NavEntry; onClose: () => void }) {
  if (!entry.columns) return null;
  const iconFor = (label: string) =>
    label === "All Products" ? Box : label === "Industries" ? Factory : Wifi;
  const Icon = iconFor(entry.label);
  return (
    <div
      className="absolute left-0 right-0 top-full z-50 border-b-2 border-foreground bg-card shadow-[0_16px_32px_-16px_rgba(0,0,0,0.25)] animate-in fade-in slide-in-from-top-1 duration-150"
      role="region"
      aria-label={`${entry.label} menu`}
    >
      <div className="grid lg:grid-cols-[1fr_280px]">
        <div
          className={`grid gap-x-8 gap-y-6 px-4 lg:px-8 py-7 ${
            entry.columns.length >= 3 ? "sm:grid-cols-3" : entry.columns.length === 2 ? "sm:grid-cols-2" : ""
          }`}
        >
          {entry.columns.map((col) => (
            <div key={col.heading}>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground border-b pb-2 mb-3">
                {col.heading}
              </p>
              <ul className="space-y-0.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      className="group flex items-start gap-2 px-2 py-2 -mx-2 hover:bg-secondary transition-colors duration-150 cursor-pointer"
                      onClick={onClose}
                    >
                      <ArrowRight className="w-3.5 h-3.5 mt-0.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-none" />
                      <span>
                        <span className="block text-[13.5px] font-medium leading-snug">
                          {l.label}
                        </span>
                        {l.meta && (
                          <span className="block font-mono text-[10px] uppercase text-muted-foreground mt-0.5">
                            {l.meta}
                          </span>
                        )}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {entry.promo && (
          <div className="hidden lg:flex flex-col justify-between bg-foreground text-background p-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-background/60 mb-2 flex items-center gap-2">
                <Icon className="w-3.5 h-3.5" /> {entry.promo.kicker}
              </p>
              <p className="font-bold text-lg leading-snug">{entry.promo.title}</p>
              <p className="text-[12.5px] text-background/70 mt-2 leading-relaxed">
                {entry.promo.copy}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-[12px] px-4 py-2.5 mt-5 self-start">
              {entry.promo.cta} <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/** Header with a functioning Plus Addons style mega menu (desktop) and
 *  accordion drawer (mobile). Drop-in replacement for WfHeader on pages
 *  that demo the final navigation. */
export function WfMegaHeader({ active }: { active?: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const wrapRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* close on outside click / Escape */
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setDrawer(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const enter = (label: string, hasPanel: boolean) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(hasPanel ? label : null);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 180);
  };

  const openEntry = NAV.find((n) => n.label === open);

  return (
    <header
      ref={wrapRef}
      data-no-lorem
      className="relative border-b bg-card sticky top-11 z-40"
      onMouseLeave={leave}
      onMouseEnter={() => closeTimer.current && clearTimeout(closeTimer.current)}
    >
      <div className="flex items-center gap-4 px-4 lg:px-8 h-16 min-h-[64px]">
        <div className="flex flex-col justify-center flex-none leading-none">
          <span className="hitachi-mark text-[19px]">HITACHI</span>
          <span className="hitachi-wordmark text-[9.5px] mt-0.5">GLOBAL AIR POWER</span>
        </div>
        <nav className="hidden lg:flex items-center gap-0.5 ml-4" aria-label="Main">
          {NAV.map((item) => {
            const hasPanel = !!item.columns;
            const isOpen = open === item.label;
            const isActive = active === item.label;
            return (
              <button
                key={item.label}
                onMouseEnter={() => enter(item.label, hasPanel)}
                onClick={() => setOpen(isOpen ? null : hasPanel ? item.label : null)}
                aria-expanded={isOpen}
                aria-haspopup={hasPanel}
                className={`flex items-center gap-1 text-[13px] font-medium px-2.5 py-2 whitespace-nowrap transition-colors duration-150 ${
                  isOpen || isActive
                    ? "text-primary border-b-2 border-primary font-bold"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {item.label}
                {hasPanel && (
                  <ChevronDown
                    className={`w-3 h-3 opacity-50 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
                  />
                )}
              </button>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2.5">
          <span className="hidden md:flex items-center justify-center w-11 h-11 border">
            <Search className="w-4 h-4 text-muted-foreground" />
          </span>
          <span className="bg-primary text-primary-foreground text-[13px] font-bold tracking-wide px-4 py-3 min-h-[44px] flex items-center">
            CONTACT US
          </span>
          <button
            className="lg:hidden flex items-center justify-center w-11 h-11 border"
            onClick={() => setDrawer((d) => !d)}
            aria-label="Menu"
            aria-expanded={drawer}
          >
            {drawer ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop mega panel */}
      {openEntry && <MegaPanel entry={openEntry} onClose={() => setOpen(null)} />}

      {/* Mobile accordion drawer */}
      {drawer && (
        <div className="lg:hidden border-t bg-card animate-in fade-in slide-in-from-top-1 duration-150">
          {NAV.map((item) => {
            const hasKids = !!item.columns;
            const isOpen = mobileOpen === item.label;
            return (
              <div key={item.label} className="border-b last:border-b-0">
                <button
                  className="flex w-full items-center justify-between px-4 py-3.5 text-[14px] font-semibold min-h-[44px]"
                  onClick={() => setMobileOpen(isOpen ? null : hasKids ? item.label : null)}
                  aria-expanded={isOpen}
                >
                  {item.label}
                  {hasKids && (
                    <ChevronDown
                      className={`w-4 h-4 opacity-60 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
                    />
                  )}
                </button>
                {isOpen &&
                  item.columns!.map((col) => (
                    <div key={col.heading} className="px-4 pb-3">
                      {col.heading.trim() && (
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground py-1.5">
                          {col.heading}
                        </p>
                      )}
                      {col.links.map((l) => (
                        <a
                          key={l.label}
                          className="block px-2 py-2.5 text-[13.5px] border-l-2 border-border hover:border-primary hover:bg-secondary min-h-[44px] flex items-center"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  ))}
              </div>
            );
          })}
          <div className="flex items-center gap-2 px-4 py-3.5 bg-secondary/60">
            <Phone className="w-4 h-4 text-primary" />
            <span className="text-[13px] font-bold">1300 266 773</span>
          </div>
        </div>
      )}
    </header>
  );
}

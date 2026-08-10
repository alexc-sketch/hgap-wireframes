/*
 * STYLE: Blueprint Studio wireframe kit, Hitachi-branded (ideas.md)
 * GLOBAL HITACHI HEADER STANDARD. Rebuilt to match the group pattern shared by
 * hitachi.com/en-au and hitachienergy.com, documented in
 * /home/ubuntu/sitecheck/global_header_spec.md. Key points:
 *   Row 1 (white)  brand lockup left; utility right in fixed order:
 *                  globe + region/language, Global Network, mail + Contact Us,
 *                  magnifier + Search that expands a full-width field.
 *                  Utility items are plain text, never buttons, never red.
 *   Row 2 (grey)   site identity left ("Global Air Power"), main nav right.
 *                  ONLY the active top-level item takes a solid red fill.
 *   Mega panel     full-width two-pane drilldown: left rail of second-level
 *                  categories (selected = red underline + red rule), right pane
 *                  shows heading + arrow, description paragraph, arrow links.
 *                  Nothing navigates until a right-pane link is chosen.
 * Deviation from corporate, deliberate: the HGAP phone number is a genuine
 * commercial need with no corporate equivalent, so it sits in the utility row as
 * plain text rather than as a red button.
 * GUTENBERG BUILD: the core Navigation block cannot produce a two-pane
 * drilldown (its submenus are single-column lists). Build a custom ACF Block
 * header: top-level repeater, each row holding a category repeater with title,
 * description and links. Same PHP templating as the product spec blocks.
 * Sharp geometry (radius 0), no gradients.
 * NOTE: keep data-no-lorem so navigation stays English in lorem mode.
 */
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Globe,
  Mail,
  Menu,
  Phone,
  Search,
  X,
} from "lucide-react";

interface MegaLink {
  label: string;
  meta?: string;
  external?: boolean;
}

/** Second-level category: the unit that fills the right pane. */
interface MegaCategory {
  label: string;
  blurb: string;
  links: MegaLink[];
}

interface NavEntry {
  label: string;
  overview?: string;
  categories?: MegaCategory[];
}

/* Nav model: client WIP sitemap content, restructured into the Hitachi
   two-pane shape (parent overview + second-level categories). */
const NAV: NavEntry[] = [
  {
    label: "All Products",
    overview:
      "Stationary and portable air compressors from five brands, 150 models across 44 series, sold and serviced Australia wide.",
    categories: [
      {
        label: "By configuration",
        blurb:
          "Choose by how the machine is installed and used: fixed plant room duty, or towable units for site and rental work.",
        links: [
          { label: "Stationary Air Compressors", meta: "217 SKUs" },
          { label: "Portable Air Compressors", meta: "33 SKUs" },
          { label: "Air Compressor Accessories", meta: "Dryers, filtration, receivers" },
        ],
      },
      {
        label: "By air type",
        blurb:
          "Oil flooded suits general industrial duty. Oil free is specified where air purity is critical, such as food, pharmaceutical and electronics.",
        links: [
          { label: "Oil Flooded", meta: "165 SKUs" },
          { label: "Oil Free Air Compressors", meta: "85 SKUs" },
        ],
      },
      {
        label: "Our Brands",
        blurb:
          "Five brands under Hitachi Group ownership, supported by one national service and parts network.",
        links: [
          { label: "Hitachi", meta: "Oil free scroll and screw" },
          { label: "Sullair", meta: "Industrial and portable" },
          { label: "Champion", meta: "Workshop and trade" },
          { label: "Bebicon", meta: "Piston compressors" },
          { label: "Air-One", meta: "Entry level screw" },
        ],
      },
      {
        label: "Browse the catalogue",
        blurb:
          "Filter the full range by pressure, motor power, flow, brand and air type to shortlist models before enquiring.",
        links: [{ label: "View all products", meta: "150 models, 44 series" }],
      },
    ],
  },
  {
    label: "Solutions",
    overview:
      "Ways to buy and manage compressed air beyond the machine itself, from monitoring to fully managed supply.",
    categories: [
      {
        label: "Managed Air Power Service",
        blurb:
          "Compressed air supplied as a utility. Hitachi owns and maintains the plant, you pay for the air you use.",
        links: [{ label: "How managed air works" }, { label: "Request an assessment" }],
      },
      {
        label: "AirLinx Remote Monitoring",
        blurb:
          "Cloud connected monitoring that surfaces live performance, raises fault alerts early and reports on energy use.",
        links: [
          { label: "Explore AirLinx", meta: "112 AirLinx ready SKUs" },
          { label: "Book a demonstration" },
        ],
      },
      {
        label: "Rental Fleet Solutions",
        blurb:
          "For rental companies building their own hire fleets: portable diesel units, fleet pricing and parts support.",
        links: [{ label: "Fleet pricing enquiry" }, { label: "Portable range" }],
      },
    ],
  },
  {
    label: "Services & Parts",
    overview:
      "Factory trained technicians, genuine parts held in Australia and planned maintenance across 22 locations.",
    categories: [
      {
        label: "Service",
        blurb:
          "24/7 breakdown response, scheduled servicing and compressed air audits delivered by Hitachi employed technicians.",
        links: [{ label: "Book a service" }, { label: "Planned maintenance plans" }],
      },
      {
        label: "Parts",
        blurb:
          "Genuine OEM parts and consumables for all five brands, held ex stock in Australia to keep plant running.",
        links: [{ label: "Order parts" }, { label: "Lubricants and filtration" }],
      },
    ],
  },
  {
    label: "Industries",
    overview:
      "Compressed air specified for the operating conditions, air quality and duty cycles of each sector.",
    categories: [
      {
        label: "Heavy industry",
        blurb:
          "High duty cycles, dust and heat. Reliability and serviceability outrank first cost in these sectors.",
        links: [{ label: "Mining" }, { label: "Construction" }, { label: "Manufacturing" }],
      },
      {
        label: "Clean air critical",
        blurb:
          "Sectors where oil carryover is unacceptable and air quality is audited against a standard.",
        links: [{ label: "Food & Beverage" }, { label: "Pharmaceutical" }],
      },
      {
        label: "Primary industry",
        blurb:
          "Remote sites, variable power and long service intervals define the requirement.",
        links: [{ label: "Agriculture" }, { label: "View all industries" }],
      },
    ],
  },
  {
    label: "About Us",
    overview:
      "Part of Hitachi Industrial Equipment Systems, operating in Australia through a national branch and service network.",
    categories: [
      {
        label: "Company",
        blurb:
          "Who we are, our place in Hitachi Group and how the Australian business is structured.",
        links: [
          { label: "About Hitachi Global Air Power" },
          { label: "Hitachi Group", external: true },
        ],
      },
      {
        label: "Branch Locations",
        blurb:
          "Sales, service and parts coverage across Australia, with technicians based in each region.",
        links: [{ label: "Find your nearest branch", meta: "6 branches, 22 locations" }],
      },
      {
        label: "Insights",
        blurb:
          "Technical guides, application advice and company news from the knowledge hub.",
        links: [{ label: "All insights" }, { label: "Case Studies" }],
      },
    ],
  },
  { label: "Careers" },
];

/* ---- Full-width two-pane mega panel (Hitachi group pattern) ---- */
function MegaPanel({ entry, onClose }: { entry: NavEntry; onClose: () => void }) {
  const [sel, setSel] = useState(0);
  useEffect(() => setSel(0), [entry.label]);
  if (!entry.categories) return null;
  const cat = entry.categories[sel];
  return (
    <div
      className="absolute left-0 right-0 top-full z-50 border-b-2 border-foreground bg-card shadow-[0_16px_32px_-16px_rgba(0,0,0,0.25)] animate-in fade-in slide-in-from-top-1 duration-150"
      role="region"
      aria-label={`${entry.label} menu`}
    >
      <div className="grid lg:grid-cols-[minmax(240px,1fr)_2fr] min-h-[280px]">
        {/* LEFT RAIL: second-level categories */}
        <div className="bg-secondary/70 border-r py-6 px-4 lg:pl-8">
          <a className="block text-[15px] font-bold underline underline-offset-4 decoration-2 pb-3 cursor-pointer" onClick={onClose}>
            {entry.label}
          </a>
          <ul>
            {entry.categories.map((c, i) => (
              <li key={c.label}>
                <button
                  onMouseEnter={() => setSel(i)}
                  onFocus={() => setSel(i)}
                  onClick={() => setSel(i)}
                  aria-current={i === sel}
                  className={`group flex w-full items-center gap-3 py-2.5 text-left text-[13.5px] transition-colors duration-150 ${
                    i === sel
                      ? "text-primary font-semibold"
                      : "text-foreground/75 hover:text-foreground"
                  }`}
                >
                  <span
                    className={
                      i === sel
                        ? "underline decoration-primary decoration-2 underline-offset-[6px]"
                        : ""
                    }
                  >
                    {c.label}
                  </span>
                  {/* short red rule that runs to the pane edge, as on hitachi.com */}
                  <span
                    className={`ml-auto h-px w-10 bg-primary transition-opacity duration-150 ${
                      i === sel ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT PANE: heading, description, destination links */}
        <div key={cat.label} className="py-7 px-4 lg:px-10 animate-in fade-in duration-150">
          <a
            className="inline-flex items-center gap-2 text-[19px] font-bold hover:text-primary transition-colors duration-150 cursor-pointer"
            onClick={onClose}
          >
            {cat.label} <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-[13px] text-muted-foreground leading-relaxed mt-3 max-w-[62ch]">
            {cat.blurb}
          </p>
          <ul className="mt-6 space-y-1">
            {cat.links.map((l) => (
              <li key={l.label}>
                <a
                  className="group inline-flex items-baseline gap-2 py-2 cursor-pointer"
                  onClick={onClose}
                >
                  <span className="text-[14px] font-semibold group-hover:text-primary transition-colors duration-150">
                    {l.label}
                  </span>
                  {l.external ? (
                    <ArrowUpRight className="w-3.5 h-3.5 self-center text-muted-foreground" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 self-center text-muted-foreground group-hover:text-primary transition-colors duration-150" />
                  )}
                  {l.meta && (
                    <span className="font-mono text-[10px] uppercase text-muted-foreground">
                      {l.meta}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
          {entry.overview && (
            <p className="mt-7 pt-4 border-t font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground max-w-[70ch]">
              {entry.overview}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * WfGlobalHeader: the Hitachi group standard header. Two rows plus a full-width
 * two-pane mega panel. Used as the single global header on EVERY template.
 * `active` takes a top-level nav label so the current section shows the red fill.
 */
export function WfGlobalHeader({ active }: { active?: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const wrapRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(null);
        setSearchOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setDrawer(false);
        setSearchOpen(false);
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
      className="relative bg-card z-40"
      onMouseLeave={leave}
      onMouseEnter={() => closeTimer.current && clearTimeout(closeTimer.current)}
    >
      {/* ROW 1: brand + utility. White. Utility is plain text, never red. */}
      <div className="flex items-center gap-4 px-4 lg:px-8 h-14 min-h-[56px] border-b">
        <div className="flex flex-col justify-center flex-none leading-none">
          <span className="hitachi-mark text-[19px]">HITACHI</span>
          <span className="hitachi-wordmark text-[8.5px] mt-0.5">INSPIRE THE NEXT</span>
        </div>
        <div className="ml-auto flex items-center gap-4 lg:gap-6 text-[11.5px] text-foreground/75">
          <span className="hidden md:flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" /> Australia / EN
            <ChevronDown className="w-3 h-3 opacity-50" />
          </span>
          <a className="hidden lg:inline hover:text-primary transition-colors duration-150 cursor-pointer">
            Hitachi Global
          </a>
          <a className="hidden sm:flex items-center gap-1.5 hover:text-primary transition-colors duration-150 cursor-pointer">
            <Phone className="w-3.5 h-3.5" /> 1300 266 773
          </a>
          <a className="flex items-center gap-1.5 hover:text-primary transition-colors duration-150 cursor-pointer">
            <Mail className="w-3.5 h-3.5" /> Contact Us
          </a>
          <button
            className="flex items-center gap-1.5 hover:text-primary transition-colors duration-150"
            onClick={() => setSearchOpen((s) => !s)}
            aria-expanded={searchOpen}
          >
            {searchOpen ? <X className="w-3.5 h-3.5" /> : <Search className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>

      {/* Expanding full-width search, as on the corporate sites */}
      {searchOpen && (
        <div className="border-b bg-secondary/60 px-4 lg:px-8 py-4 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="flex items-center gap-2 max-w-3xl">
            <input
              autoFocus
              placeholder="Search within Hitachi Global Air Power"
              className="flex-1 border bg-card px-3 h-11 text-[13px] outline-none focus:border-primary"
            />
            <button className="bg-foreground text-background text-[12px] font-bold px-5 h-11">
              SEARCH
            </button>
          </div>
        </div>
      )}

      {/* ROW 2: site identity + main nav. Grey band. Active item = red fill. */}
      <div className="flex items-center gap-4 px-4 lg:px-8 h-12 min-h-[48px] bg-secondary/70 border-b">
        <a className="hitachi-wordmark text-[11px] flex-none cursor-pointer">
          GLOBAL AIR POWER
        </a>
        <nav className="hidden lg:flex items-center ml-auto h-full" aria-label="Main">
          {NAV.map((item) => {
            const hasPanel = !!item.categories;
            const isOpen = open === item.label;
            const isActive = active === item.label;
            return (
              <button
                key={item.label}
                onMouseEnter={() => enter(item.label, hasPanel)}
                onClick={() => setOpen(isOpen ? null : hasPanel ? item.label : null)}
                aria-expanded={isOpen}
                aria-haspopup={hasPanel}
                className={`flex items-center gap-1 h-full px-4 text-[13px] whitespace-nowrap transition-colors duration-150 ${
                  isOpen || isActive
                    ? "bg-primary text-primary-foreground font-bold"
                    : "text-foreground/80 hover:text-foreground font-medium"
                }`}
              >
                {item.label}
                {hasPanel && (
                  <ChevronDown
                    className={`w-3 h-3 opacity-60 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
                  />
                )}
              </button>
            );
          })}
        </nav>
        <button
          className="lg:hidden ml-auto flex items-center gap-2 h-11 px-3 border bg-card text-[12px] font-semibold"
          onClick={() => setDrawer((d) => !d)}
          aria-label="Menu"
          aria-expanded={drawer}
        >
          {drawer ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />} MENU
        </button>
      </div>

      {/* Desktop mega panel */}
      {openEntry && <MegaPanel entry={openEntry} onClose={() => setOpen(null)} />}

      {/* Mobile: same structure collapsed into an accordion drawer */}
      {drawer && (
        <div className="lg:hidden border-b bg-card animate-in fade-in slide-in-from-top-1 duration-150">
          {NAV.map((item) => {
            const hasKids = !!item.categories;
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
                  item.categories!.map((c) => (
                    <div key={c.label} className="px-4 pb-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground py-1.5">
                        {c.label}
                      </p>
                      {c.links.map((l) => (
                        <a
                          key={l.label}
                          className="flex items-center px-2 py-2.5 text-[13.5px] border-l-2 border-border hover:border-primary hover:bg-secondary min-h-[44px]"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  ))}
              </div>
            );
          })}
          <div className="flex items-center gap-4 px-4 py-3.5 bg-secondary/60 text-[12px]">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-primary" /> 1300 266 773
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" /> Australia / EN
            </span>
          </div>
        </div>
      )}
    </header>
  );
}

/* Back-compat alias: the homepage imported WfMegaHeader before the header
   became global. Kept so older imports keep working. */
export const WfMegaHeader = WfGlobalHeader;

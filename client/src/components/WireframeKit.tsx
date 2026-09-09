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

const NotesCtx = createContext<{ show: boolean; showBuild: boolean }>({
  show: true,
  showBuild: true,
});

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

export function BuildLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { showBuild } = useContext(NotesCtx);
  if (!showBuild) return null;
  return (
    <span
      data-no-lorem
      className={`inline-flex border border-[#b1000e] bg-[#fff7f7] px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-[#b1000e] ${className}`}
    >
      {children}
    </span>
  );
}

export interface NoteDef {
  n: number;
  title: string;
  body: string;
}

type PageKey = "list" | "product" | "cover" | "home" | "brand" | "category" | "industries" | "industry";

interface BuildDef {
  component: string;
  role: string;
  data: string;
  control: string;
}

const GUTENBERG_MAPS: Record<PageKey, BuildDef[]> = {
  cover: [
    { component: "Global site shell", role: "Block theme, theme.json and template parts", data: "ACF Options Page for shared business details", control: "Header and footer locked globally" },
    { component: "Product content model", role: "Product custom post type and native taxonomies", data: "ACF Pro field groups, Groups, Repeaters and taxonomy fields", control: "Editors update product facts, not layout" },
    { component: "Product filtering", role: "Custom dynamic Product Filter block", data: "ACF values translated into tax_query and meta_query clauses", control: "Filters write to the URL and update results without a full reload" },
    { component: "Reusable marketing sections", role: "Synced and unsynced block patterns", data: "Core fields or ACF Block fields where structure needs control", control: "Approved layouts with controlled copy and media editing" },
  ],
  home: [
    { component: "Global header and mega menu", role: "Header template part with a custom interactive ACF Block", data: "Menu groups, descriptions and links from ACF repeaters", control: "Global, locked structure; menu content editable" },
    { component: "Hero carousel", role: "Full width dynamic ACF Block", data: "Slides repeater: image, eyebrow, heading, copy and CTA", control: "Editors can add, order and retire slides" },
    { component: "Product range and brands", role: "Server rendered dynamic blocks", data: "Product, category and brand taxonomies", control: "Counts and links update from catalogue data" },
    { component: "Intent, AirLinx, service and final CTA", role: "Registered block patterns", data: "Core content or small ACF field sets", control: "Layout locked; copy, links and media editable" },
    { component: "Insights", role: "Core Query Loop with a controlled post template", data: "Latest posts from the Insights post type", control: "Automatic feed with optional category filter" },
    { component: "Newsletter and footer", role: "Footer template part", data: "Form block plus ACF Options Page contact details", control: "One global edit updates every template" },
  ],
  list: [
    { component: "Product archive", role: "products archive template", data: "Product custom post type and product taxonomies", control: "Template structure locked" },
    { component: "Product filters and results", role: "Custom dynamic ACF Product Filter block", data: "ACF taxonomy, select, number and true or false fields", control: "GET form fallback plus Interactivity API updates" },
    { component: "Product cards", role: "Server rendered card partial inside the filter block", data: "Current product post and ACF summary fields", control: "One card definition for every listing" },
    { component: "Guided finder", role: "Interactive child block or registered pattern", data: "Selections map to the same filter query parameters", control: "Shareable result URLs, no duplicate filter logic" },
    { component: "Quick quote", role: "Block native form in a modal pattern", data: "Hidden product, URL and campaign fields", control: "Global form mapping to Salesforce" },
  ],
  product: [
    { component: "Single product layout", role: "single-product template", data: "Current Product post and ACF field groups", control: "Template locked; product content editable" },
    { component: "Gallery and summary", role: "Dynamic ACF Blocks", data: "Gallery, model, series, key specifications and downloads", control: "Fields only, no manual layout changes" },
    { component: "Specifications", role: "Dynamic ACF specification block", data: "Four Group fields plus additional_specs repeater", control: "Consistent labels and optional long tail fields" },
    { component: "Variants", role: "Dynamic ACF variant block", data: "variants repeater, one row per SKU", control: "Any number of variants without template changes" },
    { component: "Quote form and related products", role: "Synced form pattern plus Query Loop", data: "Product context and shared taxonomies", control: "Form is global; related products are automatic" },
  ],
  brand: [
    { component: "Brand landing page", role: "taxonomy-product_brand template", data: "ACF term fields for logo, introduction and proof points", control: "One template serves all five brands" },
    { component: "Series and products", role: "Dynamic query block", data: "Current brand term plus series taxonomy", control: "Catalogue results update automatically" },
    { component: "Technology and service sections", role: "Brand pattern with controlled ACF fields", data: "Brand term content and media", control: "Layout consistent, story tailored by brand" },
    { component: "Insights", role: "Core Query Loop", data: "Insights tagged to the current brand", control: "Automatic feed" },
  ],
  category: [
    { component: "Category landing page", role: "taxonomy-product_air_type template", data: "ACF term fields for hero, benefits and selection guidance", control: "One template serves Oil Free and Oil Flooded" },
    { component: "Technology and series", role: "Dynamic ACF Blocks", data: "ACF term fields plus product and series queries", control: "Counts and specification ranges are calculated" },
    { component: "View products links", role: "Links into the custom Product Filter block", data: "ACF taxonomy query parameters in the URL", control: "Landing page and archive share one filter vocabulary" },
    { component: "FAQs and Insights", role: "FAQ ACF Block plus core Query Loop", data: "FAQ repeater and Insights taxonomy", control: "Schema ready answers and automatic articles" },
  ],
  industries: [
    { component: "Industry directory", role: "page-industries template with a dynamic term grid block", data: "Industry taxonomy plus ACF term image and summary fields", control: "One taxonomy record powers navigation, tiles and filters" },
    { component: "How we work and final CTA", role: "Registered block patterns", data: "Core content and global contact details", control: "Approved reusable compositions" },
    { component: "Featured insight", role: "Core Query Loop", data: "Featured Insight tagged to an Industry term", control: "Automatic or editorially selected" },
  ],
  industry: [
    { component: "Single industry page", role: "taxonomy-industry template", data: "ACF term fields for hero, challenges and solution copy", control: "One template serves all industry terms" },
    { component: "Recommended ranges", role: "Dynamic relationship block", data: "ACF Relationship field to product series", control: "Specialists curate two or three relevant ranges" },
    { component: "View matching products", role: "Link into the custom Product Filter block", data: "Current industry taxonomy term in the URL", control: "Results remain shareable and pre filtered" },
    { component: "Industry insight and sibling links", role: "Query Loop plus dynamic term navigation", data: "Industry taxonomy shared by products and Insights", control: "Automatic cross linking" },
  ],
};

/* ---------------- Kit shell ---------------- */

export function KitShell({
  page,
  notes,
  children,
}: {
  page: PageKey;
  notes?: NoteDef[];
  children: ReactNode;
}) {
  const [showNotes, setShowNotes] = useState(true);
  const [showBuild, setShowBuild] = useState(true);
  const [location] = useLocation();
  const buildMap = GUTENBERG_MAPS[page];

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
    <NotesCtx.Provider value={{ show: showNotes, showBuild }}>
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
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setShowBuild((s) => !s)}
                className={`font-mono text-[10px] uppercase tracking-wide px-3 py-1.5 border whitespace-nowrap transition-colors duration-150 ${
                  showBuild
                    ? "border-[#f0b429] bg-[#f0b429] text-[#1d1d1d]"
                    : "border-white/30 text-white/70 hover:bg-white/10"
                }`}
              >
                Build Map {showBuild ? "ON" : "OFF"}
              </button>
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
            <section data-no-lorem className="mt-10 wf-sheet p-6 lg:p-8">
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

          {showBuild && buildMap.length > 0 && (
            <section data-no-lorem className="mt-6 wf-sheet border-t-4 border-[#f0b429] p-6 lg:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <p className="wf-kicker mb-1">Gutenberg implementation map</p>
                  <h2 className="font-sans font-bold text-xl">How this wireframe becomes a block system</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    ACF Pro supplies the structured fields and PHP rendered blocks. Gutenberg supplies templates,
                    template parts, patterns and Query Loops. Interactive catalogue filters use the same ACF values
                    through a custom dynamic block, with URL based query state and a standard WordPress query.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Template part", "ACF Block", "Pattern", "Query Loop", "Dynamic template"].map((item) => (
                    <span key={item} className="border bg-secondary px-2 py-1 font-mono text-[9px] uppercase tracking-wide">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto border">
                <table className="w-full min-w-[760px] border-collapse text-left text-[12px]">
                  <thead className="bg-foreground text-background">
                    <tr>
                      {["Wireframe component", "Gutenberg role", "ACF or data source", "Editor control"].map((heading) => (
                        <th key={heading} className="px-3 py-2.5 font-mono text-[9px] uppercase tracking-[0.1em]">{heading}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {buildMap.map((row) => (
                      <tr key={row.component} className="align-top even:bg-secondary/40">
                        <td className="px-3 py-3 font-semibold">{row.component}</td>
                        <td className="px-3 py-3">{row.role}</td>
                        <td className="px-3 py-3 text-muted-foreground">{row.data}</td>
                        <td className="px-3 py-3 text-muted-foreground">{row.control}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                ACF Pro stores the filter values. The custom Product Filter block provides the front end controls,
                sanitises URL parameters and builds the tax query and meta query used to return products.
              </p>
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

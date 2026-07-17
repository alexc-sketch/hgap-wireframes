/*
 * STYLE: Blueprint Studio wireframe (ideas.md)
 * 01 — Product List template. Grayscale blocks, radius 0, amber CTAs only.
 * Interactive: filter checkboxes update result count, compare tray demo.
 * Section nav (quicklink) is NOT sticky per client rule.
 */
import { useMemo, useState } from "react";
import QuickQuoteModal from "@/components/QuickQuoteModal";
import {
  KitShell,
  Note,
  WfUtilityBar,
  WfHeader,
  WfFooter,
  ImgPh,
  SheetTitle,
  type NoteDef,
} from "@/components/WireframeKit";
import {
  ChevronDown,
  ChevronRight,
  LayoutGrid,
  List,
  SlidersHorizontal,
  Wrench,
  Truck,
  Headset,
  X,
} from "lucide-react";

/* Real series/brands from the site audit */
interface P {
  id: number;
  name: string;
  series: string;
  brand: string;
  config: string; // Stationary | Portable | Accessory
  airtype: string; // Oil Flooded | Oil Free | — (accessories)
  drive: string;
  kw: number;
  cfm: number;
  bar: number;
  industries: string[];
}

/* Real models from the client's ProductList-Marketing.xlsx (258 SKUs / 150 models / 44 series) */
const PRODUCTS: P[] = [
  { id: 1, name: "VOC 90 V Oil Flooded Screw", series: "VOCV 45-90", brand: "Champion", config: "Stationary", airtype: "Oil Flooded", drive: "VSD", kw: 90, cfm: 591, bar: 7.5, industries: ["Manufacturing", "Food & Beverage"] },
  { id: 2, name: "CSA 22 Oil Flooded Screw", series: "CSA 18-37", brand: "Champion", config: "Stationary", airtype: "Oil Flooded", drive: "Fixed Speed", kw: 22, cfm: 131, bar: 7.5, industries: ["Manufacturing", "Agriculture"] },
  { id: 3, name: "ShopTek ST 15 Oil Flooded Screw", series: "SHOPTEK 11-15", brand: "Sullair", config: "Stationary", airtype: "Oil Flooded", drive: "Fixed Speed", kw: 15, cfm: 78, bar: 8, industries: ["Agriculture", "Construction"] },
  { id: 4, name: "TS 355 Two-Stage Oil Flooded", series: "TS200-355", brand: "Sullair", config: "Stationary", airtype: "Oil Flooded", drive: "Fixed Speed", kw: 355, cfm: 2578, bar: 7.5, industries: ["Mining", "Manufacturing"] },
  { id: 5, name: "185 A CAT Portable Diesel", series: "185-320", brand: "Sullair", config: "Portable", airtype: "Oil Flooded", drive: "Diesel", kw: 44, cfm: 185, bar: 7, industries: ["Construction", "Mining"] },
  { id: 6, name: "OFD 1550 Oil Free Portable", series: "1550", brand: "Sullair", config: "Portable", airtype: "Oil Free", drive: "Diesel", kw: 403, cfm: 1550, bar: 10, industries: ["Mining", "Construction"] },
  { id: 7, name: "DSP-37 Oil Free Screw", series: "DSP 22-37", brand: "Hitachi", config: "Stationary", airtype: "Oil Free", drive: "Fixed Speed", kw: 37, cfm: 198, bar: 7, industries: ["Pharmaceutical", "Food & Beverage"] },
  { id: 8, name: "SRL-5.5 Oil Free Scroll", series: "SRL 1.5-5.5", brand: "Hitachi", config: "Stationary", airtype: "Oil Free", drive: "Fixed Speed", kw: 5.5, cfm: 21, bar: 8.5, industries: ["Pharmaceutical", "Food & Beverage"] },
  { id: 9, name: "Oil Free Bebicon 3.7 Piston", series: "Oil Free Bebicon", brand: "Bebicon", config: "Stationary", airtype: "Oil Free", drive: "Fixed Speed", kw: 3.7, cfm: 125, bar: 8.5, industries: ["Manufacturing", "Agriculture"] },
  /* Accessories — indicative sub-types only; SKU data still to be supplied by client */
  { id: 10, name: "Refrigerated Air Dryer (sample)", series: "Air Treatment — TBC", brand: "Champion", config: "Accessory", airtype: "—", drive: "—", kw: 0, cfm: 0, bar: 0, industries: ["Manufacturing", "Food & Beverage"] },
  { id: 11, name: "Inline Filtration Set (sample)", series: "Air Treatment — TBC", brand: "Champion", config: "Accessory", airtype: "—", drive: "—", kw: 0, cfm: 0, bar: 0, industries: ["Pharmaceutical", "Food & Beverage"] },
  { id: 12, name: "Vertical Air Receiver Tank (sample)", series: "Receivers — TBC", brand: "Air-One", config: "Accessory", airtype: "—", drive: "—", kw: 0, cfm: 0, bar: 0, industries: ["Manufacturing", "Construction"] },
  { id: 13, name: "Compressor Oil & Lubricants (sample)", series: "Consumables — TBC", brand: "Sullair", config: "Accessory", airtype: "—", drive: "—", kw: 0, cfm: 0, bar: 0, industries: ["Mining", "Agriculture"] },
];

const INDUSTRIES = ["Mining", "Manufacturing", "Food & Beverage", "Pharmaceutical", "Construction", "Agriculture"];

/* Facet counts = real SKU counts from ProductList-Marketing.xlsx */
const FACETS: Array<[string, string[]]> = [
  ["Category", ["Stationary (217)", "Portable (33)", "Accessories — data TBC", "OEM — TBC (8)"]],
  ["Air Type", ["Oil Flooded (165)", "Oil Free (85)"]],
  ["Brand", ["Champion (100)", "Sullair (91)", "Hitachi (63)", "Bebicon (3)", "Air-One (1)"]],
  ["Industry", ["Mining (38)", "Manufacturing (61)", "Food & Beverage (24)", "Pharmaceutical (11)", "Construction (35)", "Agriculture (19)"]],
  ["Drive / Control", ["Fixed Speed (as tagged)", "Variable Speed VSD (as tagged)", "Diesel engine (33)"]],
  ["Max Pressure", ["7–8 bar", "8.5–10 bar", "13–15 bar"]],
];

/* Guided finder dropdown definitions — each option maps to a filter rule */
const FINDER: Array<{ label: string; options: string[] }> = [
  { label: "1 · Application", options: ["Workshop / trades", "Continuous industrial", "Portable / site work", "Clean air (food, pharma)"] },
  { label: "2 · Air demand (cfm)", options: ["Up to 100 cfm", "100–500 cfm", "500–1,000 cfm", "1,000+ cfm"] },
  { label: "3 · Power supply", options: ["Single phase", "Three phase", "Diesel (no mains power)"] },
];

const SORTS = ["Relevance", "Power: low → high", "Power: high → low", "Flow: high → low", "Name A–Z"];

const NOTES: NoteDef[] = [
  { n: 1, title: "Global header + primary CTA", body: "Persistent 'CONTACT US' (live-site CTA label, Hitachi Red) is the #1 conversion action. Mega-menu routes by product type and industry (competitor pattern: Atlas Copco intent-based navigation). Header lockup follows Hitachi brand rules: HITACHI mark leads, 'Global Air Power' wordmark subordinate and never red." },
  { n: 2, title: "Archive hero with live count", body: "H1 targets the head keyword ('Air Compressors Australia'). Counts now reflect the client's real catalogue: 258 SKUs across 150 models in 44 series (ProductList-Marketing.xlsx). Recommend product pages at MODEL level (~150 pages) with pressure-variant SKUs shown as rows in the spec table — not separate pages. Category sub-nav mirrors the agreed Products menu: All / Stationary / Portable / Oil Flooded / Oil Free / Accessories." },
  { n: 3, title: "Guided product finder", body: "3-step selector (application → air demand → power) for non-technical buyers, modelled on Sullair America's interactive guide. Functional in this prototype — pick options and 'Show matches' narrows the grid. In production each combination maps to a pre-filtered archive URL so results are shareable and indexable." },
  { n: 4, title: "Faceted filter sidebar — JetSmartFilters", body: "MOBILE-FIRST: below the lg breakpoint the sidebar collapses into a full-width drawer behind a 44px 'Filters' button showing the active-filter count — tap it in this prototype to see the drawer. TAXONOMY (per client Excel): products map on TWO AXES — Category (Stationary 217 / Portable 33 SKUs) and Air Type (Oil Flooded 165 / Oil Free 85). A VOC 90 is BOTH Stationary AND Oil Flooded, so these are two separate taxonomies, not one flat tree: the nav categories become landing pages while products cross-list without duplication. ACCESSORIES: now a live sixth category — tick 'Accessories' to see indicative sub-type cards (dryers, filtration, receivers, lubricants). These are placeholders: the client Excel contains no accessories rows, so SKU data must be supplied before launch. Also: 8 OEM bare-airend SKUs sit outside the agreed nav (include, separate, or exclude?). Replaces today's 229 mixed blog categories with clean product taxonomies on a dedicated Product post type. AJAX — results update without page reload. The Industry facet is a multi-select taxonomy (one product can serve several industries) and is the same taxonomy that powers the homepage industry tiles and industry landing pages — tag once, reuse everywhere. DEV NOTE: build with JetSmartFilters paired with a JetEngine Listing Grid (Crocoblock's recommended provider for full AJAX). Avoid pairing JSF with Elementor Pro's Loop Grid — its AJAX mode drops URL params and breaks search/sorting filters (page-reload only). Enable the JSF Indexer for live per-facet counts and URL aliases for clean, indexable filter URLs (e.g. /products/?industry=mining)." },
  { n: 5, title: "Product cards with key specs", body: "kW / cfm / bar shown on-card (real values from the client's spec sheet) so engineers can shortlist without opening every page. Two actions: View Product (research) and Quick Quote (conversion). Quick Quote is functional in this prototype — click it to walk the full flow: pre-filled product context, a 5-field form (product, page URL, UTM and GCLID travel as hidden fields), AJAX submit via Elementor Pro Forms (webhook action) → Salesforce Web-to-Lead, postcode-based branch routing, then a confirmation state that fires the GA4/Ads conversion event. No page reload, no re-typing the model name." },
  { n: 6, title: "Compare tray", body: "Optional enhancement: select up to 3 models for a side-by-side spec table. Appears only when items are selected." },
  { n: 7, title: "Trust band (social proof)", body: "24/7 service, genuine OEM parts, 6 Australian branches — differentiators vs importers, per competitor gap analysis (CAPS / Pilot Air)." },
  { n: 8, title: "Related insights", body: "Feeds the 105-article Insights library into the buying journey for SEO internal linking." },
  { n: 9, title: "Final CTA (centred)", body: "Every template ends with one centrally-aligned conversion moment: phone + quote form. No dead ends." },
];

export default function ProductList() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [compare, setCompare] = useState<number[]>([]);
  const [finderSel, setFinderSel] = useState<Record<string, string>>({});
  const [finderOpen, setFinderOpen] = useState<string | null>(null);
  const [finderApplied, setFinderApplied] = useState<Record<string, string>>({});
  const [sort, setSort] = useState(SORTS[0]);
  const [sortOpen, setSortOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [quote, setQuote] = useState<number | null>(null);
  const [mobileFilters, setMobileFilters] = useState(false);

  const activeFilters = Object.keys(checked).filter((k) => checked[k]);

  const visible = useMemo(() => {
    let list = PRODUCTS;

    /* Guided finder rules */
    const app = finderApplied["1 · Application"];
    if (app === "Workshop / trades") list = list.filter((p) => p.kw <= 22);
    if (app === "Continuous industrial") list = list.filter((p) => p.config === "Stationary" && p.kw >= 22);
    if (app === "Portable / site work") list = list.filter((p) => p.config === "Portable");
    if (app === "Clean air (food, pharma)") list = list.filter((p) => p.airtype === "Oil Free");
    const dem = finderApplied["2 · Air demand (cfm)"];
    if (dem === "Up to 100 cfm") list = list.filter((p) => p.cfm <= 100);
    if (dem === "100–500 cfm") list = list.filter((p) => p.cfm > 100 && p.cfm <= 500);
    if (dem === "500–1,000 cfm") list = list.filter((p) => p.cfm > 500 && p.cfm <= 1000);
    if (dem === "1,000+ cfm") list = list.filter((p) => p.cfm > 1000);
    const pow = finderApplied["3 · Power supply"];
    if (pow === "Single phase") list = list.filter((p) => p.kw <= 15);
    if (pow === "Three phase") list = list.filter((p) => p.kw > 15 && p.config !== "Portable");
    if (pow === "Diesel (no mains power)") list = list.filter((p) => p.drive === "Diesel");

    if (activeFilters.length === 0) return list;
    return list.filter((p) =>
      activeFilters.every((f) => {
        const label = f.replace(/\s\([^)]*\)$/, "").replace(" — data TBC", "").replace(" — TBC", "");
        if (["Sullair", "Champion", "Hitachi", "Bebicon", "Air-One"].includes(label.split(" ")[0]))
          return p.brand === label.split(" ")[0];
        if (label === "Stationary" || label === "Portable") return p.config === label;
        if (label.startsWith("Accessories")) return p.config === "Accessory";
        if (label === "OEM") return false;
        if (label === "Oil Flooded" || label === "Oil Free") return p.airtype === label;
        if (label.startsWith("Variable")) return p.drive === "VSD";
        if (label.startsWith("Fixed")) return p.drive === "Fixed Speed";
        if (label.startsWith("Diesel")) return p.drive === "Diesel";
        if (INDUSTRIES.includes(label)) return p.industries.includes(label);
        if (label.includes("bar")) {
          if (label.startsWith("7–8")) return p.bar <= 8;
          if (label.startsWith("8.5")) return p.bar > 8 && p.bar <= 10;
          return p.bar > 10;
        }
        return true;
      }),
    );
  }, [activeFilters, finderApplied]);

  const sorted = useMemo(() => {
    const list = [...visible];
    if (sort === "Power: low → high") list.sort((a, b) => a.kw - b.kw);
    if (sort === "Power: high → low") list.sort((a, b) => b.kw - a.kw);
    if (sort === "Flow: high → low") list.sort((a, b) => b.cfm - a.cfm);
    if (sort === "Name A–Z") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [visible, sort]);

  const finderActive = Object.keys(finderApplied).length > 0;

  const toggle = (key: string) =>
    setChecked((c) => ({ ...c, [key]: !c[key] }));

  const toggleCompare = (id: number) =>
    setCompare((c) =>
      c.includes(id) ? c.filter((x) => x !== id) : c.length < 3 ? [...c, id] : c,
    );

  return (
    <KitShell page="list" notes={NOTES}>
      <SheetTitle
        code="Template 01 / Product Archive — /products/"
        title="Product List Page with Faceted Filters"
        desc="Responsive wireframe (resize to preview mobile). Filters are live in this prototype — tick a facet to see the result grid respond; on mobile they collapse behind a Filters button."
      />

      <div className="wf-sheet overflow-hidden">
        <WfUtilityBar />
        <div className="relative">
          <Note n={1} className="!-top-1 !left-2" />
          <WfHeader active="products" />
        </div>

        {/* Hero */}
        <section className="relative border-b bg-secondary px-4 lg:px-8 py-8">
          <Note n={2} />
          <p className="font-mono text-[11px] text-muted-foreground mb-2">
            Home <ChevronRight className="inline w-3 h-3" /> Products
          </p>
          {/* Category sub-nav — the six agreed categories under Products */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {["All Products", "Stationary Air Compressors", "Portable Air Compressors", "Oil Flooded", "Oil Free Air Compressors", "Air Compressor Accessories"].map((c, i) => (
              <span key={c} className={`border px-3 py-1.5 text-[12px] font-medium ${i === 0 ? "bg-foreground text-background" : "bg-card"}`}>
                {c}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-sans font-bold text-3xl">
                Air Compressors &amp; Compressed Air Equipment
              </h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-xl">
                Value proposition line — Champion, Sullair &amp; Hitachi ranges, sold and serviced from 6 Australian branches.
              </p>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wide bg-foreground text-background px-3 py-1.5">
              150 models · 44 series
            </span>
          </div>
        </section>

        {/* Guided finder */}
        <section className="relative border-b px-4 lg:px-8 py-5 bg-card">
          <Note n={3} />
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-semibold text-sm mr-2">
              Not sure what you need? Find the right compressor:
            </p>
            {FINDER.map(({ label, options }) => (
              <div key={label} className="relative">
                <button
                  onClick={() =>
                    setFinderOpen((o) => (o === label ? null : label))
                  }
                  className={`flex items-center gap-2 border px-3 py-2 text-[13px] bg-secondary ${
                    finderSel[label] ? "border-foreground font-medium" : "text-muted-foreground"
                  }`}
                >
                  {finderSel[label] ?? label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${finderOpen === label ? "rotate-180" : ""}`} />
                </button>
                {finderOpen === label && (
                  <div className="absolute z-30 top-full left-0 mt-1 w-56 border-2 border-foreground bg-card shadow-lg">
                    {options.map((o) => (
                      <button
                        key={o}
                        onClick={() => {
                          setFinderSel((s) => ({ ...s, [label]: o }));
                          setFinderOpen(null);
                        }}
                        className={`block w-full text-left px-3 py-2.5 text-[13px] hover:bg-secondary ${
                          finderSel[label] === o ? "bg-secondary font-medium" : ""
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() => setFinderApplied({ ...finderSel })}
              className="bg-primary text-primary-foreground text-[13px] font-semibold px-4 py-2"
            >
              Show matches
            </button>
            {finderActive && (
              <button
                onClick={() => {
                  setFinderApplied({});
                  setFinderSel({});
                }}
                className="font-mono text-[10px] uppercase text-primary underline"
              >
                Reset finder
              </button>
            )}
          </div>
        </section>

        {/* Mobile-first: Filters toggle bar (hidden ≥lg where sidebar is persistent) */}
        <div className="lg:hidden border-b bg-card px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMobileFilters((m) => !m)}
            className="flex items-center gap-2 border font-semibold text-[13px] px-4 min-h-[44px]"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
            {activeFilters.length > 0 && (
              <span className="bg-primary text-primary-foreground text-[11px] font-bold px-1.5 py-0.5">
                {activeFilters.length}
              </span>
            )}
          </button>
          <span className="font-mono text-[9px] uppercase text-muted-foreground">
            Mobile: filters open as drawer
          </span>
        </div>

        {/* Main 2-col (stacks on mobile) */}
        <div className="grid lg:grid-cols-[280px_1fr]">
          {/* Sidebar — drawer on mobile, persistent ≥lg */}
          <aside
            className={`relative border-r px-5 py-6 bg-card ${
              mobileFilters ? "block" : "hidden lg:block"
            }`}
          >
            <Note n={4} />
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-sm flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Filter products
              </p>
              {activeFilters.length > 0 && (
                <button
                  onClick={() => setChecked({})}
                  className="font-mono text-[10px] uppercase text-primary underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {activeFilters.map((f) => (
                  <button
                    key={f}
                    onClick={() => toggle(f)}
                    className="flex items-center gap-1 bg-foreground text-background text-[11px] px-2 py-1"
                  >
                    {f.replace(/\s\(\d+\)$/, "")} <X className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}

            {FACETS.map(([group, opts]) => (
              <div key={group} className="border-t py-4">
                <p className="wf-kicker mb-3 !text-foreground/70">{group}</p>
                <div className="space-y-2.5">
                  {opts.map((o) => (
                    <label
                      key={o}
                      className="flex items-center gap-2.5 text-[13px] select-none"
                    >
                      <input
                        type="checkbox"
                        checked={!!checked[o]}
                        onChange={() => toggle(o)}
                        className="w-4 h-4 accent-[oklch(0.6_0.13_60)]"
                      />
                      {o}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {/* Range sliders */}
            {["Power (kW): 1.5 — 403", "Flow (cfm): 17 — 2,578"].map((s) => (
              <div key={s} className="border-t py-4">
                <p className="wf-kicker mb-3 !text-foreground/70">{s}</p>
                <div className="relative h-1 bg-border mx-1">
                  <div className="absolute left-[15%] right-[30%] h-1 bg-foreground/60" />
                  <span className="absolute left-[15%] -top-1.5 w-3.5 h-3.5 bg-foreground" />
                  <span className="absolute right-[30%] -top-1.5 w-3.5 h-3.5 bg-foreground" />
                </div>
              </div>
            ))}
          </aside>

          {/* Results */}
          <div className="px-4 lg:px-6 py-6 bg-secondary/40">
            <div className="relative flex flex-wrap items-center justify-between gap-3 mb-5">
              <Note n={5} className="!-left-1" />
              <p className="text-sm">
                Showing{" "}
                <strong>
                  {sorted.length} of {activeFilters.length || finderActive ? PRODUCTS.length : 150}
                </strong>{" "}
                products
                {(activeFilters.length > 0 || finderActive) && (
                  <span className="font-mono text-[11px] text-primary ml-2">
                    ← live filter demo
                  </span>
                )}
              </p>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    onClick={() => setSortOpen((o) => !o)}
                    className="border bg-card px-3 py-1.5 text-[13px] flex items-center gap-2"
                  >
                    Sort: {sort}{" "}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${sortOpen ? "rotate-180" : ""}`} />
                  </button>
                  {sortOpen && (
                    <div className="absolute z-30 top-full right-0 mt-1 w-48 border-2 border-foreground bg-card shadow-lg">
                      {SORTS.map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            setSort(s);
                            setSortOpen(false);
                          }}
                          className={`block w-full text-left px-3 py-2.5 text-[13px] hover:bg-secondary ${
                            sort === s ? "bg-secondary font-medium" : ""
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setView("grid")}
                  className={`border p-1.5 ${view === "grid" ? "bg-card" : "text-muted-foreground"}`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`border p-1.5 ${view === "list" ? "bg-card" : "text-muted-foreground"}`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className={view === "grid" ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-4" : "flex flex-col gap-3"}>
              {sorted.map((p) => (
                <article key={p.id} className={`bg-card border flex ${view === "grid" ? "flex-col" : "flex-row items-stretch"}`}>
                  <ImgPh label="Product image" className={view === "grid" ? "h-36" : "w-44 flex-none"} />
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                      {p.config === "Accessory" ? `${p.brand} · Accessory · ${p.series.replace(" — TBC", "")}` : `${p.brand} · ${p.config} · ${p.airtype}`}
                    </span>
                    <h3 className="font-semibold text-[15px] leading-snug">
                      {p.name}
                    </h3>
                    {p.config === "Accessory" ? (
                      <div className="border text-center mt-1 py-2">
                        <p className="font-mono text-[10px] uppercase text-muted-foreground">
                          Spec data TBC — awaiting client accessories list
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 border divide-x text-center mt-1">
                        {[
                          [p.kw, "kW"],
                          [p.cfm, "cfm"],
                          [p.bar, "bar"],
                        ].map(([v, u]) => (
                          <div key={u as string} className="py-1.5">
                            <p className="font-semibold text-[13px]">{v}</p>
                            <p className="font-mono text-[9px] uppercase text-muted-foreground">
                              {u}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-auto pt-2 flex items-center gap-2">
                      <span className="flex-1 text-center border font-medium text-[12px] py-2">
                        View Product
                      </span>
                      <button
                        onClick={() => setQuote(p.id)}
                        className="flex-1 text-center bg-primary text-primary-foreground font-semibold text-[12px] py-2"
                      >
                        Quick Quote
                      </button>
                    </div>
                    <label className="flex items-center gap-2 text-[11px] text-muted-foreground pt-1 select-none">
                      <input
                        type="checkbox"
                        checked={compare.includes(p.id)}
                        onChange={() => toggleCompare(p.id)}
                        className="w-3.5 h-3.5 accent-[oklch(0.6_0.13_60)]"
                      />
                      Add to compare
                    </label>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-1.5 mt-6 font-mono text-[12px]">
              {["‹", "1", "2", "3", "…", "15", "›"].map((n, i) => (
                <span
                  key={i}
                  className={`w-8 h-8 flex items-center justify-center border bg-card ${
                    n === "1" ? "!bg-foreground text-background" : ""
                  }`}
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Compare tray */}
        {compare.length > 0 && (
          <div className="relative border-t-2 border-foreground bg-card px-4 lg:px-8 py-4 flex flex-wrap items-center gap-4">
            <Note n={6} />
            <p className="font-mono text-[11px] uppercase tracking-wide">
              Compare tray ({compare.length}/3)
            </p>
            <div className="flex gap-2 flex-1 flex-wrap">
              {compare.map((id) => (
                <span
                  key={id}
                  className="border px-3 py-1.5 text-[12px] flex items-center gap-2 bg-secondary"
                >
                  {PRODUCTS.find((p) => p.id === id)?.name}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => toggleCompare(id)}
                  />
                </span>
              ))}
            </div>
            <span className="bg-foreground text-background text-[13px] font-semibold px-5 py-2.5">
              Compare specs →
            </span>
          </div>
        )}

        {/* Trust band */}
        <section className="relative border-t grid sm:grid-cols-3 divide-x bg-card">
          <Note n={7} />
          {[
            [Headset, "24/7 service support", "Factory-trained technicians nationwide"],
            [Wrench, "Genuine OEM parts", "Sullair, Champion & Hitachi stock in AU"],
            [Truck, "6 Australian branches", "Adelaide · Brisbane · Mackay · Melbourne · Newcastle · Perth"],
          ].map(([Icon, t, s]: any) => (
            <div key={t} className="flex items-start gap-3 p-5">
              <Icon className="w-5 h-5 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-semibold text-[13px]">{t}</p>
                <p className="text-[12px] text-muted-foreground">{s}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Related insights */}
        <section className="relative border-t px-4 lg:px-8 py-8 bg-secondary/40">
          <Note n={8} />
          <div className="flex items-end justify-between mb-4">
            <h3 className="font-bold text-lg">Buying guides &amp; insights</h3>
            <span className="font-mono text-[11px] underline">
              View all insights →
            </span>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              "How does an air compressor work?",
              "Fixed speed vs VSD — which is right for you?",
              "The classification of oil free air grades",
            ].map((t) => (
              <div key={t} className="bg-card border">
                <ImgPh label="Article image" className="h-24" />
                <div className="p-4">
                  <p className="font-mono text-[10px] uppercase text-muted-foreground mb-1">
                    Insights
                  </p>
                  <p className="font-medium text-[13px] leading-snug">{t}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA — centred per client rule */}
        <section className="relative border-t bg-foreground text-background px-4 py-12 text-center">
          <Note n={9} />
          <h3 className="font-bold text-2xl">
            Speak to a compressed air specialist
          </h3>
          <p className="text-sm text-background/70 mt-2 max-w-md mx-auto">
            Sizing, servicing or replacing — our engineers respond within one
            business day.
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <span className="bg-primary text-primary-foreground font-semibold text-sm px-6 py-3">
              Request a Quote
            </span>
            <span className="border border-background/40 text-sm font-medium px-6 py-3">
              Call 1300 266 773
            </span>
          </div>
        </section>

        <WfFooter />
      </div>

      {quote !== null && (
        <QuickQuoteModal
          product={PRODUCTS.find((p) => p.id === quote)!}
          onClose={() => setQuote(null)}
        />
      )}
    </KitShell>
  );
}

/*
 * STYLE: Blueprint Studio wireframe (ideas.md)
 * 01 - Product List template. Grayscale blocks, radius 0, amber CTAs only.
 * Interactive: filter checkboxes update result count, compare tray demo.
 * Section nav (quicklink) is NOT sticky per client rule.
 */
import { useMemo, useState } from "react";
import QuickQuoteModal from "@/components/QuickQuoteModal";
import { PRODUCT_MODELS, type ProductModel } from "@/lib/productData";
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

/* All 150 real models from the client's ProductList-Marketing.xlsx (258 SKUs / 44 series)
   are imported from lib/productData.ts - generated straight from the spreadsheet. */
const PRODUCTS = PRODUCT_MODELS;

function cardName(p: ProductModel): string {
  if (p.category === "OEM") return `${p.model} Bare Airend`;
  const t = p.type === "N/A" ? "" : ` ${p.type}`;
  const kind = p.category === "Portable" ? " Portable" : " Screw";
  if (p.family.includes("Bebicon")) return `${p.model} Oil Free Piston`;
  if (p.family.includes("SRL")) return `${p.model} Oil Free Scroll`;
  if (p.family.includes("Reciprocating")) return `${p.model} Reciprocating`;
  return `${p.model}${t}${kind}`;
}

/* Facet counts = real MODEL counts (258 SKUs aggregated to 150 models) from ProductList-Marketing.xlsx */
const FACETS: Array<[string, string[]]> = [
  ["Category", ["Stationary (109)", "Portable (33)", "OEM Airends (8)", "Accessories - data TBC"]],
  ["Air Type", ["Oil Flooded (84)", "Oil Free (58)"]],
  ["Brand", ["Sullair (74)", "Champion (36)", "Hitachi (36)", "Bebicon (3)", "Air-One (1)"]],
  ["Drive", ["Fixed Speed (86)", "Variable Speed VSD (31)", "Diesel engine (33)"]],
  ["Max Pressure", ["7-8 bar (17)", "8.5-10 bar (69)", "10.5-15 bar (45)", "Over 15 bar (19)"]],
  ["Motor Power", ["Up to 15 kW (34)", "16-75 kW (62)", "76-160 kW (24)", "Over 160 kW (30)"]],
  ["Connectivity", ["AirLinx remote monitoring (112 SKUs)"]],
];

/* Guided finder dropdown definitions - each option maps to a filter rule */
const FINDER: Array<{ label: string; options: string[] }> = [
  { label: "1 · Application", options: ["Workshop / trades", "Continuous industrial", "Portable / site work", "Clean air (food, pharma)"] },
  { label: "2 · Air demand (cfm)", options: ["Up to 100 cfm", "100-500 cfm", "500-1,000 cfm", "1,000+ cfm"] },
  { label: "3 · Power supply", options: ["Single phase", "Three phase", "Diesel (no mains power)"] },
];

const SORTS = ["Relevance", "Power: low → high", "Power: high → low", "Flow: high → low", "Name A-Z"];

const NOTES: NoteDef[] = [
  { n: 1, title: "Global header + primary CTA", body: "Persistent 'CONTACT US' (live-site CTA label, Hitachi Red) is the #1 conversion action. Mega-menu routes by product type and industry (competitor pattern: Atlas Copco intent-based navigation). Header lockup follows Hitachi brand rules: HITACHI mark leads, 'Global Air Power' wordmark subordinate and never red." },
  { n: 2, title: "Archive hero with live count", body: "H1 targets the head keyword ('Air Compressors Australia'). Counts now reflect the client's real catalogue: 258 SKUs across 150 models in 44 series (ProductList-Marketing.xlsx). Recommend product pages at MODEL level (~150 pages) with pressure-variant SKUs shown as rows in the spec table - not separate pages. Category sub-nav mirrors the agreed Products menu: All / Stationary / Portable / Oil Flooded / Oil Free / Accessories." },
  { n: 3, title: "Guided product finder", body: "3-step selector (application → air demand → power) for non-technical buyers, modelled on Sullair America's interactive guide. Functional in this prototype - pick options and 'Show matches' narrows the grid. In production each combination maps to a pre-filtered archive URL so results are shareable and indexable." },
  { n: 4, title: "Faceted filter sidebar - real spec-sheet facets", body: "MOBILE-FIRST: below the lg breakpoint the sidebar collapses into a full-width drawer behind a 44px 'Filters' button showing the active-filter count - tap it in this prototype to see the drawer. EVERY FACET IS NOW DRIVEN BY THE CLIENT'S ProductList-Marketing.xlsx: all 150 models are loaded and every checkbox filters the live grid. TAXONOMY: products map on TWO AXES - Category (Stationary 109 / Portable 33 / OEM 8 models) and Air Type (Oil Flooded 84 / Oil Free 58). A VOC 90 is BOTH Stationary AND Oil Flooded, so these are two separate taxonomies, not one flat tree: the nav categories become landing pages while products cross-list without duplication. FACET SOURCES: Brand = BRANDING column (Sullair 74 / Champion 36 / Hitachi 36 / Bebicon 3 / Air-One 1 models); Drive = derived from CAPACITY CONTROLS + START TYPE (Fixed 86 / VSD 31) and engine-driven portables (33); Pressure and Power buckets from MAX PRESSURE (BAR) and MOTOR RATING (kW); Connectivity = the 112 AirLinx-equipped SKUs. ACCESSORIES: the Excel contains no accessories rows - the facet is shown greyed as 'data TBC' until the client supplies that list. OEM: the 8 bare-airend models are included under 'OEM Airends' pending a decision (include, separate, or exclude?). An INDUSTRY facet is recommended but requires tagging - the spreadsheet has no industry column, so each model needs industry terms assigned during content entry (one-off, then reused by homepage tiles and industry pages). GUTENBERG BUILD NOTE: per client direction the data layer is ACF or WooCommerce. Recommended: WooCommerce products in catalogue mode (no cart or checkout) with ACF field groups for the 30 spec columns, and categories and attributes as native Woo taxonomies. IMPORTANT CONSTRAINT: the core Query Loop block can render this grid and handle pagination, but it cannot do multi-facet front-end filtering on meta values by itself. This sidebar therefore needs a faceting plugin (FacetWP, Filter Everything or an equivalent) or a custom filter block, exactly as it would have under any builder. Choose one that delivers AJAX updates, live per-facet counts and clean indexable filter URLs such as /products/?brand=sullair. This is the single biggest build decision on this template, so settle it before content entry." },
  { n: 5, title: "Product cards - all 150 real models", body: "Every card is a real model from the spec sheet, showing kW / cfm / bar (top of range) plus its series and how many pressure-variant SKUs roll up into the one page. Models load 24 at a time ('Load more') - in production this is AJAX pagination. Two actions: View Product (research) and Quick Quote (conversion). Quick Quote is functional in this prototype - click it to walk the full flow: pre-filled product context, a 5-field form (product, page URL, UTM and GCLID travel as hidden fields), AJAX submit → Salesforce Web-to-Lead, postcode-based branch routing, then a confirmation state that fires the GA4/Ads conversion event. No page reload, no re-typing the model name. Product context comes from the ACF or WooCommerce product record. GUTENBERG: render the card as an ACF Block used as the Query Loop post template, or as a custom post template within the Query Loop, so one card definition serves every listing on the site." },
  { n: 6, title: "Compare tray", body: "Optional enhancement: select up to 3 models for a side-by-side spec table. Appears only when items are selected." },
  { n: 7, title: "Trust band (social proof)", body: "24/7 service, genuine OEM parts, 6 Australian branches - differentiators vs importers, per competitor gap analysis (CAPS / Pilot Air)." },
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
  const [visibleCount, setVisibleCount] = useState(24);

  const activeFilters = Object.keys(checked).filter((k) => checked[k]);

  const visible = useMemo(() => {
    let list = PRODUCTS;

    /* Guided finder rules */
    const app = finderApplied["1 · Application"];
    if (app === "Workshop / trades") list = list.filter((p) => p.category === "Stationary" && p.kw <= 22);
    if (app === "Continuous industrial") list = list.filter((p) => p.category === "Stationary" && p.kw >= 22);
    if (app === "Portable / site work") list = list.filter((p) => p.category === "Portable");
    if (app === "Clean air (food, pharma)") list = list.filter((p) => p.type === "Oil Free");
    const dem = finderApplied["2 · Air demand (cfm)"];
    if (dem === "Up to 100 cfm") list = list.filter((p) => p.cfm <= 100);
    if (dem === "100-500 cfm") list = list.filter((p) => p.cfm > 100 && p.cfm <= 500);
    if (dem === "500-1,000 cfm") list = list.filter((p) => p.cfm > 500 && p.cfm <= 1000);
    if (dem === "1,000+ cfm") list = list.filter((p) => p.cfm > 1000);
    const pow = finderApplied["3 · Power supply"];
    if (pow === "Single phase") list = list.filter((p) => p.kw <= 15 && p.driveClass !== "Diesel");
    if (pow === "Three phase") list = list.filter((p) => p.kw > 15 && p.category !== "Portable");
    if (pow === "Diesel (no mains power)") list = list.filter((p) => p.driveClass === "Diesel");

    if (activeFilters.length === 0) return list;
    return list.filter((p) =>
      activeFilters.every((f) => {
        const label = f.replace(/\s\([^)]*\)$/, "").replace(" - data TBC", "");
        if (["Sullair", "Champion", "Hitachi", "Bebicon", "Air-One"].includes(label.split(" ")[0]))
          return p.brand === label.split(" ")[0];
        if (label === "Stationary" || label === "Portable") return p.category === label;
        if (label.startsWith("OEM")) return p.category === "OEM";
        if (label.startsWith("Accessories")) return false; // no accessories rows in client data yet
        if (label === "Oil Flooded" || label === "Oil Free") return p.type === label;
        if (label.startsWith("Variable")) return p.driveClass === "VSD";
        if (label.startsWith("Fixed")) return p.driveClass === "Fixed Speed";
        if (label.startsWith("Diesel")) return p.driveClass === "Diesel";
        if (label.startsWith("AirLinx")) return p.connectivity === "Airlinx";
        if (label.includes("bar")) {
          if (label.startsWith("7-8")) return p.bar <= 8;
          if (label.startsWith("8.5")) return p.bar > 8 && p.bar <= 10;
          if (label.startsWith("10.5")) return p.bar > 10 && p.bar <= 15;
          return p.bar > 15;
        }
        if (label.includes("kW")) {
          if (label.startsWith("Up to")) return p.kw <= 15;
          if (label.startsWith("16")) return p.kw > 15 && p.kw <= 75;
          if (label.startsWith("76")) return p.kw > 75 && p.kw <= 160;
          return p.kw > 160;
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
    if (sort === "Name A-Z") list.sort((a, b) => a.model.localeCompare(b.model));
    return list;
  }, [visible, sort]);

  const finderActive = Object.keys(finderApplied).length > 0;

  const toggle = (key: string) => {
    setChecked((c) => ({ ...c, [key]: !c[key] }));
    setVisibleCount(24);
  };

  const toggleCompare = (id: number) =>
    setCompare((c) =>
      c.includes(id) ? c.filter((x) => x !== id) : c.length < 3 ? [...c, id] : c,
    );

  return (
    <KitShell page="list" notes={NOTES}>
      <SheetTitle
        code="Template 01 / Product Archive - /products/"
        title="Product List Page with Faceted Filters"
        desc="Responsive wireframe (resize to preview mobile). Filters are live in this prototype - tick a facet to see the result grid respond; on mobile they collapse behind a Filters button."
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
          {/* Category sub-nav - the six agreed categories under Products */}
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
                Value proposition line - Champion, Sullair &amp; Hitachi ranges, sold and serviced from 6 Australian branches.
              </p>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wide bg-foreground text-background px-3 py-1.5" data-no-lorem>
              150 models · 44 series · 258 SKUs
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
          {/* Sidebar - drawer on mobile, persistent ≥lg */}
          <aside
            data-no-lorem
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

            {/* Range sliders - real catalogue extents from the spec sheet */}
            {["Power (kW): 1.5 to 522", "Flow (cfm): 6 to 2,700", "Pressure (bar): 7 to 34.5"].map((s) => (
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
                  {sorted.length} of {PRODUCTS.length}
                </strong>{" "}
                models <span className="text-muted-foreground">(258 SKUs)</span>
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

            <div data-no-lorem className={view === "grid" ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-4" : "flex flex-col gap-3"}>
              {sorted.slice(0, visibleCount).map((p) => (
                <article key={p.id} className={`bg-card border flex ${view === "grid" ? "flex-col" : "flex-row items-stretch"}`}>
                  <ImgPh label="Product image" className={view === "grid" ? "h-36" : "w-44 flex-none"} />
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                      {p.brand} · {p.category} · {p.type === "N/A" ? "Bare Airend" : p.type} · {p.family} series
                    </span>
                    <h3 className="font-semibold text-[15px] leading-snug">
                      {cardName(p)}
                    </h3>
                    <div className="grid grid-cols-3 border divide-x text-center mt-1">
                      {[
                        [p.kwRange || "-", "kW"],
                        [p.cfm ? p.cfm.toLocaleString() : "-", "cfm"],
                        [p.barRange || "-", "bar"],
                      ].map(([v, u]) => (
                        <div key={u as string} className="py-1.5">
                          <p className="font-semibold text-[13px]">{v}</p>
                          <p className="font-mono text-[9px] uppercase text-muted-foreground">
                            {u}
                          </p>
                        </div>
                      ))}
                    </div>
                    {p.skus > 1 && (
                      <p className="font-mono text-[9px] uppercase text-muted-foreground">
                        {p.skus} pressure-variant SKUs on one page
                      </p>
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

            {/* Load more - real count driven */}
            <div className="flex flex-col items-center gap-2 mt-6">
              <p className="font-mono text-[11px] text-muted-foreground">
                {Math.min(visibleCount, sorted.length)} of {sorted.length} shown
              </p>
              {visibleCount < sorted.length && (
                <button
                  onClick={() => setVisibleCount((c) => c + 24)}
                  className="border-2 border-foreground font-semibold text-[13px] px-8 py-2.5 bg-card"
                >
                  Load more models
                </button>
              )}
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
                  {(() => { const m = PRODUCTS.find((p) => p.id === id); return m ? cardName(m) : ""; })()}
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
              "Fixed speed vs VSD - which is right for you?",
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

        {/* Final CTA - centred per client rule */}
        <section className="relative border-t bg-foreground text-background px-4 py-12 text-center">
          <Note n={9} />
          <h3 className="font-bold text-2xl">
            Speak to a compressed air specialist
          </h3>
          <p className="text-sm text-background/70 mt-2 max-w-md mx-auto">
            Sizing, servicing or replacing - our engineers respond within one
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

      {quote !== null && (() => {
        const m = PRODUCTS.find((p) => p.id === quote)!;
        return (
          <QuickQuoteModal
            product={{ name: cardName(m), brand: m.brand, config: m.category, airtype: m.type === "N/A" ? "Bare Airend" : m.type, kw: m.kw, cfm: m.cfm, bar: m.bar }}
            onClose={() => setQuote(null)}
          />
        );
      })()}
    </KitShell>
  );
}

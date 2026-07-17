/*
 * STYLE: Blueprint Studio wireframe (ideas.md)
 * 04 — Brand page template (example: Sullair). Grayscale, radius 0.
 * Global header/footer unchanged (branding only on page body, not chrome).
 * Order: content → Blogs → Final CTA (centred) → Footer.
 */
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
import { ArrowRight, Award, ChevronRight, Globe, ShieldCheck } from "lucide-react";

const NOTES: NoteDef[] = [
  { n: 1, title: "Brand hero with proof points", body: "Brand story headline + three proof chips (heritage, warranty, Hitachi ownership). The global header and CTA stay standard — brand personality lives in the page body only." },
  { n: 2, title: "Heritage / value proposition", body: "Two-column brand narrative with timeline stats. Answers 'why buy Sullair through HGAP' — authorised distribution, local stock, factory-trained support." },
  { n: 3, title: "Ranges by series", body: "Products grouped the way buyers shop the brand: by series (VOC VSD, VOC, CSA, ShopTek, portables). Each tile deep-links to a pre-filtered category/list view." },
  { n: 4, title: "Technology highlight", body: "One signature technology block per brand (Sullair: the air-end + spiral valve). Keeps the page from being a plain product dump." },
  { n: 5, title: "Brand-level social proof", body: "Case study featuring this brand plus install stats. Real content from the case-study library." },
  { n: 6, title: "Cross-brand navigation", body: "Explore strip to the other two brand pages — keeps users inside the catalogue." },
  { n: 7, title: "Blogs before final CTA", body: "Brand-related articles feed SEO and expertise, in the agreed component order (Blogs → Final CTA → Footer)." },
  { n: 8, title: "Final CTA (centred)", body: "Standard centred conversion block — consistent across all templates." },
];

export default function BrandPage() {
  return (
    <KitShell page="brand" notes={NOTES}>
      <SheetTitle
        code="Template 04 / Brand page — /brands/sullair/"
        title="Brand Page"
        desc="Desktop wireframe using Sullair as the example. Same structure serves Champion and Hitachi brand pages."
      />

      <div className="wf-sheet overflow-hidden">
        <WfUtilityBar />
        <WfHeader />

        {/* Breadcrumb */}
        <div className="border-b px-4 lg:px-8 py-3 bg-secondary/60">
          <p className="font-mono text-[11px] text-muted-foreground">
            Home <ChevronRight className="inline w-3 h-3" /> Brands{" "}
            <ChevronRight className="inline w-3 h-3" />{" "}
            <span className="text-foreground font-medium">Sullair</span>
          </p>
        </div>

        {/* Brand hero */}
        <section className="relative grid lg:grid-cols-2 border-b bg-card">
          <Note n={1} />
          <div className="px-4 lg:px-8 py-12 flex flex-col justify-center">
            <ImgPh label="Sullair brand logo" className="h-12 w-44 mb-5" />
            <h2 className="font-bold text-3xl leading-tight max-w-md">
              Legendary durability. Engineered since 1965.
            </h2>
            <p className="text-sm text-muted-foreground mt-4 max-w-md leading-relaxed">
              Brand value proposition — Sullair rotary screw compressors are
              built around one of the most durable airends in the industry,
              sold and supported in Australia exclusively through HGAP.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <span className="bg-primary text-primary-foreground font-semibold text-sm px-6 py-3.5">
                Browse Sullair range
              </span>
              <span className="border font-medium text-sm px-6 py-3.5">
                Request a quote
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-5 mt-8 text-[12px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Since 1965
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> 5-yr airend warranty
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4" /> A Hitachi Group brand
              </span>
            </div>
          </div>
          <ImgPh label="Brand hero image — flagship compressor" className="min-h-72" />
        </section>

        {/* Heritage / value prop */}
        <section className="relative border-b grid lg:grid-cols-2 gap-8 px-4 lg:px-8 py-10 bg-secondary/40">
          <Note n={2} />
          <div>
            <p className="wf-kicker mb-1">Why Sullair through HGAP</p>
            <h3 className="font-bold text-xl mb-3">
              Authorised distribution, local stock, factory-trained support
            </h3>
            <div className="space-y-2 max-w-lg">
              {[100, 92, 96, 70].map((w, i) => (
                <div key={i} className="h-3 bg-card border" style={{ width: `${w}%` }} />
              ))}
            </div>
            <div className="mt-4 space-y-2 max-w-lg">
              {[88, 95, 60].map((w, i) => (
                <div key={i} className="h-3 bg-card border" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 border divide-x bg-card text-center self-center">
            {[
              ["1965", "brand founded"],
              ["60+", "years of airends"],
              ["43", "models in AU range"],
            ].map(([v, l]) => (
              <div key={l} className="py-6">
                <p className="font-bold text-2xl">{v}</p>
                <p className="font-mono text-[10px] uppercase text-muted-foreground mt-1">{l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ranges by series */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-card">
          <Note n={3} />
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="wf-kicker mb-1">The range</p>
              <h3 className="font-bold text-xl">Sullair ranges available in Australia</h3>
            </div>
            <span className="font-mono text-[11px] underline">All Sullair products →</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ["VOC VSD Series", "Variable speed oil flooded screw · 45–250 kW", "10 models"],
              ["VOC Series", "Fixed speed oil flooded screw · 45–250 kW", "11 models"],
              ["TS Two-Stage Series", "High-efficiency two-stage screw · 260+ kW", "4 models"],
              ["Portable Diesel Range", "185–1,600 cfm towable fleet", "12 models"],
              ["Oil Free OFD Range", "Class 0 portable oil free", "3 models"],
              ["Air Treatment", "Dryers, filters & receivers", "9 models"],
            ].map(([s, d, n]) => (
              <div key={s} className="border group hover:bg-secondary transition-colors duration-150">
                <ImgPh label="Series image" className="h-28" />
                <div className="p-4">
                  <p className="font-semibold text-[15px]">{s}</p>
                  <p className="text-[12px] text-muted-foreground mt-1">{d}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-mono text-[10px] uppercase text-muted-foreground">{n}</span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase text-primary">
                      View series <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology highlight */}
        <section className="relative border-b grid lg:grid-cols-2 bg-foreground text-background">
          <Note n={4} />
          <ImgPh label="Airend cutaway image" className="min-h-64 !bg-white/10 !border-white/25" />
          <div className="px-4 lg:px-8 py-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-background/60 mb-2">
              Signature technology
            </p>
            <h3 className="font-bold text-2xl max-w-sm">
              The Sullair airend — built to run for decades
            </h3>
            <p className="text-sm text-background/70 mt-3 max-w-md leading-relaxed">
              Technology narrative block — durability story, spiral valve
              part-load efficiency, supporting spec callouts.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6 max-w-sm">
              {[
                ["Spiral valve", "capacity control"],
                ["Class-leading", "airend life"],
              ].map(([v, l]) => (
                <div key={l} className="border border-white/25 p-4">
                  <p className="font-semibold text-[14px]">{v}</p>
                  <p className="font-mono text-[10px] uppercase text-background/60 mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand social proof */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-secondary/40">
          <Note n={5} />
          <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-center">
            <div className="border-l-4 border-primary pl-5">
              <p className="text-lg font-medium leading-relaxed max-w-2xl">
                Sullair-specific case-study pull-quote — e.g. portable fleet
                deployment for a mining shutdown, from the existing case-study
                library.
              </p>
              <p className="font-mono text-[11px] text-muted-foreground mt-3">
                — Client name, role · Read the full case study →
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <ImgPh key={i} label="Client" className="h-12" />
              ))}
            </div>
          </div>
        </section>

        {/* Cross-brand explore */}
        <section className="relative border-b grid sm:grid-cols-2 divide-x bg-card">
          <Note n={6} />
          {[
            ["Champion", "Workshop & light-industrial compressors"],
            ["Hitachi", "Oil-free scroll & screw technology"],
          ].map(([b, s]) => (
            <div key={b} className="flex items-center gap-4 p-6 hover:bg-secondary transition-colors duration-150">
              <ImgPh label={`${b} logo`} className="w-24 h-10 flex-none" />
              <div className="flex-1">
                <p className="font-semibold text-[14px]">Explore {b}</p>
                <p className="text-[12px] text-muted-foreground">{s}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
        </section>

        {/* Blogs */}
        <section className="relative border-b px-4 lg:px-8 py-10 bg-card">
          <Note n={7} />
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="wf-kicker mb-1">Insights</p>
              <h3 className="font-bold text-xl">Sullair guides &amp; stories</h3>
            </div>
            <span className="font-mono text-[11px] underline">View all insights →</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              "Fixed speed vs VSD — which is right for you?",
              "Inside the Sullair airend warranty",
              "Case study: portable fleet for mine shutdown",
            ].map((t) => (
              <div key={t} className="border">
                <ImgPh label="Article image" className="h-24" />
                <div className="p-4">
                  <p className="font-mono text-[10px] uppercase text-muted-foreground mb-1">Insights</p>
                  <p className="font-medium text-[13px] leading-snug">{t}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA — centred */}
        <section className="relative bg-foreground text-background px-4 py-12 text-center">
          <Note n={8} />
          <h3 className="font-bold text-2xl">Ready to spec a Sullair?</h3>
          <p className="text-sm text-background/70 mt-2 max-w-md mx-auto">
            Talk to our engineers about sizing, energy savings and trade-in
            options.
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
    </KitShell>
  );
}

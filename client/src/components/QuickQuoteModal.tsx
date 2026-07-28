/*
 * STYLE: Blueprint Studio wireframe (ideas.md)
 * Quick Quote modal - functional demo of the intended quote flow.
 * Step 1: pre-filled product context + short Salesforce-mapped form.
 * Step 2: confirmation ("thank you") state with tracking note.
 * Grayscale, radius 0, amber CTAs only.
 */
import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

export interface QuickQuoteProduct {
  name: string;
  brand: string;
  config: string;
  airtype: string;
  kw: number;
  cfm: number;
  bar: number;
}

export default function QuickQuoteModal({
  product,
  onClose,
}: {
  product: QuickQuoteProduct;
  onClose: () => void;
}) {
  const [step, setStep] = useState<1 | 2>(1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50"
      onClick={onClose}
    >
      <div
        className="bg-card border-2 border-foreground w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between border-b px-5 py-3.5 bg-secondary">
          <p className="font-mono text-[11px] uppercase tracking-wide">
            {step === 1 ? "Quick Quote - 30 seconds" : "Request received"}
          </p>
          <button onClick={onClose} aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 1 ? (
          <div className="p-5">
            {/* Pre-filled product context */}
            <div className="border bg-secondary/60 p-4 flex items-center gap-4">
              <div className="w-16 h-12 flex-none border bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,oklch(0.9_0_0)_6px,oklch(0.9_0_0)_7px)] flex items-center justify-center">
                <span className="font-mono text-[8px] uppercase text-muted-foreground bg-card px-1">img</span>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase text-muted-foreground">
                  {product.brand} · {product.config} · {product.airtype}
                </p>
                <p className="font-semibold text-[14px] leading-snug">{product.name}</p>
                <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
                  {product.kw} kW · {product.cfm} cfm · {product.bar} bar
                </p>
              </div>
            </div>
            <p className="font-mono text-[10px] text-primary mt-2">
              ↑ Product auto-attached as a hidden field - the buyer never re-types the model.
            </p>

            {/* Short form */}
            <form
              className="mt-4 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
            >
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground">Name *</span>
                  <input required className="mt-1 w-full border bg-card px-3 py-2.5 text-[13px]" placeholder="Full name" />
                </label>
                <label className="block">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground">Company</span>
                  <input className="mt-1 w-full border bg-card px-3 py-2.5 text-[13px]" placeholder="Company" />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground">Email *</span>
                  <input required type="email" className="mt-1 w-full border bg-card px-3 py-2.5 text-[13px]" placeholder="you@company.com.au" />
                </label>
                <label className="block">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground">Phone *</span>
                  <input required className="mt-1 w-full border bg-card px-3 py-2.5 text-[13px]" placeholder="04XX XXX XXX" />
                </label>
              </div>
              <label className="block">
                <span className="font-mono text-[10px] uppercase text-muted-foreground">Postcode (routes to nearest branch)</span>
                <input className="mt-1 w-full border bg-card px-3 py-2.5 text-[13px]" placeholder="e.g. 3000" />
              </label>
              <label className="block">
                <span className="font-mono text-[10px] uppercase text-muted-foreground">Notes (optional)</span>
                <textarea rows={2} className="mt-1 w-full border bg-card px-3 py-2.5 text-[13px]" placeholder="Application, air demand, timeframe..." />
              </label>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-semibold text-sm py-3"
              >
                Send quote request
              </button>
              <p className="font-mono text-[9px] text-muted-foreground leading-relaxed">
                DEV NOTE: submits via AJAX to the forms plugin → Salesforce
                Web-to-Lead. Hidden fields: product name, SKU, page URL, UTM
                params, GCLID. No page reload.
              </p>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center">
            <span className="inline-flex items-center justify-center w-12 h-12 border-2 border-foreground mb-4">
              <Check className="w-6 h-6" />
            </span>
            <h3 className="font-bold text-xl">Thanks - request received</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
              Confirmation state: "A compressed air specialist from your
              nearest branch will contact you within one business day about
              the {product.name}."
            </p>
            <div className="border bg-secondary/60 p-4 mt-5 text-left">
              <p className="font-mono text-[9px] uppercase text-muted-foreground mb-2">
                What happens behind the scenes
              </p>
              <ol className="text-[12px] space-y-1.5 list-decimal list-inside">
                <li>Lead created in Salesforce with product + source attribution</li>
                <li>Email alert to the branch matched by postcode</li>
                <li>Auto-reply confirmation email to the buyer</li>
                <li>Conversion fires to GA4 / Google Ads (thank-you event)</li>
              </ol>
            </div>
            <div className="flex justify-center gap-3 mt-6">
              <button onClick={onClose} className="border font-medium text-[13px] px-5 py-2.5">
                Continue browsing
              </button>
              <span className="bg-foreground text-background font-semibold text-[13px] px-5 py-2.5">
                View related products
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

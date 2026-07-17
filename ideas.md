# ideas.md — HGAP Product Template Wireframes

## Context
This is NOT a styled website. The deliverable is a set of **client-presentation wireframes** for two page templates of the Hitachi Global Air Power Australia rebuild: a Product List page (with faceted filters) and a Single Product page. The wireframes must communicate structure, hierarchy, and functionality to a client — with annotation callouts explaining rationale — while staying deliberately grayscale/schematic so the client focuses on layout, not colors.

Because the deliverable IS a wireframe kit, the "design approach" here is the wireframe presentation system itself.

## Three candidate presentation styles
1. **Blueprint Studio** — Wireframes drawn like architectural blueprints: paper-white canvas, hairline borders, monospace annotation labels, numbered callout badges. Professional agency-deck feel. Probability: 0.07
2. **Sketchframe** — Hand-drawn Balsamiq-style wobbly boxes and marker fonts, deliberately lo-fi. Probability: 0.03
3. **Slate Spec** — Dark spec-sheet theme with light wire outlines like a Figma dev-mode inspection. Probability: 0.04

## CHOSEN: Blueprint Studio
- **Design Movement:** Swiss/International Typographic Style applied to UX documentation — precision grids, objective presentation, functional annotation.
- **Core Principles:**
  1. Grayscale-first: all UI blocks in gray tones (#fff canvas, gray-100..gray-900 hierarchy); one single accent (safety amber #C25E00-ish, echoing industrial equipment yellow but muted) reserved ONLY for CTAs and annotation callouts.
  2. Sharp geometry: border-radius 0 everywhere. No gradients. No blue overlays or dark blue headers.
  3. Real content structure: every block uses real data from the site audit (134 products, VOC/CSA/ShopTek series, Sullair/Champion brands, 8 branches) — no lorem ipsum.
  4. Annotated: numbered amber callout badges tied to a rationale panel per page.
- **Color Philosophy:** Neutral grays communicate "this is structure, not visual design"; the single amber accent trains the client's eye to CTAs and annotations — the two things that matter in a wireframe review.
- **Layout Paradigm:** Left-anchored asymmetric page chrome: a fixed slim wireframe-kit toolbar (kit navigation: Cover / Product List / Product Page / Annotations toggle) on the left, with the wireframe canvas rendered like a document sheet with drop shadow on a dotted-grid background.
- **Signature Elements:** (1) dotted blueprint grid background; (2) numbered amber annotation badges; (3) image placeholders as gray boxes with diagonal cross-lines + label (classic wireframe idiom).
- **Interaction Philosophy:** The wireframes themselves are lightly interactive to demo behavior (working filter checkboxes with result-count changes, tab scroll-to-sections, compare tray) — enough to feel the UX, not enough to look "built".
- **Animation:** Minimal, functional: 150-200ms ease-out on hover/expand; annotation badges pulse subtly once on load; no decorative motion.
- **Typography System:** IBM Plex Mono for annotation labels/meta (blueprint feel) + Archivo (600/700) for wireframe headings + system-ish Archivo 400 for body. No Inter.
- **Brand Essence:** "The structural drawings for HGAP's new digital catalogue" — for agency-to-client presentation; precise, credible, decision-ready.
- **Brand Voice:** Spec-sheet objective. Example: "Faceted filter — replaces 229 mixed categories with 7 clean taxonomies." / "Every product page ends in a quote request."
- **Wordmark & Logo:** Kit header uses a compact mono wordmark "HGAP / WIREFRAME KIT v1.0" in IBM Plex Mono — deliberately documentation-styled, not a consumer logo.
- **Signature Brand Color:** Muted industrial amber (oklch ~0.62 0.13 60) — used only for CTA blocks and annotation badges.

## Known client preferences (execution contract)
- border-radius: 0 on all components, never overridden.
- No blue overlays / dark blue headers; no gradients.
- Quicklink/section-nav bars: never sticky.
- Tabs: scroll effect (tab bar scrolls to anchored sections).
- Final CTA centered; include value prop, social proof, structured hero, clear CTAs.
- Wireframes informed by content plan (site audit), not invented.

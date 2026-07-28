/**
 * Lorem-ipsum copy mode for the wireframe kit.
 *
 * When active (?lorem=1 query param, #lorem in hash, or window.__LOREM__ flag
 * injected by the standalone export), every visible text node in the document
 * is replaced with lorem-ipsum placeholder text of roughly the same length,
 * so the structural wireframe reads without any real copy.
 *
 * Implementation: a MutationObserver walks text nodes after each render and
 * substitutes words while preserving:
 *  - string length rhythm (word-count matched to the original)
 *  - capitalisation of the first letter
 *  - trailing punctuation
 *  - numbers-with-unit tokens are converted to generic "00" figures
 *
 * The original copy is never shipped differently — this is a presentation
 * transform only, applied client-side. Toggle off by removing the flag.
 */

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing",
  "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore",
  "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam",
  "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi",
  "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure",
  "in", "reprehenderit", "voluptate", "velit", "esse", "cillum", "fugiat",
  "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat",
  "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt",
  "mollit", "anim", "id", "est", "laborum",
];

let wordCursor = 0;

/** Deterministic-ish lorem word stream (stable within a session). */
function nextWord(): string {
  const w = LOREM_WORDS[wordCursor % LOREM_WORDS.length];
  wordCursor += 7; // co-prime stride so adjacent words vary
  return w;
}

/** Pick a lorem word whose length is close to `len`. */
function wordOfLength(len: number): string {
  // try a few candidates from the stream, pick closest length
  let best = nextWord();
  for (let i = 0; i < 4; i++) {
    const cand = nextWord();
    if (Math.abs(cand.length - len) < Math.abs(best.length - len)) best = cand;
  }
  return best;
}

const NUM_RE = /^[\d,.\u2013\u2014\-–—/%×x+]+$/;

/** Transform one original token into a lorem token. */
function loremToken(token: string): string {
  // pure number / numeric-range tokens → zeroed figures of same shape
  if (NUM_RE.test(token)) return token.replace(/\d/g, "0");
  // number-with-unit like "90kW", "7.5bar" → zero the digits, keep letters loremed
  const m = token.match(/^([^A-Za-z]*)([A-Za-z].*)$/);
  const leading = m ? m[1] : "";
  const wordPart = m ? m[2] : token;
  // strip leading/trailing punctuation from word part
  const pm = wordPart.match(/^(\W*)([\w'’-]+)(\W*)$/);
  if (!pm) return leading.replace(/\d/g, "0") + wordPart;
  const [, pre, core, post] = pm;
  let lw = wordOfLength(core.length);
  // preserve capitalisation pattern
  if (core === core.toUpperCase() && core.length > 1) {
    lw = lw.toUpperCase();
  } else if (/^[A-Z]/.test(core)) {
    lw = lw.charAt(0).toUpperCase() + lw.slice(1);
  }
  return leading.replace(/\d/g, "0") + pre + lw + post;
}

/** Remove em dashes (and typographic en dashes used as em dashes) from copy. */
function stripDashes(text: string): string {
  return text
    .replace(/\s*[\u2014\u2013]\s*/g, " ") // " — " / " – " → single space
    .replace(/ {2,}/g, " ");
}

/** Replace a whole text string with lorem of matching shape (no em dashes). */
export function loremize(text: string): string {
  if (!text.trim()) return text;
  return stripDashes(text).replace(/\S+/g, (tok) => loremToken(tok));
}

const PROCESSED = new WeakSet<Text>();

/** Routes that show REAL English copy even when lorem mode is on
 *  (client request: product list + product page review with real data/copy). */
const REAL_COPY_ROUTES = ["/product-list", "/product-page"];

function isRealCopyRoute(): boolean {
  // support both hash routing (GitHub Pages) and path routing (dev preview)
  const hash = window.location.hash.replace(/^#/, "").split("?")[0];
  if (hash && hash !== "/") return REAL_COPY_ROUTES.includes(hash);
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  return REAL_COPY_ROUTES.some((r) => path.endsWith(r));
}

/** True when a node sits inside an element marked data-no-lorem
 *  (navigation chrome such as the kit toolbar, site header nav, utility
 *  bar and footer stay in English so reviewers can orient themselves). */
function isExcluded(node: Node): boolean {
  const el =
    node.nodeType === 1 ? (node as Element) : node.parentElement;
  return !!el && !!el.closest("[data-no-lorem]");
}

function walk(root: Node) {
  if (isRealCopyRoute()) return;
  if (isExcluded(root)) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const p = node.parentElement;
      if (!p) return NodeFilter.FILTER_REJECT;
      const tag = p.tagName;
      if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT")
        return NodeFilter.FILTER_REJECT;
      if (p.closest("[data-no-lorem]")) return NodeFilter.FILTER_REJECT;
      if (!node.nodeValue || !node.nodeValue.trim())
        return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const targets: Text[] = [];
  let n: Node | null;
  while ((n = walker.nextNode())) targets.push(n as Text);
  for (const t of targets) {
    if (PROCESSED.has(t)) continue;
    t.nodeValue = loremize(t.nodeValue || "");
    PROCESSED.add(t);
  }
}

declare global {
  interface Window {
    __LOREM__?: boolean;
  }
}

export function isLoremMode(): boolean {
  if (typeof window === "undefined") return false;
  if (window.__LOREM__) return true;
  const qs = new URLSearchParams(window.location.search);
  if (qs.has("lorem")) return true;
  // The published GitHub Pages sketch always shows lorem-ipsum copy
  // (client request: no real copy, no em dashes on the shared links).
  if (window.location.hostname.endsWith(".github.io")) return true;
  return false;
}

let started = false;

/** Start the lorem transform if the mode flag is present. */
export function initLoremMode() {
  if (started || !isLoremMode()) return;
  started = true;
  const apply = () => walk(document.body);
  // initial pass after first paint
  requestAnimationFrame(apply);
  // observe subsequent renders (route changes, filter interactions, modals)
  const mo = new MutationObserver((muts) => {
    if (isRealCopyRoute()) return;
    for (const m of muts) {
      if (m.type === "childList") {
        m.addedNodes.forEach((node) => walk(node));
      } else if (m.type === "characterData" && m.target.nodeType === 3) {
        const t = m.target as Text;
        if (isExcluded(t)) continue;
        if (!PROCESSED.has(t)) {
          t.nodeValue = loremize(t.nodeValue || "");
          PROCESSED.add(t);
        }
      }
    }
  });
  mo.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });
  // badge so viewers know copy is placeholder (hidden on real-copy routes)
  const badge = document.createElement("div");
  badge.setAttribute("data-no-lorem", "");
  const setBadge = () => {
    badge.style.display = isRealCopyRoute() ? "none" : "block";
  };
  window.addEventListener("hashchange", setBadge);
  requestAnimationFrame(setBadge);
  badge.textContent = "LOREM IPSUM COPY / placeholder text variant";
  badge.setAttribute(
    "style",
    [
      "position:fixed",
      "bottom:0",
      "left:0",
      "right:0",
      "z-index:99999",
      "background:#1a1a1a",
      "color:#fff",
      "font:600 11px/1 Arial,sans-serif",
      "letter-spacing:0.12em",
      "text-transform:uppercase",
      "text-align:center",
      "padding:6px 8px",
      "pointer-events:none",
      "opacity:0.85",
    ].join(";")
  );
  document.body.appendChild(badge);
}

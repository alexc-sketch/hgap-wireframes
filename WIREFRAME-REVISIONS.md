# Wireframe Revision Workflow

How future wireframe rounds are managed in this repository — one branch per revision round, reviewed and merged via pull request.

## The live client URL

| Item | URL |
| --- | --- |
| Client presentation (GitHub Pages) | https://alexc-sketch.github.io/hgap-wireframes/ |
| Templates (hash routes) | `#/product-list`, `#/product-page`, `#/homepage`, `#/brand-page`, `#/category-page`, `#/industry-archive`, `#/industry-page` |

The Pages site is served from the `gh-pages` branch, which holds the compiled Vite build. `main` holds the source.

## Branch model

```
main            ← always the latest approved wireframe round
gh-pages        ← compiled build only, powers the client URL (never edit by hand)
feature/<name>  ← one branch per revision round, merged via PR
```

## Revision round lifecycle

1. **Branch** — cut a branch from `main`, named for the round, e.g. `feature/accessories-data`, `feature/round-3-client-feedback`.
2. **Edit** — make the wireframe changes on that branch (pages live in `client/src/pages/`, shared shell in `client/src/components/WireframeKit.tsx`).
3. **Pull request** — open a PR into `main`. The PR description lists what changed per template so the revision history reads like a changelog for the client.
4. **Review & merge** — once the round is agreed, merge the PR. `main` now reflects the approved state.
5. **Publish** — rebuild and push the build output to `gh-pages`:

```bash
pnpm install
VITE_BASE_PATH=/hgap-wireframes/ pnpm exec vite build
cp dist/public/index.html dist/public/404.html
# push the contents of dist/public to the gh-pages branch (force push is fine — it is build output only)
```

> A ready-made GitHub Actions workflow that automates step 5 on every push to `main` is available in this repo's history (`.github/workflows/deploy-pages.yml` — see PR notes). Adding it requires a token with `workflows` permission, so it should be committed from the GitHub web UI (Add file → Create new file) if auto-deploys are wanted.

## PR conventions

- **Title**: `Round N: <summary>` or `Demo: <summary>`
- **Body**: bullet list grouped by template number (01 Product List, 02 Product Page, …), plus any open questions for the client.
- **Labels** (optional): `client-feedback`, `data-update`, `new-template`.

## Local development

```bash
pnpm install
pnpm run dev      # dev server on :3000
```

Routing is hash-based when served statically (file:// or *.github.io), path-based on the dev server — both work without config changes.

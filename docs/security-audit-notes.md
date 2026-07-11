# Website dependency audit notes (S7)

Last triage: 2026-07-11

## Policy

- Marketing site is **static export** (`next.config.js` → `output: 'export'`).
- Runtime is static HTML/JS served from `out/` — Next server/RSC/middleware attack surface does **not** apply to published output.
- Keep Next.js current for **build-time** supply chain hygiene.

## Status

| Item | Status |
| --- | --- |
| Next.js | Pinned **15.5.20** (was 14.2.x with high advisories) |
| High/critical (`npm audit --omit=dev`) | **0** after upgrade |
| Moderate residual | nested `postcss` under Next (GHSA-qx2v-qp2m-jg93) — no non-breaking fix without major force; low relevance for static export |

## Commands

```bash
npm audit --omit=dev
npm run website:public
npm run public-demo
```

## Residual acceptance

- Moderate postcss nested in Next remains until upstream ships a patched bundling.
- Do **not** `npm audit fix --force` to Next 16 without a dedicated migration + full website QA.

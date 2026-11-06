# Page docs

Docs site for `@pelagornis/page`. It runs this theme against itself.

From the repository root:

```bash
bun install
bun run start
```

The site is served at `http://localhost:4321/`.

- Pages live in `src/content/docs/` for English, and in `ko/`, `ja/`, and `zh/` for the other locales. Every page exists in all four.
- Component pages live in `src/content/docs/components/`. Each one renders the demo in `src/demos/<id>.tsx` and shows its source.
- `src/components/docs/catalog.json` lists every component, its category, its translated descriptions, and its MDX and Markdoc usage. The sidebar and the component overview read from it.
- `bun run build` also writes `llms.txt`, `llms-full.txt`, and a Markdown copy of each English page into `dist/`.

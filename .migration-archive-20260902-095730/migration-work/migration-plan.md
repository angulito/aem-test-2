# Migration Plan: angulohe-wknd-v12

**Mode:** Single Page
**Source:** https://wknd.site/us/en.html
**Target page:** angulohe-wknd-v12
**Generated:** 2026-09-02
**Note:** Fresh migration — no reuse of existing project artifacts (blocks, parsers, transformers, content).

## Steps
- [x] 1. Project Setup (type: doc)
- [x] 2. Identify Page Templates (1 template: home)
- [x] 3. Page Analysis (5 sections, 4 block variants: carousel-hero, columns-featured, cards-article, hero-teaser)
- [x] 4. Block Mapping (4 blocks + 5 sections)
- [x] 5. Import Infrastructure (4 parsers, 2 transformers)
- [x] 6. URL Classification and Content Import (imported at 97.1% completeness)

## Artifacts
- .migration/project.json (type: doc)
- migration-work/ (analysis: metadata, cleaned.html, page-structure, authoring-analysis, images, block-context)
- tools/importer/page-templates.json (home template, 4 blocks + 5 sections)
- blocks/{carousel-hero,columns-featured,cards-article,hero-teaser}/ (new variants)
- tools/importer/parsers/{carousel-hero,columns-featured,cards-article,hero-teaser}.js
- tools/importer/transformers/{wknd-cleanup,wknd-sections}.js
- tools/importer/import-home.js (+ .bundle.js)
- content/angulohe-wknd-v12.plain.html
- tools/importer/reports/import-home.report.xlsx

## Post-import fixes
- Removed unsupported `fetchPlaceholders` import from carousel-hero.js (this project's aem.js does not export it); inlined default aria labels.
- Added `decorateSectionMetadata()` to scripts.js so `.section-metadata` blocks apply section styles (e.g. grey) instead of being loaded as blocks (this project's trimmed aem.js decorateSections did not handle it).

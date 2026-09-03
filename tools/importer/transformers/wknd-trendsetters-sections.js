/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: wknd-trendsetters section breaks + Section Metadata.
 * Inserts <hr> breaks and Section Metadata blocks from payload.template.sections.
 * Section selectors come from page-templates.json (DOM-verified boundaries).
 *
 * Uses both hooks per the reference implementation: breaks are inserted in
 * beforeTransform (while every section element still exists, before parsers
 * replace them), anchored via a temporary marker attribute; Section Metadata
 * blocks are inserted in afterTransform anchored to that marker.
 *
 * Sections (from page-templates.json, home template): rc1 grey, rc2 none,
 * rc3 grey, rc4 none, rc5 grey, rc6 none, rc7 dark. 7 sections total →
 * expected 6 <hr> breaks and 4 Section Metadata blocks (styled sections).
 */
const SECTION_MARKER_ATTR = 'data-excat-section-id';

export default function transform(hookName, element, payload) {
  const sections = (payload.template && payload.template.sections) || [];

  if (hookName === 'beforeTransform') {
    // Insert breaks now, before parsers can replace any section element.
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      if (i === 0 && !section.style) continue; // first section: no break needed
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) continue; // selector didn't match — skip, never guess

      const hr = document.createElement('hr');
      if (section.style) hr.setAttribute(SECTION_MARKER_ATTR, section.id);
      sectionEl.before(hr);
    }
  }

  if (hookName === 'afterTransform') {
    // Parsers have run; anchor each styled section's metadata to the marker <hr>
    // placed above (or the original element for the first, unmarked section).
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      if (!section.style) continue;

      const marker = element.querySelector(`[${SECTION_MARKER_ATTR}="${section.id}"]`);
      const anchor = marker || element.querySelector(section.selector);
      if (!anchor) continue; // neither survived — skip, never guess

      const metadataBlock = WebImporter.Blocks.createBlock(document, {
        name: 'Section Metadata',
        cells: { style: section.style },
      });
      anchor.after(metadataBlock);

      if (marker) {
        marker.removeAttribute(SECTION_MARKER_ATTR);
        if (i === 0) marker.remove(); // section 0 never gets a real leading break
      }
    }
  }
}

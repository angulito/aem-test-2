/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters section breaks + Section Metadata.
 *
 * Inserts an <hr> before every non-first section and a Section Metadata
 * block for each styled section. Section selectors and styles come from
 * page-templates.json (DOM-verified during page analysis) and match
 * migration-work/authoring-analysis.json:
 *   rc1 (Intro hero)       -> style "secondary"  (keep)
 *   rc2 (Case study teaser)-> null               (skip)
 *   rc3 (Photo gallery)    -> style "secondary"  (keep)
 *   rc4 (Testimonial tabs) -> null               (skip)
 *   rc5 (Latest articles)  -> style "secondary"  (keep)
 *   rc6 (FAQ)              -> null               (skip)
 *   rc7 (Closing CTA)      -> null               (skip; dark look is the
 *                             hero-banner block's own full-bleed image, not
 *                             a section style)
 *
 * Breaks are inserted in beforeTransform (before parsers can replace a
 * section element with its block), each anchored with a temporary marker so
 * the Section Metadata block can attach reliably in afterTransform even when
 * the original section element was replaced by its parser. Sections are
 * processed in reverse so inserts never disturb the position of sections not
 * yet handled.
 */
const SECTION_MARKER_ATTR = 'data-excat-section-id';

export default function transform(hookName, element, payload) {
  const sections = (payload.template && payload.template.sections) || [];

  if (hookName === 'beforeTransform') {
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      // First section: no leading break AND no style -> nothing to anchor.
      if (i === 0 && !section.style) continue;

      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) continue; // selector didn't match — skip, never guess

      const hr = document.createElement('hr');
      // Marker lets afterTransform find an anchor even after a parser
      // replaces the section element with its block.
      if (section.style) hr.setAttribute(SECTION_MARKER_ATTR, section.id);
      sectionEl.before(hr);
    }
  }

  if (hookName === 'afterTransform') {
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      if (!section.style) continue; // unstyled section — no metadata

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
        // Section 0 never gets a real leading break — its marker <hr> was
        // only an anchor for the metadata block.
        if (i === 0) marker.remove();
      }
    }
  }
}

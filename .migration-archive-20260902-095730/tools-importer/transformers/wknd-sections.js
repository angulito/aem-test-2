/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND section breaks + section metadata.
 * Inserts <hr> before each non-first section, and a Section Metadata block
 * for each section that has a style. Section selectors come from
 * page-templates.json (DOM-verified during page analysis).
 *
 * Only section rc3 "Featured Article" carries style=grey.
 *
 * Breaks are inserted in beforeTransform (while every section element still
 * exists, before block parsers replace them), using a marker <hr> as a stable
 * anchor. Metadata is inserted in afterTransform, anchored to the marker.
 */
const SECTION_MARKER_ATTR = 'data-excat-section-id';

export default function transform(hookName, element, payload) {
  const sections = payload.template.sections || [];

  if (hookName === 'beforeTransform') {
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      if (i === 0 && !section.style) continue;
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) continue;

      const hr = document.createElement('hr');
      if (section.style) hr.setAttribute(SECTION_MARKER_ATTR, section.id);
      sectionEl.before(hr);
    }
  }

  if (hookName === 'afterTransform') {
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      if (!section.style) continue;

      const marker = element.querySelector(`[${SECTION_MARKER_ATTR}="${section.id}"]`);
      const anchor = marker || element.querySelector(section.selector);
      if (!anchor) continue;

      const metadataBlock = WebImporter.Blocks.createBlock(document, {
        name: 'Section Metadata',
        cells: { style: section.style },
      });
      anchor.after(metadataBlock);

      if (marker) {
        marker.removeAttribute(SECTION_MARKER_ATTR);
        if (i === 0) marker.remove();
      }
    }
  }
}

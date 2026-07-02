/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters section breaks and section metadata.
 * Runs in beforeTransform (while the original section elements still exist —
 * block parsers replace section/block elements later, which would otherwise
 * make the section selectors unresolvable).
 * For each section (reverse order):
 *  - inserts an <hr> before the section when it is not the first section
 *  - inserts a Section Metadata block after the section when section.style is set
 * The inserted <hr> and metadata nodes are siblings of the section, so they
 * survive when a parser subsequently replaces the section/block element.
 * Section selectors come from page-templates.json (verified against cleaned.html).
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName !== TransformHook.beforeTransform) return;

  const template = payload && payload.template;
  const sections = template && template.sections;
  if (!sections || sections.length < 2) return;

  const doc = element.ownerDocument;

  // Resolve a section's root element. Template selectors are anchored on
  // "#main-content > ...". Query the full selector within `element` (body).
  const findSectionEl = (selector) => {
    if (!selector) return null;
    let el = null;
    try { el = element.querySelector(selector); } catch (e) { el = null; }
    if (!el) {
      // Fallback: strip the #main-content prefix and try a plain descendant match.
      const rel = selector.replace(/^#main-content\s*>\s*/, '');
      try { el = element.querySelector(rel); } catch (e) { el = null; }
    }
    return el;
  };

  // Process in reverse so inserted nodes don't shift later lookups.
  for (let i = sections.length - 1; i >= 0; i -= 1) {
    const section = sections[i];
    const sectionEl = findSectionEl(section.selector);
    if (!sectionEl) continue;

    // Section Metadata block after the section, when a style is defined.
    if (section.style) {
      const metaBlock = WebImporter.Blocks.createBlock(doc, {
        name: 'Section Metadata',
        cells: { style: section.style },
      });
      sectionEl.after(metaBlock);
    }

    // Section break before every section except the first.
    if (i > 0) {
      sectionEl.before(doc.createElement('hr'));
    }
  }
}

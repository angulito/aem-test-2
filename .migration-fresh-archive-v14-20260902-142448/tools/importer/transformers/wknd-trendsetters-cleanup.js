/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: wknd-trendsetters site-wide cleanup.
 * Removes non-authorable site shell/chrome so the import contains only
 * page-level authorable content.
 *
 * All selectors re-verified against migration-work/cleaned.html:
 *   - a.skip-link          (line 1)  "Skip to main content" link
 *   - div.navbar           (line 1)  top navigation bar + Trends mega menu + mobile toggle
 *   - .breadcrumbs         (~line 47) breadcrumb nav inside the columns-casestudy region
 *   - footer.footer        (line 98) site footer (logo, social icons, link columns)
 *
 * NOTE: `header` is NOT removed generically — the authorable hero in this page
 * is a <header class="section secondary-section"> inside <main> (line 47).
 * Only the specific div.navbar chrome is stripped.
 */

const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Breadcrumbs sit INSIDE the columns-casestudy block region. Remove before
    // block parsing so the parser does not extract them into the block cells.
    WebImporter.DOMUtils.remove(element, ['.breadcrumbs']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Non-authorable global chrome (outside the authorable page sections).
    WebImporter.DOMUtils.remove(element, [
      'a.skip-link',
      'div.navbar',
      'footer.footer',
    ]);
  }
}

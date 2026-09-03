/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: wknd-trendsetters site-wide cleanup.
 * All selectors verified against migration-work/cleaned.html.
 *
 * Non-authorable site chrome removed:
 *  - .skip-link           : "Skip to main content" accessibility link (body top)
 *  - .navbar              : top navigation bar (logo, mega-menu, mobile toggle)
 *  - footer.footer        : global site footer
 *  - .breadcrumbs         : breadcrumb navigation inside the article intro section
 *
 * NOTE: The intro hero block is authored as <header class="section secondary-section">
 * INSIDE #main-content, so a bare `header` selector must NOT be used.
 */

const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    // Non-authorable site chrome (selectors from cleaned.html).
    WebImporter.DOMUtils.remove(element, [
      '.skip-link',
      '.navbar',
      'footer.footer',
      '.breadcrumbs',
    ]);
  }
}

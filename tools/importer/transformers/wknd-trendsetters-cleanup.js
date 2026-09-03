/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: wknd-trendsetters site-wide cleanup.
 * Removes non-authorable site chrome. All selectors verified against
 * migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Non-authorable site chrome. Verified in cleaned.html:
    //   <a class="skip-link"> (skip link), <div class="navbar"> (global header/nav/mega-menu),
    //   <div class="breadcrumbs"> (auto-generated breadcrumb nav in article header), <footer class="footer">.
    WebImporter.DOMUtils.remove(element, [
      '.skip-link',
      '.navbar',
      '.breadcrumbs',
      'footer.footer',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Safety net for any chrome that survived, plus non-authorable leftover elements.
    WebImporter.DOMUtils.remove(element, [
      '.skip-link',
      '.navbar',
      'footer',
      'noscript',
    ]);
  }
}

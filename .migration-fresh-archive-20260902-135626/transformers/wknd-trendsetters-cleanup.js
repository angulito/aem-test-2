/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters site-wide cleanup.
 * Removes non-authorable site chrome. All selectors verified against
 * migration-work/cleaned.html.
 *
 * Note: the breadcrumb trail inside the case-study section (div.breadcrumbs)
 * is intentionally NOT removed — per authoring-analysis.json it is authored
 * content owned by the columns-article block, not global chrome.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Non-authorable site chrome (verified in cleaned.html):
    //   <a href="#main-content" class="skip-link">Skip to main content</a>
    //   <div class="navbar"> ... global nav / mega menu ...
    //   <footer class="footer inverse-footer"> ... global footer ...
    WebImporter.DOMUtils.remove(element, [
      'a.skip-link',
      '.navbar',
      'footer.footer',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Safety net: any remaining global chrome after block parsing.
    WebImporter.DOMUtils.remove(element, [
      'a.skip-link',
      '.navbar',
      'footer',
    ]);
  }
}

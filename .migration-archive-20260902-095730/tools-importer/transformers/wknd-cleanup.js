/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND site-wide cleanup.
 * Removes non-authorable site chrome and leftover elements.
 * All selectors verified against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Overlays / off-canvas nav that could interfere with block parsing.
    // Verified in cleaned.html: <iframe ... demdex.net> (line 566),
    // #toggleNav (line 568), #mobileNav (line 574)
    WebImporter.DOMUtils.remove(element, [
      'iframe',
      '#toggleNav',
      '#mobileNav',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Non-authorable site chrome.
    // Verified in cleaned.html: header.cmp-experiencefragment--header (line 5),
    // footer.cmp-experiencefragment--footer (line 471)
    WebImporter.DOMUtils.remove(element, [
      'header',
      'footer',
      'noscript',
      'link',
    ]);

    // Leftover empty <meta> tags inside cmp-image wrappers.
    // Verified in cleaned.html (e.g. lines 183, 204, 271, 334).
    element.querySelectorAll('meta').forEach((el) => el.remove());
  }
}

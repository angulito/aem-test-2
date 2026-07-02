/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters site-wide cleanup.
 * Removes non-authorable site chrome and cleans leftover attributes/elements.
 * All selectors verified against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Skip-to-content link and top-level site nav are non-authorable chrome.
    // Found in captured HTML: <a class="skip-link">, <div class="navbar"> (contains .nav-menu mega-menu)
    WebImporter.DOMUtils.remove(element, [
      'a.skip-link',
      '.navbar',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Non-authorable content: global footer and in-article breadcrumb navigation.
    // Found in captured HTML: <footer class="footer inverse-footer">, <div class="breadcrumbs">
    WebImporter.DOMUtils.remove(element, [
      'footer.footer',
      '.breadcrumbs',
      'noscript',
      'link',
    ]);

    // Strip Astro build attributes left on elements (found: data-astro-cid-*).
    element.querySelectorAll('*').forEach((el) => {
      [...el.attributes].forEach((attr) => {
        if (attr.name.startsWith('data-astro-cid')) {
          el.removeAttribute(attr.name);
        }
      });
    });
  }
}

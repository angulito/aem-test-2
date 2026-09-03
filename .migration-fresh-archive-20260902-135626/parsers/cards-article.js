/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-article. Base: cards.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-02 (validated)
 *
 * Library structure: 2 columns. Row 1 is the block name.
 * Each subsequent row = one card: [image, text content].
 * Source: each card is an <a class="article-card card-link"> wrapping
 * an image and a body (meta tags/date + heading). The card link is
 * preserved as a CTA in the text cell.
 */
export default function parse(element, { document }) {
  const cardEls = Array.from(element.querySelectorAll(':scope > a.article-card, :scope > a.card-link, :scope > a'));

  // Empty-block guard
  if (cardEls.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  cardEls.forEach((card) => {
    const img = card.querySelector('.article-card-image img, img');
    const meta = card.querySelector('.article-card-meta');
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6, [class*="heading"]');
    const href = card.getAttribute('href');

    const textCell = [];
    if (meta) textCell.push(meta);
    // Preserve the card link on the heading (no duplicate CTA text)
    if (heading) {
      if (href) {
        const link = document.createElement('a');
        link.href = href;
        link.textContent = heading.textContent;
        heading.textContent = '';
        heading.appendChild(link);
      }
      textCell.push(heading);
    }

    cells.push([img || '', textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}

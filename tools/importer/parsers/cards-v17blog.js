/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-v17blog. Base: cards.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-03
 * Structure (from library-description.txt): 2 columns, multiple rows.
 *   Each row = one card: [Image, Text content (meta + title + CTA)]
 * Source: each card is an <a.article-card> wrapping an image and a body.
 */
export default function parse(element, { document }) {
  const cards = Array.from(element.querySelectorAll(':scope > a.article-card, :scope > a.card-link, :scope > a'));

  if (cards.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  cards.forEach((card) => {
    const img = card.querySelector('.article-card-image img, img');
    const body = card.querySelector('.article-card-body');
    const href = card.getAttribute('href');

    const textCell = [];
    if (body) {
      // Move body children into the text cell (meta, heading, etc.)
      Array.from(body.childNodes).forEach((n) => textCell.push(n));
    }
    // Preserve the card link as a CTA using the heading text.
    if (href) {
      const heading = card.querySelector('h1, h2, h3, h4, h5, h6, [class*="heading"]');
      const link = document.createElement('a');
      link.setAttribute('href', href);
      link.textContent = heading ? heading.textContent.trim() : href;
      textCell.push(link);
    }

    cells.push([img || '', textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-v17blog', cells });
  element.replaceWith(block);
}

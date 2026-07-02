/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-article. Base: cards.
 * Source: https://www.wknd-trendsetters.site/
 * Structure (from library-description.txt): 2 columns.
 *   Row 1: block name.
 *   Each subsequent row: [image cell, text-content cell] per card.
 *   Text cell can contain meta (tag/date), heading, and a CTA link.
 */
export default function parse(element, { document }) {
  // Each card is an <a class="article-card"> link containing an image and a body.
  const cards = element.querySelectorAll(':scope > a.article-card, :scope > .article-card');

  const cells = [];
  cards.forEach((card) => {
    // Image cell: the card's cover image.
    const img = card.querySelector('.article-card-image img, img');

    // Text cell: assemble meta, heading, and a CTA link that preserves the article URL.
    const contentCell = [];

    const meta = card.querySelector('.article-card-meta');
    if (meta) contentCell.push(meta);

    const heading = card.querySelector('h1, h2, h3, h4, h5, h6, [class*="heading"]');
    if (heading) contentCell.push(heading);

    // Preserve the card link as a CTA (the card itself is an anchor).
    const href = card.getAttribute('href');
    if (href) {
      const link = document.createElement('a');
      link.setAttribute('href', href);
      // Use the heading text as the link label, falling back to a generic label.
      link.textContent = heading ? heading.textContent.trim() : 'Read more';
      contentCell.push(link);
    }

    cells.push([img || '', contentCell]);
  });

  // Empty-block guard.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}

/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-atwblog. Base: cards.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-03
 *
 * Block library: Cards — 2 columns. Row 1 is the block name.
 *   Each subsequent row is one card: Col 1 image/icon, Col 2 text content
 *   (title, description, optional CTA).
 *
 * Source: .grid-layout with .article-card anchors. Each anchor has an
 * .article-card-image (img) and .article-card-body (meta tags/date + heading).
 * The anchor href is preserved as a CTA link at the bottom of the text cell.
 */
export default function parse(element, { document }) {
  const cards = Array.from(element.querySelectorAll(':scope > a.article-card, :scope > a.card-link'));

  // Empty-block guard
  if (!cards.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  cards.forEach((card) => {
    const image = card.querySelector('.article-card-image img, img');
    const body = card.querySelector('.article-card-body');

    const textContent = [];
    if (body) textContent.push(body);

    // Preserve the card link as a CTA
    const href = card.getAttribute('href');
    if (href) {
      const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
      const link = document.createElement('a');
      link.href = href;
      link.textContent = heading ? heading.textContent.trim() : 'Read more';
      textContent.push(link);
    }

    cells.push([image || '', textContent.length ? textContent : '']);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-atwblog', cells });
  element.replaceWith(block);
}

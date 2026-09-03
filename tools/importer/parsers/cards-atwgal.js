/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-atwgal. Base: cards.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-03
 *
 * Block library: Cards — 2 columns. Row 1 is the block name.
 *   Each subsequent row is one card: Col 1 image/icon, Col 2 text content.
 *
 * Source: .grid-layout.desktop-4-column with image-only card cells (a gallery).
 * No per-card text, so the text column is padded empty to keep 2 columns.
 */
export default function parse(element, { document }) {
  const cardEls = Array.from(element.querySelectorAll(':scope > div'));

  // Empty-block guard
  if (!cardEls.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  cardEls.forEach((card) => {
    const image = card.querySelector('img');
    const textContent = Array.from(card.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a'));
    // Col 1: image, Col 2: text content (padded empty when absent)
    cells.push([image || '', textContent.length ? textContent : '']);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-atwgal', cells });
  element.replaceWith(block);
}

/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-snapshot. Base: cards.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-02
 * Structure (from library-description.txt): image-based cards.
 *   Row 1: block name
 *   Each subsequent row = one card. These cards are image-only (photo gallery),
 *   so each row holds the card image in a single cell.
 */
export default function parse(element, { document }) {
  // Each direct child of the grid is a card wrapper containing one image.
  let cardEls = Array.from(element.querySelectorAll(':scope > div'));
  if (!cardEls.length) {
    cardEls = Array.from(element.children);
  }

  const cells = [];
  cardEls.forEach((card) => {
    const img = card.querySelector('img') || (card.tagName === 'IMG' ? card : null);
    if (img) {
      cells.push([img]);
    }
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-snapshot', cells });
  element.replaceWith(block);
}

/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-gallery. Base: cards.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-02 (validated)
 *
 * This gallery is image-only (no title/description/CTA per card).
 * Each card is a single image, so each subsequent row holds one image cell.
 */
export default function parse(element, { document }) {
  // Each grid cell wraps one card image (validated against source.html)
  const imageCells = Array.from(element.querySelectorAll(':scope > div'));

  // Empty-block guard
  if (imageCells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  imageCells.forEach((cell) => {
    const img = cell.querySelector('img');
    if (img) cells.push([img]);
  });

  // Guard: no images resolved
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}

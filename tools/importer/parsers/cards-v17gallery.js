/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-v17gallery. Base: cards.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-03
 * This is an image-only gallery variant: each card is a single image with no
 * accompanying text. Each row represents one card containing just the image.
 */
export default function parse(element, { document }) {
  // Each direct child holds one gallery image.
  const items = Array.from(element.querySelectorAll(':scope > div'));

  const cells = [];
  items.forEach((item) => {
    const img = item.querySelector('img');
    if (img) cells.push([img]);
  });

  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-v17gallery', cells });
  element.replaceWith(block);
}

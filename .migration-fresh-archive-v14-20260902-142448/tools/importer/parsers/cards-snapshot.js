/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-snapshot. Base: cards.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-02
 *
 * Block library structure (Cards): 2 columns, multiple rows. First row = block name.
 * Each subsequent row is a card: [image cell, text cell].
 *
 * Source: each card is a <div class="utility-aspect-1x1"> containing only an <img>.
 * These are image-only cards (no title/description), so the text cell is empty
 * but preserved to keep a consistent 2-column table.
 */
export default function parse(element, { document }) {
  let cards = Array.from(element.querySelectorAll(':scope > div'));
  if (!cards.length) {
    cards = Array.from(element.querySelectorAll('.utility-aspect-1x1'));
  }

  const cells = [];

  cards.forEach((card) => {
    const img = card.querySelector('img') || (card.tagName === 'IMG' ? card : null);
    if (!img) return;

    // Any text content in the card (usually none for this variant).
    const textNodes = Array.from(card.children).filter((c) => c.tagName !== 'IMG' && c.querySelector && !c.querySelector('img'));
    const contentCell = textNodes.length ? textNodes : '';

    cells.push([img, contentCell]);
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-snapshot', cells });
  element.replaceWith(block);
}

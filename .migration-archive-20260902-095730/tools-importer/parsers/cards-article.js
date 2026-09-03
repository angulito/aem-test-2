/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-article. Base: cards.
 * Source: https://wknd.site/us/en.html (.image-list.list)
 * Structure (from library-description): 2 columns, multiple rows.
 *   Each card = one row -> [image cell, text cell(title, description, CTA)].
 * Generated: 2026-09-02
 */
export default function parse(element, { document }) {
  // Each list item is one card/row
  let cards = Array.from(element.querySelectorAll('.cmp-image-list__item'));
  if (!cards.length) {
    cards = Array.from(element.querySelectorAll('li, .cmp-image-list__item-content, article'));
  }

  const cells = [];

  cards.forEach((card) => {
    // Image cell (mandatory)
    const img = card.querySelector('.cmp-image-list__item-image img, .cmp-image img, img');

    // Text cell: title (as link if available), description, CTA
    const titleLink = card.querySelector('.cmp-image-list__item-title-link');
    const titleText = card.querySelector('.cmp-image-list__item-title, [class*="title"]');
    const description = card.querySelector('.cmp-image-list__item-description, [class*="description"]');

    // Skip cards with no meaningful content
    if (!img && !titleLink && !titleText && !description) return;

    const textCell = [];
    if (titleLink) {
      textCell.push(titleLink);
    } else if (titleText) {
      textCell.push(titleText);
    }
    if (description) textCell.push(description);

    cells.push([img || '', textCell.length ? textCell : '']);
  });

  // Empty-block guard
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}

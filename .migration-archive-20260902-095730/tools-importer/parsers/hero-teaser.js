/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-teaser. Base: hero.
 * Source: https://wknd.site/us/en.html (.teaser.cmp-teaser--hero)
 * Structure (from library-description): 1 column, 3 rows.
 *   Row 2: background image. Row 3: title, subheading, CTA.
 * Generated: 2026-09-02
 */
export default function parse(element, { document }) {
  // Background image
  const bgImage = element.querySelector('.cmp-teaser__image img, .cmp-image img, img');

  // Content: title, description, CTA
  const title = element.querySelector('.cmp-teaser__title, h1, h2, h3, [class*="title"]');
  const description = element.querySelector('.cmp-teaser__description, [class*="description"]');
  const ctaLinks = Array.from(element.querySelectorAll('.cmp-teaser__action-link, .cmp-teaser__action-container a'));

  // Empty-block guard
  if (!bgImage && !title && !description && !ctaLinks.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row 2: background image (1 column, single cell)
  if (bgImage) cells.push([bgImage]);

  // Row 3: content (1 column, single cell holding all elements)
  const contentCell = [];
  if (title) contentCell.push(title);
  if (description) contentCell.push(description);
  ctaLinks.forEach((cta) => contentCell.push(cta));
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-teaser', cells });
  element.replaceWith(block);
}

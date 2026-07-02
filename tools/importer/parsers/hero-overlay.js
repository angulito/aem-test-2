/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-overlay. Base: hero.
 * Source: https://www.wknd-trendsetters.site/
 * Structure (from library-description.txt): 1 column, 3 rows.
 *   Row 1: block name.
 *   Row 2: single cell with the background image.
 *   Row 3: single cell with title, subheading, and CTA link(s).
 */
export default function parse(element, { document }) {
  // Background image (the overlay cover image).
  const bgImage = element.querySelector('img.cover-image, img[class*="overlay"], img');

  // Text content lives in the card body over the overlay.
  const heading = element.querySelector('h1, h2, h3, [class*="heading"]');
  const subheading = element.querySelector('.subheading, .card-body p, p');
  const ctaLinks = Array.from(element.querySelectorAll('.button-group a, a.button'));

  const cells = [];

  // Row 2: background image cell (only if present).
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 3: content cell with heading, subheading, and CTAs.
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  contentCell.push(...ctaLinks);

  // Empty-block guard.
  if (!heading && !subheading && !bgImage && ctaLinks.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-overlay', cells });
  element.replaceWith(block);
}

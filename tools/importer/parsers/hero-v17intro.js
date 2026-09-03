/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-v17intro. Base: hero.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-03
 * Structure (from library-description.txt): 1 column, 3 rows.
 *   Row 1: block name
 *   Row 2: background image(s) (optional)
 *   Row 3: title, subheading, CTA (optional)
 */
export default function parse(element, { document }) {
  // Images (background/cover). Source uses .cover-image; fall back to any img.
  const images = Array.from(element.querySelectorAll('img.cover-image, img'));

  // Text content lives in the first column div.
  const heading = element.querySelector('h1, h2, .h1-heading, [class*="heading"]');
  const subheading = element.querySelector('p.subheading, p, [class*="subheading"]');
  const ctaLinks = Array.from(element.querySelectorAll('.button-group a, a.button, a.secondary-button'));

  // Empty-block guard
  if (!heading && !subheading && images.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row 2: background image(s)
  if (images.length) {
    cells.push([images]);
  }

  // Row 3: title, subheading, CTA
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  contentCell.push(...ctaLinks);
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-v17intro', cells });
  element.replaceWith(block);
}

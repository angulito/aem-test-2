/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-feature. Base: hero.
 * Source: https://www.wknd-trendsetters.site/
 * Structure (from library-description.txt): 1 column, 3 rows.
 *   Row 1: block name.
 *   Row 2: single cell with the background image(s).
 *   Row 3: single cell with title, subheading, and CTA link(s).
 */
export default function parse(element, { document }) {
  // Images (hero visuals). Source groups them in a separate grid column.
  const images = Array.from(element.querySelectorAll('img'));

  // Text content.
  const heading = element.querySelector('h1, h2, h3, [class*="heading"]');
  const subheading = element.querySelector('.subheading, p');
  const ctaLinks = Array.from(element.querySelectorAll('.button-group a, a.button'));

  const cells = [];

  // Row 2: image cell (only if images are present).
  if (images.length) {
    cells.push([images]);
  }

  // Row 3: content cell with heading, subheading, and CTAs.
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  contentCell.push(...ctaLinks);

  // Empty-block guard.
  if (!heading && !subheading && images.length === 0 && ctaLinks.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-feature', cells });
  element.replaceWith(block);
}

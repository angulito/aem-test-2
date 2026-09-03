/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-lookbook. Base: hero.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-02
 *
 * Block library structure (Hero): 1 column, 3 rows. First row = block name.
 * Row 2 = background image(s). Row 3 = title, subheading, CTA(s).
 *
 * Source: a grid with a text column (h1, .subheading, .button-group with two links)
 * and an image column containing multiple <img> lookbook images.
 */
export default function parse(element, { document }) {
  // Collect all imagery for the background/image row.
  const images = Array.from(element.querySelectorAll('img'));

  // Text content.
  const heading = element.querySelector('h1, h2, .h1-heading, [class*="heading"]');
  const subheading = element.querySelector('p.subheading, .subheading, p');
  const ctaLinks = Array.from(element.querySelectorAll('.button-group a, a.button'));

  const cells = [];

  // Row 2: background/lookbook images (only if present).
  if (images.length) {
    cells.push([images]);
  }

  // Row 3: text content cell.
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  contentCell.push(...ctaLinks);

  if (!contentCell.length && !images.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-lookbook', cells });
  element.replaceWith(block);
}

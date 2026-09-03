/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-intro. Base: hero.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-02 (validated)
 *
 * Library structure: 1 column, 3 rows.
 *   Row 1: block name
 *   Row 2: background/hero image(s) (optional)
 *   Row 3: title, subheading, CTA(s)
 */
export default function parse(element, { document }) {
  // Extraction validated against source.html for hero-intro
  const heading = element.querySelector('h1, h2, .h1-heading, [class*="heading"]');
  const subheading = element.querySelector('p.subheading, .subheading, p');
  const ctaLinks = Array.from(element.querySelectorAll('.button-group a, a.button'));
  const images = Array.from(element.querySelectorAll('img.cover-image, img[class*="cover"], img'));

  // Empty-block guard
  if (!heading && !subheading && images.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row 2: hero image(s) — one 1-column cell holding all images
  if (images.length > 0) {
    cells.push([images]);
  }

  // Row 3: title, subheading, CTA(s) — one 1-column cell holding all content
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  contentCell.push(...ctaLinks);
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-intro', cells });
  element.replaceWith(block);
}

/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-v17cta. Base: hero.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-03
 * Structure (from library-description.txt): 1 column, 3 rows.
 *   Row 1: block name
 *   Row 2: background image (optional)
 *   Row 3: title, subheading, CTA (optional)
 * Source: single card with an overlay background image and a text card-body.
 */
export default function parse(element, { document }) {
  const bgImage = element.querySelector('img.cover-image, img[class*="overlay"], img');
  const heading = element.querySelector('h1, h2, .h1-heading, [class*="heading"]');
  const subheading = element.querySelector('p.subheading, p, [class*="subheading"]');
  const ctaLinks = Array.from(element.querySelectorAll('.button-group a, a.button, a.inverse-button'));

  if (!heading && !subheading && !bgImage) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row 2: background image
  if (bgImage) cells.push([bgImage]);

  // Row 3: title, subheading, CTA
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  contentCell.push(...ctaLinks);
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-v17cta', cells });
  element.replaceWith(block);
}

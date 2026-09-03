/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-atwcta. Base: hero.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-03
 *
 * Block library: Hero — 1 column, 3 rows.
 *   Row 1: block name
 *   Row 2: Background Image (optional)
 *   Row 3: Title (heading), Subheading, Call-to-Action (optional)
 *
 * Source: .grid-layout with a background .cover-image and a .card-body
 * containing heading, subheading, and a button-group CTA.
 */
export default function parse(element, { document }) {
  const bgImage = element.querySelector('img.cover-image, img[class*="overlay"], img');
  const heading = element.querySelector('h1, h2, .h1-heading, [class*="heading"]');
  const subheading = element.querySelector('p.subheading, p, [class*="subheading"]');
  const ctaLinks = Array.from(element.querySelectorAll('.button-group a, a.button'));

  // Empty-block guard
  if (!heading && !subheading && !bgImage) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row 2: background image (optional)
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 3: title + subheading + CTAs
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  contentCell.push(...ctaLinks);
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-atwcta', cells });
  element.replaceWith(block);
}

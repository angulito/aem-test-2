/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-spotlight. Base: hero.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-02
 *
 * Block library structure (Hero): 1 column, 3 rows. First row = block name.
 * Row 2 = background image. Row 3 = title, subheading, CTA(s).
 *
 * Source: a single overlay card with a full-bleed background <img>, an overlay div,
 * and a .card-body containing an h2 heading, .subheading paragraph, and one CTA link.
 */
export default function parse(element, { document }) {
  // Background image (full-bleed cover image behind the overlay).
  const bgImage = element.querySelector('img.cover-image, img[class*="overlay"], img');

  // Text content, typically inside .card-body.
  const body = element.querySelector('.card-body') || element;
  const heading = body.querySelector('h1, h2, h3, .h1-heading, [class*="heading"]');
  const subheading = body.querySelector('p.subheading, .subheading, p');
  const ctaLinks = Array.from(body.querySelectorAll('.button-group a, a.button'));

  const cells = [];

  // Row 2: background image.
  if (bgImage) cells.push([bgImage]);

  // Row 3: text content.
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  contentCell.push(...ctaLinks);

  if (!contentCell.length && !bgImage) {
    element.replaceWith(...element.childNodes);
    return;
  }

  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-spotlight', cells });
  element.replaceWith(block);
}

/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-atwintro. Base: hero.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-03
 *
 * Block library: Hero — 1 column, 3 rows.
 *   Row 1: block name
 *   Row 2: Background Image (optional)
 *   Row 3: Title (heading), Subheading, Call-to-Action (optional)
 *
 * Source structure: .grid-layout with two child divs — first holds
 * heading/subheading/button-group, second holds the cover images.
 */
export default function parse(element, { document }) {
  // Text content column (heading / subheading / CTAs)
  const heading = element.querySelector('h1, h2, .h1-heading, [class*="heading"]');
  const subheading = element.querySelector('p.subheading, p, [class*="subheading"]');
  const ctaLinks = Array.from(element.querySelectorAll('.button-group a, a.button'));

  // Background/visual images (second grid column in source)
  const images = Array.from(element.querySelectorAll('img'));

  // Empty-block guard
  if (!heading && !subheading && images.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row 2: background image(s) (optional)
  if (images.length) {
    cells.push([images]);
  }

  // Row 3: title + subheading + CTAs
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  contentCell.push(...ctaLinks);
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-atwintro', cells });
  element.replaceWith(block);
}

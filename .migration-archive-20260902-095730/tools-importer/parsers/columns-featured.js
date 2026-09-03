/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-featured. Base: columns.
 * Source: https://wknd.site/us/en.html (.teaser.cmp-teaser--featured)
 * Structure (from analysis): single content row with 2 columns:
 *   [image column, content column(pretitle, title, description, CTA)].
 * Generated: 2026-09-02
 */
export default function parse(element, { document }) {
  // Image column
  const img = element.querySelector('.cmp-teaser__image img, .cmp-image img, img');

  // Content column: pretitle, title, description, CTA
  const pretitle = element.querySelector('.cmp-teaser__pretitle, [class*="pretitle"]');
  const title = element.querySelector('.cmp-teaser__title, h1, h2, h3, [class*="title"]');
  const description = element.querySelector('.cmp-teaser__description, [class*="description"]');
  const ctaLinks = Array.from(element.querySelectorAll('.cmp-teaser__action-link, .cmp-teaser__action-container a'));

  const contentCell = [];
  if (pretitle) contentCell.push(pretitle);
  if (title) contentCell.push(title);
  if (description) contentCell.push(description);
  ctaLinks.forEach((cta) => contentCell.push(cta));

  // Empty-block guard
  if (!img && !contentCell.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [
    [img || '', contentCell.length ? contentCell : ''],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-featured', cells });
  element.replaceWith(block);
}

/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-casestudy. Base: columns.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-02
 * Structure (from library-description.txt): flexible columns.
 *   Row 1: block name
 *   Row 2: [image column, content column] (2 columns, matching source grid)
 */
export default function parse(element, { document }) {
  // Two visual columns: an image and the article intro (breadcrumbs, heading, author meta).
  const gridChildren = Array.from(
    element.querySelectorAll(':scope > div.container > div.grid-layout > div'),
  );

  let imageCol = null;
  let contentCol = null;
  gridChildren.forEach((child) => {
    if (!imageCol && child.querySelector('img.cover-image, img')) {
      imageCol = child;
    } else if (!contentCol) {
      contentCol = child;
    }
  });

  // Fallbacks if the grid structure differs.
  const image = imageCol || element.querySelector('img.cover-image, img');
  const content = contentCol
    || element.querySelector('.breadcrumbs, h2, .h2-heading')?.parentElement;

  if (!image && !content) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  cells.push([image || '', content || '']);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-casestudy', cells });
  element.replaceWith(block);
}

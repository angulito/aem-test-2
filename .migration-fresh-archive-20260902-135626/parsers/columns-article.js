/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-article. Base: columns.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-02 (validated)
 *
 * Library structure: multi-column. Row 1 is the block name.
 * Column count derived from the natural grouping in the source: the
 * grid-layout has two direct-child columns (image column + text column).
 */
export default function parse(element, { document }) {
  // Direct-child columns of the grid layout (validated against source.html)
  let columns = Array.from(element.querySelectorAll(':scope > div'));

  // Empty-block guard
  if (columns.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  // One content row whose cells map 1:1 to the source columns
  cells.push(columns.map((col) => col));

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-article', cells });
  element.replaceWith(block);
}

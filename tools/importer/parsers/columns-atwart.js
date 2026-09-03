/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-atwart. Base: columns.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-03
 *
 * Block library: Columns — flexible columns/rows. Row 1 is the block name.
 * Column count derived from the natural visual grouping of the source.
 *
 * Source: .grid-layout with two direct child divs —
 *   Col 1: cover image
 *   Col 2: breadcrumbs, heading, author/date/read-time metadata
 */
export default function parse(element, { document }) {
  const cols = Array.from(element.querySelectorAll(':scope > div'));

  // Fallback if no direct-child columns found
  const columnCells = cols.length
    ? cols
    : Array.from(element.children);

  // Empty-block guard
  if (!columnCells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  cells.push(columnCells);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-atwart', cells });
  element.replaceWith(block);
}

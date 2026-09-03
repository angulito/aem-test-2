/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-v17article. Base: columns.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-03
 * Structure (from library-description.txt): flexible columns.
 *   Source has 2 direct children -> 2 columns in one content row:
 *   Col 1: cover image
 *   Col 2: breadcrumbs, heading, author/meta text
 */
export default function parse(element, { document }) {
  // Direct children of the grid become columns.
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  if (columns.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  // Single content row where each direct child div is a column cell.
  cells.push(columns.map((col) => col));

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-v17article', cells });
  element.replaceWith(block);
}

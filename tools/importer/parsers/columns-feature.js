/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-feature. Base: columns.
 * Source: https://www.wknd-trendsetters.site/
 * Structure (from library-description.txt): flexible columns.
 *   Row 1: block name.
 *   Row 2: one cell per column, based on visual grouping.
 * Source is a 2-column layout: [image] | [breadcrumbs, heading, author/date].
 */
export default function parse(element, { document }) {
  // The columns live inside the inner grid-layout element.
  const grid = element.querySelector('.grid-layout') || element.querySelector('.container') || element;

  // Each direct child div of the grid is a column.
  let columns = Array.from(grid.querySelectorAll(':scope > div'));

  // Fallback: if no direct-child divs, treat the grid itself as a single column.
  if (columns.length === 0) {
    columns = [grid];
  }

  // Build one row where each column's content is its own cell.
  const row = columns.map((col) => {
    const contents = Array.from(col.childNodes);
    return contents.length ? contents : '';
  });

  // Empty-block guard.
  if (row.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [row];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-feature', cells });
  element.replaceWith(block);
}

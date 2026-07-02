/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-gallery. Base: columns.
 * Source: https://www.wknd-trendsetters.site/
 * Structure (from library-description.txt): flexible columns.
 *   Row 1: block name.
 *   Subsequent rows: one cell per column; all rows share the same column count.
 * Source is a desktop-4-column grid of image cells; group images into rows of 4.
 */
export default function parse(element, { document }) {
  // The instance selector targets the grid element itself; each direct-child div is a cell.
  let cellDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Fallback: some pages may wrap the grid one level deeper.
  if (cellDivs.length === 0) {
    const grid = element.querySelector('.grid-layout');
    if (grid) cellDivs = Array.from(grid.querySelectorAll(':scope > div'));
  }

  // Extract the image (or full content) from each cell.
  const items = cellDivs.map((div) => {
    const img = div.querySelector('img');
    return img || div;
  });

  // Empty-block guard.
  if (items.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // Determine columns per row from the grid class (desktop-N-column), default 4.
  const gridClass = element.className || '';
  const match = gridClass.match(/desktop-(\d+)-column/);
  const colsPerRow = match ? parseInt(match[1], 10) : 4;

  // Chunk items into rows of colsPerRow, padding the final row so all rows match.
  const cells = [];
  for (let i = 0; i < items.length; i += colsPerRow) {
    const row = items.slice(i, i + colsPerRow);
    while (row.length < colsPerRow) row.push('');
    cells.push(row);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-gallery', cells });
  element.replaceWith(block);
}

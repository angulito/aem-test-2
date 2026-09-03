/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-casestudy. Base: columns.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-02
 *
 * Block library structure (Columns): first row = block name; subsequent rows have
 * one cell per visual column. Column count is derived from the source grouping.
 *
 * Source: a grid with two direct-child <div> columns — the first holds the cover
 * image, the second holds breadcrumbs, a heading, and author/date meta.
 */
export default function parse(element, { document }) {
  let columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) {
    // Fallback: treat the element's own children as columns.
    columns = Array.from(element.children);
  }

  // Each column becomes one cell; keep the full inner content of each column.
  const row = columns.map((col) => {
    const contents = Array.from(col.childNodes).filter((n) => {
      if (n.nodeType === 3) return n.textContent.trim().length > 0;
      return true;
    });
    return contents.length ? contents : '';
  });

  if (!row.length || row.every((c) => c === '')) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [row];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-casestudy', cells });
  element.replaceWith(block);
}

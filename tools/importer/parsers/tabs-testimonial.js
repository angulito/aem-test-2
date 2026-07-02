/* eslint-disable */
/* global WebImporter */
/**
 * Parser for tabs-testimonial. Base: tabs.
 * Source: https://www.wknd-trendsetters.site/
 * Structure (from library-description.txt): 2 columns.
 *   Row 1: block name.
 *   Each subsequent row: [tab label cell, tab content cell] per tab.
 * Source: tab labels live in .tab-menu buttons; content in .tabs-content .tab-pane.
 * Labels and panes correspond by index (data-tab-target / data-tab-index).
 */
export default function parse(element, { document }) {
  // Content panels, in document order.
  const panes = Array.from(element.querySelectorAll('.tabs-content .tab-pane, .tab-pane'));

  // Tab menu buttons (labels), in document order.
  const menuButtons = Array.from(element.querySelectorAll('.tab-menu .tab-menu-link, .tab-menu-link'));

  const cells = [];
  panes.forEach((pane, i) => {
    // Label: prefer the matching menu button's inner content; fall back to a derived label.
    let labelCell;
    const button = menuButtons[i];
    if (button) {
      const labelContent = button.querySelector(':scope > div') || button;
      labelCell = Array.from(labelContent.childNodes);
    } else {
      labelCell = `Tab ${i + 1}`;
    }

    // Content: the pane's full content (image, name, role, quote).
    const inner = pane.querySelector('.grid-layout') || pane;
    const contentCell = Array.from(inner.childNodes);

    cells.push([labelCell, contentCell.length ? contentCell : '']);
  });

  // Empty-block guard.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-testimonial', cells });
  element.replaceWith(block);
}

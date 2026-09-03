/* eslint-disable */
/* global WebImporter */
/**
 * Parser for tabs-v17voices. Base: tabs.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-03
 * Structure (from library-description.txt): 2 columns, multiple rows.
 *   Each row = one tab: [Tab Label, Tab Content]
 * Source: tab labels live in .tab-menu buttons; content lives in .tab-pane
 * panels. Labels and panes are matched by index.
 */
export default function parse(element, { document }) {
  const panes = Array.from(element.querySelectorAll('.tabs-content > .tab-pane, .tab-pane'));
  const menuButtons = Array.from(element.querySelectorAll('.tab-menu .tab-menu-link, .tab-menu button'));

  if (panes.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  panes.forEach((pane, i) => {
    const button = menuButtons[i];

    // Label cell: prefer the person's name text from the menu button.
    let labelCell;
    if (button) {
      const nameEl = button.querySelector('strong');
      labelCell = nameEl ? nameEl.textContent.trim() : button.textContent.trim();
    } else {
      const paneName = pane.querySelector('strong');
      labelCell = paneName ? paneName.textContent.trim() : `Tab ${i + 1}`;
    }

    // Content cell: the full tab panel content.
    cells.push([labelCell, pane]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-v17voices', cells });
  element.replaceWith(block);
}

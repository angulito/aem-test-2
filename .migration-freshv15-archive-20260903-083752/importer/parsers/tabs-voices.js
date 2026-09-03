/* eslint-disable */
/* global WebImporter */
/**
 * Parser for tabs-voices. Base: tabs.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-02
 * Structure (from library-description.txt): 2 columns.
 *   Row 1: block name
 *   Each subsequent row = one tab: [tab label, tab content]
 * Source pairs a tab-menu button (label) with a tab-pane (content) by index.
 */
export default function parse(element, { document }) {
  const panes = Array.from(element.querySelectorAll('.tabs-content > .tab-pane, .tab-pane'));
  const menuButtons = Array.from(element.querySelectorAll('.tab-menu .tab-menu-link, .tab-menu button'));

  if (!panes.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  panes.forEach((pane, i) => {
    const button = menuButtons[i];
    // Prefer the person's name as the tab label; fall back to full button content.
    let label;
    const nameEl = button && button.querySelector('strong');
    if (nameEl) {
      label = document.createElement('p');
      label.textContent = nameEl.textContent.trim();
    } else if (button) {
      label = button;
    } else {
      label = document.createElement('p');
      label.textContent = `Tab ${i + 1}`;
    }
    cells.push([label, pane]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-voices', cells });
  element.replaceWith(block);
}

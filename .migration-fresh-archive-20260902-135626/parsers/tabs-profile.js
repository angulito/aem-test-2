/* eslint-disable */
/* global WebImporter */
/**
 * Parser for tabs-profile. Base: tabs.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-02 (validated)
 *
 * Library structure: 2 columns. Row 1 is the block name.
 * Each subsequent row = one tab: [tab label, tab content].
 * Source has tab labels in `.tab-menu .tab-menu-link` buttons and tab
 * content in `.tabs-content .tab-pane` panels; pair them by index.
 */
export default function parse(element, { document }) {
  const panes = Array.from(element.querySelectorAll('.tabs-content .tab-pane, .tab-pane'));
  const buttons = Array.from(element.querySelectorAll('.tab-menu .tab-menu-link, button.tab-menu-link'));

  // Empty-block guard
  if (panes.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  panes.forEach((pane, i) => {
    const button = buttons[i];
    // Label: prefer the button's name/role text (skip decorative avatar);
    // fall back to the button itself, then to a numeric label.
    let label;
    if (button) {
      label = button.querySelector('.flex-horizontal > div:last-child') || button;
    } else {
      label = document.createElement('div');
      label.textContent = `Tab ${i + 1}`;
    }
    cells.push([label, pane]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-profile', cells });
  element.replaceWith(block);
}

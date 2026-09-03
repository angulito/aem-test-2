/* eslint-disable */
/* global WebImporter */
/**
 * Parser for tabs-voices. Base: tabs.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-02
 *
 * Block library structure (Tabs): 2 columns, multiple rows. First row = block name.
 * Each subsequent row is a tab: [tab label cell, tab content cell].
 *
 * Source: a .tabs-wrapper containing .tabs-content (with .tab-pane panels) and a
 * .tab-menu (with .tab-menu-link buttons). Menu buttons carry the avatar + name +
 * role label; panes carry the full quote/content. Panes and buttons are paired by
 * order (tabpanel-N ↔ tab-N).
 */
export default function parse(element, { document }) {
  const panes = Array.from(element.querySelectorAll('.tabs-content .tab-pane, .tab-pane'));
  const menuLinks = Array.from(element.querySelectorAll('.tab-menu .tab-menu-link, .tab-menu-link'));

  const cells = [];
  const count = Math.max(panes.length, menuLinks.length);

  for (let i = 0; i < count; i += 1) {
    const menu = menuLinks[i];
    const pane = panes[i];

    // Label cell: prefer the menu button's content (avatar + name + role).
    let labelCell = '';
    if (menu) {
      const inner = menu.firstElementChild || menu;
      labelCell = inner;
    }

    // Content cell: the full tab pane content.
    let contentCell = '';
    if (pane) {
      const paneContents = Array.from(pane.childNodes).filter((n) => {
        if (n.nodeType === 3) return n.textContent.trim().length > 0;
        return true;
      });
      contentCell = paneContents.length ? paneContents : pane;
    }

    if (labelCell || contentCell) {
      cells.push([labelCell, contentCell]);
    }
  }

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-voices', cells });
  element.replaceWith(block);
}

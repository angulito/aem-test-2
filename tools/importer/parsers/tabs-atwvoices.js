/* eslint-disable */
/* global WebImporter */
/**
 * Parser for tabs-atwvoices. Base: tabs.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-03
 *
 * Block library: Tabs — 2 columns. Row 1 is the block name.
 *   Each subsequent row is one tab: Col 1 tab label, Col 2 tab content.
 *
 * Source: .tabs-wrapper with .tabs-content (.tab-pane panels) and a
 * .tab-menu (.tab-menu-link buttons). Panels and menu buttons align by
 * index; the menu button supplies the label, the pane supplies content.
 */
export default function parse(element, { document }) {
  const panes = Array.from(element.querySelectorAll('.tabs-content .tab-pane'));
  const menuButtons = Array.from(element.querySelectorAll('.tab-menu .tab-menu-link'));

  // Empty-block guard
  if (!panes.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  panes.forEach((pane, i) => {
    const button = menuButtons[i];

    // Tab label: prefer the menu button's name/role text; strip the avatar image.
    let labelCell;
    if (button) {
      const labelWrap = button.querySelector(':scope > div, div');
      if (labelWrap) {
        labelWrap.querySelectorAll('.avatar, img').forEach((el) => el.remove());
        labelCell = labelWrap;
      } else {
        labelCell = button;
      }
    } else {
      labelCell = `Tab ${i + 1}`;
    }

    // Tab content: the full pane content (image + name/role + quote).
    const contentCell = pane.querySelector(':scope > .grid-layout') || pane;

    cells.push([labelCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-atwvoices', cells });
  element.replaceWith(block);
}

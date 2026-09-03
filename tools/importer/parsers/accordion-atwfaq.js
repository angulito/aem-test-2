/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-atwfaq. Base: accordion.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-03
 *
 * Block library: Accordion — 2 columns. Row 1 is the block name.
 *   Each subsequent row is one item: Col 1 title (question), Col 2 content (answer).
 *
 * Source: .faq-list with <details.faq-item> elements. Each has a
 * <summary.faq-question> (question text + decorative icon) and a
 * <div.faq-answer> (answer body). The decorative icon is stripped.
 */
export default function parse(element, { document }) {
  const items = Array.from(element.querySelectorAll(':scope > details.faq-item, details.faq-item'));

  // Empty-block guard
  if (!items.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  items.forEach((item) => {
    const summary = item.querySelector('.faq-question, summary');
    // Title: prefer the inner text span; drop the decorative icon image.
    let titleCell = '';
    if (summary) {
      const span = summary.querySelector('span');
      titleCell = span || summary;
      if (titleCell === summary) {
        titleCell.querySelectorAll('img, svg').forEach((el) => el.remove());
      }
    }

    const answer = item.querySelector('.faq-answer') || '';

    cells.push([titleCell, answer]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-atwfaq', cells });
  element.replaceWith(block);
}

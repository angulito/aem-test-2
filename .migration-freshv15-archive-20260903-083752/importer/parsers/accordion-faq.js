/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-faq. Base: accordion.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-02
 * Note: faq-list is nested inside a grid-layout in the source DOM.
 * Structure (from library-description.txt): 2 columns.
 *   Row 1: block name
 *   Each subsequent row = one accordion item: [title, content]
 */
export default function parse(element, { document }) {
  let items = Array.from(element.querySelectorAll('details.faq-item, details'));
  if (!items.length) {
    items = Array.from(element.querySelectorAll('.faq-item'));
  }

  if (!items.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  items.forEach((item) => {
    // Title: text of the summary/question (exclude the decorative SVG icon).
    const summary = item.querySelector('.faq-question, summary');
    const titleSpan = summary && summary.querySelector('span');
    const title = document.createElement('p');
    title.textContent = (titleSpan || summary || item).textContent.trim();

    // Content: the answer body.
    const content = item.querySelector('.faq-answer') || item.querySelector('p');

    cells.push([title, content || '']);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}

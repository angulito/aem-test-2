/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-questions. Base: accordion.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-02
 *
 * Block library structure: 2 columns, multiple rows. First row = block name.
 * Each subsequent row is an accordion item: [title cell, content cell].
 */
export default function parse(element, { document }) {
  // Each accordion item is a <details class="faq-item"> in the source.
  let items = Array.from(element.querySelectorAll('details.faq-item, details'));
  if (!items.length) {
    items = Array.from(element.querySelectorAll(':scope > .faq-item'));
  }

  const cells = [];

  items.forEach((item) => {
    // Title: the summary's text (span), excluding the toggle icon image.
    const summary = item.querySelector('summary, .faq-question');
    let titleCell = '';
    if (summary) {
      const titleSpan = summary.querySelector('span');
      titleCell = titleSpan ? titleSpan.textContent.trim() : summary.textContent.trim();
    }

    // Content: the answer body element.
    const answer = item.querySelector('.faq-answer');
    let contentCell = '';
    if (answer) {
      contentCell = answer;
    } else {
      // Fallback: everything in the details except the summary.
      const rest = Array.from(item.children).filter((c) => c !== summary);
      if (rest.length) contentCell = rest;
    }

    if (titleCell || contentCell) {
      cells.push([titleCell, contentCell]);
    }
  });

  // Empty-block guard: nothing to build.
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-questions', cells });
  element.replaceWith(block);
}

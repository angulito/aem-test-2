/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-faq. Base: accordion.
 * Source: https://www.wknd-trendsetters.site/
 * Structure (from library-description.txt): 2 columns.
 *   Row 1: block name.
 *   Each subsequent row: [title cell, content cell] per accordion item.
 */
export default function parse(element, { document }) {
  // Each FAQ item is a <details> with a <summary> (question) and .faq-answer (answer).
  const items = element.querySelectorAll('.faq-item, details');

  const cells = [];
  items.forEach((item) => {
    // Title: prefer the span inside the summary, fall back to summary text.
    const summary = item.querySelector('.faq-question, summary');
    let titleEl = null;
    if (summary) {
      titleEl = summary.querySelector('span') || summary;
    }
    const title = titleEl ? titleEl.textContent.trim() : '';

    // Content: the answer body; keep the inner nodes (paragraphs, etc.).
    const answer = item.querySelector('.faq-answer');
    let contentCell;
    if (answer) {
      contentCell = Array.from(answer.childNodes);
    } else {
      contentCell = '';
    }

    // Only add a row if there is a title.
    if (title) {
      cells.push([title, contentCell]);
    }
  });

  // Empty-block guard: if no accordion items were found, leave content in place.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}

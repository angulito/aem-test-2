/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-v17faq. Base: accordion.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-03
 * Structure (from library-description.txt): 2 columns, multiple rows.
 *   Each row = one accordion item: [Title, Content]
 * Source: intro heading/subheading precede a .faq-list of <details.faq-item>.
 * The intro heading is preserved as default content before the block.
 */
export default function parse(element, { document }) {
  const items = Array.from(element.querySelectorAll('.faq-list .faq-item, details.faq-item, details'));

  if (items.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  items.forEach((item) => {
    const summary = item.querySelector('.faq-question, summary');
    const answer = item.querySelector('.faq-answer');

    // Title: text of the question (strip the toggle icon).
    let titleCell;
    const questionText = summary ? summary.querySelector('span') : null;
    if (questionText) {
      titleCell = questionText.textContent.trim();
    } else if (summary) {
      titleCell = summary.textContent.trim();
    } else {
      titleCell = '';
    }

    // Content: the answer body.
    const contentCell = answer || '';
    cells.push([titleCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-v17faq', cells });

  // Preserve intro heading/subheading (if any) as default content before block.
  // Intro lives in a direct-child div that is NOT the faq-list.
  const introContainer = Array.from(element.querySelectorAll(':scope > div'))
    .find((div) => !div.classList.contains('faq-list')
      && div.querySelector('h1, h2, h3, h4, h5, h6'));

  if (introContainer) {
    element.replaceWith(introContainer, block);
    return;
  }

  element.replaceWith(block);
}

/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-faq. Base: accordion.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-02 (validated)
 *
 * Library structure: 2 columns. Row 1 is the block name.
 * Each subsequent row = one accordion item: [title, content].
 * Source: `.faq-list > details.faq-item` where `summary.faq-question span`
 * is the question (title) and `.faq-answer` is the answer (content).
 * An intro heading/subheading precedes the list; per authoring analysis it
 * is default content, so it is emitted before the block (not as a row).
 */
export default function parse(element, { document }) {
  const items = Array.from(element.querySelectorAll('.faq-list details.faq-item, details.faq-item'));

  // Empty-block guard
  if (items.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  items.forEach((item) => {
    // Title: the question text (exclude the decorative +/- icon)
    const questionSpan = item.querySelector('summary .faq-question span, summary span')
      || item.querySelector('summary.faq-question, summary');
    // Content: the answer body
    const answer = item.querySelector('.faq-answer');

    const title = document.createElement('div');
    if (questionSpan) title.append(...questionSpan.childNodes.length ? questionSpan.cloneNode(true).childNodes : [document.createTextNode(questionSpan.textContent)]);

    cells.push([title, answer || '']);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });

  // Preserve the intro heading/subheading as default content before the block
  const intro = [];
  const heading = element.querySelector(':scope > div > h1, :scope > div > h2, :scope > div > h3, h2.h2-heading');
  const subheading = element.querySelector(':scope > div > p.subheading, p.subheading');
  if (heading) intro.push(heading);
  if (subheading) intro.push(subheading);

  element.replaceWith(...intro, block);
}

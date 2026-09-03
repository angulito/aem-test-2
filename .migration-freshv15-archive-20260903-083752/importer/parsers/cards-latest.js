/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-latest. Base: cards.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-02
 * Structure (from library-description.txt): 2 columns.
 *   Row 1: block name
 *   Each subsequent row = one card: [image, text content]
 *   Text content: meta tag/date, heading, and CTA link to the article.
 */
export default function parse(element, { document }) {
  let cardEls = Array.from(element.querySelectorAll(':scope > a.article-card, :scope > a.card-link'));
  if (!cardEls.length) {
    cardEls = Array.from(element.querySelectorAll(':scope > a'));
  }

  if (!cardEls.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  cardEls.forEach((card) => {
    const img = card.querySelector('.article-card-image img, img');
    const body = card.querySelector('.article-card-body');
    const heading = card.querySelector('h1, h2, h3, h4, [class*="heading"]');
    const href = card.getAttribute('href');

    const contentCell = [];
    if (body) {
      contentCell.push(body);
    } else if (heading) {
      contentCell.push(heading);
    }

    // Preserve the article link as a CTA.
    if (href) {
      const cta = document.createElement('a');
      cta.setAttribute('href', href);
      cta.textContent = heading ? heading.textContent.trim() : 'Read more';
      contentCell.push(cta);
    }

    cells.push([img || '', contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-latest', cells });
  element.replaceWith(block);
}

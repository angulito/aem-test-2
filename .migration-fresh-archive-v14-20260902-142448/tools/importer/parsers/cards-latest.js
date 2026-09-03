/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-latest. Base: cards.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-02
 *
 * Block library structure (Cards): 2 columns, multiple rows. First row = block name.
 * Each subsequent row is a card: [image cell, text cell].
 * Text cell may contain heading, description, and CTA.
 *
 * Source: each card is <a class="article-card card-link"> wrapping an
 * <div class="article-card-image"><img></div> and an
 * <div class="article-card-body"> with meta (tag + date) and an <h3> heading.
 * The card itself is the link, so we preserve the href by wrapping the heading.
 */
export default function parse(element, { document }) {
  let cards = Array.from(element.querySelectorAll(':scope > a.article-card, :scope > .article-card'));
  if (!cards.length) {
    cards = Array.from(element.querySelectorAll('a.article-card, .article-card'));
  }

  const cells = [];

  cards.forEach((card) => {
    // Image cell.
    const img = card.querySelector('img');

    // Text cell: meta (tag + date) and heading, with the card link preserved.
    const contentCell = [];
    const meta = card.querySelector('.article-card-meta');
    if (meta) contentCell.push(meta);

    const heading = card.querySelector('h1, h2, h3, h4, h5, h6, [class*="heading"]');
    const href = card.getAttribute('href');
    if (heading) {
      if (href) {
        // Wrap the heading text in a link to preserve the card URL.
        const link = document.createElement('a');
        link.setAttribute('href', href);
        link.textContent = heading.textContent.trim();
        heading.textContent = '';
        heading.appendChild(link);
      }
      contentCell.push(heading);
    } else if (href) {
      const link = document.createElement('a');
      link.setAttribute('href', href);
      link.textContent = card.textContent.trim();
      contentCell.push(link);
    }

    if (img || contentCell.length) {
      cells.push([img || '', contentCell.length ? contentCell : '']);
    }
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-latest', cells });
  element.replaceWith(block);
}

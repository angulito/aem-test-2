/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-hero. Base: carousel.
 * Source: https://wknd.site/us/en.html (.carousel.cmp-carousel--hero)
 * Structure (from library-description): 2 columns, multiple rows.
 *   Each slide = one row -> [image cell, text cell(title, description, CTA)].
 * Generated: 2026-09-02
 */
export default function parse(element, { document }) {
  // Each carousel item is one slide/row. Fallback to teaser blocks if item class absent.
  let slides = Array.from(element.querySelectorAll('.cmp-carousel__item'));
  if (!slides.length) {
    slides = Array.from(element.querySelectorAll('.teaser.cmp-teaser--hero, .cmp-teaser'));
  }

  const cells = [];

  slides.forEach((slide) => {
    // Image cell (mandatory, first cell, image only)
    const img = slide.querySelector('.cmp-teaser__image img, .cmp-image img, img');

    // Text cell (optional): title, description, CTA
    const title = slide.querySelector('.cmp-teaser__title, h1, h2, h3, [class*="title"]');
    const description = slide.querySelector('.cmp-teaser__description, [class*="description"]');
    const ctaLinks = Array.from(slide.querySelectorAll('.cmp-teaser__action-link, .cmp-teaser__action-container a'));

    // Skip empty slides that have neither image nor text
    if (!img && !title && !description && !ctaLinks.length) return;

    const textCell = [];
    if (title) textCell.push(title);
    if (description) textCell.push(description);
    ctaLinks.forEach((cta) => textCell.push(cta));

    cells.push([img || '', textCell.length ? textCell : '']);
  });

  // Empty-block guard: no slides extracted
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-hero', cells });
  element.replaceWith(block);
}

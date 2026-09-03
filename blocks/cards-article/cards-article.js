import { createOptimizedPicture } from '../../scripts/aem.js';

/* matches a trailing date like "May 12", "June 3", "Sept 8" */
const DATE_RE = /\s*((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{1,2}(?:,\s*\d{4})?)\s*$/;

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-article-card-image';
      else div.className = 'cards-article-card-body';
    });

    // Split the meta paragraph ("Category May 12") into a tag pill + date span
    const body = li.querySelector('.cards-article-card-body');
    if (body) {
      const meta = body.querySelector('p');
      if (meta) {
        const raw = meta.textContent.trim();
        const match = raw.match(DATE_RE);
        const dateText = match ? match[1].trim() : '';
        const catText = match ? raw.replace(DATE_RE, '').trim() : raw;
        const metaEl = document.createElement('div');
        metaEl.className = 'article-card-meta';
        if (catText) {
          const tag = document.createElement('span');
          tag.className = 'tag';
          tag.textContent = catText;
          metaEl.append(tag);
        }
        if (dateText) {
          const date = document.createElement('span');
          date.className = 'date';
          date.textContent = dateText;
          metaEl.append(date);
        }
        meta.replaceWith(metaEl);
      }
    }

    ul.append(li);
  });

  // Make the whole card a link, using the title anchor's href
  ul.querySelectorAll('li').forEach((li) => {
    const anchor = li.querySelector('h3 a[href]');
    if (anchor) {
      const link = document.createElement('a');
      link.className = 'cards-article-card-link';
      link.href = anchor.href;
      if (anchor.getAttribute('aria-label')) link.setAttribute('aria-label', anchor.getAttribute('aria-label'));
      // unwrap the anchor inside the title so it renders as plain heading text
      anchor.replaceWith(...anchor.childNodes);
      while (li.firstElementChild) link.append(li.firstElementChild);
      li.append(link);
    }
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    optimizedPic.querySelector('img').className = 'cover-image';
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(ul);
}

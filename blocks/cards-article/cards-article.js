import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-article-card-image';
      else div.className = 'cards-article-card-body';
    });

    const body = li.querySelector('.cards-article-card-body');
    if (body) {
      // The trailing <p><a> duplicates the title and holds the article link.
      const linkPara = [...body.querySelectorAll('p')].find((p) => p.querySelector('a'));
      const anchor = linkPara?.querySelector('a');
      const href = anchor?.getAttribute('href');

      // Split the meta paragraph ("Category  Date") into a pill + date.
      const metaPara = [...body.querySelectorAll('p')].find((p) => !p.querySelector('a'));
      if (metaPara) {
        const text = metaPara.textContent.trim();
        // Date is the trailing "Mon DD" (or similar) portion.
        const match = text.match(/^(.*?)\s+([A-Z][a-z]{2,}\.?\s+\d{1,2}(?:,\s*\d{4})?)$/);
        const category = match ? match[1].trim() : text;
        const date = match ? match[2].trim() : '';
        const meta = document.createElement('div');
        meta.className = 'cards-article-card-meta';
        if (category) {
          const tag = document.createElement('span');
          tag.className = 'cards-article-card-tag';
          tag.textContent = category;
          meta.append(tag);
        }
        if (date) {
          const dateEl = document.createElement('span');
          dateEl.className = 'cards-article-card-date';
          dateEl.textContent = date;
          meta.append(dateEl);
        }
        metaPara.replaceWith(meta);
      }

      // Drop the redundant duplicate link paragraph.
      if (linkPara) linkPara.remove();

      // Wrap the whole card in the article link.
      if (href) {
        const cardLink = document.createElement('a');
        cardLink.className = 'cards-article-card-link';
        cardLink.setAttribute('href', href);
        while (li.firstElementChild) cardLink.append(li.firstElementChild);
        li.append(cardLink);
      }
    }
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}

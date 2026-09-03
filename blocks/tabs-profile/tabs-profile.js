// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';

export default async function decorate(block) {
  // build tablist
  const tablist = document.createElement('div');
  tablist.className = 'tabs-profile-list';
  tablist.setAttribute('role', 'tablist');
  tablist.setAttribute('aria-label', 'Testimonials');

  // each direct child row = one person: cell1 = tab label, cell2 = panel content
  const rows = [...block.children];
  rows.forEach((row, i) => {
    const [labelCell, contentCell] = row.children;
    const id = toClassName(labelCell.textContent);

    // --- decorate tabpanel (reuse the content cell) ---
    const tabpanel = row;
    tabpanel.className = 'tabs-profile-panel';
    tabpanel.id = `tabpanel-${id}`;
    tabpanel.setAttribute('aria-hidden', !!i);
    tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
    tabpanel.setAttribute('role', 'tabpanel');

    // split content cell into image column + text column
    const picture = contentCell.querySelector('picture');
    const imageCol = document.createElement('div');
    imageCol.className = 'tabs-profile-image';
    if (picture) {
      const pWrap = picture.closest('p');
      imageCol.append(picture);
      if (pWrap) pWrap.remove();
    }

    const textCol = document.createElement('div');
    textCol.className = 'tabs-profile-content';
    while (contentCell.firstElementChild) {
      textCol.append(contentCell.firstElementChild);
    }

    // wrap name + role together
    const nameEl = textCol.querySelector('p strong')?.closest('p');
    const roleEl = nameEl?.nextElementSibling;
    if (nameEl) {
      const meta = document.createElement('div');
      meta.className = 'tabs-profile-meta';
      nameEl.className = 'tabs-profile-name';
      meta.append(nameEl);
      if (roleEl && !roleEl.querySelector('strong')) {
        roleEl.className = 'tabs-profile-role';
        meta.append(roleEl);
      }
      textCol.prepend(meta);
    }
    // remaining paragraph = quote
    textCol.querySelectorAll('p:not(.tabs-profile-name):not(.tabs-profile-role)').forEach((p) => {
      p.classList.add('tabs-profile-quote');
    });

    contentCell.remove();
    tabpanel.append(imageCol, textCol);

    // --- build tab button from label cell ---
    const button = document.createElement('button');
    button.className = 'tabs-profile-tab';
    button.id = `tab-${id}`;
    button.innerHTML = labelCell.innerHTML;
    button.setAttribute('aria-controls', `tabpanel-${id}`);
    button.setAttribute('aria-selected', !i);
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');
    // style name/role inside the tab button
    button.querySelector('p strong')?.closest('p')?.classList.add('tabs-profile-tab-name');
    [...button.querySelectorAll('p')].forEach((p) => {
      if (!p.classList.contains('tabs-profile-tab-name')) p.classList.add('tabs-profile-tab-role');
    });

    button.addEventListener('click', () => {
      block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
        panel.setAttribute('aria-hidden', true);
      });
      tablist.querySelectorAll('button').forEach((btn) => {
        btn.setAttribute('aria-selected', false);
      });
      tabpanel.setAttribute('aria-hidden', false);
      button.setAttribute('aria-selected', true);
    });
    tablist.append(button);

    labelCell.remove();
  });

  // panels stay in place (in DOM order), tablist appended below them
  block.append(tablist);
}

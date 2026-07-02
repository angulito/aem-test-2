export default function decorate(block) {
  const rows = [...block.children];

  // Identify the image row (cell containing pictures) and the text row.
  const imageRow = rows.find((row) => row.querySelector('picture'));
  const textRow = rows.find((row) => row !== imageRow && row.querySelector('h1, h2, h3'));

  if (imageRow) {
    imageRow.classList.add('hero-feature-images');
    // Unwrap pictures from the auto-generated <p> so we can grid them directly.
    const cell = imageRow.firstElementChild;
    const pictures = [...cell.querySelectorAll('picture')];
    if (pictures.length) {
      cell.textContent = '';
      pictures.forEach((pic) => cell.append(pic));
    }
  }

  if (textRow) {
    textRow.classList.add('hero-feature-content');
    // Decorate standalone links as buttons (primary first, outlined rest).
    const linkParagraphs = [...textRow.querySelectorAll('p')].filter(
      (p) => p.children.length === 1 && p.firstElementChild.tagName === 'A' && p.textContent.trim() === p.firstElementChild.textContent.trim(),
    );
    if (linkParagraphs.length) {
      const actions = document.createElement('div');
      actions.className = 'hero-feature-actions';
      linkParagraphs.forEach((p, i) => {
        const link = p.querySelector('a');
        link.classList.add('button', i === 0 ? 'primary' : 'secondary');
        actions.append(link);
        p.remove();
      });
      textRow.firstElementChild.append(actions);
    }
  }
}

/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-home-page.js
  var import_home_page_exports = {};
  __export(import_home_page_exports, {
    default: () => import_home_page_default
  });

  // tools/importer/parsers/accordion-faq.js
  function parse(element, { document }) {
    const items = element.querySelectorAll(".faq-item, details");
    const cells = [];
    items.forEach((item) => {
      const summary = item.querySelector(".faq-question, summary");
      let titleEl = null;
      if (summary) {
        titleEl = summary.querySelector("span") || summary;
      }
      const title = titleEl ? titleEl.textContent.trim() : "";
      const answer = item.querySelector(".faq-answer");
      let contentCell;
      if (answer) {
        contentCell = Array.from(answer.childNodes);
      } else {
        contentCell = "";
      }
      if (title) {
        cells.push([title, contentCell]);
      }
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse2(element, { document }) {
    const cards = element.querySelectorAll(":scope > a.article-card, :scope > .article-card");
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector(".article-card-image img, img");
      const contentCell = [];
      const meta = card.querySelector(".article-card-meta");
      if (meta) contentCell.push(meta);
      const heading = card.querySelector('h1, h2, h3, h4, h5, h6, [class*="heading"]');
      if (heading) contentCell.push(heading);
      const href = card.getAttribute("href");
      if (href) {
        const link = document.createElement("a");
        link.setAttribute("href", href);
        link.textContent = heading ? heading.textContent.trim() : "Read more";
        contentCell.push(link);
      }
      cells.push([img || "", contentCell]);
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-feature.js
  function parse3(element, { document }) {
    const grid = element.querySelector(".grid-layout") || element.querySelector(".container") || element;
    let columns = Array.from(grid.querySelectorAll(":scope > div"));
    if (columns.length === 0) {
      columns = [grid];
    }
    const row = columns.map((col) => {
      const contents = Array.from(col.childNodes);
      return contents.length ? contents : "";
    });
    if (row.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [row];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-gallery.js
  function parse4(element, { document }) {
    let cellDivs = Array.from(element.querySelectorAll(":scope > div"));
    if (cellDivs.length === 0) {
      const grid = element.querySelector(".grid-layout");
      if (grid) cellDivs = Array.from(grid.querySelectorAll(":scope > div"));
    }
    const items = cellDivs.map((div) => {
      const img = div.querySelector("img");
      return img || div;
    });
    if (items.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const gridClass = element.className || "";
    const match = gridClass.match(/desktop-(\d+)-column/);
    const colsPerRow = match ? parseInt(match[1], 10) : 4;
    const cells = [];
    for (let i = 0; i < items.length; i += colsPerRow) {
      const row = items.slice(i, i + colsPerRow);
      while (row.length < colsPerRow) row.push("");
      cells.push(row);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-feature.js
  function parse5(element, { document }) {
    const images = Array.from(element.querySelectorAll("img"));
    const heading = element.querySelector('h1, h2, h3, [class*="heading"]');
    const subheading = element.querySelector(".subheading, p");
    const ctaLinks = Array.from(element.querySelectorAll(".button-group a, a.button"));
    const cells = [];
    if (images.length) {
      cells.push([images]);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (subheading) contentCell.push(subheading);
    contentCell.push(...ctaLinks);
    if (!heading && !subheading && images.length === 0 && ctaLinks.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-overlay.js
  function parse6(element, { document }) {
    const bgImage = element.querySelector('img.cover-image, img[class*="overlay"], img');
    const heading = element.querySelector('h1, h2, h3, [class*="heading"]');
    const subheading = element.querySelector(".subheading, .card-body p, p");
    const ctaLinks = Array.from(element.querySelectorAll(".button-group a, a.button"));
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (subheading) contentCell.push(subheading);
    contentCell.push(...ctaLinks);
    if (!heading && !subheading && !bgImage && ctaLinks.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-overlay", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-testimonial.js
  function parse7(element, { document }) {
    const panes = Array.from(element.querySelectorAll(".tabs-content .tab-pane, .tab-pane"));
    const menuButtons = Array.from(element.querySelectorAll(".tab-menu .tab-menu-link, .tab-menu-link"));
    const cells = [];
    panes.forEach((pane, i) => {
      let labelCell;
      const button = menuButtons[i];
      if (button) {
        const labelContent = button.querySelector(":scope > div") || button;
        labelCell = Array.from(labelContent.childNodes);
      } else {
        labelCell = `Tab ${i + 1}`;
      }
      const inner = pane.querySelector(".grid-layout") || pane;
      const contentCell = Array.from(inner.childNodes);
      cells.push([labelCell, contentCell.length ? contentCell : ""]);
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-trendsetters-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "a.skip-link",
        ".navbar"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "footer.footer",
        ".breadcrumbs",
        "noscript",
        "link"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        [...el.attributes].forEach((attr) => {
          if (attr.name.startsWith("data-astro-cid")) {
            el.removeAttribute(attr.name);
          }
        });
      });
    }
  }

  // tools/importer/transformers/wknd-trendsetters-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName !== TransformHook2.beforeTransform) return;
    const template = payload && payload.template;
    const sections = template && template.sections;
    if (!sections || sections.length < 2) return;
    const doc = element.ownerDocument;
    const findSectionEl = (selector) => {
      if (!selector) return null;
      let el = null;
      try {
        el = element.querySelector(selector);
      } catch (e) {
        el = null;
      }
      if (!el) {
        const rel = selector.replace(/^#main-content\s*>\s*/, "");
        try {
          el = element.querySelector(rel);
        } catch (e) {
          el = null;
        }
      }
      return el;
    };
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      const sectionEl = findSectionEl(section.selector);
      if (!sectionEl) continue;
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(doc, {
          name: "Section Metadata",
          cells: { style: section.style }
        });
        sectionEl.after(metaBlock);
      }
      if (i > 0) {
        sectionEl.before(doc.createElement("hr"));
      }
    }
  }

  // tools/importer/import-home-page.js
  var PAGE_TEMPLATE = {
    name: "home-page",
    description: "WKND Trendsetters homepage with hero, featured story, image gallery, testimonials tabs, latest articles cards, FAQ accordion, and CTA section",
    urls: [
      "https://www.wknd-trendsetters.site/"
    ],
    blocks: [
      { name: "hero-feature", instances: ["#main-content > header.section.secondary-section"] },
      { name: "columns-feature", instances: ["#main-content > section.section:nth-of-type(1)"] },
      { name: "columns-gallery", instances: ["#main-content > section.section.secondary-section:nth-of-type(2) > div.container > div.grid-layout.desktop-4-column.tablet-2-column-1.mobile-portrait-1-column.grid-gap-sm"] },
      { name: "tabs-testimonial", instances: ["#main-content > section.section:nth-of-type(3) > div.container > div.tabs-wrapper"] },
      { name: "cards-article", instances: ["#main-content > section.section.secondary-section:nth-of-type(4) > div.container > div.grid-layout.desktop-4-column.tablet-2-column-1.mobile-portrait-1-column.grid-gap-md"] },
      { name: "accordion-faq", instances: ["#main-content > section.section:nth-of-type(5)"] },
      { name: "hero-overlay", instances: ["#main-content > section.section.inverse-section"] }
    ],
    sections: [
      { id: "rc2", name: "Hero", selector: "#main-content > header.section.secondary-section", style: "secondary", blocks: ["hero-feature"], defaultContent: [] },
      { id: "rc3", name: "Featured story", selector: "#main-content > section.section:nth-of-type(1)", style: null, blocks: ["columns-feature"], defaultContent: [] },
      { id: "rc4", name: "Image gallery", selector: "#main-content > section.section.secondary-section:nth-of-type(2)", style: "secondary", blocks: ["columns-gallery"], defaultContent: [] },
      { id: "rc5", name: "Testimonials", selector: "#main-content > section.section:nth-of-type(3)", style: null, blocks: ["tabs-testimonial"], defaultContent: [] },
      { id: "rc6", name: "Latest articles", selector: "#main-content > section.section.secondary-section:nth-of-type(4)", style: "secondary", blocks: ["cards-article"], defaultContent: [] },
      { id: "rc7", name: "FAQ", selector: "#main-content > section.section:nth-of-type(5)", style: null, blocks: ["accordion-faq"], defaultContent: [] },
      { id: "rc8", name: "CTA banner", selector: "#main-content > section.section.inverse-section", style: null, blocks: ["hero-overlay"], defaultContent: [] }
    ]
  };
  var TARGET_PATH = "/angulohe-wknd-trendesetters-2026-06-02";
  var parsers = {
    "hero-feature": parse5,
    "columns-feature": parse3,
    "columns-gallery": parse4,
    "tabs-testimonial": parse7,
    "cards-article": parse2,
    "accordion-faq": parse,
    "hero-overlay": parse6
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_home_page_default = {
    transform: (payload) => {
      const {
        document,
        url,
        html,
        params
      } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(TARGET_PATH);
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_home_page_exports);
})();

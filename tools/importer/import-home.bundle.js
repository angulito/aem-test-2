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

  // tools/importer/import-home.js
  var import_home_exports = {};
  __export(import_home_exports, {
    default: () => import_home_default
  });

  // tools/importer/parsers/hero-atwintro.js
  function parse(element, { document: document2 }) {
    const heading = element.querySelector('h1, h2, .h1-heading, [class*="heading"]');
    const subheading = element.querySelector('p.subheading, p, [class*="subheading"]');
    const ctaLinks = Array.from(element.querySelectorAll(".button-group a, a.button"));
    const images = Array.from(element.querySelectorAll("img"));
    if (!heading && !subheading && images.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    if (images.length) {
      cells.push([images]);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (subheading) contentCell.push(subheading);
    contentCell.push(...ctaLinks);
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-atwintro", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-atwart.js
  function parse2(element, { document: document2 }) {
    const cols = Array.from(element.querySelectorAll(":scope > div"));
    const columnCells = cols.length ? cols : Array.from(element.children);
    if (!columnCells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    cells.push(columnCells);
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-atwart", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-atwgal.js
  function parse3(element, { document: document2 }) {
    const cardEls = Array.from(element.querySelectorAll(":scope > div"));
    if (!cardEls.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    cardEls.forEach((card) => {
      const image = card.querySelector("img");
      const textContent = Array.from(card.querySelectorAll("h1, h2, h3, h4, h5, h6, p, a"));
      cells.push([image || "", textContent.length ? textContent : ""]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-atwgal", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-atwvoices.js
  function parse4(element, { document: document2 }) {
    const panes = Array.from(element.querySelectorAll(".tabs-content .tab-pane"));
    const menuButtons = Array.from(element.querySelectorAll(".tab-menu .tab-menu-link"));
    if (!panes.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    panes.forEach((pane, i) => {
      const button = menuButtons[i];
      let labelCell;
      if (button) {
        const labelWrap = button.querySelector(":scope > div, div");
        if (labelWrap) {
          labelWrap.querySelectorAll(".avatar, img").forEach((el) => el.remove());
          labelCell = labelWrap;
        } else {
          labelCell = button;
        }
      } else {
        labelCell = `Tab ${i + 1}`;
      }
      const contentCell = pane.querySelector(":scope > .grid-layout") || pane;
      cells.push([labelCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "tabs-atwvoices", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-atwblog.js
  function parse5(element, { document: document2 }) {
    const cards = Array.from(element.querySelectorAll(":scope > a.article-card, :scope > a.card-link"));
    if (!cards.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    cards.forEach((card) => {
      const image = card.querySelector(".article-card-image img, img");
      const body = card.querySelector(".article-card-body");
      const textContent = [];
      if (body) textContent.push(body);
      const href = card.getAttribute("href");
      if (href) {
        const heading = card.querySelector("h1, h2, h3, h4, h5, h6");
        const link = document2.createElement("a");
        link.href = href;
        link.textContent = heading ? heading.textContent.trim() : "Read more";
        textContent.push(link);
      }
      cells.push([image || "", textContent.length ? textContent : ""]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-atwblog", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-atwfaq.js
  function parse6(element, { document: document2 }) {
    const items = Array.from(element.querySelectorAll(":scope > details.faq-item, details.faq-item"));
    if (!items.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    items.forEach((item) => {
      const summary = item.querySelector(".faq-question, summary");
      let titleCell = "";
      if (summary) {
        const span = summary.querySelector("span");
        titleCell = span || summary;
        if (titleCell === summary) {
          titleCell.querySelectorAll("img, svg").forEach((el) => el.remove());
        }
      }
      const answer = item.querySelector(".faq-answer") || "";
      cells.push([titleCell, answer]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "accordion-atwfaq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-atwcta.js
  function parse7(element, { document: document2 }) {
    const bgImage = element.querySelector('img.cover-image, img[class*="overlay"], img');
    const heading = element.querySelector('h1, h2, .h1-heading, [class*="heading"]');
    const subheading = element.querySelector('p.subheading, p, [class*="subheading"]');
    const ctaLinks = Array.from(element.querySelectorAll(".button-group a, a.button"));
    if (!heading && !subheading && !bgImage) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (subheading) contentCell.push(subheading);
    contentCell.push(...ctaLinks);
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-atwcta", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-trendsetters-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".skip-link",
        ".navbar",
        ".breadcrumbs",
        "footer.footer"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".skip-link",
        ".navbar",
        "footer",
        "noscript"
      ]);
    }
  }

  // tools/importer/transformers/wknd-trendsetters-sections.js
  var SECTION_MARKER_ATTR = "data-excat-section-id";
  function transform2(hookName, element, payload) {
    const sections = payload.template && payload.template.sections || [];
    if (hookName === "beforeTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (i === 0 && !section.style) continue;
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        const hr = document.createElement("hr");
        if (section.style) hr.setAttribute(SECTION_MARKER_ATTR, section.id);
        sectionEl.before(hr);
      }
    }
    if (hookName === "afterTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (!section.style) continue;
        const marker = element.querySelector(`[${SECTION_MARKER_ATTR}="${section.id}"]`);
        const anchor = marker || element.querySelector(section.selector);
        if (!anchor) continue;
        const metadataBlock = WebImporter.Blocks.createBlock(document, {
          name: "Section Metadata",
          cells: { style: section.style }
        });
        anchor.after(metadataBlock);
        if (marker) {
          marker.removeAttribute(SECTION_MARKER_ATTR);
          if (i === 0) marker.remove();
        }
      }
    }
  }

  // tools/importer/import-home.js
  var parsers = {
    "hero-atwintro": parse,
    "columns-atwart": parse2,
    "cards-atwgal": parse3,
    "tabs-atwvoices": parse4,
    "cards-atwblog": parse5,
    "accordion-atwfaq": parse6,
    "hero-atwcta": parse7
  };
  var PAGE_TEMPLATE = {
    name: "home",
    description: "WKND Trendsetters homepage: hero intro, featured article header, snapshot gallery, testimonial tabs, latest articles, FAQ accordion, and CTA banner",
    urls: [
      "https://www.wknd-trendsetters.site/"
    ],
    blocks: [
      {
        name: "hero-atwintro",
        instances: ["#main-content > header.section.secondary-section .grid-layout"]
      },
      {
        name: "columns-atwart",
        instances: ["#main-content > section.section:nth-of-type(1) .grid-layout"]
      },
      {
        name: "cards-atwgal",
        instances: ["#main-content > section.section.secondary-section:nth-of-type(2) .grid-layout.desktop-4-column"]
      },
      {
        name: "tabs-atwvoices",
        instances: ["#main-content > section.section:nth-of-type(3) .tabs-wrapper"]
      },
      {
        name: "cards-atwblog",
        instances: ["#main-content > section.section.secondary-section:nth-of-type(4) .grid-layout.desktop-4-column"]
      },
      {
        name: "accordion-atwfaq",
        instances: ["#main-content > section.section:nth-of-type(5) .faq-list"]
      },
      {
        name: "hero-atwcta",
        instances: ["#main-content > section.section.inverse-section .grid-layout"]
      }
    ],
    sections: [
      {
        id: "rc1",
        name: "Hero intro",
        selector: "#main-content > header.section.secondary-section",
        style: "grey",
        blocks: ["hero-atwintro"],
        defaultContent: []
      },
      {
        id: "rc2",
        name: "Article header",
        selector: "#main-content > section.section:nth-of-type(1)",
        style: null,
        blocks: ["columns-atwart"],
        defaultContent: []
      },
      {
        id: "rc3",
        name: "Snapshot gallery",
        selector: "#main-content > section.section.secondary-section:nth-of-type(2)",
        style: "grey",
        blocks: ["cards-atwgal"],
        defaultContent: ["#main-content > section.section.secondary-section:nth-of-type(2) > div.container > div.utility-text-align-center.utility-margin-bottom-8rem"]
      },
      {
        id: "rc4",
        name: "Testimonial voices",
        selector: "#main-content > section.section:nth-of-type(3)",
        style: null,
        blocks: ["tabs-atwvoices"],
        defaultContent: []
      },
      {
        id: "rc5",
        name: "Latest articles",
        selector: "#main-content > section.section.secondary-section:nth-of-type(4)",
        style: "grey",
        blocks: ["cards-atwblog"],
        defaultContent: ["#main-content > section.section.secondary-section:nth-of-type(4) > div.container > div.utility-text-align-center"]
      },
      {
        id: "rc6",
        name: "FAQ",
        selector: "#main-content > section.section:nth-of-type(5)",
        style: null,
        blocks: ["accordion-atwfaq"],
        defaultContent: ["#main-content > section.section:nth-of-type(5) > div.container > div.grid-layout > div:nth-of-type(1)"]
      },
      {
        id: "rc7",
        name: "CTA banner",
        selector: "#main-content > section.section.inverse-section",
        style: "dark",
        blocks: ["hero-atwcta"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  var TARGET_PATH = "/angulohe-trebdwknd-v18";
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
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document2.querySelectorAll(selector);
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
  var import_home_default = {
    transform: (payload) => {
      const {
        document: document2,
        url,
        html,
        params
      } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document: document2, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document2.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(TARGET_PATH);
      return [{
        element: main,
        path,
        report: {
          title: document2.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_home_exports);
})();

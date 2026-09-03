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

  // tools/importer/parsers/hero-intro.js
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
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-intro", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-casestudy.js
  function parse2(element, { document: document2 }) {
    var _a;
    const gridChildren = Array.from(
      element.querySelectorAll(":scope > div.container > div.grid-layout > div")
    );
    let imageCol = null;
    let contentCol = null;
    gridChildren.forEach((child) => {
      if (!imageCol && child.querySelector("img.cover-image, img")) {
        imageCol = child;
      } else if (!contentCol) {
        contentCol = child;
      }
    });
    const image = imageCol || element.querySelector("img.cover-image, img");
    const content = contentCol || ((_a = element.querySelector(".breadcrumbs, h2, .h2-heading")) == null ? void 0 : _a.parentElement);
    if (!image && !content) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    cells.push([image || "", content || ""]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-casestudy", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-snapshot.js
  function parse3(element, { document: document2 }) {
    let cardEls = Array.from(element.querySelectorAll(":scope > div"));
    if (!cardEls.length) {
      cardEls = Array.from(element.children);
    }
    const cells = [];
    cardEls.forEach((card) => {
      const img = card.querySelector("img") || (card.tagName === "IMG" ? card : null);
      if (img) {
        cells.push([img]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-snapshot", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-voices.js
  function parse4(element, { document: document2 }) {
    const panes = Array.from(element.querySelectorAll(".tabs-content > .tab-pane, .tab-pane"));
    const menuButtons = Array.from(element.querySelectorAll(".tab-menu .tab-menu-link, .tab-menu button"));
    if (!panes.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    panes.forEach((pane, i) => {
      const button = menuButtons[i];
      let label;
      const nameEl = button && button.querySelector("strong");
      if (nameEl) {
        label = document2.createElement("p");
        label.textContent = nameEl.textContent.trim();
      } else if (button) {
        label = button;
      } else {
        label = document2.createElement("p");
        label.textContent = `Tab ${i + 1}`;
      }
      cells.push([label, pane]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "tabs-voices", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-latest.js
  function parse5(element, { document: document2 }) {
    let cardEls = Array.from(element.querySelectorAll(":scope > a.article-card, :scope > a.card-link"));
    if (!cardEls.length) {
      cardEls = Array.from(element.querySelectorAll(":scope > a"));
    }
    if (!cardEls.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    cardEls.forEach((card) => {
      const img = card.querySelector(".article-card-image img, img");
      const body = card.querySelector(".article-card-body");
      const heading = card.querySelector('h1, h2, h3, h4, [class*="heading"]');
      const href = card.getAttribute("href");
      const contentCell = [];
      if (body) {
        contentCell.push(body);
      } else if (heading) {
        contentCell.push(heading);
      }
      if (href) {
        const cta = document2.createElement("a");
        cta.setAttribute("href", href);
        cta.textContent = heading ? heading.textContent.trim() : "Read more";
        contentCell.push(cta);
      }
      cells.push([img || "", contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-latest", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse6(element, { document: document2 }) {
    let items = Array.from(element.querySelectorAll("details.faq-item, details"));
    if (!items.length) {
      items = Array.from(element.querySelectorAll(".faq-item"));
    }
    if (!items.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    items.forEach((item) => {
      const summary = item.querySelector(".faq-question, summary");
      const titleSpan = summary && summary.querySelector("span");
      const title = document2.createElement("p");
      title.textContent = (titleSpan || summary || item).textContent.trim();
      const content = item.querySelector(".faq-answer") || item.querySelector("p");
      cells.push([title, content || ""]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-banner.js
  function parse7(element, { document: document2 }) {
    const bgImage = element.querySelector('img.utility-overlay, img[class*="overlay"], img.cover-image, img');
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
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-trendsetters-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".skip-link",
        ".navbar",
        "footer.footer",
        ".breadcrumbs"
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
    "hero-intro": parse,
    "columns-casestudy": parse2,
    "cards-snapshot": parse3,
    "tabs-voices": parse4,
    "cards-latest": parse5,
    "accordion-faq": parse6,
    "hero-banner": parse7
  };
  var PAGE_TEMPLATE = {
    name: "home",
    description: "WKND Trendsetters homepage: intro hero, article intro, photo gallery, testimonial tabs, latest articles, FAQ, closing CTA banner",
    urls: [
      "https://www.wknd-trendsetters.site/"
    ],
    blocks: [
      {
        name: "hero-intro",
        instances: ["#main-content > header.section.secondary-section"]
      },
      {
        name: "columns-casestudy",
        instances: ["#main-content > section.section:nth-of-type(1)"]
      },
      {
        name: "cards-snapshot",
        instances: ["#main-content > section.section.secondary-section:nth-of-type(2) > div.container > div.grid-layout.desktop-4-column"]
      },
      {
        name: "tabs-voices",
        instances: ["#main-content > section.section:nth-of-type(3) > div.container > div.tabs-wrapper"]
      },
      {
        name: "cards-latest",
        instances: ["#main-content > section.section.secondary-section:nth-of-type(4) > div.container > div.grid-layout.desktop-4-column"]
      },
      {
        name: "accordion-faq",
        instances: ["#main-content > section.section:nth-of-type(5) > div.container > div.grid-layout > div.faq-list"]
      },
      {
        name: "hero-banner",
        instances: ["#main-content > section.section.inverse-section"]
      }
    ],
    sections: [
      { id: "rc1", name: "Intro hero", selector: "#main-content > header.section.secondary-section", style: null, blocks: ["hero-intro"], defaultContent: [] },
      { id: "rc2", name: "Article intro", selector: "#main-content > section.section:nth-of-type(1)", style: null, blocks: ["columns-casestudy"], defaultContent: [] },
      { id: "rc3", name: "Photo gallery", selector: "#main-content > section.section.secondary-section:nth-of-type(2)", style: "grey", blocks: ["cards-snapshot"], defaultContent: ["#main-content > section.section.secondary-section:nth-of-type(2) > div.container > div.utility-text-align-center.utility-margin-bottom-8rem"] },
      { id: "rc4", name: "Testimonial tabs", selector: "#main-content > section.section:nth-of-type(3)", style: null, blocks: ["tabs-voices"], defaultContent: [] },
      { id: "rc5", name: "Latest articles", selector: "#main-content > section.section.secondary-section:nth-of-type(4)", style: "grey", blocks: ["cards-latest"], defaultContent: ["#main-content > section.section.secondary-section:nth-of-type(4) > div.container > div.utility-text-align-center"] },
      { id: "rc6", name: "FAQ", selector: "#main-content > section.section:nth-of-type(5)", style: null, blocks: ["accordion-faq"], defaultContent: [] },
      { id: "rc7", name: "Closing CTA banner", selector: "#main-content > section.section.inverse-section", style: "dark", blocks: ["hero-banner"], defaultContent: [] }
    ]
  };
  var TARGET_PATH = "/angulohe-trebdwknd-v14";
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
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
      const { document: document2, url, html, params } = payload;
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

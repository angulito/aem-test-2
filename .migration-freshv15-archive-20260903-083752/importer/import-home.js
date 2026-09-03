/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroIntroParser from './parsers/hero-intro.js';
import columnsCasestudyParser from './parsers/columns-casestudy.js';
import cardsSnapshotParser from './parsers/cards-snapshot.js';
import tabsVoicesParser from './parsers/tabs-voices.js';
import cardsLatestParser from './parsers/cards-latest.js';
import accordionFaqParser from './parsers/accordion-faq.js';
import heroBannerParser from './parsers/hero-banner.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/wknd-trendsetters-cleanup.js';
import sectionsTransformer from './transformers/wknd-trendsetters-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-intro': heroIntroParser,
  'columns-casestudy': columnsCasestudyParser,
  'cards-snapshot': cardsSnapshotParser,
  'tabs-voices': tabsVoicesParser,
  'cards-latest': cardsLatestParser,
  'accordion-faq': accordionFaqParser,
  'hero-banner': heroBannerParser,
};

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'home',
  description: 'WKND Trendsetters homepage: intro hero, article intro, photo gallery, testimonial tabs, latest articles, FAQ, closing CTA banner',
  urls: [
    'https://www.wknd-trendsetters.site/',
  ],
  blocks: [
    {
      name: 'hero-intro',
      instances: ['#main-content > header.section.secondary-section'],
    },
    {
      name: 'columns-casestudy',
      instances: ['#main-content > section.section:nth-of-type(1)'],
    },
    {
      name: 'cards-snapshot',
      instances: ['#main-content > section.section.secondary-section:nth-of-type(2) > div.container > div.grid-layout.desktop-4-column'],
    },
    {
      name: 'tabs-voices',
      instances: ['#main-content > section.section:nth-of-type(3) > div.container > div.tabs-wrapper'],
    },
    {
      name: 'cards-latest',
      instances: ['#main-content > section.section.secondary-section:nth-of-type(4) > div.container > div.grid-layout.desktop-4-column'],
    },
    {
      name: 'accordion-faq',
      instances: ['#main-content > section.section:nth-of-type(5) > div.container > div.grid-layout > div.faq-list'],
    },
    {
      name: 'hero-banner',
      instances: ['#main-content > section.section.inverse-section'],
    },
  ],
  sections: [
    { id: 'rc1', name: 'Intro hero', selector: '#main-content > header.section.secondary-section', style: null, blocks: ['hero-intro'], defaultContent: [] },
    { id: 'rc2', name: 'Article intro', selector: '#main-content > section.section:nth-of-type(1)', style: null, blocks: ['columns-casestudy'], defaultContent: [] },
    { id: 'rc3', name: 'Photo gallery', selector: '#main-content > section.section.secondary-section:nth-of-type(2)', style: 'grey', blocks: ['cards-snapshot'], defaultContent: ['#main-content > section.section.secondary-section:nth-of-type(2) > div.container > div.utility-text-align-center.utility-margin-bottom-8rem'] },
    { id: 'rc4', name: 'Testimonial tabs', selector: '#main-content > section.section:nth-of-type(3)', style: null, blocks: ['tabs-voices'], defaultContent: [] },
    { id: 'rc5', name: 'Latest articles', selector: '#main-content > section.section.secondary-section:nth-of-type(4)', style: 'grey', blocks: ['cards-latest'], defaultContent: ['#main-content > section.section.secondary-section:nth-of-type(4) > div.container > div.utility-text-align-center'] },
    { id: 'rc6', name: 'FAQ', selector: '#main-content > section.section:nth-of-type(5)', style: null, blocks: ['accordion-faq'], defaultContent: [] },
    { id: 'rc7', name: 'Closing CTA banner', selector: '#main-content > section.section.inverse-section', style: 'dark', blocks: ['hero-banner'], defaultContent: [] },
  ],
};

// Fixed target document path for this single-page migration
const TARGET_PATH = '/angulohe-trebdwknd-v14';

// TRANSFORMER REGISTRY - cleanup first, then sections (afterTransform)
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
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
          section: blockDef.section || null,
        });
      });
    });
  });
  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. beforeTransform (initial cleanup + section break markers)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return; // already replaced by earlier parser
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

    // 4. afterTransform (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Fixed target path for this single-page migration
    const path = WebImporter.FileUtils.sanitizePath(TARGET_PATH);

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};

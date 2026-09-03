/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroAtwintroParser from './parsers/hero-atwintro.js';
import columnsAtwartParser from './parsers/columns-atwart.js';
import cardsAtwgalParser from './parsers/cards-atwgal.js';
import tabsAtwvoicesParser from './parsers/tabs-atwvoices.js';
import cardsAtwblogParser from './parsers/cards-atwblog.js';
import accordionAtwfaqParser from './parsers/accordion-atwfaq.js';
import heroAtwctaParser from './parsers/hero-atwcta.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/wknd-trendsetters-cleanup.js';
import sectionsTransformer from './transformers/wknd-trendsetters-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-atwintro': heroAtwintroParser,
  'columns-atwart': columnsAtwartParser,
  'cards-atwgal': cardsAtwgalParser,
  'tabs-atwvoices': tabsAtwvoicesParser,
  'cards-atwblog': cardsAtwblogParser,
  'accordion-atwfaq': accordionAtwfaqParser,
  'hero-atwcta': heroAtwctaParser,
};

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'home',
  description: 'WKND Trendsetters homepage: hero intro, featured article header, snapshot gallery, testimonial tabs, latest articles, FAQ accordion, and CTA banner',
  urls: [
    'https://www.wknd-trendsetters.site/',
  ],
  blocks: [
    {
      name: 'hero-atwintro',
      instances: ['#main-content > header.section.secondary-section .grid-layout'],
    },
    {
      name: 'columns-atwart',
      instances: ['#main-content > section.section:nth-of-type(1) .grid-layout'],
    },
    {
      name: 'cards-atwgal',
      instances: ['#main-content > section.section.secondary-section:nth-of-type(2) .grid-layout.desktop-4-column'],
    },
    {
      name: 'tabs-atwvoices',
      instances: ['#main-content > section.section:nth-of-type(3) .tabs-wrapper'],
    },
    {
      name: 'cards-atwblog',
      instances: ['#main-content > section.section.secondary-section:nth-of-type(4) .grid-layout.desktop-4-column'],
    },
    {
      name: 'accordion-atwfaq',
      instances: ['#main-content > section.section:nth-of-type(5) .faq-list'],
    },
    {
      name: 'hero-atwcta',
      instances: ['#main-content > section.section.inverse-section .grid-layout'],
    },
  ],
  sections: [
    {
      id: 'rc1', name: 'Hero intro', selector: '#main-content > header.section.secondary-section', style: 'grey', blocks: ['hero-atwintro'], defaultContent: [],
    },
    {
      id: 'rc2', name: 'Article header', selector: '#main-content > section.section:nth-of-type(1)', style: null, blocks: ['columns-atwart'], defaultContent: [],
    },
    {
      id: 'rc3', name: 'Snapshot gallery', selector: '#main-content > section.section.secondary-section:nth-of-type(2)', style: 'grey', blocks: ['cards-atwgal'], defaultContent: ['#main-content > section.section.secondary-section:nth-of-type(2) > div.container > div.utility-text-align-center.utility-margin-bottom-8rem'],
    },
    {
      id: 'rc4', name: 'Testimonial voices', selector: '#main-content > section.section:nth-of-type(3)', style: null, blocks: ['tabs-atwvoices'], defaultContent: [],
    },
    {
      id: 'rc5', name: 'Latest articles', selector: '#main-content > section.section.secondary-section:nth-of-type(4)', style: 'grey', blocks: ['cards-atwblog'], defaultContent: ['#main-content > section.section.secondary-section:nth-of-type(4) > div.container > div.utility-text-align-center'],
    },
    {
      id: 'rc6', name: 'FAQ', selector: '#main-content > section.section:nth-of-type(5)', style: null, blocks: ['accordion-atwfaq'], defaultContent: ['#main-content > section.section:nth-of-type(5) > div.container > div.grid-layout > div:nth-of-type(1)'],
    },
    {
      id: 'rc7', name: 'CTA banner', selector: '#main-content > section.section.inverse-section', style: 'dark', blocks: ['hero-atwcta'], defaultContent: [],
    },
  ],
};

// TRANSFORMER REGISTRY - cleanup runs first, sections after (when 2+ sections)
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

// TARGET DOCUMENT PATH - fresh migration writes to this page name
const TARGET_PATH = '/angulohe-trebdwknd-v18';

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
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

export default {
  transform: (payload) => {
    const {
      document, url, html, params,
    } = payload;

    const main = document.body;

    // 1. beforeTransform (initial cleanup)
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

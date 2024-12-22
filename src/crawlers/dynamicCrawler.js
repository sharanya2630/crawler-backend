const { createBrowserInstance } = require('../config/puppeteerConfig');
const { urlPatterns } = require('./urlPatterns');
const logger = require('../utils/logger');

const dynamicCrawler = async (domain) => {
  try {
    const browser = await createBrowserInstance();
    const page = await browser.newPage();
    await page.goto(domain, { waitUntil: 'networkidle2' });

    const productUrls = await page.evaluate((patterns) => {
      const links = Array.from(document.querySelectorAll('a'));
      return links
        .map((link) => link.href)
        .filter((href) => patterns.some((pattern) => href.includes(pattern)));
    }, urlPatterns);

    await browser.close();
    return [...new Set(productUrls)];
  } catch (error) {
    logger.error(`Error crawling dynamic website: ${domain}`, error);
    return [];
  }
};

module.exports = dynamicCrawler;

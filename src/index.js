const staticCrawler = require("./crawlers/staticCrawler");
const dynamicCrawler = require("./crawlers/dynamicCrawler");
const validateDomains = require("./utils/validateDomains");
const logger = require("./utils/logger");
const { PARALLEL_REQUESTS } = require("./constants");

const domains = [
  "https://www.thedotstore.com/product-sample-woocommerce/",
  "https://yotobox.in/product-category/all-products-section",
  "https://smytten.com/?srsltid=AfmBOoo-59xN-WKTb2lxBUMVgmXsl9HiXwAGKfjXon0DCXJfrDZltzww",
];

const crawlDomains = async () => {
  const validDomains = validateDomains(domains);
  const results = [];

  for (const domain of validDomains) {
    logger.info(`Crawling domain: ${domain}`);
    const staticUrls = await staticCrawler(domain);
    const dynamicUrls = await dynamicCrawler(domain);
    results.push({
      domain,
      urls: [...new Set([...staticUrls, ...dynamicUrls])],
    });
  }

  results.forEach((result) => {
    logger.info(
      `Crawled ${result.domain}: ${result.urls.length} product URLs found.`
    );
    console.log(result.urls);
  });
};

crawlDomains();

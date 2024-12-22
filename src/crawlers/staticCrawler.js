const axios = require('axios');
const cheerio = require('cheerio');
const { urlPatterns } = require('./urlPatterns');
const logger = require('../utils/logger');

const staticCrawler = async (domain) => {
  try {
    const response = await axios.get(domain);
    const $ = cheerio.load(response.data);

    const productUrls = [];
    $('a').each((_, element) => {
      const href = $(element).attr('href');
      if (href && urlPatterns.some((pattern) => href.includes(pattern))) {
        productUrls.push(new URL(href, domain).href);
      }
    });

    return [...new Set(productUrls)];
  } catch (error) {
    logger.error(`Error crawling static website: ${domain}`, error);
    return [];
  }
};

module.exports = staticCrawler;

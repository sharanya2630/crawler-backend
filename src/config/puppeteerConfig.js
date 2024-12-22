const puppeteer = require('puppeteer');

const createBrowserInstance = async () => {
  return puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
};

module.exports = { createBrowserInstance };

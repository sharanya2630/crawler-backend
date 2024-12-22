const puppeteer = require('puppeteer');

const dynamicCrawler = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Adjust the selector based on site inspection
        const productUrls = await page.evaluate(() => {
            const productLinks = Array.from(document.querySelectorAll('a'))
                .map((a) => a.href)
                .filter((href) => href.includes('/product/') || href.includes('/item/'));
            return productLinks;
        });

        await browser.close();
        return productUrls;
    } catch (error) {
        console.error(`[ERROR]: Dynamic crawl failed for ${url}:`, error.message);
        await browser.close();
        return [];
    }
};

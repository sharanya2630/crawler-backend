const staticCrawler = require("../src/crawlers/staticCrawler");

test("Static crawler should return product URLs for a domain", async () => {
  const domain = "https://amazon.in";
  const productUrls = await staticCrawler(domain);
  expect(productUrls).toBeDefined();
  expect(Array.isArray(productUrls)).toBe(true);
});

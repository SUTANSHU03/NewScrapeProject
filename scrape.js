// scrape.js
const puppeteer = require('puppeteer');
const fs = require('fs');

const url = process.env.SCRAPE_URL;
if (!url) {
    console.error('SCRAPE_URL environment variable not set');
    process.exit(1);
}

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH

    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const data = await page.evaluate(() => ({
        title: document.title,
        url: location.href,
        h1: Array.from(document.querySelectorAll('h1')).map(el => el.innerText)
    }));

    fs.writeFileSync('scraped_data.json', JSON.stringify(data, null, 2));
    await browser.close();
})();

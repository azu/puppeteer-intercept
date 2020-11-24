const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', interceptedRequest => {
        const url = interceptedRequest.url();
        console.log("request: " + url)
        if (url.endsWith('.png')) {
            console.log("intercept: " + url)
            interceptedRequest.abort();
        } else {
            interceptedRequest.continue();
        }
    });
    await page.goto('https://www.google.com//');
    await page.screenshot({
        path: "ss.png"
    })
    await browser.close();
})();

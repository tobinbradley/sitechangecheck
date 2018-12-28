const puppeteer = require('puppeteer')
const fs = require('fs')

function pagePNG(url, filename) {
  return puppeteer.launch().then(async browser => {
    const page = await browser.newPage()
    await page.goto(url)
    await page.screenshot({ path: `img/${filename}.png`, fullPage: true })
    await browser.close()
  })
}

function pageTXT(url, filename, selector = '*') {
  return puppeteer.launch().then(async browser => {
    const page = await browser.newPage()
    await page.goto(url)
    const data = await page.$$eval(selector, tds => tds.map((td) => {
      return td.innerHTML;
    }));
    fs.writeFileSync(`txt/${filename}.txt`, data.join("\r\n"))
    await browser.close()
  })
}

module.exports = {pagePNG, pageTXT}

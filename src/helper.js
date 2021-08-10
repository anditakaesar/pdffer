
const puppeteer = require('puppeteer')

export async function createPdf(buffHtml) {
  let html = buffHtml.toString('utf-8')
  let opts = {
    args: ['--no-sandbox'],
    headless: true
  }
  const browser = await puppeteer.launch(opts)
  let page = await browser.newPage()
  await page.goto(`data:text/html;charset=UTF-8,${html}`, {
    waitUntil: 'networkidle0'
  })

  const pdf = await page.pdf()
  await browser.close()

  return pdf
}
const launchCommand = "/Users/lime/Workdir/chromium-audit/src/out/asan/Chromium.app/Contents/MacOS/Chromium";

async function crash() {
  const puppeteer = require('puppeteer-core');

  const executablePath = launchCommand;
  const launchOptions = {
    headless: true,
    executablePath,
    timeout: 30000,
    defaultOptions: false,
    dumpio: true,
    args: ['--no-sandbox', '--disable-popup-blocking']
  };
  var url = 'http://localhost:8000/main.html';
  let browser = await puppeteer.launch(launchOptions);
  var [page] = await browser.pages();

  try {
    await page.goto(url, {
      waitUntil: ['networkidle2', 'domcontentloaded', 'load'],
      timeout: 10000
    });
  } catch (e) {}

  await sleep(10 * 1000);

  try {
    await browser.close();
  } catch (e) {}

  try {
    await browser.process().kill('SIGKILL');
  } catch (e) {}

  ;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var arrs = [];
arrs.push(crash(Math.floor(Math.random() * 100000)));
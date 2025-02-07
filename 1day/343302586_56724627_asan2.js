const launchCommand = '/Users/zh1x1an1221/log-only-chromium/src/out/asan-0528/Chromium.app/Contents/MacOS/Chromium'; // modify this path to your chrome executable

async function test(idx) {
  const puppeteer = require('puppeteer-core');

  const executablePath = launchCommand;
  var browsers = [];
  const launchOptions = {
    headless: true,
    executablePath,
    timeout: 30000,
    defaultOptions: false,
    dumpio: true,
    args: ['--no-sandbox', '--disable-popup-blocking', '--user-data-dir=/tmp/testxx' + idx]
  };
  var url = 'http://localhost:8000/main.html'; // modify this url to your test url

  let browser = await puppeteer.launch(launchOptions);
  var [page] = await browser.pages();

  try {
    await page.goto(url, {
      waitUntil: ['networkidle2', 'domcontentloaded', 'load'],
      timeout: 10000
    });
  } catch (e) {}

  await sleep(8 * 1000); // modify this number to control the time of each chrome instance

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

(async () => {
  for (;;) {
    arrs = [];

    for (var i = 0; i < 20; i++) {
      // modify this number to control the number of chrome instances
      arrs.push(test(Math.floor(Math.random() * 100000)));
    }

    await Promise.all(arrs);
  }

  await sleep(1000);
})();
const dotenv = require('dotenv').config();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

(async () => {
    puppeteer.use(StealthPlugin())

    //while (timesCheckedOut < timesToCheckout){
      const browser = await puppeteer.launch({headless:false, args: ['--window-size=1920,1080'] 
    });
    let locations = 1;
    for (let i = 0; i < locations; i++){

    
      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      await page.goto('https://ipostal1.com/secure-store-login.php');
      await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
      })
      
      
      await page.type('input[id="username2"]', process.env.userName)
      await page.type('input[id="password"]', process.env.password)
      await page.click('button[class="BB_buttonLogin"]')
      await page.waitForNavigation()
      await page.waitForSelector('a[class="btnSave2"]', { timeout: 0 })
      await page.click('a[class="btnSave2"]')
      await page.waitForNavigation()
      await page.waitForSelector('#state_id', { timeout: 0 })
      await page.select('#state_id', value = '57')
      await page.waitForSelector('#cities', { timeout: 0 })
      await page.select('#cities', value = 'Fort Worth')
      await page.waitForTimeout(5000)
      const locationValue = await page.$eval('#total-results-text', ele => ele.textContent);
      locations = `${locationValue.substring(0, 2)}`;
    }
    
})();    
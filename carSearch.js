/* 
                       TEST CASE 
          Test Case ID = TC001
          Test Case Name = Selecting car brand and model on Turbo.az website
          Module = carOptions
          Description = To verify that the selection of a car brand (Audi) and model (A7) works correctly on the Turbo.az website.
          Preconditions: 1.Internet connection is available.
                         2.Chrome browser is installed and operational.
                         3.selenium-webdriver and chromedriver are installed.
                         4.uBlock Origin extension added to chrome options for fluently test without failures with ads.
                        

          Test Steps : 1.Launch Chrome browser and navigate to https://turbo.az.
                       2.Locate and click the "Brand" dropdown element.
                       3.Locate and click the "Audi" option in the brand selection menu.
                       4.Locate and click the "Model" dropdown element.
                       5.Locate and click the "A7" option in the model selection menu.
                       6.Locate and select the "Used" option in the condition selection menu.
                       7.Locate and type max amount of car price option.
                       8.Locate and select the USD option in the currency selection.
                       9.Locate and click the Search submit button.
          Expected results : 1.The "Audi" brand and "A7" model are successfully selected.
                             2.The selections are applied correctly.
                             3.Selected car from search results are opened correctly.

          Postcondition : 1.The browser is closed.             

*/

const { Builder, By, until, Key } = require('selenium-webdriver');
const path = require('path');
const chrome = require('selenium-webdriver/chrome');
const adblockExtensionPath = path.join('C:', 'Users', 'Administrator', 'VS Code', 'chromeDriverExtensions', 'CJPALHDLNBPAFIAMEJDNHCPHJBKEIAGM_1_62_0_0.crx'); 
let options = new chrome.Options();
options.addExtensions(adblockExtensionPath);
let driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

async function carSearch() {
    try {
        await driver.manage().window().maximize()  
        await driver.get('https://turbo.az');
        
        // Car brand dropdown elementini tapmaq və klikləmək
        let carBrandDropdown = await driver.findElement(By.css('.tz-dropdown[data-id="q_make"]')).click();
        
        // Elementin görünməsini gözləmək
        await driver.wait(until.elementIsVisible(driver.findElement(By.css('.tz-dropdown__option[data-val="9"]'))), 3000);
        let carBrand = await driver.findElement(By.css('.tz-dropdown__option[data-val="9"]'));
        // Seçimi tapıb klikləmək
        await carBrand.click();

        let currentWindowHandle = await driver.getWindowHandle(); 
        let carModelDropdown = await driver.findElement(By.css('.tz-dropdown[data-id="q_model"]'));
        await carModelDropdown.click();
       

        await driver.wait(until.elementIsVisible(driver.findElement(By.css('.tz-dropdown[data-id="q_model"]'))), 3000);
        let carModel = await driver.findElement(By.css('.tz-dropdown__option[data-val="group167"]')).click();
        
        let conditionRadioBtn = await driver.findElement(By.css('.js-main-search-controls-tab[for="q_used_1"]'));
        await conditionRadioBtn.click();

        let maxPrice = await driver.findElement(By.id('q_price_to')).sendKeys('60000');
        let currency = await driver.findElement(By.css('.tz-dropdown[data-id="q_currency"]'));
        await currency.click();
        
        await driver.wait(until.elementIsVisible(driver.findElement(By.css('.tz-dropdown__option[data-val="usd"]'))), 3000);
        let currecnyUsd = await driver.findElement(By.css('.tz-dropdown__option[data-val="usd"]'));
        await currecnyUsd.click();

        let searchButton = await driver.findElement(By.css('button.main-search__btn.tz-btn.tz-btn--primary'));
        await searchButton.click();
        
        // Sayfanın yüklənməsini gözləyin
        await driver.wait(until.elementIsVisible(driver.findElement(By.css('a[href="/autos/8699947-audi-a7-sportback"]'))), 5000);
        
        // Axtarış nəticəsinə klikləyin
        let searchResult = await driver.findElement(By.css('a[href="/autos/8699947-audi-a7-sportback"]')).click();
        
        // Yeni pəncərəyə keçin
        let allWindowHandles = await driver.getAllWindowHandles();
    
        
        for (let handle of allWindowHandles) {
            if (handle !== currentWindowHandle) {
                await driver.switchTo().window(handle);
                break;
            }
        }

        // Məhsulun təsvirini almaq
        let productDescp = await driver.findElement(By.css('.product-description-container.js-description-container')).getText();
        console.log(`This is description of car: ${productDescp}`);

        console.log('Test passed');
    } catch (err) { 
        console.log('Error: ', err); 
    } finally {
        await driver.quit();
    }
}

carSearch();

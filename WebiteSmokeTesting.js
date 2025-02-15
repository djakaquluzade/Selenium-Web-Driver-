const { Builder, By, until, Key} = require('selenium-webdriver');
const path = require('path');
const chrome = require('selenium-webdriver/chrome');
const adblockExtensionPath = path.join('C:', 'Users', 'Administrator', 'VS Code', 'chromeDriverExtensions', 'CJPALHDLNBPAFIAMEJDNHCPHJBKEIAGM_1_62_0_0.crx'); //'This extension removes the problem caused by the advertising elements on the page.// '
let options = new chrome.Options();
options.addExtensions(adblockExtensionPath);
let driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();


async function addToCard () {
try{
    
    await driver.get('https://www.automationexercise.com/products')
    await driver.findElement(By.css('div.productinfo.text-center a[data-product-id="30"]')).click()
    await driver.wait(until.elementIsVisible(driver.findElement(By.css('div.modal-content'))),1500)
    await driver.findElement(By.css('button.btn-block')).click()
    await driver.findElement(By.css('a[href="/view_cart"]')).click()
    await driver.findElement(By.css('a.check_out')).click()
    await driver.wait(until.elementIsVisible(driver.findElement(By.className('modal-content'))),1500)
    await driver.findElement(By.css('div.modal-content a')).click()
    let nameInput = await driver.findElement(By.css('input[data-qa="signup-name"]'))
    let emailInput = await driver.findElement(By.css('input[data-qa="signup-email"]'))
    let signUpBtn = await driver.findElement(By.css('button[data-qa="signup-button"]'))
    await nameInput.sendKeys('Cahangir')
    await emailInput.sendKeys('test333@mail.com')
    await signUpBtn.click()
    await driver.wait(until.urlContains('signup'),1500)
    await driver.findElement(By.id('uniform-id_gender1')).click()
    await driver.findElement(By.css('input[data-qa="password"]')).sendKeys('Testpassword@')
    await driver.findElement(By.css('select#days')).click()
    await driver.findElement(By.css('option[value="3"]')).click()
    await driver.findElement(By.css('select[data-qa="months"]')).click()
    await driver.findElement(By.css('select[data-qa="months"]>option[value="9"]')).click()
    await driver.findElement(By.css('select[data-qa="years"]')).click()
    await driver.findElement(By.css('select[data-qa="years"]>option[value="2000"]')).click()
    await driver.wait(until.elementIsVisible(driver.findElement(By.css('input#optin'))), 1500)
    await driver.findElement(By.css('input#optin')).click()
    

    await driver.findElement(By.id('first_name')).sendKeys('Cahangir')
    await driver.findElement(By.id('last_name')).sendKeys('Quluzade')
    await driver.findElement(By.id('company')).sendKeys('My Current Workplace')
    await driver.findElement(By.id('address1')).sendKeys('Baku,Azerbaijan')
    await driver.findElement(By.id('address2')).sendKeys('Rashid Bahbudov 1')
    await driver.switchTo().defaultContent();  // Əsas səhifəyə qayıdın
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('country'))),1500)
    await driver.findElement(By.id('country')).click()
    await driver.findElement(By.css('option[value="United States"]')).click()
    await driver.findElement(By.id('state')).sendKeys('Deleware')
    await driver.findElement(By.id('city')).sendKeys('Wilmington')
    await driver.switchTo().defaultContent();  // Əsas səhifəyə qayıdın
    await driver.findElement(By.id('zipcode')).sendKeys('19801')
    await driver.findElement(By.id('state')).sendKeys('Deleware')
    await driver.switchTo().defaultContent();  // Əsas səhifəyə qayıdın
    await driver.findElement(By.id('mobile_number')).sendKeys('+189758958')
    let createAccBtn = await driver.findElement(By.css('button[data-qa="create-account"]')).click()
    await driver.wait(until.urlContains('account_created'),1500)
    await driver.findElement(By.css('a[data-qa="continue-button"]')).click()
    await driver.wait(until.elementIsVisible(driver.findElement(By.css('a[href="/delete_account"]')))).click()
    await driver.findElement(By.css('a[data-qa="continue-button"]')).click()

    
    



 console.log('Test is passed succesfully!')
}
catch(error){
    console.log(`We have error like : ${error}`)
}
finally{
    driver.quit()
}

}
addToCard()
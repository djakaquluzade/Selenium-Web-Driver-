const mocha = require('mocha');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const should = require('chai').should();

let driver;

describe('Mercedes official site testing with MochaJS and ChaiJs Assertions', () => {
    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        driver.manage().window().maximize();
    });

    it('TC001', async () => {
        await driver.get('https://www.mercedes-benz.com.az/');

        // Cookies alertini bağla
        let cookiesAlertCloseBtn = await driver.findElement(By.css('.osano-cm-dialog__close.osano-cm-close'));
        await cookiesAlertCloseBtn.click();

        // Model elementinə klik et
        const modelElement = await driver.wait(until.elementLocated(By.css('li.our-models.model-cərgəsi')), 2000);
        await modelElement.click();

        // Dropdown menyusunun görünməsini gözlə
        await driver.wait(until.elementIsVisible(driver.findElement(By.css('li.our-models.model-cərgəsi > .dropdown-menu'))), 2000);

        // Sedan elementinə klik et
        const sedanElement = await driver.findElement(By.css('li.sedan.dropdown'));
        await sedanElement.click();

        // Mercedes-Maybach S-Class elementinə klik et
        const maybachElement = await driver.findElement(By.css('.dropdown-item-912417 > a[title="Mercedes-Maybach S-Class"]'));
        await maybachElement.click();

        // Cycle pager elementinin görünməsini gözlə
        await driver.wait(until.elementIsVisible(driver.findElement(By.css('.jump-cycle-color.cycle-pager-container-jump'))), 5000);

        // Rəng elementinə klik et
        const colorElement = await driver.findElement(By.xpath('//div[@class="jump-cycle-color cycle-pager-container-jump"]//li[8]'));
        await colorElement.click();

        // Test sürüşü düyməsinə klik et
        let testDriveBtn = await driver.findElement(By.css('div.inner>a[href="#form"]'));
        await testDriveBtn.click();

        // Dropdown elementinə klik et
        let locationDropdown = await driver.findElement(By.css('button[data-id="Form_enquiry_location_hash"]'));
        await driver.wait(until.elementIsVisible(locationDropdown)).click();

        // Dropdown seçimini seç
        let dropdownOption = await driver.findElement(By.css("a[id='bs-select-1-2']"));
        await dropdownOption.click();

        // Form sahələrini doldur
        await driver.findElement(By.id('Form_customer_firstName')).sendKeys('Cahangir');
        await driver.findElement(By.id('Form_customer_lastName')).sendKeys('Guluzade');
        await driver.findElement(By.id('Form_customer_email')).sendKeys('testmail@gmail.com');
        await driver.findElement(By.css('input[type="tel"]')).sendKeys('0551111111');
        await driver.findElement(By.id('Form_enquiry_message')).sendKeys('Testing some functionals in website.');

        // Yuxarı düyməsinə klik et
        let scrollToTop = await driver.findElement(By.css('a[title="Yuxarı"]'));
        await scrollToTop.click();

        // Haqqımızda dropdown-unu aç
        let aboutUsDropdown = await driver.findElement(By.css('.haqqımızda.dropdown'));
        await aboutUsDropdown.click();

        // Şirkət haqqında seçimini seç
        let aboutUsOption = await driver.findElement(By.css('a[title="Şirkət haqqında"]'));
        await aboutUsOption.click();

        // URL-in 'about' ehtiva etdiyini gözlə
        await driver.wait(until.urlContains('about'));

        // Mətnin görünməsini gözlə
        await driver.wait(until.elementIsVisible(driver.findElement(By.css('.span12>.textInner'))), 5000);

        // Mətni əldə et və assertion et
        let textContent = await driver.findElement(By.css('.textInner>h1')).getText();
        console.log(textContent); // Mətni konsola yazdır

        // Assertion
        textContent.should.be.a('string'); // Dəyərin tipinin 'string' olduğunu yoxla
        textContent.should.include('Haqqımızda'); // Mətndə 'Haqqımızda' sözünün olmasını yoxla
    });

    after(async () => {
        await driver.quit();
    });
});
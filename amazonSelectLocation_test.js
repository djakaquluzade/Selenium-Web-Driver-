const { Builder, By, until, Key} = require('selenium-webdriver');

async function amazonSearchProduct() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://amazon.com');
        
        // İlk tıklama: Lokasyon seçme
        await driver.findElement(By.xpath('//*[@id="glow-ingress-line1"]')).click();
        
        // Zip kodu input alanının DOM'a eklenmesini bekle
        await driver.wait(until.elementLocated(By.xpath('//*[@id="GLUXZipUpdateInput"]')), 5000);
        
        // Zip kodu girişi yapılacak öğeyi bul
        let input = await driver.findElement(By.xpath('//*[@id="GLUXZipUpdateInput"]'));
        
        // Zip kodu girme işlemi
        await input.sendKeys('19806', Key.RETURN);
        
        await driver.wait(until.elementLocated(By.xpath('//*[@id="GLUXConfirmClose"]')),5000)
        
        // Pop-up penceresini kapatma
        await driver.findElement(By.xpath('//*[@id="a-popover-1"]/div/header/button/i')).click();
        
        // Sayfa başlığının "Amazon" içerdiğini kontrol et
        await driver.wait(until.titleContains('Amazon'), 5000);

        console.log("Test başarıyla tamamlandı.");

    } finally {
driver.quit()
    }
}

amazonSearchProduct();
